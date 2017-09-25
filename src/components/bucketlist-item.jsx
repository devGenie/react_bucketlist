  import React from 'react';

class SeeMore extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className="over_flow_button">
				<a className="dropdown_toggle"><i className="material-icons">more_vert</i></a>
				<div className="overflow_content">
					{this.props.children}
				</div>
			</div>
		)
	}
}

class BucketListItem extends React.Component{
	constructor(props){
		super(props)
		this.state={completed:this.props.data.complete_status,date_completed:this.props.data.date_completed}
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
		this.props.onEdit({id:this.props.data.id,name:this.props.data.name})
	}

	handleDone(){
		var url ="https://bucketapi.herokuapp.com/api/v1/bucketlists/";
		var itemsUrl=url+this.props.bucketlist+"/items/"+this.props.data.id+"/complete";
		fetch(itemsUrl,
			   {headers:{
			   		Authorization:sessionStorage.getItem('auth')
			   },
			   "method":"PUT"}
		).then((response)=>response.json())
		.then((jsonResponse)=>{
			console.log(jsonResponse)
			if(jsonResponse.status=='success'){	
				this.setState({
					completed:true,
					date_completed:jsonResponse.data.date_completed
				})
			}
			else{
				console.log(jsonResponse.message);
			}
		})
	}
	render(){
		if(this.props.itemIndex==null){
			return(<li className="items">
					      <span className="item_name">{this.props.data.name}</span>
					</li>)
		}
		else{
			return(
				<li className="items">
				      <span className="item_name">{this.props.data.name}</span>
					  <div className="right">
						<SeeMore>
							<a className="dropdown_icon" onClick={this.handleDone}><i className="material-icons">check_box</i></a>
							<a className="dropdown_icon" onClick={this.handleEdit} data-target="item_edit_model"><i className="material-icons">edit</i></a>
							<a className="dropdown_icon" onClick={this.handleDelete}><i className="material-icons">delete</i></a>
						</SeeMore>

					  </div>
					  <span className="complete_status">
						  {this.state.completed==true? <div className="success"><span className="left">Completed</span><i className="material-icons right">check_box</i></div>:<div className="pending"><span className="left">{"Pending"}</span><i className="material-icons right">access_time</i></div>
						  }
					  </span>
				   </li>
			)
		}
	}
}

export default BucketListItem;