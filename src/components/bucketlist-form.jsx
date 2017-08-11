import React from 'react';
import FieldWrapper from './FieldWrapper';

class BucketlistForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			description:''
		}
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	handleChange(event){
		var target=event.target;
		var name=target.name;
		var value=target.value;

		this.setState({
			[name]:value
		})
		console.log(this.state)
	}

	handleSubmit(event){
		event.preventDefault();
		fetch("https://bucketapi.herokuapp.com/api/v1/bucketlists/",
			  {
			  	headers:{
			  		'Content-Type':'application/json',
			  		'Authorization':sessionStorage.getItem('auth')
			  	},
			  	method:'POST',
			  	body:JSON.stringify({
			  		"name":this.state.name,
			  		"description":this.state.description
			  	})
			  }).then((response) => response.json())
				.then((jsonResponse) => {
					if(jsonResponse.status == 'success'){
						alert(JSON.stringify(jsonResponse.message))
					}else{
						alert(JSON.stringify(jsonResponse.message))
					}
				})
	}
	render(){
		return(
			<form className="modal" id="activityModal" onSubmit={this.handleSubmit}>
				<h4 className="modal-header center">
					New Bucketlist
				</h4>

				<div className="modal-content">
					<FieldWrapper Label="Name">
						<input type="text" name="name" id="name" className="validate" onChange={this.handleChange}/>			
					</FieldWrapper>

					<FieldWrapper Label="story">
						<textarea name="description" onChange={this.handleChange}></textarea>
					</FieldWrapper>

					<FieldWrapper extraz="center">
						<button className="btn">Add</button>
					</FieldWrapper>
				</div>
			</form>
			)}
}

export default BucketlistForm;