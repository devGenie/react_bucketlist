import React from 'react';
import FieldWrapper from './FieldWrapper';
import Loading from './notifications/loading';


class RegisterForm extends React.Component{
	constructor(props){
		super(props);

		this.state={
			'email':'',
			'first_name':'',
			'last_name':'',
			'password':'',
			'progress':'hide',
			'button':''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		event.preventDefault();
		this.setState({progress:'show',button:'disabled'})
		fetch("https://bucketapi.herokuapp.com/api/v1/auth/register",
		      {headers:{
						'Content-Type':'application/json'
						}, 
			    method:'POST',
				body:JSON.stringify({'email':this.state.email,
					'first_name':this.state.first_name,
					'last_name':this.state.last_name,
					'password':this.state.password
					})})
					 .then((response) => response.json())
					 .then((jsonResponse) => {
					 	console.log(JSON.stringify(jsonResponse));
					 	if (jsonResponse.status==='success'){
					 		this.setState({
					 			progress:'hide',
					 			button:''
					 		})
					 		window.Materialize.toast('Thank you for registering, Login to continue',4000)
					 		window.$(".flipper").toggleClass("flip");
					 	}else{
					 		this.setState({
					 			progress:'hide',
					 			button:''
					 		})
					 		window.Materialize.toast(jsonResponse.message,4000)
					 	}
					 	//alert(sessionStorage.getItem('auth'))
					 }).catch(()=>{
					 	this.setState({
					 			progress:'hide',
					 			button:''
					 		})
					 	window.Materialize.toast("Oh No!, something went wrong, please try again.",4000)
					 })
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
						<Loading status={this.state.progress}/>
						<div className="innerForm col s12">
							<h5 className="col s12 center">
								Register
							</h5>

							<FieldWrapper Label='Email'>
								<input type="email" className="validate" name="email" onChange={this.handleChange} />
							</FieldWrapper>

							<FieldWrapper Label='First Name'>
								<input type="text" className="validate" name="first_name" onChange={this.handleChange}/>
							</FieldWrapper>

							<FieldWrapper Label='Last Name'>
								<input type="text" className="validate" name="last_name" onChange={this.handleChange}/>
							</FieldWrapper>

							<FieldWrapper Label='Password'>
								<input type="password" className="validate" name="password" onChange={this.handleChange}/>
							</FieldWrapper>

							<FieldWrapper extraz="center">
								<button type="submit" name="submit" className={'btn '+this.state.button}>Register</button>
							</FieldWrapper>
						</div>
					</form>
			)}
	}

export default RegisterForm;