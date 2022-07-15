import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function App({ signOut }) {
  return (
    <Navbar bg="light" expand="lg" variant="light">
    <Container>
      <Navbar.Brand href="#home">Realtor site</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Houses</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in
          </Navbar.Text>
          <Button className="sigout" onClick={signOut}>Sign Out</Button>
        </Navbar.Collapse>
    </Container>
  </Navbar>

    // <View className="App">
    //   <Card>
    //     <Image src={logo} className="App-logo" alt="logo" />
    //     <Heading level={1}>We now have Auth!</Heading>
    //   </Card>
    //   <Button onClick={signOut}>Sign Out</Button>
    // </View>
  );
}

export default withAuthenticator(App);
