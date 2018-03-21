import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './Ellipsis-styles';

const Ellipsis = ({ classes }) => <div className={classes.root} />;

Ellipsis.propTypes = {
  classes: PropTypes.object.isRequired,
};

const EllipsisEnhanced = injectSheet(styles)(Ellipsis);

export { Ellipsis as Component, styles };
export default EllipsisEnhanced;
