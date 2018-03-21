import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import cn from 'classnames';
import styles from './MessageBubble-styles';

export const MESSAGE_SENDER_AI_ASSISTANT = 'message-sender-ai-assistant';
export const MESSAGE_SENDER_USER = 'message-sender-user';

const renderMessage = (message, classes) => <span className={classes.messageSpan}>{message}</span>;

const MessageBubble = ({ classes, message, sender, children }) => {
  const senderClass = sender === MESSAGE_SENDER_USER ? classes.messageSenderUser : classes.messageSenderAIAssistant;
  return <div className={cn(classes.root, senderClass)}>{message ? renderMessage(message, classes) : children}</div>;
};

MessageBubble.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  sender: PropTypes.string,
  children: PropTypes.node,
};

MessageBubble.defaultProps = {
  message: null,
  sender: MESSAGE_SENDER_AI_ASSISTANT,
};

export { MessageBubble as Component, styles };

const Enhanced = injectSheet(styles)(MessageBubble);
export default Enhanced;
