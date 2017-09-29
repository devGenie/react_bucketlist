import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount } from 'enzyme';
import {stub, spy} from 'sinon';
import sinon from 'sinon';
import 'should';
import 'should-enzyme';
import toJson from 'enzyme-to-json';
import sinonStubPromise from 'sinon-stub-promise';

import EditItem from '../components/edit-item';
import DashBoard from '../components/dashboard';
import localStorageMock from '../__mocks__/localStorage';

sinonStubPromise(sinon)
window.sessionStorage = localStorageMock;

describe('<BucketlistForm/>',()=>{
	let formMount;
	let fetchMock;
	let changeSpy;
	let submitSpy;
	let caller;

	beforeEach(()=>{
		fetchMock = stub(window,'fetch').returnsPromise().resolves({status:'success'});
		caller = spy(DashBoard.prototype,'handleFetchCaller');
		changeSpy = spy(EditItem.prototype,'handleChange');
		submitSpy = spy(EditItem.prototype,'handleSubmit');
		formMount = mount(<EditItem caller={{bucketlist:'1',item:{id:'1',name:'one'},callback:''}}/>);
	});

	afterEach(()=>{
		fetchMock.restore();
		changeSpy.restore();
		submitSpy.restore();
		caller.restore();
	});

	it('can render correctly',()=>{
		expect(toJson(formMount)).toMatchSnapshot()
	});

	it('can submit data',()=>{
		formMount.find('form').simulate('submit',{
			preventDefault:()=>{}
		});
		expect(submitSpy.called).toBe(true)
	});

	it('can handle change event',()=>{
		formMount.find('form').find({name:'name'}).simulate('change',{
			target:{
				value:'changed'
			}
		});
		expect(changeSpy.called).toBe(true)
	})

	
})