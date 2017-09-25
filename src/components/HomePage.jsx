import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


class Note extends React.Component{
	render(){
		return(
				<p className="note translucent center white col s12">
						{this.props.children}
				</p>
			)}
}

class Fliper extends React.Component{
	render(){
		return(
				<div className="col s12 center">
					<button className="btn flip_me">
						{this.props.children}
					</button>
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
					
					<div id="forms" className="row">
						<div className="flipper">
							<div id="loginForm_area">
								<LoginForm />
								<Note>
									Don't have an account?
								</Note>

								<Fliper>
									Register
								</Fliper>
							</div>

							<div id="registerForm_area">
								<RegisterForm />
								<Note>
									Already have an account?
								</Note>

								<Fliper>
									Login
								</Fliper>
							</div>

						</div>
					</div>

				</div>
				);
			}
	}

export default HomeScreen;