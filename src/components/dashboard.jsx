import React from 'react';
import Topnav from './topnav';
import BucketList from './bucketlist';
import BucketListForm from './bucketlist-form';

class AddButton extends React.Component{
	render(){
		return(
				<div className="col s2">
					<button className="waves-effect waves-light btn" data-target="activityModal">Add Activity</button>
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
						return <BucketList data={dataPoint}/>
					})}
				</div>
			)
	}
}

class DashBoard extends React.Component{
	constructor(props){
		super(props)
		this.state={bucketlists:[]}
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

	render(){
		return(
				<div>
					<Topnav/>
					<div className='container'>
						<div className="row" id="bklist_controller">
							<AddButton/>
						</div>

						<BucketLists data={this.state.bucketlists}/>
					</div>
					<BucketListForm/>
				</div>
			)}
}

export default DashBoard;