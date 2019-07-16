import React, { Component } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

class Navjawn extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    };
    componentDidMount() {
        var retrievedObject = localStorage.getItem("userObject");
        console.log("retrievedObject", JSON.parse(retrievedObject));
    }
    logout(event) {
        event.preventDefault()
        console.log('logging out')
        localStorage.removeItem('retrievedObject');
        delete window.localStorage['retrievedObject']
        axios.post('http://localhost:3001/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                });
              
            };
        }).catch(error => {
            console.log('Logout error');
        });
    };

    render() {
        const loggedIn = this.props.loggedIn;
        if (loggedIn === true) {
            return (
                <div>
                    <Navbar className="navi" bg="dark" variant="dark">
                        <Navbar.Brand href="/">Ubetcha</Navbar.Brand>
                        <Nav className="mr-auto">
                            <ButtonToolbar>
                                <DropdownButton className="home-button" variant="warning" id="dropdown-basic-button" title="Scores">
                                    <Dropdown.Item href="/liveScores">Live (Coming Soon!)</Dropdown.Item>
                                    <Dropdown.Item href="/concludedscores">Concluded (Coming Soon!)</Dropdown.Item>
                                </DropdownButton>
                                <Button className="home-button" variant="warning" href="/news">News</Button>
                                <Button className="home-button" href="/" onClick={this.logout} variant="warning">Logout</Button>
                            </ButtonToolbar>
                        </Nav>
                    </Navbar>
                </div>
            )
        }
        return (
            <div>
                <Navbar className="navi" bg="dark" variant="dark">
                    <Navbar.Brand href="/">Ubetcha</Navbar.Brand>
                    <Nav className="mr-auto">
                        <ButtonToolbar>
                            <DropdownButton className="home-button" variant="warning" id="dropdown-basic-button" title="Scores">
                                <Dropdown.Item href="/livescores">Live (Coming Soon!)</Dropdown.Item>
                                <Dropdown.Item href="concludedscores">Concluded (Coming Soon!)</Dropdown.Item>
                            </DropdownButton>
                            <Button className="home-button" href="/news" variant="warning">News</Button>
                        </ButtonToolbar>
                        <Nav>
                            <Button className="home-button" href="/login" variant="warning">Log In</Button>
                            <Button className="home-button" href="/signup" variant="warning">Sign Up</Button>
                        </Nav>
                    </Nav>
                </Navbar>
            </div>

        );
    };
};

export default Navjawn;