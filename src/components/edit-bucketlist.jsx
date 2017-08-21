import React from 'react';
import FieldWrapper from './FieldWrapper';

class EditBucketlist extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this)
		this.handleChange=this.handleChange.bind(this)
		this.state={name:'',description:''}
	}

	componentWillReceiveProps(newProps){
		this.setState({name:newProps.editing.name,description:newProps.editing.description})
		//alert(JSON.stringify(this.state))
	}

	handleSubmit(event){
		event.preventDefault();
		let url="https://bucketapi.herokuapp.com/api/v1/bucketlists/"+this.props.caller();
		fetch(url,
			  {
			  	headers:{
			  		'Content-Type':'application/json',
			  		'Authorization':sessionStorage.getItem('auth')
			  	},
			  	method:'PUT',
			  	body:JSON.stringify({
			  		"name":this.state.name,
			  		"description":this.state.description
			  	})
			  }).then((response) => response.json())
				.then((jsonResponse) => {
					if(jsonResponse.status == 'success'){
						this.props.onComplete(jsonResponse.data)
					}else{
						alert(JSON.stringify(jsonResponse))
					}
				})
	}

	handleChange(event){
		event.preventDefault();
		let target=event.target;
		let name= target.name;
		let value=target.value;

		this.setState({[name]:value})
	}

	render(){
		return(
			<div className="modal" id="EditBucketlist">
				<form onSubmit={this.handleSubmit}>
					<div className="modal-content">
						<h4 className="header2">
							Edit Bucketlist
						</h4>

						<FieldWrapper Label="Name">
							<input placeholder="Name of bucketlist" value={this.state.name} type="text" name="name" id="name" className="validate" onChange={this.handleChange}/>			
						</FieldWrapper>

						<FieldWrapper>
							<textarea placeholder="Description" value={this.state.description} name="description" onChange={this.handleChange}></textarea>
						</FieldWrapper>

						<FieldWrapper extraz="right">
							<button className="btn">Confirm Edit</button>
						</FieldWrapper>
					</div>
				</form>
			</div>
		)
	}

}

export default EditBucketlist;