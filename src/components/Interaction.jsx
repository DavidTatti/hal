import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { injectIntl, intlShape, defineMessages } from 'react-intl';
import cn from 'classnames';
import injectSheet from 'react-jss';
import Textarea from 'react-textarea-autosize';
import styles from './Interaction-styles';
import { ui } from '../ducks';

const messages = defineMessages({
  interactionMessage: {
    id: 'INTERACTION.MESSAGE',
    defaultMessage: 'Message...',
    description: 'Placeholder text for Input',
  },
});

class Interaction extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      focus: false,
      value: '',
    };
  }

  onHeightChange = () => {
    this.props.setScrollMessageWrapperToBottom(true);
  };

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onKeyPress = e => {
    this.props.onKeyPress(e);
    if (e.key === 'Enter') {
      this.setState({
        value: '',
      });
      e.preventDefault();
    }
  };

  onBlur = () => {
    this.setState({ focus: false });
  };

  onFocus = () => {
    this.setState({ focus: true });
  };

  render() {
    const { placeholderText, classes, intl: { formatMessage }, disabled } = this.props;
    const { focus, value } = this.state;

    const placeholderMessage = placeholderText || formatMessage(messages.interactionMessage);
    const focusClasses = focus && !disabled ? cn(classes.root, classes.focus) : cn(classes.root, classes.blur);
    const focusIconClasses =
      focus && value !== '' && !disabled ? cn(classes.icon, classes.iconFocused) : cn(classes.icon, classes.iconBlurred);
    return (
      <div className={focusClasses}>
        <Textarea
          value={this.state.value}
          maxRows={6}
          className={classes.textarea}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          placeholder={placeholderMessage}
          spellCheck="true"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onHeightChange={this.onHeightChange}
          disabled={disabled}
        />
        <div className={classes.iconContainer}>
          <div className={focusIconClasses} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setScrollMessageWrapperToBottom: ui.actions.setScrollMessageWrapperToBottom,
};

Interaction.propTypes = {
  classes: PropTypes.object.isRequired,
  setScrollMessageWrapperToBottom: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onKeyPress: PropTypes.func,
  placeholderText: PropTypes.string,
  disabled: PropTypes.bool,
};

Interaction.defaultProps = {
  onKeyPress: () => {},
  placeholderText: null,
  disabled: false,
};

const Enhanced = compose(connect(null, mapDispatchToProps), injectIntl, injectSheet(styles))(Interaction);

export { Interaction as Component, styles };
export default Enhanced;
