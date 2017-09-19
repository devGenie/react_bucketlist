import React from 'react';
import Topnav from './topnav';
import BucketList from './bucketlist';
import BucketListForm from './bucketlist-form';
import ItemForm from './item-form';
import EditItem from './edit-item';
import EditBucketlist from './edit-bucketlist';
import Spinner from './notifications/spinner';
import ViewResult from './view-result';
import _ from 'lodash';


class AddButton extends React.Component{
	render(){
		return(
				<div className="fixed-action-btn horizontal" data-target="activityModal">
    				<a className="btn-floating btn-large red">
      					<i className="large material-icons">add</i>
    				</a>
    			</div>
			)
	}
}

class BucketLists extends React.Component{
	constructor(props){
		super(props)
	}

	componentDidUpdate(){
		console.log(this.props.data)
	}

	render(){
		return(
				<div className='row'>
					{this.props.data.map((dataPoint,index)=>{
						console.log(dataPoint)
						return <BucketList key={index} data={dataPoint} formCallback={this.props.formCallback} deleteHandle={this.props.handleDelete} itemEditCallback={this.props.itemEditCallback}/>
					})}
				</div>
			)
	}
}

class DashBoard extends React.Component{
	constructor(props){
		super(props)
		this.state={spinner:'show',bucketlists:[],
					editedItem:{bucketlist:'',item:{id:'',name:''},callback:''},
					editedBucketlist:{name:'',description:''},
					view:{id:'',name:'',description:''}
				}
				
		this.caller=''
		this.caller_func=''
		this.handleItemEdit=this.handleItemEdit.bind(this)
		this.bucketlistHandler=this.bucketlistHandler.bind(this)
		this.registerCaller=this.registerCaller.bind(this)
		this.handleFetchCaller=this.handleFetchCaller.bind(this)
		this.onComplete=this.onComplete.bind(this)
		this.viewBucketList=this.viewBucketList.bind(this)
		this.updateOnDelete=this.updateOnDelete.bind(this)
	}

	viewBucketList(data){
		this.setState({view:data})
	}

	componentDidMount(){
		this.setState({spinner:'show'})
		fetch("https://bucketapi.herokuapp.com/api/v1/bucketlists/",
			   {headers:{
			   		Authorization:sessionStorage.getItem('auth')
			   },
			   "method":"GET"}
		).then((response)=>response.json())
		.then((jsonResponse)=>{
			let res=JSON.stringify(jsonResponse);
			if(jsonResponse.status=='success'){
				this.setState({
					bucketlists:jsonResponse.data
				});
			}
			else{
				//alert(jsonResponse.message);
			}
			this.setState({spinner:'hide'})
		})
	}

	bucketlistHandler(bucketlist){
		this.setState({
			bucketlist:this.state.bucketlists.push(bucketlist)
		})
	}

	onComplete(data){
		this.caller_func(data)
	}

	registerCaller(bucketlist,caller_func){
		this.caller=bucketlist.id
		this.setState({
			editedBucketlist:{name:bucketlist.name,description:bucketlist.description}})
		this.caller_func=caller_func
	}

	handleFetchCaller(){
		return this.caller
	}


	handleItemEdit(bucketlist_id,item,callback){
		this.caller=bucketlist_id
		this.caller_func=callback;
		this.setState({
			editedItem:{bucketlist:bucketlist_id,item:item,callback:callback}
		})
	}

	updateOnDelete(deleted){
		_.remove(this.state.bucketlists,{
			id: deleted
		});

		let newBucketlists=this.state.bucketlists;

		this.setState({
			bucketlists:newBucketlists
		})
	}

	render(){
		return(
				<div>
					<Topnav viewSearch={this.viewBucketList}/>
					<div className='container'>
						<div className="row" id="bklist_controller">
							<AddButton/>
						</div>
						<Spinner status={this.state.spinner}/>
						<BucketLists data={this.state.bucketlists} 
									 itemEditCallback={this.handleItemEdit} 
									 formCallback={this.registerCaller} 
									 handleDelete={this.updateOnDelete}
						/>
					</div>
					<BucketListForm handler={this.bucketlistHandler}/>
					<ItemForm caller={this.handleFetchCaller} onComplete={this.onComplete}/>
					<EditBucketlist caller={this.handleFetchCaller} onComplete={this.onComplete} editing={this.state.editedBucketlist}/>
					<EditItem caller={this.state.editedItem}/>
					<ViewResult result={this.state.view}
								formCallback={this.registerCaller} 
								deleteHandle={this.updateOnDelete} 
								itemEditCallback={this.handleItemEdit}/>

				</div>
			)}
}

export default DashBoard;