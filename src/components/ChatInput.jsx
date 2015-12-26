import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ChatInput extends Component {
  sendMessage() {
    const node = ReactDOM.findDOMNode(this);
    const input = node.firstChild;
    const msg = input.value;

    if (msg) {
      this.props.onMessageSubmit(msg);
      input.value = "";
    }
  }

  onButtonClick(e) {
    this.sendMessage();
  }

  onKeyPress(e) {
    if (e.which == 13) {
      this.sendMessage();
    }
  }

  render() {
    return (
      <div className="chat-input">
        <input onKeyPress={this.onKeyPress.bind(this)} name="chatbox"/>
        <button onClick={this.onButtonClick.bind(this)} className="btn-send" name="send">Send</button>
      </div>
    );
  }
}