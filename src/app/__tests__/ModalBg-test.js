// __tests__/ModalBg-test.js

import React, { Component } from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModalBg from './../ModalBg';

// Configure new adapter (es5)
Enzyme.configure({ adapter: new Adapter() });

test('ModalBg has a class of "paper-bg"', () => {
  // Render a modalbg with a className
  const modalbg = shallow(<ModalBg className="paper-bg" />);

  expect(modalbg.hasClass('paper-bg'));

});