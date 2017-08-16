import React from 'react';
import FieldWrapper from './FieldWrapper';

class EditItem extends React.Component{
    render(){
        return(
            <form className="modal" id="item_edit_model" method="POST">
                <h4 className="modal-header center">
					Edit Item
				</h4>

				<div className="modal-content">
					<FieldWrapper Label="Name">
						<input type="text" name="name" id="item_name" className="validate" onChange={this.handleChange}/>
					</FieldWrapper>			
				</div>

				<FieldWrapper>
					<button className="btn" type='submit'>Edit</button>
				</FieldWrapper>
            </form>
        )
    }
}

export default EditItem ;