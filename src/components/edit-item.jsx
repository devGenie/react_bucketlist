import React from 'react';
import FieldWrapper from './FieldWrapper';

class EditItem extends React.Component{
	constructor(props){
		super(props)
		this.state={name:''}
		this.handleSubmit=this.handleSubmit.bind(this)
		this.handleChange=this.handleChange.bind(this)
	}

	handleSubmit(event){
		event.preventDefault();
		let url ="https://bucketapi.herokuapp.com/api/v1/bucketlists/";
		let itemsUrl=url+this.props.caller.bucketlist+"/items/"+this.props.caller.item;
		console.log(itemsUrl)
		fetch(itemsUrl,
			   {headers:{
			   		'Content-Type':'application/json',
			   		Authorization:sessionStorage.getItem('auth')
			   },
			   method:"PUT",
				body:JSON.stringify({
			  		"name":this.state.name,
				  })
			   }).then((response)=>response.json())
		.then((jsonResponse)=>{
			console.log(jsonResponse)
			if(jsonResponse.status=='success'){	
				this.props.caller.callback(jsonResponse.data)
				//alert(JSON.stringify(jsonResponse))
			}
			else{
				console.log(jsonResponse.message);
			}
		})
	}

	handleChange(event){
		event.preventDefault()
		let target=event.target;
		let name=target.name;
		let value=target.value
		this.setState({
			name:value
		})

		//alert(JSON.stringify(this.state))
	}

    render(){
        return(
            <div id="item_edit_model" className="modal">
				<form className="modal-content" method="POST" onSubmit={this.handleSubmit}>
					<h4 className="header2">
						Edit Item
					</h4>

					<FieldWrapper Label="Name">
						<input placeholder="Name of bucketlist item" type="text" name="name" id="item_name" className="validate" onChange={this.handleChange}/>
					</FieldWrapper>			

					<FieldWrapper extraz="right">
						<button className="btn" type='submit'>Edit</button>
					</FieldWrapper>
				</form>
			</div>
        )
    }
}

export default EditItem;