import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {stub} from 'sinon';
import 'should';
import 'should-enzyme';

import LoginForm from '../components/LoginForm';

describe('<LoginForm/>',()=>{
	it('should have two input fields',()=>{
		const wrapper = shallow(<LoginForm/>);
		expect(wrapper.find('input')).to.have.length(2);
	});

	it('should have one username input field',()=>{
		const wrapper = shallow(<LoginForm/>);
		expect(wrapper.find('#login_username').length).equal(1);
	});

	it('should have one password input field',()=>{
		const wrapper = shallow(<LoginForm/>);
		expect(wrapper.find('#login_password')).to.have.length(1);
	});

	it('should have correct input field types',()=>{
		const wrapper = shallow(<LoginForm/>);
		wrapper.find("#login_username").should.have.attr('type','text');
		wrapper.find("#login_password").should.have.attr('type','password')
	})

	it('should have values credentials entered correctly',()=>{
		const credentials={"username":"devgenie","password":"genieinthehouse"};
		const wrapper =shallow(<LoginForm/>);
		expect(wrapper.find('#login_password')).to.have.length(1);
		expect(wrapper.find('#login_username')).to.have.length(1);

		const email=wrapper.find("#login_email");
		email.value=credentials.username;
		expect(email.value).to.equal('devgenie');

		const password= wrapper.find("#login_password");
		password.value = credentials.password;
		expect(password.value).to.equal('genieinthehouse');
	});

	it('has a submit button',()=>{
		const wrapper=shallow(<LoginForm/>);
		var loginBtn=wrapper.find("button #loginBtn");
		expect(loginBtn).to.have.length(1);

		loginBtn.should.have.attr('type','submit');

	})
});

/*import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});*/
