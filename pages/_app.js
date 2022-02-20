import { SessionProvider, useSession } from "next-auth/react"
import { Spinner, SSRProvider } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from "../components/Layout"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth auth={Component.auth}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </SSRProvider>
  )
}

function Auth({ children, auth }) {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()

  if (!!session?.user) {
    if (auth.roles && !auth.roles.includes(session.user.role)) {
      router.replace("/")
      return null
    }
    return children
  }

  return (
    <Layout>
      <div className="d-flex justify-content-center p-5">
        <Spinner animation="border" />
      </div>
    </Layout>
  )
}

export default MyApp
