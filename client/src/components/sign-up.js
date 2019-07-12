import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';


class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ');
		console.log(this.state.username);
		event.preventDefault();

		//request to server to add a new username/password
		axios.post('http://localhost:3001/user', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response.data.error);
				if (!response.data.error) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					});
				} else {
					console.log('username already taken');
				}
			}).catch(error => {
				console.log('signup error: ');
				console.log(error);
			})
	}


	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div>
					<div className="SignupForm">
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
									<Form.Text className="text-muted">
										We'll never share your email with anyone else.
    						</Form.Text>
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
				</div>
			);
		};
	};
};

export default Signup;