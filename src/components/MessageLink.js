import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './MessageLink-styles';

const MessageLink = ({ text, url, classes }) => (
  <a target="_blank" rel="noopener noreferrer" href={url} className={classes.messageLink}>
    {text}
  </a>
);

MessageLink.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const MessageLinkEnhanced = injectSheet(styles)(MessageLink);

export { MessageLink as Component, styles };
export default MessageLinkEnhanced;
