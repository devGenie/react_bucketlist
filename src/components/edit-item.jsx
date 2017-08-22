import React from 'react';
import FieldWrapper from './FieldWrapper';

class EditItem extends React.Component{
	constructor(props){
		super(props)
		this.state={bucketlist:this.props.caller.bucketlist,
					item:this.props.caller.item.id,
					name:this.props.caller.item.name,
					callback:this.props.caller.callback}
		this.handleSubmit=this.handleSubmit.bind(this)
		this.handleChange=this.handleChange.bind(this)
	}

	componentWillReceiveProps(newProps){
		this.setState({name:newProps.caller.item.name,
					   id:newProps.caller.item.id,
					   bucketlist:newProps.caller.bucketlist,
					   callback:newProps.caller.callback
					})
	}

	handleSubmit(event){
		event.preventDefault();
		alert(JSON.stringify(this.state))
		let url ="https://bucketapi.herokuapp.com/api/v1/bucketlists/";
		let itemsUrl=url+this.state.bucketlist+"/items/"+this.state.id;
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
				this.state.callback(jsonResponse.data)
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
						<input value={this.state.name} placeholder="Name of bucketlist item" type="text" name="name" id="item_name" className="validate" onChange={this.handleChange}/>
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