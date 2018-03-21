export const APP_STATE_NAMESPACE = 'AIAssistant';

export const selectors = {
  root: state => state[APP_STATE_NAMESPACE] || {},
};
