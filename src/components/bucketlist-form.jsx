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
						console.log(JSON.stringify(jsonResponse.data))
						this.props.handler(jsonResponse.data)
					}else{
						alert(JSON.stringify(jsonResponse.message))
					}
				})
	}
	render(){
		return(
			<div className="modal" id="activityModal">
				<form onSubmit={this.handleSubmit}>
					<div className="modal-content">
						<h4 className="header2">
							New Bucketlist
						</h4>

						<FieldWrapper Label="Name">
							<input placeholder="Name of bucketlist" type="text" name="name" id="name" className="validate" onChange={this.handleChange}/>			
						</FieldWrapper>

						<FieldWrapper>
							<textarea placeholder="Description" name="description" onChange={this.handleChange}></textarea>
						</FieldWrapper>

						<FieldWrapper extraz="right">
							<button className="btn">Create Bucketlist</button>
						</FieldWrapper>
					</div>
				</form>
			</div>
			)}
}

export default BucketlistForm;