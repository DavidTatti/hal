import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styles from './MessageWrapper-styles';
import { ui } from '../ducks';

class MessageWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentWindow: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.scrollMessageWrapperToBottom && nextProps.scrollMessageWrapperToBottom) {
      this.scrollToBottom();
      this.props.setScrollMessageWrapperToBottom(false);
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const scrollHeight = this.messageWrapper.clientHeight;
    this.scrollWrapper.scrollTop = scrollHeight;
  };

  render() {
    const { classes, children } = this.props;
    return (
      <div
        className={classes.scroll}
        ref={element => {
          this.scrollWrapper = element;
        }}
      >
        <div
          className={classes.messageWrapper}
          ref={element => {
            this.messageWrapper = element;
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  scrollMessageWrapperToBottom: ui.selectors.scrollMessageWrapperToBottom(state),
});

const mapDispatchToProps = {
  setScrollMessageWrapperToBottom: ui.actions.setScrollMessageWrapperToBottom,
};

MessageWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  scrollMessageWrapperToBottom: ui.shape.scrollMessageWrapperToBottom.isRequired,
  setScrollMessageWrapperToBottom: PropTypes.func.isRequired,
};

export { MessageWrapper as Component, styles };

const Enhanced = compose(connect(mapStateToProps, mapDispatchToProps), injectSheet(styles))(MessageWrapper);

export default Enhanced;
