import React from 'react';
import FieldWrapper from './FieldWrapper';
import Loading from './notifications/loading';

class BucketlistForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			description:'',
			progress:'hide',
			button:''
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
		this.setState({
			progress:'show',
			button:'disabled'
		})

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
					this.setState({
						progress:'hide',
						button:'',
						name:'',
						description:''
					})
				})
	}
	render(){
		return(
			<div className="modal" id="activityModal">
				<form onSubmit={this.handleSubmit}>
					<Loading status={this.state.progress}/>
					<div className="modal-content">
						<h4 className="header2">
							New Bucketlist
						</h4>

						<FieldWrapper Label="Name">
							<input placeholder="Name of bucketlist" value={this.state.name} type="text" name="name" id="name" className={"validate "+this.state.button} onChange={this.handleChange}/>			
						</FieldWrapper>

						<FieldWrapper>
							<textarea placeholder="Description" value={this.state.description} name="description" onChange={this.handleChange} className={"validate "+this.state.button}></textarea>
						</FieldWrapper>

						<FieldWrapper extraz="right">
							<button className={"btn "+this.state.button}>Create Bucketlist</button>
						</FieldWrapper>
					</div>
				</form>
			</div>
			)}
}

export default BucketlistForm;