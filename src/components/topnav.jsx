import React from 'react';
import Search from './search';

class Topnav extends React.Component{
	render(){
		return(
				<div className="navbar-fixed">
						<nav>
							<div className="nav-wrapper">
								<div className="container">
									<a href="#" className="brand-logo col l3">Bucketlist Fairy</a>
									<ul id="topNave" className="col l9 right hide-on-med-and-down">
										<li>
											<Search className="col l6" viewSearch={this.props.viewSearch}/>
										</li>
										<li>
											one
										</li>
									</ul>
								</div>
							</div>
						</nav>
					</div>
			)
	}
}
export default Topnav;