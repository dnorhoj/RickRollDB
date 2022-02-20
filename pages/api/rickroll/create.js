import { getSession } from "next-auth/react"
import { ValidationError } from "yup"
import prisma from "../../../lib/prisma"
import { createRickRollSchema } from "../../../lib/schemas"

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).send({ message: 'Only POST requests allowed' })
  }

  try {
    const data = await createRickRollSchema.validate(req.body)

    console.log(data)

    const session = await getSession({ req })
    if (!session?.user) {
      return res.status(401).end()
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      }
    })
// TODO: FIX THIS SHIT
    let verification = ""
    switch (user.role) {
      case value:

        break;

      default:
        verification = "UAREVIEW"
        break;
    }

    const rickRoll = await prisma.rickRoll.create({
      data: {
        url: data.url,
        addedByUserId: session.user.id,
        verificationStatus: ""
      }
    })

  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ error: e.message })
    }
    throw e
  }

  res.status(200).json({ ost: "mad" })
}
