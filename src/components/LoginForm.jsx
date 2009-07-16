import React from 'react';
import FieldWrapper from './FieldWrapper';

class LoginForm extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			email : '',
			password: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		fetch("https://bucketapi.herokuapp.com/api/v1/auth/login",
		      {headers:{
						'Content-Type':'application/json'
						}, 
			    method:'POST',
				body:JSON.stringify({'email':this.state.email,'password':this.state.password})})
					 .then((response) => response.json())
					 .then((jsonResponse) => {
					 	console.log(JSON.stringify(jsonResponse));
					 	if (jsonResponse.status=='success'){
					 		sessionStorage.setItem('auth',jsonResponse.auth)
					 	}
					 	alert(sessionStorage.getItem('auth'))
					 })
	}

	handleChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]:value
		});
	}
	render(){
		return (<form className="col s12 translucent" onSubmit={this.handleSubmit}>
					<h5 className="col s12 center">
							Login
					</h5>
					<FieldWrapper Label="Email">
						<input type="text" name='email' id="login_username" onChange={this.handleChange}/>
					</FieldWrapper>

					<FieldWrapper Label="Password">
						<input type="password" id="login_password" name='password' onChange={this.handleChange}/>
					</FieldWrapper>

					<FieldWrapper extraz="center">
						<button type="submit" id="loginBtn" className="btn">Login</button>
					</FieldWrapper>
				</form>)
	}
}

export default LoginForm;