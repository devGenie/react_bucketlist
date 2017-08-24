import React from 'react';
import BucketListItems from './bucketlist-items';
import ItemForm from './item-form';
import EditBucketlist from './edit-bucketlist';
import _ from 'lodash'

class Bucketlist extends React.Component{
	constructor(props){
		super(props)
		this.state={items:[],data:this.props.data}
		this.handleAddItem=this.handleAddItem.bind(this)
		this.handleEditBucketlist=this.handleEditBucketlist.bind(this)
		this.completeAction=this.completeAction.bind(this)
		this.handleItemDelete=this.handleItemDelete.bind(this)
		this.handleEditBucketlistItem=this.handleEditBucketlistItem.bind(this)
		this.handleDeleteBucketlist=this.handleDeleteBucketlist.bind(this);
		this.finalizeEditItem=this.finalizeEditItem.bind(this);
		this.finalizeEditBucketlist=this.finalizeEditBucketlist.bind(this);
		this.loadItems=this.loadItems.bind(this)
	}

	componentWillReceiveProps(newProps){
		this.setState({data:newProps.data})
		this.loadItems(newProps.data.id)
	}

	loadItems(id){
		let url ="https://bucketapi.herokuapp.com/api/v1/bucketlists/";
		let itemsUrl=url+id+"/items/";
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
				this.setState({
					items:[]
				});
			}
		})
	}

	componentDidMount(){
		this.loadItems(this.state.data.id)
	}

	completeAction(result){
		let newVar=this.state.items.slice()
		newVar.push(result)

		this.setState({items:newVar})

		console.log(this.state.items)
	}

	handleAddItem(){
		this.props.formCallback(this.props.data,this.completeAction)
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
		let bucketlistData={id:this.props.data.id,name:this.props.data.name,description:this.props.data.description}
		this.props.formCallback(bucketlistData,this.finalizeEditBucketlist);
		//this.props.bucketlistEditCallback({bucketlist:this.props.data.id,item:itemId,callBack:this.finalizeEditItem})
	}

	finalizeEditBucketlist(data){
		this.setState({data:data})
		//alert(JSON.stringify(this.state.data));
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
		let id=this.state.data.id;
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
			}
			else{
				console.log(jsonResponse.message);
			}
		})
	}

	handleEditBucketlistItem(item){
		this.props.itemEditCallback(this.state.data.id,item,this.finalizeEditItem)
	}

	render(){
		return(
				<div className="col s3">
					<div className="card bk_card">
						<div className="card-content">
							<span className="card-title">
								<div className="listtitle">
									{this.state.data.name}
									<div className="right">
										<a sclassName="secondary-content" onClick={this.handleDone}><i className="material-icons">more_vert</i></a>
										<i className="material-icons float" data-target="item_model" onClick={this.handleAddItem}>add</i>
										<i className="material-icons float" onClick={this.handleDeleteBucketlist}>delete</i>
										<i className="material-icons float" onClick={this.handleEditBucketlist} data-target="EditBucketlist">edit</i>
									</div>
								</div>
								<p className="about">{this.state.data.description}</p>
							</span>
							
							<BucketListItems data={this.state.items} bucketlist={this.state.data.id} deleteFunc={this.handleItemDelete} editFunc={this.handleEditBucketlistItem}/>
						</div>
					</div>
				</div>
			)
	}
}

export default Bucketlist;