import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount } from 'enzyme';
import {stub, spy} from 'sinon';
import sinon from 'sinon';
import 'should';
import 'should-enzyme';
import toJson from 'enzyme-to-json';
import sinonStubPromise from 'sinon-stub-promise';

import BucketlistForm from '../components/bucketlist-form';
import localStorageMock from '../__mocks__/localStorage';

sinonStubPromise(sinon)
window.sessionStorage = localStorageMock;

describe('<BucketlistForm/>',()=>{
	let formMount;
	let fetchMock;
	let changeSpy;
	let submitSpy;

	beforeEach(()=>{
		fetchMock = stub(window,'fetch').returnsPromise().resolves({status:'success'});
		changeSpy = spy(BucketlistForm.prototype,'handleChange');
		submitSpy = spy(BucketlistForm.prototype,'handleSubmit');
		formMount = mount(<BucketlistForm />);
	});

	afterEach(()=>{
		fetchMock.restore();
		changeSpy.restore();
		submitSpy.restore()
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