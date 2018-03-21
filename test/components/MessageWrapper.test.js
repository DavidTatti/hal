import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { mockClasses } from 'nordnet-ui-kit';
import { IntlProvider } from 'react-intl';
import { Component as MessageWrapper, styles } from '../../src/components/MessageWrapper';

const intlProvider = new IntlProvider({ locale: 'sv-SE' }, {});
const { intl } = intlProvider.getChildContext();

const defaultProps = {
  classes: mockClasses(styles),
  intl,
  children: [],
};

const shallowComponent = props => shallow(<MessageWrapper {...defaultProps} {...props} />);

test('MessageWrapper renders', (t) => {
  const wrapper = shallowComponent({});
  const actual = wrapper.exists();
  t.true(actual);
});

test('MessageWrapper renders correct amount of children', (t) => {
  const props = {
    children: [
      <div key={0} />,
      <div key={1} />,
    ],
  };
  const wrapper = shallowComponent(props);
  const div = wrapper.find('.messageWrapper');
  t.true(div.contains(props.children));
});
