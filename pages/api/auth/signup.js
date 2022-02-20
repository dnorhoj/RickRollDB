import { signupSchema } from "../../../lib/schemas"
import { hashPassword } from "../../../lib/auth"
import prisma from "../../../lib/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { ValidationError } from "yup"

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return
    }

    try {
        const body = await signupSchema.validate(req.body)
        const user = await prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                password: await hashPassword(body.password)
            }
        })
        console.log(user)
    } catch (e) {
        if (e instanceof TypeError) {
            return res.status(500).send("Internal server error")
        }
        if (e instanceof ValidationError) {
            return res.status(400).send({ error: e.message })
        }
        if (e instanceof PrismaClientKnownRequestError) {
            switch (e.meta?.target[0]) {
                case "username":
                    return res.status(400).send({ error: 'Username already exists!' })
                case "email":
                    return res.status(400).send({ error: 'Email already exists!' })
            }
            console.error(e)
            return res.status(400).send({ error: 'Unknown error!' })
        }
    }


    res.status(200).send()
}