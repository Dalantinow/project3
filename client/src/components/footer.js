import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';

class Footer extends Component {
    constructor() {
        super()
    };

    render() {
        return (
            <>
                <Navbar bg="dark" className="fixed-bottom">
                     <Navbar.Text>
                         <Nav.Link href="https://github.com/Dalantinow/project3">
                            Documentation
                         </Nav.Link>
                     </Navbar.Text>
                </Navbar>
            </>
        )
    }
}
export default Footer; 