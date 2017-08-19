import React from 'react';

class Loading extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className={"progress "+ this.props.status}>
			      <div className="indeterminate"></div>
			</div>
		)
	}
}

export default Loading;