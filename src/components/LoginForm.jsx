import React from 'react';
import FieldWrapper from './FieldWrapper';
import Loading from './notifications/loading';

class LoginForm extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			email : '',
			password: '',
			progress:'hide',
			button:''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		this.setState({
			progress:'show',
			button:'disabled'
		})
		fetch("https://bucketapi.herokuapp.com/api/v1/auth/login",
		      {headers:{
						'Content-Type':'application/json'
						}, 
			    method:'POST',
				body:JSON.stringify({'email':this.state.email,'password':this.state.password})})
					 .then((response) => response.json())
					 .then((jsonResponse) => {
					 	console.log(JSON.stringify(jsonResponse));
					 	if (jsonResponse.status==='success'){
					 		sessionStorage.setItem('auth',jsonResponse.auth);
					 		sessionStorage.setItem('isAuthenticated',true);
					 		console.log("yey");
					 		window.location='/dashboard'
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
		});
	}
	render(){
		return (<form className="translucent col s12" onSubmit={this.handleSubmit}>
					<Loading status={this.state.progress}/>
					<div className="innerForm col s12">
						<h5 className="col s12 center">
								Login
						</h5>
						<FieldWrapper Label="Email">
							<input type="email" name='email' className='validate' id="login_username" onChange={this.handleChange}/>
						</FieldWrapper>

						<FieldWrapper Label="Password">
							<input type="password" id="login_password" name='password' required="" aria-required="true" onChange={this.handleChange}/>
						</FieldWrapper>

						<FieldWrapper extraz="center">
							<button type="submit" id="loginBtn" className={"btn "+this.state.button}>Login</button>
						</FieldWrapper>
					</div>
				</form>)
	}
}

export default LoginForm;