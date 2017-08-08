import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';

import LoginForm from '../components/LoginForm';

describe('<LoginForm/>',()=>{
	it('should have two input fields',()=>{
		const wrapper = shallow(<LoginForm/>);
		expect(wrapper.find('input')).to.have.length(2);
	});
	it('should have one username input field',()=>{
		const wrapper = shallow(<LoginForm/>);
		expect(wrapper.find('#login_username')).to.have.length(1);
	});

	it('should have one password input field',()=>{
		const wrapper = shallow(<LoginForm/>);
		expect(wrapper.find('$login_password')).to.have.length(1);
	})

	it('should have values credentials entered correctly',()=>{
		const credentials={"username":"devgenie","password":"genieinthehouse"};
		const wrapper =shallow(<LoginForm/>);
		expect(wrapper.find('#login_password')).to.have.length(1);
		expect(wrapper.find('#login_email')).to.have.length(1);

		const email=wrapper.find("#login_email");
		email.value=credentials.username;
		expect(email.value).toBe('devgenie');

		const password= wrapper.find("#login_password");
		password.value = credentials.password;
		expect(password.value).toBe('genieinthehouse');
	});
});

/*import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});*/
