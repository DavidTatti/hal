import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import cn from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styles from './AIAssistant-styles';
import Header from './Header';
import InteractionWrapper from './InteractionWrapper';
import MessageWrapper from './MessageWrapper';
import Ellipsis from './Ellipsis';
import { conversation, messages, ui, track } from '../ducks';
import MessageBubble, { MESSAGE_SENDER_USER, MESSAGE_SENDER_AI_ASSISTANT } from './MessageBubble';

class AIAssistant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimized: false,
      disabled: this.props.disabled,
      currentMessages: [],
      currentPreDefinedAnswers: [],
      messageQueue: [],
      lastActionTimestamp: 0,
      messageDelay: 0,
      newMessages: 0,
      conversationID: null,
      focus: false,
      agentName: 'HAL-9000',
      polling: false,
      pollingStartedTimestamp: 0,
      showEllipsis: false,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.onTick, 50);
    this.pollingTimer = null;
  }

  componentWillReceiveProps(nextProps) {
    const newLastAIMessage = nextProps.lastAIMessage;
    const oldLastAIMessage = this.props.lastAIMessage;

    const newID = nextProps.conversationID;
    const oldID = this.props.conversationID;

    if (oldID !== newID) {
      this.setState({
        conversationID: newID,
      });
    }
    if (oldLastAIMessage !== newLastAIMessage) {
      if (newLastAIMessage) this.addMessage(newLastAIMessage, MESSAGE_SENDER_AI_ASSISTANT);
      this.setState({
        showEllipsis: false,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.pollingTimer);
  }

  onTick = () => {
    const {
      messageQueue,
      currentMessages,
      lastActionTimestamp,
      minimized,
      messageDelay,
      currentPreDefinedAnswers,
    } = this.state;
    const timeElapsed = new Date().valueOf() - lastActionTimestamp;

    if (messageQueue.length > 0 && timeElapsed > messageDelay) {
      // Mutates Array and remove the object
      const nextDisplayedMessage = messageQueue.shift();
      console.log(nextDisplayedMessage);
      switch (nextDisplayedMessage.type) {
        case 0:
          currentMessages.push(<MessageBubble
            message={nextDisplayedMessage.speech}
            sender={MESSAGE_SENDER_AI_ASSISTANT}
            key={Math.random()}
          />,);
          break;
        default:
          console.error('No valid message TYPE detected:', nextDisplayedMessage.message_type);
      }
      this.setState({
        currentMessages,
        currentPreDefinedAnswers,
        messageQueue,
        lastActionTimestamp: new Date().valueOf(),
        newMessages: minimized ? this.state.newMessages + 1 : 0,
        agentName: 'HAL-9000',
      });
    }
  };

  onToggleMinimize = () => {
    const minimized = !this.state.minimized;
    const trackingLabel = minimized ? 'aiassistant-minimize' : 'aiassistant-maximize';
    this.props.track({
      hitType: 'button',
      label: trackingLabel,
      type: 'aiassistant',
    });
    this.setState({ minimized, focus: minimized });
  };

  onTextInputChange = e => {
    const { messageQueue, currentPreDefinedAnswers } = this.state;
    const text = e.target.value;
    const noMessage = messageQueue.length === 0;
    if (e.key === 'Enter' && text !== '' && noMessage) {
      this.addMessage([text], MESSAGE_SENDER_USER);
      if (currentPreDefinedAnswers) {
        this.setState({ currentPreDefinedAnswers: [] });
      }
    }
  };

  onFocus = () => {
    this.setState({ focus: true });
  };

  onBlur = () => {
    this.setState({ focus: false });
  };

  onClick = () => {
    this.setState({ focus: true });
  };

  onClickPreDefinedAnswer = (text, val) => {
    const { currentMessages } = this.state;
    this.addMessage([text], MESSAGE_SENDER_USER, val);
    this.setState({ currentPreDefinedAnswers: [], currentMessages });
  };

  onClickWelcomeChoice = () => {
    this.props.startConversation('Anonymous');
    this.setState({ greeting: false });
  }

  setRootRef = element => {
    this.root = element;
  };

  startPolling = () => {
    const { getMessages, conversationID } = this.props;
    if (!this.pollingTimer) this.pollingTimer = setInterval(() => getMessages(conversationID), 1500);
    this.setState({ polling: true, pollingStartedTimestamp: new Date().valueOf() });
  };

  endPolling = () => {
    clearInterval(this.pollingTimer);
    this.pollingTimer = null;
    this.setState({ polling: false, pollingStartedTimestamp: 0 });
  };

  addMessage = (texts, sender, value) => {
    const { currentMessages, messageQueue } = this.state;
    const { sendMessage, conversationID } = this.props;
    if (sender === MESSAGE_SENDER_USER) {
      const sendText = value || texts[0];
      sendMessage(sendText, conversationID);
      const newKey = currentMessages.length + 1;
      currentMessages.push(<MessageBubble message={texts[0]} sender={sender} key={newKey} />);
      this.setState({ currentMessages, showEllipsis: true });
    } else if (sender === MESSAGE_SENDER_AI_ASSISTANT && texts) {
      texts.forEach(obj => {
        // Just fill the Queue and let Tick heartbeat figure out what will happen
        messageQueue.push(obj);
      });
      this.onTick(); // Need for test
    }
  };

  disableWidget = () => {
    this.setState({
      disabled: true,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      minimized,
      currentMessages,
      currentPreDefinedAnswers,
      focus,
      disabled,
      newMessages,
      messageQueue,
      agentName,
      showEllipsis,
    } = this.state;

    const minimizedRootClasses = minimized ? classes.minimizedRoot : classes.maximizedRoot;
    const disableInteraction = !!messageQueue.length;
    const rootClasses = cn(classes.root, minimizedRootClasses);

    if (disabled) {
      return null;
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div tabIndex={0} className={rootClasses} onFocus={this.onFocus} onBlur={this.onBlur} onClick={this.onClick} ref={this.setRootRef}>
        <Header name={agentName} onToggleMinimize={this.onToggleMinimize} isMinimized={minimized} newMessages={newMessages} focus={focus} />
        <div className={minimized ? classes.minimizedWrapper : classes.maximizedWrapper}>
          <MessageWrapper>
            {currentMessages.map(messageBubble => messageBubble)}
            {showEllipsis ? (
              <MessageBubble>
                <Ellipsis />
              </MessageBubble>
            ) : null}
            <div className={classes.preDefinedAnswerWrapper}>{currentPreDefinedAnswers}</div>
          </MessageWrapper>
          <InteractionWrapper disableInteraction={disableInteraction} onKeyPress={this.onTextInputChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  conversationID: conversation.selectors.conversationID(state),
  hasEndedConversation: conversation.selectors.hasEndedConversation(state),
  lastAIMessage: messages.selectors.lastAIMessage(state),
  hasAmeliaDomains: conversation.selectors.hasAmeliaDomains(state),
  resetDomainChoice: ui.selectors.resetDomainChoice(state),
});

const mapDispatchToProps = {
  startConversation: conversation.actions.startConversation,
  endConversation: conversation.actions.endConversation,
  sendMessage: messages.actions.sendMessage,
  getMessages: messages.actions.getMessages,
  getConversationDomain: conversation.actions.getConversationDomain,
  track: track.actions.track,
  setResetDomainChoice: ui.actions.setResetDomainChoice,
};

AIAssistant.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  conversationID: conversation.shape.conversationID,
  lastAIMessage: messages.shape.lastAIMessage,
  startConversation: conversation.shape.startConversation.isRequired,
  sendMessage: messages.shape.sendMessage.isRequired,
  track: PropTypes.func.isRequired,
  getMessages: messages.shape.getMessages.isRequired,
};

AIAssistant.defaultProps = {
  disabled: false,
  conversationID: null,
  lastAIMessage: null,
  hasAmeliaDomains: [],
  resetDomainChoice: false,
};

AIAssistant.contextTypes = {
  store: PropTypes.object,
};

const AIAssistantEnhanced = compose(connect(mapStateToProps, mapDispatchToProps), injectSheet(styles))(AIAssistant);

export { AIAssistant as Component, styles };
export default AIAssistantEnhanced;
