import PropTypes from 'prop-types';
import {ApiAiClient} from "api-ai-javascript";
import { selectors as rootSelectors } from './root';

const NAMESPACE = 'messages';

const shape = {
  sendMessage: PropTypes.func,
  lastAIMessage: PropTypes.array,
  getMessages: PropTypes.func,
};

const defaultState = {
  lastAIMessage: null,
};

const root = state => rootSelectors.root(state)[NAMESPACE] || defaultState;
const lastAIMessage = state => root(state).lastAIMessage;

const selectors = {
  root,
  lastAIMessage,
};

const types = {
  sendMessage: 'SEND_MESSAGE',
  sendMessageSuccess: 'SEND_MESSAGE_SUCCESS',
  sendMessageFailure: 'SEND_MESSAGE_FAILURE',
  displayMessages: 'DISPLAY_MESSAGES',
  getMessages: 'GET_MESSAGES',
  getMessagesSuccess: 'GET_MESSAGES_SUCCESS',
  getMessagesFailure: 'GET_MESSAGES_FAILURE',
};

function sendMessage(message) {
  // eslint-disable-next-line
  return dispatch => {
    dispatch({
      type: types.sendMessage,
    });

    const client = new ApiAiClient({accessToken: 'a965cd6ab45643b4bb6469874cc8e97f'})

    client.textRequest(message).then((response) => {
      const responseArray = response.result.fulfillment.messages;
      dispatch({
        type: types.sendMessageSuccess,
        res: responseArray
      });
    }).catch(res => {
      dispatch({
        type: types.sendMessageFailure,
        res
      });
    });
  }
}

const displayMessages = messages => ({
  type: types.displayMessages,
  payload: messages,
});

function getMessages(conversationID) {
  return {
    type: types.getMessages,
    fetch: {
      method: 'get',
      url: '/api/2/ai/assistant/conversation/message',
      params: {
        conversation_id: conversationID,
      },
    },
  };
}

const actions = {
  sendMessage,
  displayMessages,
  getMessages,
};

const reducer = (state = defaultState, action) => {
  const { type, res, payload } = action;
  switch (type) {
    case types.sendMessage:
      return { ...state, res };
    case types.sendMessageSuccess:
      return { ...state, lastAIMessage: res };
    case types.sendMessageFailure:
      return { ...state };
    case types.displayMessages:
      return { ...state, lastAIMessage: payload };
    case types.getMessages:
      return { ...state, res };
    case types.getMessagesSuccess:
      if (res.data) {
        return { ...state, lastAIMessage: res };
      }
      return { ...state, res };
    case types.getMessagesFailure:
      return { ...state, lastAIMessage: null };
    default:
      return state;
  }
};

const nsReducer = { [NAMESPACE]: reducer };

export {
  actions as messagesActions,
  selectors as messagesSelectors,
  defaultState as messagesDefaultState,
  shape as messagesShape,
  nsReducer as messagesReducer,
};

export default {
  actions,
  selectors,
  defaultState,
  shape,
  reducer: nsReducer,
};
