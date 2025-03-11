
import React, { Component } from 'react';
import testFunction from '../presenter/testView.jsx';

/**
 *
 * THIS WAS A TEST VIEW DURING START OF PROJECT
 * IS NOT CURRENTLY USED
 *
 */

export default class Form extends Component {
	state={
		firstName: '',
		lastName: '',
		email: '',
		personalNumber: '',
		userName: '',
		password: '',
		confirmPassword: '',
	}
	handleChange = (e) => {
		this.setState({[e.target.name]:e.target.value})
		console.log(e)
		console.log(e.target)
		console.log(e.target.name)
	}
	logChange = (e) => {
		e.preventDefault();
		for(var key in this.state){
			if(this.state.hasOwnProperty(key)) {
				console.log(this.state[key]);
			}
		}
		testPresenter(props);
		//this.state.map((x) => console.log(x));
	}
	testPresenter = (props) => {
		const data = await testFunction(props);
		console.log(data);
	}
	render() {
		return (
			<div>
			<form onSubmit={this.logChange}>
			<label>
			firstName:
			<input type="text" placeholder='First Name' name="firstName" value={this.state.firstName} onChange={this.handleChange} />
			</label>
			<label>
			lastName:
			<input type="text" placeholder='Last Name' name="lastName" value={this.state.lastName} onChange={this.handleChange} />
			</label>
			<label>
			email:
			<input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
			</label>
			<label>
			personalNumber:
			<input type="text" placeholder="Personal Number" name="personalNumber" value={this.state.personalNumber} onChange={this.handleChange} />
			</label>
			<label>
			userName:
			<input type="text" placeholder="User Name" name="userName" value={this.state.userName} onChange={this.handleChange} />
			</label>
			<label>
			password:
			<input type="text" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
			</label>
			<label>
			confirmPassword:
			<input type="text" placeholder="Confirm Password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
			</label>
			<input type="submit" value="Submit" />
			</form>
			</div>
		);
	}
}
