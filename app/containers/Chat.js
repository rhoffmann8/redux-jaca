import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import ChatUserList from '../components/ChatUserList';
import ChatSettings from '../components/ChatSettings';

import { applySettings, toggleSettings } from '../actions/settings';
import { sendMessage } from '../actions/messages';
import { socketConnect, socketDisconnect } from '../actions/socket';
import { userLogin, userRename } from '../actions/users';

function mapStateToProps(state) {
  return {
    users: state.users,
    messages: state.messages,
    settings: state.settings,
    socket: state.socket
  };
}

export class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onSettingsChange = this.onSettingsChange.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.onSettingsEsc = this.onSettingsEsc.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { settings, socket, users } = this.props;

    if (nextProps.settings.host != settings.host || nextProps.settings.port != settings.port) {
      this.props.dispatch(socketDisconnect());
    }

    if (socket.socket && settings.user != nextProps.settings.user) {
      this.props.dispatch(userRename(nextProps.settings.user));
    }
  }

  componentDidUpdate() {
    const { settings, socket, users } = this.props;
    if (!settings.isOpen && socket.status == 'pending') {
      // settings applied, connect socket
      this.props.dispatch(socketConnect());
    }

    if (socket.status == 'success' && !users.self) {
      // socket connected, log user in
      this.props.dispatch(userLogin(this.props.settings.user));
    }
  }

  toggleSettings() {
    this.props.dispatch(toggleSettings());
  }

  onSettingsChange(settings) {
    this.props.dispatch(applySettings(settings));
  }

  onSubmit(msg) {
    msg && this.props.dispatch(sendMessage(msg));
  }

  onSettingsEsc() {
    this.props.dispatch(toggleSettings());
  }

  render() {
    const { settings, users } = this.props;
    return (
      <div className={cx('t-' + settings.theme)}>
      {settings.isOpen &&
        <div className="o-modal">
          <div className="o-modal__content">
            <ChatSettings
              settings={settings}
              onSubmit={this.onSettingsChange}
              onEsc={this.onSettingsEsc}
            />
          </div>
        </div>
      }
        <div className="c-chat">
          <div className="c-chat__top">
          {users.self &&
            <span className="c-chat__top-user">Logged in as {users.self.name}</span>
          }
            <i className="fa fa-cog" onClick={this.toggleSettings}></i>
          </div>
          <ChatUserList users={this.props.users.list} />
          <ChatMessages showTimestamps={this.props.settings.timestamps} messages={this.props.messages} />
          <ChatInput onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Chat)
