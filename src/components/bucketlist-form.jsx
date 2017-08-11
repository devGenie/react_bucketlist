import React from 'react';
import FieldWrapper from './FieldWrapper';

class BucketlistForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			description:''
		}
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	handleChange(event){
		var target=event.target;
		var name=target.name;
		var value=target.value;

		this.setState({
			[name]:value
		})
	}

	handleSubmit(event){
		event.preventDefault()
	}
	render(){
		return(
			<form className="modal" id="activityModal" onSubmit={this.handleSubmit}>
				<h4 className="modal-header center">
					New Bucketlist
				</h4>

				<div className="modal-content">
					<FieldWrapper Label="Name">
						<input type="text" name="name" id="name" className="validate" onChange={this.handleChange}/>			
					</FieldWrapper>

					<FieldWrapper Label="story">
						<textarea name="description" onChange={this.handleChange}></textarea>
					</FieldWrapper>

					<FieldWrapper extraz="center">
						<button className="btn">Add</button>
					</FieldWrapper>
				</div>
			</form>
			)}
}

export default BucketlistForm;