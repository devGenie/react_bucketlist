import React from 'react';
import FieldWrapper from './FieldWrapper';

class ItemForm extends React.Component{
	constructor(props){
		super(props);
		this.state={name:''}
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleChange=this.handleChange.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		var pt=this.props.caller();
		var url="https://bucketapi.herokuapp.com/api/v1/bucketlists/"+pt+"/items/";
		fetch(url,
			  {
			  	headers:{
			  		'Content-Type':'application/json',
			  		'Authorization':sessionStorage.getItem('auth')
			  	},
			  	method:'POST',
			  	body:JSON.stringify({
			  		"name":this.state.name,
			  	})
			  }).then((response) => response.json())
				.then((jsonResponse) => {
					if(jsonResponse.status == 'success'){
						this.props.onComplete(jsonResponse.data)
					}else{
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
			<form className="modal" id="item_model" method="POST" onSubmit={this.handleSubmit}>
				<h4 className="modal-header center">
					Add Item
				</h4>

				<div className="modal-content">
					<FieldWrapper Label="Name">
						<input type="text" name="name" id="item_name" className="validate" onChange={this.handleChange}/>
					</FieldWrapper>			
				</div>

				<FieldWrapper extraz="center">
					<button className="btn" type='submit'>Add</button>
				</FieldWrapper>
			</form>
		)
	}
}

export default ItemForm;