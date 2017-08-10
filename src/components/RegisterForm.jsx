import React from 'react';
import FieldWrapper from './FieldWrapper';

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
						<FieldWrapper>
							<input type="text" name="first_name"/>
						</FieldWrapper>

						<FieldWrapper>
							<input type="text" name="last_name" />
						</FieldWrapper>

						<FieldWrapper>
							<input type="text" name="email" />
						</FieldWrapper>

						<FieldWrapper>
							<input type="password" name="password1" />
						</FieldWrapper>

						<FieldWrapper>
							<input type="password" name="password2" />
						</FieldWrapper>

						<FieldWrapper>
							<button type="submit" name="submit">Register</button>
						</FieldWrapper>
					</form>
			)}
	}

export default RegisterForm;