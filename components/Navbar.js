import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Container, Nav, NavDropdown, Navbar as BSNavbar, Button } from "react-bootstrap";

export default function Navbar({ page }) {
  const { status, data } = useSession();

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link href="/" passHref>
          <BSNavbar.Brand>
            RickRollDB
          </BSNavbar.Brand>
        </Link>

        <BSNavbar.Toggle aria-controls="navbar" />

        <BSNavbar.Collapse id="navbar">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link active={page === "home"}>Home</Nav.Link>
            </Link>
            <Link href="/otherpage" passHref>
              <Nav.Link active={page === "otherpage"}>Otherpage</Nav.Link>
            </Link>
            <Link href="/otherpage" passHref>
              <Nav.Link active={page === "otherpage"}>Otherpage</Nav.Link>
            </Link>
          </Nav>

          <Nav>
            {status === 'unauthenticated' && (
              <Nav.Item>
                <Link href="/account/signup" passHref>
                  <Button variant="outline-success" className="me-3">Sign up</Button>
                </Link>
                <Link href="/account/signin" passHref>
                  <Button variant="outline-primary" onClick={signIn}>Log in</Button>
                </Link>
              </Nav.Item>
            )}
            {status == 'authenticated' && (
              <NavDropdown title={data.user.username} id="basic-nav-dropdown">
                <Link href="/account/settings" passHref>
                  <NavDropdown.Item>Account</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />

                {data.user.role === "ADMIN" && (
                  <>
                    <NavDropdown.Header>
                      Admin
                    </NavDropdown.Header>

                    <Link href="/admin" passHref>
                      <NavDropdown.Item>Panel</NavDropdown.Item>
                    </Link>

                    <NavDropdown.Divider />
                  </>
                )}

                <NavDropdown.Item
                  onClick={() => {
                    signOut({
                      callbackUrl: "/"
                    })
                  }}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>

  )
}