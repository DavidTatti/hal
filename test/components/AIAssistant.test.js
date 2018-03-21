import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { mockClasses } from 'nordnet-ui-kit';
import { IntlProvider } from 'react-intl';
import { Component as AIAssistant, styles } from '../../src/components/AIAssistant';
import { MESSAGE_SENDER_AI_ASSISTANT } from '../../src/components/MessageBubble';

const intlProvider = new IntlProvider({ locale: 'sv-SE' }, {});
const { intl } = intlProvider.getChildContext();

const fakeMessage = {
  in_response_to_message_id: 123456,
  message_id: 123,
  message_text: 'Welcoem to Nordnet Sven.',
  message_type: 'TEXT',
  timestamp: 1513176782920,
};

const defaultProps = {
  classes: mockClasses(styles),
  startConversation: () => {},
  createMessage: () => {},
  track: () => {},
  getConversationDomain: () => {},
  intl,
};

const shallowComponent = props => shallow(<AIAssistant {...defaultProps} {...props} />);

test('AIAssistant renders', t => {
  const wrapper = shallowComponent({});
  const actual = wrapper.exists();
  t.true(actual);
});

test('AIAssistant gains focus on click', t => {
  const wrapper = shallowComponent({});
  wrapper.first().simulate('click');
  t.true(wrapper.state('focus'));
});

test('AIAssistant sets minimized state onToggleMinimize', t => {
  const wrapper = shallowComponent({});
  wrapper.instance().onToggleMinimize();
  t.true(wrapper.state('minimized'));
});

test('AIAssistant minimizes on minimized state change', t => {
  const wrapper = shallowComponent({});
  wrapper.instance().onToggleMinimize();
  wrapper.update();
  t.true(
    wrapper
      .find('div')
      .find('.minimizedWrapper')
      .exists(),
  );
});

test('AIAssistant increments newMessages on messageQueue when minimzed', t => {
  const wrapper = shallowComponent({});
  wrapper.instance().onToggleMinimize();
  wrapper.instance().addMessage([fakeMessage], MESSAGE_SENDER_AI_ASSISTANT);
  t.true(wrapper.state('newMessages') === 1);
});

test('AIAssistant adds messages', t => {
  const wrapper = shallowComponent({});
  wrapper.instance().addMessage(['Willkommen'], MESSAGE_SENDER_AI_ASSISTANT);
  wrapper.instance().addMessage(['Need help?'], MESSAGE_SENDER_AI_ASSISTANT);
  wrapper.update();
  t.true(wrapper.find('Jss(MessageBubble)').length === 1); // Always 1 since Ellipsis is shown
});
