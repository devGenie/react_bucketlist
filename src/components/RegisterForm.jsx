import React from 'react';

class RegisterForm extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
	}	
		render(){
			return(
					<form onSubmit={this.handleSubmit}>
						<input type="text" name="first_name"/>
						<input type="text" name="last_name" />
						<input type="text" name="email" />
						<input type="password" name="password1" />
						<input type="password" name="password2" />
						<button type="submit" name="submit">Register</button>
					</form>
			)}
	}

export default RegisterForm;