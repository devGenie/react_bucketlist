import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Topnav from './topnav';

class Carousel extends React.Component{
	render(){
		return(
				<div className="carousel carousel-slider center">
					{this.props.imageUrl.map((image) => {
						console.log(image)
						return (<div className="carousel-item genie-carousel-item" href="#one!">
		      						<img src={`images/${image}.jpg`}/>
		    					</div>)
							}
						)
					}
				</div>
			)
	}
}

class HomeScreen extends React.Component{
	constructor(props){
		super(props);
		this.imageUrls=['1','2','3'];
	}
	render(){
		return (
				<div className="genie-carousel">
					
					<Topnav/>

					<div id="forms" className="row">
						<div className="flipper">
							<div id="loginForm_area">
								<LoginForm />
							</div>

							<div id="registerForm_area">
								<RegisterForm />
							</div>

						</div>
					</div>

					<Carousel imageUrl = {this.imageUrls} />
				</div>
				);
			}
	}

export default HomeScreen;