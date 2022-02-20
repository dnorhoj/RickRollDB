import Layout from '../../components/Layout'

export default function Admin({ session }) {
    return (
        <Layout>
            <h1>Admin</h1>
            {session && <h1>Bruh</h1>}
        </Layout>
    )
}

Admin.auth = {
    roles: ["ADMIN"]
}