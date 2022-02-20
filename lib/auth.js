import prisma from './prisma'
import bcrypt from 'bcrypt'

export async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

export async function checkCredentials(email, password) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (user
        && user.active
        && await bcrypt.compare(password, user.password)
    ) {
        return {
            id: user.id,
            username: user.username,
            role: user.role
        }
    }

    return null
}