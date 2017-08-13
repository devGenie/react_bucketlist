import React from 'react';

class BucketListItem extends React.Component{
	constructor(props){
		super(props)
		this.handleDelete=this.handleDelete.bind(this)
		this.handleEdit=this.handleEdit.bind(this)
		this.handleDone=this.handleDone.bind(this)
	}

	handleDelete(){
		var url ="https://bucketapi.herokuapp.com/api/v1/bucketlists/";
		var itemsUrl=url+this.props.bucketlist+"/items/"+this.props.data.id;
		fetch(itemsUrl,
			   {headers:{
			   		Authorization:sessionStorage.getItem('auth')
			   },
			   "method":"DELETE"}
		).then((response)=>response.json())
		.then((jsonResponse)=>{
			console.log(jsonResponse)
			if(jsonResponse.status=='success'){
				this.props.onDelete(this.props.data.id)
				console.log("yess")
			}
			else{
				console.log(jsonResponse.message);
			}
		})
	}

	handleEdit(){

	}

	handleDone(){

	}
	render(){
		return(
				<li className="collection-item">
					<div>
				      <span className="title">{this.props.data.name}</span>
					  <div className="right">
				      	<a className="secondary-content" onClick={this.handleDelete}><i className="material-icons">delete</i></a>
				      	<a className="secondary-content"><i className="material-icons">edit</i></a>
				      	<a sclassName="secondary-content"><i className="material-icons">done</i></a>
					  </div>
				     </div>
				   </li>
			)
	}
}

export default BucketListItem;