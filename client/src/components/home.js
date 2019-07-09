import React, { Component } from "react";
import barclay from "../assets/barclay.png";
import manchester from "../assets/manchester.png";
import supercontest from "../assets/supercontest.jpg";
import tottenham from "../assets/tottenham.jpg";
import ControlledCarousel from "../components/carousel";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

var axios = require("axios");
class Home extends Component {
  constructor() {
    super();
  }

  // componentDidMount() {
  //   Axios.get("/api/scrape");
  // }

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <div className="logoBackground">
            <img src={barclay} alt="" />
          </div>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>

        <ControlledCarousel />
      </div>
    );
  }
}

export default Home;
