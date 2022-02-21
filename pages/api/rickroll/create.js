import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { getSession } from "next-auth/react"
import { ValidationError } from "yup"
import prisma from "../../../lib/prisma"
import { createRickRollSchema } from "../../../lib/schemas"

const videoIDRegex = /(\?v=|\.be\/)?([a-zA-Z0-9_-]{11})/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).send({ message: 'Only POST requests allowed' })
  }

  try {
    let video_id = ""
    let verificationStatus = "UAREVIEW"
    let userid = null

    // Validate body
    const data = await createRickRollSchema.validate(req.body)

    // Check regex
    const out = videoIDRegex.exec(data.url)
    if (!out) {
      return res.status(400).send({ message: 'Invalid video id.' })
    }

    video_id = out[2]

    // Check if authenticated
    const session = await getSession({ req })
    if (session?.user) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id
        }
      })

      if (user) {
        verificationStatus = "REVIEW"
        userid = user.id

        if (["MODERATOR", "ADMIN"].includes(user.role)) {
          verificationStatus = "ACCEPTED"
        }
      }
    }

    // Create the rickroll
    const rickRoll = await prisma.rickRoll.create({
      data: {
        video_id: video_id,
        addedByUserId: userid,
        verificationStatus: verificationStatus
      }
    })
    res.status(200).json({ video_id: video_id })
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ error: e.message })
    } else if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ error: "RickRoll already exists!" })
      }
    }
    throw e
  }
}
