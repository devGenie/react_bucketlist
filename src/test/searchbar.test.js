import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { stub, spy } from 'sinon';
import 'should';
import 'should-enzyme';
import toJson from 'enzyme-to-json';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon)

import Search from '../components/search';
import bucketlistmock from '../__mocks__/bucketlists-mock';
import localStorageMock from '../__mocks__/localStorage';


window.sessionStorage = localStorageMock;

describe("<Search />",()=>{
	it("Should render",()=>{
		const wrapper=shallow(<Search/>);
		expect(toJson(wrapper)).toMatchSnapshot()
	})
	it("Should have an input field",()=>{
		const wrapper=shallow(<Search/>);
		let input = wrapper.find("input");
		expect(input).toHaveLength(1)
	});

	it("Should search",()=>{
		stub(window,'fetch').returnsPromise().resolves(bucketlistmock)
		const checkSearch = spy(Search.prototype,'search');
		const wrapper=shallow(<Search />);
		let input = wrapper.find("input");
		input.simulate("change",{
			target:{
				value:'search'
			}
		})
		expect(checkSearch.called).toBe(true)
		
	})
})