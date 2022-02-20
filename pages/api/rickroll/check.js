import prisma from "../../../lib/prisma"

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(400).send({ message: 'Only GET requests allowed' })
        return
    }

    console.log()

    if (!req.query.v) {
        res.status(400).send({ message: 'No video supplied!' })
        return
    }


    const rickRoll = await prisma.rickRoll.findUnique({
        where: {
            url: req.query.v
        }
    })

    if (rickRoll) {
        res.status(200).send(true)
        return
    }
    res.status(404).send(false)
}