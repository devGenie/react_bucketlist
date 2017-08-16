import React from 'react';
import FieldWrapper from './FieldWrapper';

class EditItem extends React.Component{
	constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
		this.handleChange=this.handleChange.bind(this)
	}

	handleSubmit(event){
		event.preventDefault();
		let url ="https://bucketapi.herokuapp.com/api/v1/bucketlists/";
		let itemsUrl=url+this.props.bucketlist+"/items/"+this.props.data.id;
		fetch(itemsUrl,
			   {headers:{
			   		Authorization:sessionStorage.getItem('auth')
			   },
			   "method":"PUT",
				body:JSON.stringify({
			  		"name":"genie",
				  })
			   }).then((response)=>response.json())
		.then((jsonResponse)=>{
			console.log(jsonResponse)
			if(jsonResponse.status=='success'){	
				alert(JSON.stringify(jsonResponse))
			}
			else{
				console.log(jsonResponse.message);
			}
		})
	}

	handleChange(){

	}

    render(){
        return(
            <form className="modal" id="item_edit_model" method="POST" onSubmit={this.handleSubmit}>
                <h4 className="modal-header center">
					Edit Item
				</h4>

				<div className="modal-content">
					<FieldWrapper Label="Name">
						<input type="text" name="name" id="item_name" className="validate" onChange={this.handleChange}/>
					</FieldWrapper>			
				</div>

				<FieldWrapper>
					<button className="btn" type='submit'>Edit</button>
				</FieldWrapper>
            </form>
        )
    }
}

export default EditItem ;