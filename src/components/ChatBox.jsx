import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import ChatBanner from './ChatBanner';

export default class ChatBox extends Component {
  render() {
    return (
      <div className="chatbox">
        <ChatBanner userInfo={this.props.userInfo} dispatch={this.props.dispatch}/>
        <ChatMessages showTimestamps={this.props.showTimestamps} messages={this.props.messages} />
        <ChatInput onMessageSubmit={this.props.onMessageSubmit.bind(this)}/>
      </div>
    );
  }
}