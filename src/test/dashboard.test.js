import React from 'react';
import { mount, shallow } from 'enzyme';
import { stub, spy } from 'sinon';
import toJson from 'enzyme-to-json';
import 'should';
import 'should-enzyme';
import fetchMock from 'fetch-mock';
import localStorageMock from '../__mocks__/localStorage';
import DashBoard from '../components/dashboard';
import bucketlistmock from '../__mocks__/bucketlists-mock';
import Bucketlists from '../components/bucketlists';

window.sessionStorage = localStorageMock;

describe('<DashBoard>', () => {
  it('calls componentDidMount', () => {
      spy(DashBoard.prototype, 'componentDidMount');
      const wrapper=mount(<DashBoard />);
      expect(DashBoard.prototype.componentDidMount.calledOnce).toBe(true);
    });

    it('renders bucketlists',()=>{
      const wrapper=mount(<Bucketlists data={bucketlistmock['data']} />)
      expect(wrapper.find('.bucketlist')).toHaveLength(4);
    })

    it('renders correctly', ()=>{
        const wrapper=shallow(<DashBoard/>);
        expect(toJson(wrapper)).toMatchSnapshot()
    })
});