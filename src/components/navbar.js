import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



class Navjawn extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }


    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('http://localhost:3001/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                });
            };
        }).catch(error => {
            console.log('Logout error')
        });
    };

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        if (loggedIn === true) {
            return (
                <div>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand href="/">UBetcha</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <div>
                                    <Nav.Link href="/" onClick={this.logout}>Logout</Nav.Link>
                                    <Nav.Link href="/news">News</Nav.Link>
                                    <Nav.Link href="/scores">Scores</Nav.Link>
                                    <Nav.Link href="/bets">Your Bets</Nav.Link>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        }
        return (
            <div>
        
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="#home">UBetcha</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <div>
                                <Nav.Link href="/login">Log In</Nav.Link>
                                <Nav.Link href="/signup">Sign Up</Nav.Link>
                                <Nav.Link href="/news">News</Nav.Link>
                                <Nav.Link href="/scores">Scores</Nav.Link>
                            </div>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

        );
    };
};

export default Navjawn;