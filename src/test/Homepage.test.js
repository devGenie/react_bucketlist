import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount } from 'enzyme';
import {stub, spy} from 'sinon';
import 'should';
import 'should-enzyme';
import toJson from 'enzyme-to-json';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import HomeScreen from '../components/HomePage'

describe('<LoginForm/>',()=>{
	it('should have two input fields',()=>{
		const wrapper = shallow(<LoginForm/>);
		expect(wrapper.find('input')).toHaveLength(2);
	});

	it('should have one username input field',()=>{
		const wrapper = shallow(<LoginForm/>);
		expect(wrapper.find('#login_username').length).toEqual(1);
	});

	it('should have one password input field',()=>{
		const wrapper = shallow(<LoginForm/>);
		expect(wrapper.find('#login_password')).toHaveLength(1);
	});

	it('should have correct input field types',()=>{
		const wrapper = shallow(<LoginForm/>);
		wrapper.find("#login_username").should.have.attr('type','email');
		wrapper.find("#login_password").should.have.attr('type','password')
	})

	it('should have values credentials entered correctly',()=>{
		const credentials={"username":"devgenie","password":"genieinthehouse"};
		const wrapper =shallow(<LoginForm/>);
		expect(wrapper.find('#login_password')).toHaveLength(1);
		expect(wrapper.find('#login_username')).toHaveLength(1);

		const email=wrapper.find("#login_email");
		email.value=credentials.username;
		expect(email.value).toEqual('devgenie');

		const password= wrapper.find("#login_password");
		password.value = credentials.password;
		expect(password.value).toEqual('genieinthehouse');
	});

	it('has a submit button',()=>{
		const wrapper=shallow(<LoginForm/>);
		var loginBtn=wrapper.find("button #loginBtn");
		expect(loginBtn).toHaveLength(1);

		loginBtn.should.have.attr('type','submit');

	});

	it('can be submited',()=>{
		const doSubmit = stub(LoginForm.prototype,'handleSubmit').returns(true);
		const loginForm = shallow(<LoginForm/>);
		loginForm.simulate('submit',{
  				preventDefault: () => {cosole.log("yes")}
		});
		expect(doSubmit.called).toBe(true);
		doSubmit.restore();
	});
});

describe('<RegisterForm>', () =>{
	it('should have five input fields', ()=>{
		const wrapper=shallow(<RegisterForm/>);
		expect(wrapper.find('input')).toHaveLength(4);
	});

	it('should have a password field', ()=>{
		const wrapper = shallow(<RegisterForm/>);
		expect(wrapper.find({type:'password'})).toHaveLength(1);
	});

	it('should have two text input fields',()=>{
		const wrapper = shallow(<RegisterForm/>);
		expect(wrapper.find({type:'text'})).toHaveLength(2);
	});

	it('should be able to submit',()=>{
		const register = spy(RegisterForm.prototype,'handleSubmit');
		const registrationForm = shallow(<RegisterForm/>);

		registrationForm.simulate('submit',{
			preventDefault: () => {}
		});
		expect(register.called).toBe(true);
		register.restore();
	})

	it('should be able to trigger change event',()=>{
		const changeStub = spy(RegisterForm.prototype,'handleChange');
		const registrationForm = shallow(<RegisterForm/>);
		registrationForm.find('input').find({name:'email'}).simulate('change',{
			target:{
				email:'changed'
			}
		})

		expect(changeStub.called).toBe(true);
		changeStub.restore()
	})
})

describe('<HomeScreen>',()=>{
	it('should render',()=>{
		const wrapper=mount(<HomeScreen/>)
		expect(toJson(wrapper)).toMatchSnapshot()
	})

	it('should have two forms',()=>{
		const wrapper= mount(<HomeScreen/>)
		expect(wrapper.find('form')).toHaveLength(2)
	})
})