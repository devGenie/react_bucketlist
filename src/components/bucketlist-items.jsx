import React from 'react';
import BucketListItem from './bucketlist-item';

class BucketListItems extends React.Component{
	constructor(props){
		super(props)
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
						<BucketListItem itemIndex={null} data={{name:'Items not found, Add some',complete_status:null,date_completed:null}}/>
					</ul>)
		}
	}
}

export default BucketListItems;