"use client";

import Link from "next/link";
import { Navbar as BsNavbar, Container, Nav } from "react-bootstrap";

export default function NavbarComponent() {
  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <BsNavbar.Brand as={Link} href="/">
          Smart Energy System
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="main-navbar-nav" />

        <BsNavbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} href="/analytics">
              Analytics
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
