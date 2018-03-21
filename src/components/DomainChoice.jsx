import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { injectIntl, intlShape, defineMessages } from 'react-intl';
import injectSheet from 'react-jss';
import styles from './DomainChoice-styles';
import PreDefinedAnswer from './PreDefinedAnswer';

const messages = defineMessages({
  header: {
    id: 'DOMAIN.HEADER',
    defaultMessage: 'Choose Domain',
    description: 'Choose domain',
  },
  message: {
    id: 'DOMAIN.MESSAGE',
    defaultMessage: 'This is for internal Amelia domain. Not Nordnet environment.',
    description: 'Amelia domain explanation',
  },
});

class DomainChoice extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      madeChoice: false,
    };
  }

  onClick = code => {
    this.props.onClick(code);
  };

  render() {
    const { domains, classes, intl: { formatMessage } } = this.props;
    return (
      <div className={classes.root}>
        <h1 className={classes.header}>{formatMessage(messages.header)}</h1>
        <p className={classes.message}>{formatMessage(messages.message)}</p>
        <div className={classes.buttonWrapper}>
          {domains.map(obj => {
            const text = obj.domain_name;
            const code = obj.domain_code;
            const id = obj.domain_id;
            return <PreDefinedAnswer key={id} className={classes.button} text={text} onClick={() => this.onClick(code)} />;
          })}
        </div>
      </div>
    );
  }
}

DomainChoice.propTypes = {
  domains: PropTypes.array.isRequired, // eslint-disable-line
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

const Enhanced = compose(injectIntl, injectSheet(styles))(DomainChoice);

export { DomainChoice as Component, styles };
export default Enhanced;
