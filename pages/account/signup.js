import { getCsrfToken } from "next-auth/react"
import Link from "next/link"
import { Alert, Badge, Button, Card, Container, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import Layout from "../../components/Layout"
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../lib/schemas"
import { useState } from "react"

export default function SignIn({ csrfToken }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signupSchema)
  })

  const [error, setError] = useState("")

  const submit = async data => {
    setError("")
    const res = await fetch('/api/auth/signup', {
      method: "POST",
      body: JSON.stringify(data)
    })

    if (res.status === 200) {
      location.href = 'signin?success=Signup'
    } else if (res.status === 400) {
      const msg = await res.json()
      setError(msg.error)
    }
    console.log(res)
  }

  return (
    <Layout>
      <Container className="d-flex justify-content-center">
        <Card className="w-75">
          <Card.Header>
            Sign up
          </Card.Header>
          <Card.Body>

            <Form method="POST" action="/api/auth/signup" onSubmit={handleSubmit(submit)}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  {...register("username")}
                  type="text"
                  placeholder="johndoe"
                  isInvalid={errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username?.message}
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  {...register("email")}
                  type="text"
                  placeholder="john.doe@mail.com"
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  {...register("password")}
                  type="password"
                  placeholder="••••••"
                  isInvalid={errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="••••••"
                  isInvalid={errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {error && (
                <Alert variant="danger">{error}</Alert>
              )}

              <Button variant="primary" className="w-100" type="submit">Log in</Button>
            </Form>
            <Link href="/account/signin" passHref>
              <Badge bg="secondary" role="button" className="w-100">Already have an account?</Badge>
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
