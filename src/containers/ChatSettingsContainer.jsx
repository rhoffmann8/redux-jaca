import React from 'react';
import { connect } from 'react-redux';
import ChatSettings from '../components/ChatSettings';
import { toggleSettings, applySettings } from '../actions';

export class ChatSettingsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  onRequestClose() {
    this.props.dispatch(toggleSettings())
  }

  applySettings(e) {
    const { dispatch } = this.props;
    const chatSettings = this.refs.chatSettings;

    e.preventDefault();

    let settings = {};
    for (let ref in chatSettings.refs) {
      settings[ref] = chatSettings.refs[ref].state.value;
    }
    dispatch(applySettings(settings));
  }

  render() {
    return (
      <ChatSettings 
        ref="chatSettings" 
        applySettings={this.applySettings.bind(this)} 
        onRequestClose={this.onRequestClose.bind(this)}
        {...this.props.settings}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(ChatSettingsContainer)
