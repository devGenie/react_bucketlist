import React from 'react';
import BucketListItem from './bucketlist-item';

class BucketListItems extends React.Component{
	constructor(props){
		super(props)
	}

	componentWillReceiveProps(pp){
	}
	render(){
		return(
				<ul className="bkitems">
					{this.props.data.map((item,index)=>{
						return <BucketListItem data={item} bucketlist={this.props.bucketlist} itemIndex={index} onDelete={this.props.deleteFunc}/> 
					})}
				</ul>
			)
	}
}

export default BucketListItems;