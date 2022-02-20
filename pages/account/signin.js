import { getCsrfToken } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Alert, Badge, Button, Card, Col, Container, Form } from "react-bootstrap"
import Layout from "../../components/Layout"

export default function SignIn({ csrfToken }) {
  const query = useRouter().query

  return (
    <Layout>
      <Container className="d-flex justify-content-center">
        <Card>
          <Card.Header>
            Log in
          </Card.Header>
          <Card.Body>
            <Form method="POST" action="/api/auth/callback/credentials">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="text"
                  placeholder="john.doe@mail.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="••••••"
                />
              </Form.Group>

              {query.error == "CredentialsSignin" && (
                <Alert variant="danger">Wrong email or password!</Alert>
              )}
              {query.error == "SessionRequired" && (
                <Alert variant="danger">You have to log in to access this content!</Alert>
              )}
              {query.success == "Signup" && (
                <Alert variant="success">Signup success! Please log in.</Alert>
              )}

              <Button variant="primary" className="w-100" type="submit">Log in</Button>
            </Form>
            <Link href="/account/signup" passHref>
              <Badge bg="secondary" role="button" className="w-100">Don{"'"}t have an account?</Badge>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}
