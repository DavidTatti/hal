import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './InteractionWrapper-styles';
import Interaction from './Interaction';

const InteractionWrapper = ({ classes, onKeyPress, disableInteraction }) => (
  <div className={classes.root}>
    <Interaction onKeyPress={onKeyPress} disabled={disableInteraction} />
  </div>
);

InteractionWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  disableInteraction: PropTypes.bool,
};

InteractionWrapper.defaultProps = {
  children: null,
  disableInteraction: false,
};

export { InteractionWrapper as Component, styles };

const Enhanced = injectSheet(styles)(InteractionWrapper);
export default Enhanced;
