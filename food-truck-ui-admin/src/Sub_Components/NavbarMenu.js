import React from "react";
import { Navbar, Container, Image, Nav } from "react-bootstrap";
import { useAuth } from '../Components/AuthContext'; // Adjust this path as necessary
import "../Css/Homepage.css";
import { useNavigate } from "react-router-dom"; 

export default function Navbar_Menu() {
  const { isLoggedIn, logout } = useAuth();

  const navigate = useNavigate(); // Use useNavigate hook to navigate to different routes

  // Function to handle logout
  const handleLogout = () => {
      // Clear session storage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('emailid');
      // Redirect to login page
      navigate('/Login');
  };


  return (
    <div className="py-2">
      <Navbar
        variant="dark"
        fixed="top"
        expand="lg"
        style={{ backgroundColor: "#48CAE4", width: "100%" }}
      >
        <Container className="permanent-marker-regular">
          <Image
            src="https://i.ibb.co/Kxx3pxB/logos.jpg"
            alt="App Logo"
            className="app-logo"
          />
          <Navbar.Brand href="/Homepage">Food-On-Wheels</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/menu">Menu</Nav.Link>
              <Nav.Link href="/order_details">History</Nav.Link>
              {/* <Nav.Link href="/menu">Menu</Nav.Link> */}

            </Nav>
            <Nav>
              {isLoggedIn ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <Nav.Link href="/SignUp">SignUp</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}