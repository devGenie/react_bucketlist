import React from 'react';

class FieldWrapper extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (<div className={`input-field ${this.props.extraz? this.props.extraz:" "}`}>
					{this.props.children}
					<label>{this.props.Label}</label>
				</div>
			)
	}
}

export default FieldWrapper;