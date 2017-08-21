import React from 'react';

class Spinner extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			    <div className={"spinner-layer spinner-"+this.props.color}>
			        <div className="circle-clipper left">
			          <div className="circle"></div>
			        </div><div className="gap-patch">
			          <div className="circle"></div>
			        </div><div className="circle-clipper right">
			          <div className="circle"></div>
			        </div>
			    </div>
			 )
	}
}

class Spinners extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className={'center loader '+this.props.status}>
				<div className={"preloader-wrapper big active"}>
				      <Spinner color='red'/>
				      <Spinner color='blue'/>
				      <Spinner color='green'/>
				</div>
				<div className='loading_summon'>Loading!</div>
			</div>
			 )
	}
}

export default Spinners;