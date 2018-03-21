import PropTypes from 'prop-types';
import { selectors as rootSelectors } from './root';

const NAMESPACE = 'ui';

const shape = {
  scrollMessageWrapperToBottom: PropTypes.bool,
  resetDomainChoice: PropTypes.bool,
  setResetDomainChoice: PropTypes.func,
};

const defaultState = {
  scrollMessageWrapperToBottom: false,
  resetDomainChoice: false,
};

const root = state => rootSelectors.root(state)[NAMESPACE] || defaultState;
const scrollMessageWrapperToBottom = state => root(state).scrollMessageWrapperToBottom;
const resetDomainChoice = state => root(state).resetDomainChoice;

const selectors = {
  root,
  scrollMessageWrapperToBottom,
  resetDomainChoice,
};

const types = {
  setScrollMessageWrapperToBottom: `SET_SCROLL_MESSAGE_WRAPPER_TO_BOTTOM`,
  setResetDomainChoice: 'SET_RESET_DOMAIN_CHOICE',
};

const setScrollMessageWrapperToBottom = bool => ({
  type: types.setScrollMessageWrapperToBottom,
  payload: bool,
});

const setResetDomainChoice = bool => ({
  type: types.setResetDomainChoice,
  payload: bool,
});

const actions = {
  setScrollMessageWrapperToBottom,
  setResetDomainChoice,
};

const reducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.setScrollMessageWrapperToBottom:
      return { ...state, scrollMessageWrapperToBottom: payload };
    case types.setResetDomainChoice:
      return { ...state, resetDomainChoice: payload };
    default:
      return state;
  }
};

const nsReducer = { [NAMESPACE]: reducer };

export { actions as uiActions, selectors as uiSelectors, defaultState as uiDefaultState, shape as uiShape, nsReducer as uiReducer };

export default {
  actions,
  selectors,
  defaultState,
  shape,
  reducer: nsReducer,
};
