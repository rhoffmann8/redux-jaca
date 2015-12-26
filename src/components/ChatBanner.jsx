import React from 'react';
import { toggleSettings } from '../actions';

export default class ChatBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  settingsClick(e) {
    this.props.dispatch(toggleSettings());
  }

  render() {
    return (
      <div className="chat-banner">
        <div className="current-user">
          Signed in as <span id="name">{this.props.userInfo.name}</span>
          <i className="fa fa-cog" onClick={this.settingsClick.bind(this)}></i>
        </div>
      </div>
    );
  }
}