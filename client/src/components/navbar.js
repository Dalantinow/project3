import React, { Component } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

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
                            <ButtonToolbar>
                                <DropdownButton noCaret id="dropdown-no-caret" variant="warning" id="dropdown-basic-button" title="Scores">
                                    <Dropdown.Item href="/liveScores">Live</Dropdown.Item>
                                    <Dropdown.Item href="/concludedscores">Concluded</Dropdown.Item>
                                </DropdownButton>
                                <Nav.Link variant="warning" href="/news">News</Nav.Link>
                                <Button href="/account" variant="warning">Account</Button>
                                <Button href="/" onClick={this.logout} variant="warning">Logout</Button>
                            </ButtonToolbar>
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
                        <ButtonToolbar>
                            <DropdownButton noCaret id="dropdown-no-caret" variant="warning" id="dropdown-basic-button" title="Scores">
                                <Dropdown.Item href="/livescores">Live</Dropdown.Item>
                                <Dropdown.Item href="concludedscores">Concluded</Dropdown.Item>
                            </DropdownButton>
                            <Button href="/news" variant="warning">News</Button>
                        </ButtonToolbar>
                        <Nav pullRight>
                            <Button href="/login" variant="warning">Log In</Button>
                            <Button href="/signup" variant="warning">Sign Up</Button>
                        </Nav>
                    </Nav>
                </Navbar>
            </div>

        );
    };
};

export default Navjawn;