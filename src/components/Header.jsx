import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import cn from 'classnames';
import injectSheet from 'react-jss';
import styles from './Header-styles';

const renderMaximizeButton = (classes, onToggleMinimize) => <div className={classes.maxButton} onClick={onToggleMinimize} />; // eslint-disable-line

const renderMinimizeButton = (classes, onToggleMinimize) => (
  // eslint-disable-next-line
  <div className={classes.minButton} onClick={onToggleMinimize}>
    <div stroke={'white'} fill={'white'} />
  </div>
);

const Header = ({ classes, onToggleMinimize, isMinimized, newMessages, name, focus }) => {
  let headerColorClass;
  if (newMessages > 0 && isMinimized) {
    headerColorClass = classes.newMessage;
  } else if (isMinimized) {
    headerColorClass = classes.minimized;
  } else {
    headerColorClass = focus ? classes.maximizedFocus : classes.maximizedBlur;
  }

  const newMessagesText = newMessages > 0 ? ` (${newMessages})` : '';

  return (
    <div tabIndex={0} className={cn(classes.root, headerColorClass)}>
      {isMinimized ? renderMaximizeButton(classes, onToggleMinimize) : null}
      <div size={'xs'} className={classes.avatar}>
        AI
      </div>
      <div className={classes.name}>
        {name}
        {newMessagesText}
      </div>
      {!isMinimized ? renderMinimizeButton(classes, onToggleMinimize) : null}
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onToggleMinimize: PropTypes.func.isRequired,
  isMinimized: PropTypes.bool.isRequired,
  newMessages: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  focus: PropTypes.bool.isRequired,
};

const Enhanced = compose(injectIntl, injectSheet(styles))(Header);

export { Header as Component, styles };
export default Enhanced;
