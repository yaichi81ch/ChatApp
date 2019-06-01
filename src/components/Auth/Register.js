import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';

import firebase from '../../firebase';

class Register extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
		errors: [],
		loading: false
	};

	isFormValid = () => {
		let errors = [];
		let error;

		if (this.isFormEmpty(this.state)) {
			error = { message: 'Fill in all fields' };
			this.setState({ errors: errors.concat(error) });
			return false;
		} else if (!this.isPasswordValid(this.state)) {
			error = { message: 'Password is invalid' };
			this.setState({ errors: errors.concat(error) });
			return false;
		} else {
			return true;
		}
	}

	isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
		return !username.length || !email.length || !password.length || !passwordConfirmation.length;
	}

	isPasswordValid = ({ password, passwordConfirmation }) => {
		if (password < 6 || passwordConfirmation < 6) {
			return false;
		} else if (password !== passwordConfirmation) {
			return false;
		} else {
			return true;
		}
	}

	displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit = event => {
		if (this.isFormValid()) {
			this.setState({ errors: [], loading: true });
			event.preventDefault();
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then(createdUser => {
					console.log(createdUser);
					this.setState({ loading: false });
				})
				.catch(err => {
					console.error(err);
					this.setState({ errors: this.state.errors.concat(err), loading: false });
				});
		}
	};

	render() {
		const { username, email, password, passwordConfirmation, errors, loading } = this.state;

		return (
			<Grid textAlign="center" verticalAlign="middle">
				<Grid.Column style={{maxWidth: 450 }}>
					<Header as="h2" icon color="orange" textAlign="center">
						<Icon name="puzzle piece" color="orange" />
						Register for ChatApp
					</Header>
					<Form onSubmit={this.handleSubmit} size="large">
						<Segment stacked>
							<Form.Input
								fluid
								name="username"
								icon="user"
								iconPosition="left"
								placeholder="Username"
								value={username}
								class={
									errors.some(error =>
										error.message.toLowerCase().includes("username")
									)
										? "error"
										: ""
								}
								onChange={this.handleChange}
								type="text"
							/>
							<Form.Input
								fluid
								name="email"
								icon="mail"
								iconPosition="left"
								placeholder="Email Address"
								value={email}
								class={
									errors.some(error =>
										error.message.toLowerCase().includes("email")
									)
										? "error"
										: ""
								}
								onChange={this.handleChange}
								type="email"
							/>
							<Form.Input
								fluid
								name="password"
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								value={password}
								class={
									errors.some(error =>
										error.message.toLowerCase().includes("password")
									)
										? "error"
										: ""
								}
								onChange={this.handleChange}
								type="password"
							/>
							<Form.Input
								fluid
								name="passwordConfirmation"
								icon="repeat"
								iconPosition="left"
								placeholder="Password Confirmation"
								value={passwordConfirmation}
								class={
									errors.some(error =>
										error.message.toLowerCase().includes("passwordConfirmation")
									)
										? "error"
										: ""
								}
								onChange={this.handleChange}
								type="password"
							/>
							<Button disabled={loading} className={loading ? 'loading' : ''} color="orange" fluid size="large">Submit</Button>
						</Segment>
					</Form>
					{errors.length > 0 && (
						<Message error>
							<h3>Error</h3>
							{this.displayErrors(errors)}
						</Message>
					)}
					<Message>Already a user?<Link to="/login">Login</Link></Message>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Register;