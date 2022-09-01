import { Outlet } from "react-router-dom";
import {
    Button,
  } from "@aws-amplify/ui-react";
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = ({signOut, user}) => {
  const wrapperFunc = () => {
    localStorage.setItem('email', "")
    localStorage.setItem('name', "")        
    localStorage.setItem('signedin', "")
    signOut()
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Listing Container</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/houses">Listings</Nav.Link>
              <Nav.Link href="/listmaker">Create Listing</Nav.Link>
              <Nav.Link href="/past">Old Listings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link>
                  Welcome {user.name} 
                </Nav.Link>
              </Nav>
              <Button className="sigout" onClick={() => wrapperFunc()} style={{color: "gray"}}>Sign Out</Button>
              <Nav.Link href="/useredit">Edit Account</Nav.Link>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
};

export default Layout;