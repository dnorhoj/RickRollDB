import Head from "next/head";
import { Container } from "react-bootstrap";
import Navbar from "./Navbar";

export default function Layout({ children, page }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/icon.png" />
                <title>RickRollDB</title>
            </Head>
            <Navbar page={page} />
            <Container className="mt-3">
                {children}
            </Container>
        </>
    )
}