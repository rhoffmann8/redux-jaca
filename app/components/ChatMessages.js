import React from 'react';
import { findDOMNode } from 'react-dom';

export default class ChatMessages extends React.Component {

  constructor(props) {
    super(props);
  }

  formatTimestamp(stamp) {
    return (new Date(stamp)).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  }

  renderMessages() {
    const messages = this.props.messages;

    return messages.map((message, i) => {
      let type = message.type;
      return <li key={i} className={'c-chat__message c-chat__message--' + type}>
        {(type != 'system' && this.props.showTimestamps) && <span className="c-chat__timestamp">[{this.formatTimestamp(message.timestamp)}] </span>}
        {type != 'system' &&
          <span className="c-chat__message-user">
            {message.user}:
          </span>
        }
        <span className="c-chat__message-text">{message.text}</span>
      </li>;
    });
  }

  componentDidUpdate() {
    const el = findDOMNode(this);
    el.scrollTop = el.scrollHeight;
  }

  render() {
    return (
      <div className="c-chat__messages">
        <ul className="c-chat__message-list">
          {this.renderMessages()}
        </ul>
      </div>
    );
  }
}