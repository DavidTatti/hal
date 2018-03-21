import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { injectIntl, intlShape, defineMessages } from 'react-intl';
import injectSheet from 'react-jss';
import styles from './DropdownMenu-styles';
import { conversation, ui } from '../ducks';

const messages = defineMessages({
  dropdownReset: {
    id: 'DROPDOWN.RESET',
    defaultMessage: 'Reset',
    description: 'Resets the current conversation',
  },
});

class DropdownMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextEnded = nextProps.hasEndedConversation;
    if (nextEnded) {
      this.props.setResetDomainChoice(true);
    }
  }

  onBlur = e => {
    if (!this.rootNode.contains(e.currentTarget)) {
      this.setState({ open: false });
    }
  };

  onToggleMenu = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  onResetClick = () => {
    const { conversationID } = this.props;
    this.props.endConversation(conversationID);
    this.onToggleMenu();
  };

  renderChoices = () => {
    const { classes, intl: { formatMessage } } = this.props;
    return (
      <ul className={classes.menu}>
        <li key={1} className={classes.menuChoice}>
          <button className={classes.menuButton} onClick={this.onResetClick}>
            {formatMessage(messages.dropdownReset)}
          </button>
        </li>
      </ul>
    );
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div
        tabIndex={0}
        className={classes.root}
        ref={el => {
          this.rootNode = el;
        }}
      >
        <button className={classes.menuButton} onClick={this.onToggleMenu} onBlur={this.onBlur}>
          <div className={classes.icon} stroke={'white'} fill={'white'} />
        </button>
        {open ? this.renderChoices() : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  conversationID: conversation.selectors.conversationID(state),
  hasEndedConversation: conversation.selectors.hasEndedConversation(state),
});

const mapDispatchToProps = {
  startConversation: conversation.actions.startConversation,
  endConversation: conversation.actions.endConversation,
  setResetDomainChoice: ui.actions.setResetDomainChoice,
};

DropdownMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  endConversation: conversation.shape.endConversation.isRequired,
  conversationID: conversation.shape.conversationID,
  hasEndedConversation: conversation.shape.hasEndedConversation.isRequired, // eslint-disable-line
  setResetDomainChoice: ui.shape.setResetDomainChoice.isRequired,
};

DropdownMenu.defaultProps = {
  conversationID: null,
  hasEndedConversation: false,
};

const Enhanced = compose(connect(mapStateToProps, mapDispatchToProps), injectIntl, injectSheet(styles))(DropdownMenu);

export { DropdownMenu as Component, styles };
export default Enhanced;
