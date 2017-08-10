import React from 'react';

class FieldWrapper extends React.Component{
	render(){
		return (<div className={`input-field col s12 ${this.props.extraz? this.props.extraz:" "}`}>
					{this.props.children}
					<label>{this.props.Label}</label>
				</div>
			)
	}
}

export default FieldWrapper;