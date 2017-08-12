import React from 'react';
import BucketListItems from './bucketlist-items';
import ItemForm from './item-form';
import _ from 'lodash'

class Bucketlist extends React.Component{
	constructor(props){
		super(props)
		this.state={items:[]}
		this.handleClick=this.handleClick.bind(this)
		this.completeAction=this.completeAction.bind(this)
		this.handleItemDelete=this.handleItemDelete.bind(this)
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

	handleItemDelete(itemId){
	_.remove(this.state.items,{
		id:itemId
	})
	var newItems=this.state.items
	this.setState({
			items:newItems
		})

	}

	render(){
		return(
				<div className="col s3">
					<div className="card bk_card">
						<div className="card-content">
							<span className="card-title">
								{this.props.data.name}
								<div className="right">
									<i className="material-icons float" data-target="item_model" onClick={this.handleClick}>add</i>
									<i className="material-icons float" data-target="item_model" onClick={this.handleClick}>delete</i>
									<i className="material-icons float" data-target="item_model" onClick={this.handleClick}>edit</i>
								</div>
							</span>

							<p>{this.props.data.description}</p>
							
							<BucketListItems data={this.state.items} bucketlist={this.props.data.id} deleteFunc={this.handleItemDelete}/>
						</div>
					</div>
				</div>
			)
	}
}

export default Bucketlist;