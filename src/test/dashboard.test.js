import React from 'react';
import { mount, shallow } from 'enzyme';
import { stub, spy } from 'sinon';
import toJson from 'enzyme-to-json';
import 'should';
import 'should-enzyme';
import localStorageMock from '../__mocks__/localStorage';
import DashBoard from '../components/dashboard';
import bucketlistmock from '../__mocks__/bucketlists-mock';
import Bucketlists from '../components/bucketlists';
import Bucketlist from '../components/bucketlist'

window.sessionStorage = localStorageMock;

describe('<DashBoard>', () => {
  let mountStab;
  beforeEach(()=>{
    mountStab=stub(DashBoard.prototype, 'componentDidMount').returns(true);
  });

  afterEach(()=>{
    mountStab.restore()
  })

  it('calls componentDidMount', () => {
      //stub(DashBoard.prototype, 'componentDidMount').returns(true);
      const wrapper=mount(<DashBoard />);
      expect(DashBoard.prototype.componentDidMount.calledOnce).toBe(true);
    });

    it('renders correctly', ()=>{
      //stub(DashBoard.prototype, 'componentDidMount').returns(true);
        const wrapper=shallow(<DashBoard/>);
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders bucketlists',()=>{
      stub(Bucketlist.prototype, 'componentDidMount').returns(true);
      const wrapper=mount(<Bucketlists data={bucketlistmock['data']} />)
      expect(wrapper.find('.bucketlist')).toHaveLength(4);
    })
});