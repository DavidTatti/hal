import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { mockClasses, Button } from 'nordnet-ui-kit';
import { IntlProvider } from 'react-intl';
import { Component as PreDefinedAnswer,
  styles,
} from '../../src/components/PreDefinedAnswer';

const intlProvider = new IntlProvider({ locale: 'sv-SE' }, {});
const { intl } = intlProvider.getChildContext();

const defaultProps = {
  classes: mockClasses(styles),
  text: '',
  onClick: () => {},
  intl,
};

const shallowComponent = props => shallow(<PreDefinedAnswer {...defaultProps} {...props} />);

test('PreDefinedAnswer renders', (t) => {
  const wrapper = shallowComponent({});
  const actual = wrapper.exists();
  t.true(actual);
});

test('onClick fires', (t) => {
  const spy = sinon.spy();
  const wrapper = shallowComponent({ onClick: spy });
  wrapper.find(Button).simulate('click');
  t.true(spy.calledOnce);
});
