import React from 'react';
import Topnav from './topnav';
import BucketListForm from './bucketlist-form';
import ItemForm from './item-form';
import EditItem from './edit-item';
import EditBucketlist from './edit-bucketlist';
import Spinner from './notifications/spinner';
import BucketLists from './bucketlists';
import ChangePassword from './change-password';
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



class DashBoard extends React.Component{
	constructor(props){
		super(props)
		this.state={spinner:'show',bucketlists:[],
					pages:0,
					editedItem:{bucketlist:'',item:{id:'',name:''},callback:''},
					editedBucketlist:{name:'',description:''},
					view:{id:'',name:'',description:''}
				}

		this.logout=this.logout.bind(this)		
		this.caller=''
		this.caller_func=''
		this.handleItemEdit=this.handleItemEdit.bind(this)
		this.bucketlistHandler=this.bucketlistHandler.bind(this)
		this.registerCaller=this.registerCaller.bind(this)
		this.handleFetchCaller=this.handleFetchCaller.bind(this)
		this.onComplete=this.onComplete.bind(this)
		this.searchResults=this.searchResults.bind(this)
		this.updateOnDelete=this.updateOnDelete.bind(this)
		this.loadData=this.loadData.bind(this)
		this.loadPage=this.loadPage.bind(this)
	}

	viewBucketList(data){
		this.setState({view:data})
	}

	componentDidMount(){
		this.loadData()
	}

	loadPage(page){
		this.loadData(page)
	}

	loadData(page=1){
		this.setState({spinner:'show'})
		fetch("https://bucketapi.herokuapp.com/api/v1/bucketlists/?page="+page+"&pagesize=8",
			   {headers:{
			   		Authorization:sessionStorage.getItem('auth')
			   },
			   "method":"GET"}
		).then((response)=>response.json())
		.then((jsonResponse)=>{
			if(jsonResponse.status==='success'){
				console.log("pages"+jsonResponse.pages)
				this.setState({
					bucketlists:jsonResponse.data,
					pages:jsonResponse.pages
				});
			}
			else{
				//alert(jsonResponse.message);
			}
			this.setState({spinner:'hide'})
		})
	}

	searchResults(bucketlists){
		if(bucketlists.length>0){
			this.setState({
			bucketlists:bucketlists
			})
		}
	}

	bucketlistHandler(bucketlist){
		if(this.state.bucketlists.length<8){
			this.setState({
			bucketlist:this.state.bucketlists.push(bucketlist)
		})
		}
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

	logout(){

		fetch("https://bucketapi.herokuapp.com/api/v1/auth/logout",
			   {headers:{
			   		Authorization:sessionStorage.getItem('auth')
			   },
			   "method":"GET"}
		).then((response)=>response.json())
		.then((jsonResponse)=>{
			if(jsonResponse.status==='success'){
				sessionStorage.setItem('auth',false);
				sessionStorage.setItem('isAuthenticated',true);
				window.location='/'
			}
			else{
				//alert(jsonResponse.message);
			}
			this.setState({spinner:'hide'})
		})
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
					<Topnav searchResults={this.searchResults} logout={this.logout}/>
					<div className='container'>
						<div className="row" id="bklist_controller">
							<AddButton/>
						</div>
						<Spinner status={this.state.spinner}/>
						<BucketLists data={this.state.bucketlists}
									 pages={this.state.pages} 
									 itemEditCallback={this.handleItemEdit} 
									 formCallback={this.registerCaller} 
									 handleDelete={this.updateOnDelete}
									 load={this.loadPage}
						/>
					</div>
					<BucketListForm handler={this.bucketlistHandler}/>
					<ItemForm caller={this.handleFetchCaller} onComplete={this.onComplete}/>
					<EditBucketlist caller={this.handleFetchCaller} onComplete={this.onComplete} editing={this.state.editedBucketlist}/>
					<EditItem caller={this.state.editedItem}/>
					<ChangePassword />
				</div>
			)}
}

export default DashBoard;