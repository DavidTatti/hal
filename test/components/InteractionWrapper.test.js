import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { mockClasses } from 'nordnet-ui-kit';
import { IntlProvider } from 'react-intl';
import { Component as InteractionWrapper, styles } from '../../src/components/InteractionWrapper';

const intlProvider = new IntlProvider({ locale: 'sv-SE' }, {});
const { intl } = intlProvider.getChildContext();

const defaultProps = {
  classes: mockClasses(styles),
  intl,
  onKeyPress: () => {},
};

const shallowComponent = props => shallow(<InteractionWrapper {...defaultProps} {...props} />);

test('InteractionWrapper renders', (t) => {
  const wrapper = shallowComponent({});
  const actual = wrapper.exists();
  t.true(actual);
});
