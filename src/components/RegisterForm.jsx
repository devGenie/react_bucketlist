import React from 'react';
import FieldWrapper from './FieldWrapper';

class RegisterForm extends React.Component{
	constructor(props){
		super(props);

		this.state={
			'email':'',
			'first_name':'',
			'last_name':'',
			'password1':'',
			'password2':''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
	}

	handleChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]:value
		})
	}
	render(){
			return(
					<form className="col s12 translucent" onSubmit={this.handleSubmit}>
						<FieldWrapper Label='Email'>
							<input type="text" name="email" onChange={this.handleChange} />
						</FieldWrapper>

						<FieldWrapper Label='First Name'>
							<input type="text" name="first_name" onChange={this.handleChange}/>
						</FieldWrapper>

						<FieldWrapper Label='Last Name'>
							<input type="text" name="last_name" onChange={this.handleChange}/>
						</FieldWrapper>

						<FieldWrapper Label='Password'>
							<input type="password" name="password1" onChange={this.handleChange}/>
						</FieldWrapper>

						<FieldWrapper Label='Repeat password'>
							<input type="password" name="password2" onChange={this.handleChange}/>
						</FieldWrapper>

						<FieldWrapper extraz="center">
							<button type="submit" name="submit" className='btn'>Register</button>
						</FieldWrapper>
					</form>
			)}
	}

export default RegisterForm;