import React from 'react';
import FieldWrapper from './FieldWrapper';

class ChangePassword extends React.Component{
	constructor(props){
		super(props);
		this.state={old_password:'',new_password:''}
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleChange=this.handleChange.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		var url="https://bucketapi.herokuapp.com/api/v1/auth/password_reset";
		fetch(url,
			  {
			  	headers:{
			  		'Content-Type':'application/json',
			  		'Authorization':sessionStorage.getItem('auth')
			  	},
			  	method:'POST',
			  	body:JSON.stringify({
			  		"old_password":this.state.old_password,
			  		"new_password":this.state.new_password
			  	})
			  }).then((response) => response.json())
				.then((jsonResponse) => {
					if(jsonResponse.status === 'success'){
						window.Materialize.toast(jsonResponse.message,4000)

					}else{
						window.Materialize.toast(jsonResponse.message,4000)
						//alert(JSON.stringify(jsonResponse.message))
					}
				})
	}

	handleChange(event){
		var target=event.target;
		var name=target.name;
		var value=target.value;
		this.setState({
			[name]:value
		})
	}

	render(){
		return(
			<div id="password-modal" className="modal">
				<form className="modal-content" method="POST" onSubmit={this.handleSubmit}>
					<h4 className="header2">
						Change Password
					</h4>

					<FieldWrapper Label="Old Password">
						<input placeholder="Old Password" type="password" name="old_password" id="old_password" className="validate" required onChange={this.handleChange}/>
					</FieldWrapper>	

					<FieldWrapper Label="New Password">
						<input placeholder="New Password" type="password" name="new_password" id="item_name" className="validate" required onChange={this.handleChange}/>
					</FieldWrapper>			

					<FieldWrapper extraz="right">
						<button className="btn" type='submit'>Reset</button>
					</FieldWrapper>
				</form>
			</div>
		)
	}
}

export default ChangePassword;