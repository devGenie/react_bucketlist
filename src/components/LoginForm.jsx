import React from 'react';

class LoginForm extends React.Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
	}
	render(){
		return (<form onSubmit={this.handleSubmit}>
					<input type="text" id="login_username"/>
					<input type="password" id="login_password"/>
					<button type="submit" id="loginBtn">Login</button>
				</form>)
	}
}

export default LoginForm;