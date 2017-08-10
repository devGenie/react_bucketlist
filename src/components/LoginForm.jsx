import React from 'react';
import FieldWrapper from './FieldWrapper'

class LoginForm extends React.Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
	}
	render(){
		return (<form className="col s12 translucent" onSubmit={this.handleSubmit}>
					<h5 className="col s12 center">
							Login
					</h5>
					<FieldWrapper Label="Email">
						<input type="text" id="login_username" />
					</FieldWrapper>

					<FieldWrapper Label="Password">
						<input type="password" id="login_password" />
					</FieldWrapper>

					<FieldWrapper extraz="center">
						<button type="submit" id="loginBtn" className="btn">Login</button>
					</FieldWrapper>
				</form>)
	}
}

export default LoginForm;