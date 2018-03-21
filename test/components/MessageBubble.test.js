import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { mockClasses } from 'nordnet-ui-kit';
import { IntlProvider } from 'react-intl';
import { Component as MessageBubble, styles, MESSAGE_SENDER_AI_ASSISTANT } from '../../src/components/MessageBubble';

const intlProvider = new IntlProvider({ locale: 'sv-SE' }, {});
const { intl } = intlProvider.getChildContext();

const defaultProps = {
  classes: mockClasses(styles),
  intl,
  message: '',
  sender: MESSAGE_SENDER_AI_ASSISTANT,
};

const shallowComponent = props => shallow(<MessageBubble {...defaultProps} {...props} />);

test('MessageBubble renders', t => {
  const wrapper = shallowComponent({});
  const actual = wrapper.exists();
  t.true(actual);
});

test('MessageBubble renders message', t => {
  const wrapper = shallowComponent({});
  const span = wrapper.find('.messageSpan');
  t.true(span !== undefined);
});
