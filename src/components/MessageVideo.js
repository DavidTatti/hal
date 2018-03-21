import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './MessageVideo-styles';

const MessageVideo = ({ url, classes }) => (
  <div className={classes.messageVideoWrapper}>
    <iframe src={url} frameBorder="0" width="560" height="315" allowFullScreen />
  </div>
);

MessageVideo.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

const MessageLinkEnhanced = injectSheet(styles)(MessageVideo);

export { MessageVideo as Component, styles };
export default MessageLinkEnhanced;
