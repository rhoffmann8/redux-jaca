import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage, login, userRename } from './actions';
import SocketContainer from './containers/SocketContainer';
import Modal from './components/Modal';
import ChatBox from './components/ChatBox';
import UserList from './components/UserList';
import ChatSettingsContainer from './containers/ChatSettingsContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.initSocket(this.props.settings);
  }

  initSocket(settings) {
    const { io, dispatch } = this.props;

    this.socketContainer = new SocketContainer({
      io,
      host: settings.host,
      port: settings.port,
      dispatch
    });

    this.state = {
      socket: this.socketContainer.getSocket()
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, io } = this.props;
    const { settings } = nextProps;

    if (settings.host != this.props.settings.host ||
      settings.port != this.props.settings.port) {

      this.socketContainer.destroy();

      this.initSocket(settings);
    }

    if (this.props.userInfo.loggedIn && (settings.name != this.props.settings.name)) {
      dispatch(userRename(this.state.socket, settings.name));
    }
  }

  onMessageSubmit(msg) {
    const { dispatch, info } = this.props;
    dispatch(sendMessage(this.state.socket, msg));
  }

  login(e) {
    const { dispatch } = this.props;
    if (e.which == 13 && e.target.value) {
      dispatch(login(this.state.socket, e.target.value));
    }
  }

  render() {
    const { dispatch, userInfo } = this.props;

    return (
      <div className={'app theme-' + this.props.settings.theme}>
        <Modal 
          title="Enter username" 
          className="login" 
          isOpen={!userInfo.loggedIn} 
        >
          <input name="username" onKeyPress={this.login.bind(this)} style={{width:'100%'}}/>
        </Modal>
        <UserList users={this.props.users} />
        <ChatBox 
          userInfo={this.props.userInfo} 
          showTimestamps={this.props.settings.timestamps}
          messages={this.props.messages} 
          dispatch={this.props.dispatch}
          onMessageSubmit={this.onMessageSubmit.bind(this)}
        />
        <ChatSettingsContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    users: state.users,
    userInfo: state.userInfo,
    settings: state.settings
  };
}

export default connect(mapStateToProps)(App);