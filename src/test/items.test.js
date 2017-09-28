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
import BucketListItem from '../components/bucketlist-item';
import BucketList from '../components/bucketlist'

import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon)
window.sessionStorage = localStorageMock;

describe("<BucketListItems/>",()=>{
	let item={id:1,name:'Bucket1',complete_status:true,date_completed:'mm/yy'};
	let bucketlistitems;
	let editFunction;
	let editFunc;
	let bucketlist;

	beforeEach(()=>{
		editFunc = stub().returns(true);
		bucketlist=BucketList.instance;
		bucketlistitems = mount(<BucketListItems editFunc={editFunc}
	 										   data={[item]}/>);
	})

	afterEach(()=>{
		//editFunc.restore();
	})
	
	 it("can render successfully",()=>{
	 	expect(toJson(bucketlistitems)).toMatchSnapshot()
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
