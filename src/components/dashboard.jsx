import React from 'react';
import Topnav from './topnav';
import BucketList from './bucketlist';
import BucketListForm from './bucketlist-form';
import ItemForm from './item-form';

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
					{this.props.data.map((dataPoint)=>{
						return <BucketList data={dataPoint} formCallback={this.props.formCallback}/>
					})}
				</div>
			)
	}
}

class DashBoard extends React.Component{
	constructor(props){
		super(props)
		this.state={bucketlists:[]}
		this.caller=''
		this.caller_func=''
		this.bucketlistHandler=this.bucketlistHandler.bind(this)
		this.handleItemFormCall=this.handleItemFormCall.bind(this)
		this.handleFetchCaller=this.handleFetchCaller.bind(this)
		this.onComplete=this.onComplete.bind(this)
	}

	componentDidMount(){
		fetch("https://bucketapi.herokuapp.com/api/v1/bucketlists/",
			   {headers:{
			   		Authorization:sessionStorage.getItem('auth')
			   },
			   "method":"GET"}
		).then((response)=>response.json())
		.then((jsonResponse)=>{
			var res=JSON.stringify(jsonResponse);
			if(jsonResponse.status=='success'){
				this.setState({
					bucketlists:jsonResponse.data
				});
			}
			else{
				alert(jsonResponse.message);
			}
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

	handleItemFormCall(bucketlist,caller_func){
		this.caller=bucketlist
		this.caller_func=caller_func
	}

	handleFetchCaller(){
		return this.caller
	}

	render(){
		return(
				<div>
					<Topnav/>
					<div className='container'>
						<div className="row" id="bklist_controller">
							<AddButton/>
						</div>

						<BucketLists data={this.state.bucketlists} formCallback={this.handleItemFormCall}/>
					</div>
					<BucketListForm handler={this.bucketlistHandler}/>
					<ItemForm caller={this.handleFetchCaller} onComplete={this.onComplete}/>
				</div>
			)}
}

export default DashBoard;