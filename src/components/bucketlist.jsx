import React from 'react';
import BucketListItems from './bucketlist-items';
import ItemForm from './item-form';
import _ from 'lodash'

class Bucketlist extends React.Component{
	constructor(props){
		super(props)
		this.state={items:[]}
		this.handleAddItem=this.handleAddItem.bind(this)
		this.handleEditBucketlist=this.handleEditBucketlist.bind(this)
		this.completeAction=this.completeAction.bind(this)
		this.handleItemDelete=this.handleItemDelete.bind(this)
		this.handleEditBucketlistItem=this.handleEditBucketlistItem.bind(this)
		this.handleDeleteBucketlist=this.handleDeleteBucketlist.bind(this);
		this.finalizeEditItem=this.finalizeEditItem.bind(this);
	}

	componentDidMount(){
		let url ="https://bucketapi.herokuapp.com/api/v1/bucketlists/";
		let itemsUrl=url+this.props.data.id+"/items/";
		fetch(itemsUrl,
			   {headers:{
			   		Authorization:sessionStorage.getItem('auth')
			   },
			   "method":"GET"}
		).then((response)=>response.json())
		.then((jsonResponse)=>{
			if(jsonResponse.status=='success'){
				this.setState({
					items:jsonResponse.data
				});
			}
			else{
				console.log(jsonResponse.message);
			}
		})
	}

	completeAction(result){
		let newVar=this.state.items.slice()
		newVar.push(result)

		this.setState({items:newVar})

		console.log(this.state.items)
	}

	handleAddItem(){
		this.props.formCallback(this.props.data.id,this.completeAction)
	}

	finalizeEditItem(data){
		let found=_.findIndex(this.state.items,["id",data.id])
		if(found!=undefined){
			let items=this.state.items;
			items[found]=data;
			this.setState({items:items})
		}
	}

	handleEditBucketlist(){
		this.props.formCallback(this.props.data.id,this.finalizeEditBucketlist);
		//this.props.bucketlistEditCallback({bucketlist:this.props.data.id,item:itemId,callBack:this.finalizeEditItem})
	}

	finalizeEditBucketlist(data){
		alert(JSON.stringify(data))
	}

	handleItemDelete(itemId){
	_.remove(this.state.items,{
		id:itemId
	})
	let newItems=this.state.items
	this.setState({
			items:newItems
		})

	}

	handleDeleteBucketlist(){
		let id=this.props.data.id;
		let url ="https://bucketapi.herokuapp.com/api/v1/bucketlists/"+id;

		fetch(url,{
			headers:{
			   		Authorization:sessionStorage.getItem('auth'),
			   },
			"method":"DELETE"}
		).then((response)=>response.json())
		.then((jsonResponse)=>{
			console.log(jsonResponse)
			if(jsonResponse.status=='success'){
				this.props.deleteHandle(id);
				console.log("yess")
			}
			else{
				console.log(jsonResponse.message);
			}
		})
	}

	handleEditBucketlistItem(item_id){
		this.props.itemEditCallback(this.props.data.id,item_id,this.finalizeEditItem)
	}

	render(){
		return(
				<div className="col s3">
					<div className="card bk_card">
						<div className="card-content">
							<span className="card-title">
								<div className="listtitle">
									{this.props.data.name}
									<div className="right">
										<a sclassName="secondary-content" onClick={this.handleDone}><i className="material-icons">more_vert</i></a>
										<i className="material-icons float" data-target="item_model" onClick={this.handleAddItem}>add</i>
										<i className="material-icons float" onClick={this.handleDeleteBucketlist}>delete</i>
										<i className="material-icons float" onClick={this.handleEditBucketlist} data-target="EditBucketlist">edit</i>
									</div>
								</div>
								<p className="about">{this.props.data.description}</p>
							</span>
							
							<BucketListItems data={this.state.items} bucketlist={this.props.data.id} deleteFunc={this.handleItemDelete} editFunc={this.handleEditBucketlistItem}/>
						</div>
					</div>
				</div>
			)
	}
}

export default Bucketlist;