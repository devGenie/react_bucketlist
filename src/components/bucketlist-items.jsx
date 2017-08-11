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
				<ul className="collection">
					{this.props.data.map((item)=>{
						return <BucketListItem data={item}/> 
					})}
				</ul>
			)
	}
}

export default BucketListItems;