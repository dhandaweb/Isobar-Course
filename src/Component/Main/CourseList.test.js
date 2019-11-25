import {shallow, configure} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import CourseList from './CourseList';
configure({adapter: new Adapter()});
describe("CourseList", () => {
    it("should render my component", () => {
      const wrapper = shallow(<CourseList />);
      expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('Should render a <Modal /> component', () => {
        const wrapper = shallow(<CourseList />);
        expect(wrapper.find('Modal').length).toEqual(0);
      });
      it('Show Modal popup', () => {
        const wrapper = shallow(<CourseList />);       
          const instance = wrapper.instance();
          instance.showModal();
        expect(wrapper.state('show')).toEqual(true);
        expect(wrapper.find('Modal').length).toEqual(1);
      });
      it('Hide Modal popup', () => {
        const wrapper = shallow(<CourseList />);       
          const instance = wrapper.instance();
          instance.hideModal();
        expect(wrapper.state('show')).toEqual(false);
        expect(wrapper.find('Modal').length).toEqual(0);
      });
      it('Hide Modal popup when already Logged In', () => {
        const wrapper = shallow(<CourseList />);       
        wrapper.setState({ LoggedIn: true });
        const instance = wrapper.instance();
        instance.hideModal();     
        expect(wrapper.state('LoggedIn')).toEqual(true);
        expect(wrapper.find('Modal').length).toEqual(0);
      });
      it('Show Modal popup when user is not Logged In', () => {
        const wrapper = shallow(<CourseList />);  
        const instance = wrapper.instance();
        instance.showModal();     
        wrapper.setState({ LoggedIn: false });
        expect(wrapper.state('LoggedIn')).toEqual(false);
        expect(wrapper.find('Modal').length).toEqual(1);
      });
  });