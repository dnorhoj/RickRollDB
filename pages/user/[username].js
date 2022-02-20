import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import prisma from "../../lib/prisma"

export async function getServerSideProps(context) {
    const { username } = context.query

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    console.log(await getSession(context))

    return {
        props: {
            user
        }
    }
}

export default function User(props) {
    if (props.user === null) {
        return (
            <Layout>
                <center>
                    <h1>(╯°□°）╯︵ ┻━┻</h1>
                    <h3>There is no user with that name!</h3>
                </center>
            </Layout>
        )
    }

    return (
        <Layout>
            <h1>{props.user.username}</h1>
        </Layout>
    )

    if (!username) {
        return "loading"
    }

    return username
}