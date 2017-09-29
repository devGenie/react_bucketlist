import React from 'react';
import { mount, shallow } from 'enzyme';
import { stub, spy } from 'sinon';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import 'should';
import 'should-enzyme';
import localStorageMock from '../__mocks__/localStorage';
import bucketlistmock from '../__mocks__/bucketlists-mock';
import BucketList from '../components/bucketlist'
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon)
window.sessionStorage = localStorageMock;

describe("<Bucketlist />",()=>{
	let bucketlistitems;
	let doneFunction;
	let editFuncion;
	let deleteFunction;
	let editFunc;
	let fetchMock;
	let bucketlist;

	beforeEach(()=>{
		//editFunc = stub();
		fetchMock = stub(window,'fetch').returnsPromise().resolves({status:'success'});
		//doneFunction=spy(BucketListItem.prototype,'handleDone');
		//editFuncion=spy(BucketListItem.prototype,'handleEdit');
		deleteFunction = spy(BucketList.prototype,'handleItemDelete');
	 	bucketlist = mount(<BucketList data={{id:1,name:'bucketlist',description:'bucketlist'}}
	 						/>).setState({items:[{id:1,name:'Bucket1',
	 								   			complete_status:true,
	 								   			date_completed:'mm/yy'}]}).update();
	})

	afterEach(()=>{
		fetchMock.restore()
		deleteFunction.restore()
	})

	it("renders correctly",()=>{
		expect(toJson(bucketlist)).toMatchSnapshot();
	});

	it('renders items',()=>{
		//console.log(bucketlist.debug())
		expect(bucketlist.find('li').find('.items')).toHaveLength(1)
	});
})