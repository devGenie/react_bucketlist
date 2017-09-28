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
	const formMount;

	beforeEach(()=>{
		form=mount(<BucketlistForm />)
	});

	it('can render correctly',()=>{
		expect(toJson(formMount)).toMatchSnapshot()
	});
})