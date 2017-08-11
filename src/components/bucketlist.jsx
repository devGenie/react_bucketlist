import React from 'react';
import BucketListItems from './bucketlist-items';
import ItemForm from './item-form';

class Bucketlist extends React.Component{
	constructor(props){
		super(props)
		this.state={items:[]}
		this.handleClick=this.handleClick.bind(this)
		this.completeAction=this.completeAction.bind(this)
	}

	componentDidMount(){
		var url ="https://bucketapi.herokuapp.com/api/v1/bucketlists/";
		var itemsUrl=url+this.props.data.id+"/items/";
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
		var newVar=this.state.items.slice()
		newVar.push(result)

		this.setState({items:newVar})

		console.log(this.state.items)
	}

	handleClick(){
		this.props.formCallback(this.props.data.id,this.completeAction)
	}

	render(){
		return(
				<div className="col s3">
					<div className="card bk_card">
						<div className="card-content">
							<span className="card-title">
								{this.props.data.name}
								<i className="material-icons right" data-target="item_model" onClick={this.handleClick}>more_vert</i>
							</span>

							<p>{this.props.data.description}</p>
							
							<BucketListItems data={this.state.items}/>
						</div>
					</div>
				</div>
			)
	}
}

export default Bucketlist;