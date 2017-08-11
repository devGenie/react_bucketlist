import React from 'react';

class Topnav extends React.Component{
	render(){
		return(
				<div className="navbar-fixed">
						<nav>
							<div className="nav-wrapper">
								<div className="container">
									<a href="#" className="brand-logo">BucketlistFairy</a>
									<ul id="topNave" className="right hide-on-med-and-down">
										{this.props.children}
									</ul>
								</div>
							</div>
						</nav>
					</div>
			)
	}
}

export default Topnav;