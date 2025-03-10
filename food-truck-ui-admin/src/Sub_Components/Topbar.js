import React from "react";
import { Navbar, Container, Image, Nav } from "react-bootstrap";
import "../Css/Homepage.css";

export default function Topbar() {
  return (
    <Navbar variant="dark" fixed="top" expand="lg">
      <Container className="permanent-marker-regular">
        <Nav.Link href="/Homepage">
        <Image
          src="https://i.ibb.co/Kxx3pxB/logos.jpg"
          alt="App Logo"
          className="app-logo"
        />
        </Nav.Link>
        <Navbar.Brand href="/Homepage">Food On Wheels</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/menu">Menu</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
