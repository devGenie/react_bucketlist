import React from 'react';
import Search from './search';

class Topnav extends React.Component{
	render(){
		return(
				<div className="navbar-fixed">
						<nav>
							<div className="nav-wrapper">
								<div className="container">
									<a href="#" className="brand-logo">Bucketlist Fairy</a>
									<ul id="topNave" className="right hide-on-med-and-down">
										<Search viewSearch={this.props.viewSearch}/>
									</ul>
								</div>
							</div>
						</nav>
					</div>
			)
	}
}
export default Topnav;