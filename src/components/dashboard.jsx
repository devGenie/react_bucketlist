import React from 'react';
import Topnav from './topnav'

class AddButton extends React.Component{
	render(){
		return(
				<div className="col s2">
					<button className="waves-effect waves-light btn" data-target="activityModal">Add Activity</button>
				</div>
			)
	}
}

class DashBoard extends React.Component{
	render(){
		return(
				<div>
					<Topnav/>
					<div className='container'>
						<div className="row" id="bklist_controller">
							<AddButton/>
						</div>
					</div>
				</div>
			)}
}

export default DashBoard;