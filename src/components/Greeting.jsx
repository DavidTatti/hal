import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { injectIntl, intlShape, defineMessages } from 'react-intl';
import injectSheet from 'react-jss';
import styles from './Greeting-styles';
import PreDefinedAnswer from './PreDefinedAnswer';

const messages = defineMessages({
  header: {
    id: 'GREETING.HEADER',
    defaultMessage: 'Hi!',
    description: 'Greeting header',
  },
  message: {
    id: 'GREETING.MESSAGE',
    defaultMessage: "I'm here to help you with deposits, pension, investement guidance and more.",
    description: 'Greeting message',
  },
  question: {
    id: 'GREETING.QUESTION',
    defaultMessage: 'What would you like help with today?',
    description: 'Greeting question',
  },
});

class Greeting extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      madeChoice: false,
    };
  }

  render() {
    const { onClickChoice, classes, intl: { formatMessage } } = this.props;
    return (
      <div className={classes.root}>
        <h1 className={classes.header}>{formatMessage(messages.header)}</h1>
        <p className={classes.message}>{formatMessage(messages.message)}</p>
        <div className={classes.buttonWrapper}>
          <PreDefinedAnswer className={classes.button} text={'Getting started'} onClick={() => onClickChoice('Kom igång')} />
        </div>
      </div>
    );
  }
}

Greeting.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  onClickChoice: PropTypes.func.isRequired,
};

const Enhanced = compose(injectIntl, injectSheet(styles))(Greeting);

export { Greeting as Component, styles };
export default Enhanced;
