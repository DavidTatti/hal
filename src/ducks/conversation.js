import PropTypes from 'prop-types';
import { messages } from '../ducks';
import { selectors as rootSelectors } from './root';

const NAMESPACE = 'conversation';

const shape = {
  conversationID: PropTypes.string,
  startConversation: PropTypes.func,
  endConversation: PropTypes.func,
  hasAmeliaDomains: PropTypes.array,
  getConversationDomain: PropTypes.func,
  hasEndedConversation: PropTypes.bool,
};

const defaultState = {
  conversationID: null,
  hasEndedConversation: false,
  hasAmeliaDomains: [],
};

const root = state => rootSelectors.root(state)[NAMESPACE] || defaultState;
const conversationID = state => root(state).conversationID;
const hasEndedConversation = state => root(state).hasEndedConversation;
const hasAmeliaDomains = state => root(state).hasAmeliaDomains;

const selectors = {
  root,
  conversationID,
  hasEndedConversation,
  hasAmeliaDomains,
};

const types = {
  startConversation: 'START_CONVERSATION',
  startConversationSuccess: 'START_CONVERSATION_SUCCESS',
  startConversationFailure: 'START_CONVERSATION_FAILURE',
  endConversation: 'END_CONVERSATION',
  endConversationSuccess: 'END_CONVERSATION_SUCCESS',
  endConversationFailure: 'END_CONVERSATION_FAILURE',
  getConversationDomain: 'GET_CONVERSATION_DOMAIN',
  getConversationDomainSuccess: 'GET_CONVERSATION_DOMAIN_SUCCESS',
  getConversationDomainFailure: 'GET_CONVERSATION_DOMAIN_FAILURE',
};

function startConversation(domainCode) {
  const args = domainCode ? `?domain_code=${domainCode}` : '';
  // eslint-disable-next-line
  return dispatch => {
    return dispatch({
      type: types.startConversation,
      fetch: {
        method: 'get',
        url: `/api/2/ai/assistant/conversation${args}`,
      },
    }).then(res => {
      dispatch(messages.actions.displayMessages(res.data.messages));
      return res;
    });
  };
}

function getConversationDomain() {
  return {
    type: types.getConversationDomain,
    fetch: {
      method: 'get',
      url: '/api/2/ai/assistant/conversation/domains',
    },
  };
}

function endConversation(id) {
  return {
    type: types.endConversation,
    fetch: {
      method: 'del',
      url: '/api/2/ai/assistant/conversation',
      params: {
        conversation_id: id,
      },
    },
  };
}

const actions = {
  startConversation,
  endConversation,
  getConversationDomain,
};

const reducer = (state = defaultState, action) => {
  const { type, res } = action;
  switch (type) {
    case types.startConversationSuccess:
      return { ...state, conversationID: res.data.conversation_id, hasEndedConversation: false };
    case types.getConversationDomainSuccess:
      return { ...state, hasAmeliaDomains: res.data };
    case types.endConversationSuccess:
      return { ...state, hasEndedConversation: true };
    default:
      return state;
  }
};

const nsReducer = { [NAMESPACE]: reducer };

export {
  actions as conversationActions,
  selectors as conversationSelectors,
  defaultState as conversationDefaultState,
  shape as conversationShape,
  nsReducer as conversationReducer,
};

export default {
  actions,
  selectors,
  defaultState,
  shape,
  reducer: nsReducer,
};
