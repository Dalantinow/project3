import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')
        axios
            .post('http://localhost:3001/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
            });
    };

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                 	<Form>
						<Col sm={5}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="username"
									placeholder="Enter email"
									id="username"
									name="username"
									value={this.state.username}
									onChange={this.handleChange} />
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									placeholder="Password"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</Form.Group>
						</Col>
						<Button onClick={this.handleSubmit} variant="dark" type="submit">
							Submit
  						</Button>
					</Form>
                </div>
            );
        };
    };
};

export default LoginForm;
