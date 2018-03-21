import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { mockClasses } from 'nordnet-ui-kit';
import { IntlProvider } from 'react-intl';
import { Component as Interaction, styles } from '../../src/components/Interaction';

const intlProvider = new IntlProvider({ locale: 'sv-SE' }, {});
const { intl } = intlProvider.getChildContext();

const defaultProps = {
  classes: mockClasses(styles),
  intl,
};

const shallowComponent = props => shallow(<Interaction {...defaultProps} {...props} />);

test('Interaction renders', (t) => {
  const wrapper = shallowComponent({});
  const actual = wrapper.exists();
  t.true(actual);
});

test('onKeyPress fires', (t) => {
  const spy = sinon.spy();
  const wrapper = shallowComponent({ ...defaultProps, onKeyPress: spy });
  wrapper.find('.textarea').simulate('keyPress', {});
  t.true(spy.called);
});
