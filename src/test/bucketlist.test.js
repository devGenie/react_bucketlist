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
	let addFunction;
	let editFuncion;
	let deleteFunction;
	let editFunc;
	let fetchMock;
	let bucketlist;
	let editStub;

	beforeEach(()=>{
		//editFunc = stub();
		editStub=stub();
		fetchMock = stub(window,'fetch').returnsPromise().resolves({status:'success'});
		//doneFunction=spy(BucketListItem.prototype,'handleDone');
		//editFuncion=spy(BucketListItem.prototype,'handleEdit');
		addFunction = spy(BucketList.prototype,'handleAddItem');
		deleteFunction = spy(BucketList.prototype,'handleDeleteBucketlist');
		editFuncion = spy(BucketList.prototype,'handleEditBucketlist');
	 	bucketlist = mount(<BucketList formCallback={editStub} data={{id:1,name:'bucketlist',description:'bucketlist'}}
	 						/>).setState({items:[{id:1,name:'Bucket1',
	 								   			complete_status:true,
	 								   			date_completed:'mm/yy'}]}).update();
	})

	afterEach(()=>{
		fetchMock.restore()
		deleteFunction.restore();
		editFuncion.restore();
		addFunction.restore();
	})

	it("renders correctly",()=>{
		expect(toJson(bucketlist)).toMatchSnapshot();
	});

	it('renders items',()=>{
		//console.log(bucketlist.debug())
		expect(bucketlist.find('li').find('.items')).toHaveLength(1)
	});

	it('can be edited',()=>{
		let editButton = bucketlist.find('.editlist');
		expect(editButton).toHaveLength(1);
		editButton.simulate('click');
		expect(editFuncion.called).toBe(true)
	})

	it('can be deleted',()=>{
		let deleteButton = bucketlist.find('.deletelist');
		expect(deleteButton).toHaveLength(1);
		deleteButton.simulate('click');
		expect(deleteFunction.called).toBe(true)
	})

	it('can add an item',()=>{
		let addButton = bucketlist.find('.addItem');
		expect(addButton).toHaveLength(1);
		addButton.simulate('click');
		expect(addFunction.called).toBe(true)
	})
})