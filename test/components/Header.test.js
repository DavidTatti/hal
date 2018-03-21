import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { mockClasses, Avatar } from 'nordnet-ui-kit';
import { IntlProvider } from 'react-intl';
import { Component as Header, styles } from '../../src/components/Header';

const intlProvider = new IntlProvider({ locale: 'sv-SE' }, {});
const { intl } = intlProvider.getChildContext();

const defaultProps = {
  onMinimize: () => {},
  isMinimized: false,
  classes: mockClasses(styles),
  intl,
};

const shallowComponent = props => shallow(<Header {...defaultProps} {...props} />);

test('Header renders', t => {
  const wrapper = shallowComponent({});
  const actual = wrapper.exists();
  t.true(actual);
});

test('Header has an Avatar', t => {
  const wrapper = shallowComponent({});
  const avatars = wrapper.find(Avatar);
  t.is(avatars.length, 1);
});

test('Header renders minimized button when minimized', t => {
  const wrapper = shallowComponent({ isMinimized: true });
  const buttons = wrapper.find('.maxButton');
  t.is(buttons.length, 1);
});

test('Header renders maximized button when maximized', t => {
  const wrapper = shallowComponent({});
  const buttons = wrapper.find('.minButton');
  t.is(buttons.length, 1);
});

test('Header renders name of chatbot', t => {
  const wrapper = shallowComponent({});
  const name = wrapper.find('.name');
  t.is(name.text(), '');
});

test('Header renders current amount of unread messages', t => {
  const newMessages = 3;
  const wrapper = shallowComponent({ newMessages });
  const name = wrapper.find('.name');
  //  eslint-disable-next-line
  const newMessagesTest = parseInt(name.text().match(/\(([^\)]+)\)/)[1]);
  t.is(newMessagesTest, newMessages);
});

test('Header changes style on focus', t => {
  const wrapper = shallowComponent({ ...defaultProps, focus: false });
  const hasMaximizedBlurClass = wrapper.hasClass('maximizedBlur');
  wrapper.setProps({ ...defaultProps, focus: true });
  wrapper.update();
  const hasMaximizedFocusClass = wrapper.hasClass('maximizedFocus');
  t.true(hasMaximizedBlurClass);
  t.true(hasMaximizedFocusClass);
});

test('Header changes style when minimized', t => {
  const wrapper = shallowComponent({ ...defaultProps });
  const hasMaximizedBlurClass = wrapper.hasClass('maximizedBlur');
  wrapper.setProps({ ...defaultProps, isMinimized: true });
  wrapper.update();
  const hasMinButtonClass = wrapper.hasClass('minimized');
  t.true(hasMaximizedBlurClass);
  t.true(hasMinButtonClass);
});
