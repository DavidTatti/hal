import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import cn from 'classnames';
import styles from './PreDefinedAnswer-styles';

const PreDefinedAnswer = ({ text, onClick, classes, className }) => (
  <div>
    {// eslint-disable-next-line
    }<div variant="secondary" modifier="action" className={className ? cn(className, classes.button) : classes.button} onClick={onClick}>
      {text}
    </div>
  </div>
);

PreDefinedAnswer.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

PreDefinedAnswer.defaultProps = {
  className: null,
};

export { PreDefinedAnswer as Component, styles };

const Enhanced = injectSheet(styles)(PreDefinedAnswer);
export default Enhanced;
