import React from 'react';
import BucketListItem from './bucketlist-item';

class BucketListItems extends React.Component{
	constructor(props){
		super(props)
		this.handleItemEdit=this.handleItemEdit.bind(this)
	}

	handleItemEdit(item_id){
		this.props.editFunc(item_id)
	}
	render(){
		if(this.props.data.length>0){
			return(
					<ul className="bkitems">
						{this.props.data.map((item,index)=>{
							return <BucketListItem key={index} data={item} bucketlist={this.props.bucketlist} itemIndex={index} onEdit={this.props.editFunc} onDelete={this.props.deleteFunc}/> 
						})}
					</ul>
				)
		}else{
			return(<ul className="bkitems">
						<img src="../images/empty.png" className="empty-bucketlist"/>
					</ul>
				 )
		}
	}
}
export default BucketListItems;