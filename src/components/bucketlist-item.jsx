import React from 'react';

class BucketListItem extends React.Component{
	render(){
		return(
				<li className="collection-item">
					<div>
				      <span className="title">{this.props.data.name}</span>
				      <a href="#!" className="secondary-content"><i className="material-icons">delete</i></a>
				      <a href="#!" className="secondary-content"><i className="material-icons">edit</i></a>
				      <a href="#!" className="secondary-content"><i className="material-icons">done</i></a>
				     </div>
				   </li>
			)
	}
}

export default BucketListItem;