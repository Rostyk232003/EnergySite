"use client";

import Link from "next/link";
import { Badge, Container, Nav, Navbar as BsNavbar } from "react-bootstrap";
import { useCart } from "./cart/CartProvider";

export default function NavbarComponent() {
  const { totalCount } = useCart();

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
            <Nav.Link as={Link} href="/shop">
              Equipment Shop
            </Nav.Link>
            <Nav.Link as={Link} href="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} href="/analytics">
              Analytics
            </Nav.Link>
            <Nav.Link as={Link} href="/bin" className="d-flex align-items-center gap-2">
              <span>Bin</span>
              <Badge bg="primary">{totalCount}</Badge>
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
