import React from 'react';
import BucketListItem from './bucketlist-item';

class BucketListItems extends React.Component{
	constructor(props){
		super(props)
		this.handleItemEdit=this.handleItemEdit.bind(this)
	}

	componentWillReceiveProps(pp){
	}

	handleItemEdit(item_id){
		this.props.editFunc(item_id)
	}
	render(){
		return(
				<ul className="bkitems">
					{this.props.data.map((item,index)=>{
						return <BucketListItem data={item} bucketlist={this.props.bucketlist} itemIndex={index} onEdit={this.props.editFunc} onDelete={this.props.deleteFunc}/> 
					})}
				</ul>
			)
	}
}

export default BucketListItems;