import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './MessageInfo-styles';

const renderMessage = (message, classes) => <span className={classes.messageSpan}>{message}</span>;

const MessageInfo = ({ classes, message }) => <div className={classes.root}>{renderMessage(message, classes)}</div>;

MessageInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
};

MessageInfo.defaultProps = {
  message: null,
};

export { MessageInfo as Component, styles };

const Enhanced = injectSheet(styles)(MessageInfo);
export default Enhanced;
