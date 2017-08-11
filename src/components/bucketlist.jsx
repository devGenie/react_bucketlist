import React from 'react';

class Bucketlist extends React.Component{
	constructor(props){
		super(props)
		this.state={}
	}

	componentDidUpdate(){
		this.setState({
			id:this.props.data.id
		})
	}
	render(){
		return(
				<div className="col s3">
					<div className="card bk_card">
						<span className="card-title">
							{this.props.data.name}
						</span>

						<div className="card-content">
							{this.props.data.description}
						</div>
					</div>
				</div>
			)
	}
}

export default Bucketlist;