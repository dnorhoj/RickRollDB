import Link from 'next/link'
import { Card } from 'react-bootstrap'
import Layout from '../../components/Layout'
import prisma from '../../lib/prisma'

export default function Admin({ rickRolls }) {
    console.log(rickRolls)
    return (
        <Layout>
            <h1>Video queue</h1>

            {rickRolls && rickRolls.map(rickroll => (
                <Card key={rickroll.id}>
                    <Card.Header>
                        <Link href={`https://youtu.be/${rickroll.video_id}`}>
                            <a target="_blank">https://youtu.be/{rickroll.video_id}</a>
                        </Link>
                    </Card.Header>
                    <Card.Body>

                    </Card.Body>
                </Card>
            ))}
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const rickRolls = await prisma.rickRoll.findMany({
        take: 10,
        where: {
            OR: [
                { verificationStatus: "UAREVIEW" },
                { verificationStatus: "REVIEW" }
            ]
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    rickRolls.map(i => {
        i.createdAt = Math.floor(i.createdAt / 1000)
        return i
    })

    return {
        props: {
            rickRolls
        }
    }
}

Admin.auth = {
    roles: ["ADMIN", "MODERATOR"]
}