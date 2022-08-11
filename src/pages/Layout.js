import { Outlet, Link } from "react-router-dom";
import {
    withAuthenticator,
    Button,
    Heading,
    Image,
    View,
    Card,
  } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Layout = ({signOut, aws}) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
      getData()
    }, []);

    useEffect(() => {
      checkUser()
    }, [users]);
    
    const getData = () => {
      var url = `http://localhost:4200/getAll`;
      fetch(url)
        .then(r => r.json(0))
        .then(data => {
          setUsers(data);
          console.log(data)
      }).catch(e => console.log(e));
    }
  

    const checkUser = () =>{
      var Email = aws.attributes

      users.forEach(user => {
        if(Email.email === user.Email){
          setUser(user)
        }
      });
    }

  return (
    <>
        <Navbar bg="light" expand="lg" variant="light">
            <Container>
              <Navbar.Brand href="#home">Realtor site</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/houses">Houses</Nav.Link>
                  <Nav.Link href="/listmaker">Create Listing</Nav.Link>
                  <Nav.Link href="/past">Old Listings</Nav.Link>
                  

                </Nav>
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
                  <Nav>
                    <Nav.Link href="/useracc">
                      Welcome {user.name} 
                    </Nav.Link>
                  </Nav>
                  <Button className="sigout" onClick={signOut}>Sign Out</Button>
                  <Nav.Link href="/useredit">Edit Account</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>

      <Outlet />
    </>
  )
};

export default Layout;