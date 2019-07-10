import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';



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
                    <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Ubetcha</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Button href="/news" variant="outline-info">News</Button>
                    <Button href="/scores" variant="outline-info">Scores</Button>
                    <Button href="/account" variant="outline-info">Account</Button>
                    <Button href="/" onClick={this.logout} variant="outline-info">Logout</Button>
                    </Nav>
                </Navbar>
                </div>
            )
        }
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Ubetcha</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Button href="/news" variant="outline-info">News</Button>
                    <Button href="/scores" variant="outline-info">Scores</Button>
                    <Button href="/login" variant="outline-info">Log In</Button>
                    <Button href="/signup" variant="outline-info">Sign Up</Button>
                    </Nav>
                </Navbar>
            </div>

        );
    };
};

export default Navjawn;