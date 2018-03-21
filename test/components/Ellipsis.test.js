import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { mockClasses } from 'nordnet-ui-kit';
import { Component as Ellipsis, styles } from '../../src/components/Ellipsis';

const intlProvider = new IntlProvider({ locale: 'sv-SE' }, {});
const { intl } = intlProvider.getChildContext();

const defaultProps = {
  classes: mockClasses(styles),
  intl,
};

const shallowComponent = () => shallow(<Ellipsis {...defaultProps} />);

test('Ellipsis renders', (t) => {
  const wrapper = shallowComponent({});
  const actual = wrapper.exists();
  t.true(actual);
});
