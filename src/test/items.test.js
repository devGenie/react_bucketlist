import React from 'react';
import { mount, shallow } from 'enzyme';
import { stub, spy } from 'sinon';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import 'should';
import 'should-enzyme';
import localStorageMock from '../__mocks__/localStorage';
import bucketlistmock from '../__mocks__/bucketlists-mock';
import BucketListItems from '../components/bucketlist-items';
import BucketListItem from '../components/bucketlist-item'
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon)
window.sessionStorage = localStorageMock;

describe("<BucketListItems/>",()=>{
	let itemdata={id:1,name:'Bucket1',complete_status:true,date_completed:'mm/yy'};
	let bucketlistitems;
	let doneFunction;
	let editFunc;
	let fetchMock;
	let item;

	beforeEach(()=>{
		editFunc = stub();
		fetchMock = stub(window,'fetch').returnsPromise().resolves({});
		doneFunction=spy(BucketListItem.prototype,'handleDone');
		bucketlistitems = mount(<BucketListItems editFunc={editFunc}
	 										   data={[itemdata]}/>);
	 	item = mount(<BucketListItem data={itemdata}/>);
	})

	afterEach(()=>{
		fetchMock.restore();
		doneFunction.restore();
	})
	
	 it("can render successfully",()=>{
	 	expect(toJson(bucketlistitems)).toMatchSnapshot()
	 })

	 it("item can render successfully",()=>{
	 	expect(toJson(bucketlistitems)).toMatchSnapshot()
	 })

	 it("handle item can be done",()=>{
	 	let done = bucketlistitems.find('.items').find('.completeButton').simulate('click');
	 	expect(doneFunction.called).toBe(true)
	 })

	 it("can call editFunc prop",()=>{
	 	bucketlistitems.find('.items').find('.editButton').simulate('click');
	 	console.log(bucketlistitems.find('.items').find('.editButton').length)
	 	expect(editFunc.called).toBe(true)
	 })

	 it("Renders items",()=>{
	 	expect(bucketlistitems.find('.items')).toHaveLength(1);
	 })
});
