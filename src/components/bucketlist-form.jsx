import React from 'react';
import FieldWrapper from './FieldWrapper';

class BucketlistForm extends React.Component{
	render(){
		return(
			<form className="modal" id="activityModal">
				<h4 className="modal-header center">
					Add Activity
				</h4>

				<div className="modal-content">
					<FieldWrapper Label="email">
						<input type="text" name="name" id="name" className="validate" />			
					</FieldWrapper>

					<FieldWrapper Label="story">
						<textarea name="story"></textarea>
					</FieldWrapper>

					<FieldWrapper extraz="center">
						<button className="btn">Add</button>
					</FieldWrapper>
				</div>
			</form>
			)}
}

export default BucketlistForm;