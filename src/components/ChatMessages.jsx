import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ChatMessages extends Component {
  componentDidUpdate() {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  formatTimestamp(stamp) {
    return (new Date(stamp)).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  }

  render() {
    const { showTimestamps, messages } = this.props;
    return (
      <ul className="chat-messages">
        {messages.map((msg, i) => {
          return (
            <li key={i}>
              {(() => {
                if (showTimestamps) {
                  return <span className="msg-timestamp">[{this.formatTimestamp(msg.timestamp)}]</span>;
                }
              })()}
              <span className="msg-user">{msg.type == 'user' ? msg.user + ': ': ''}</span>
              <span className={'msg-' + msg.type + '-text'}>{msg.text}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}