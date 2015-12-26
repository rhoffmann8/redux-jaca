import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import InputField from './InputField';

export default class ChatSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  onRequestClose() {
    const node = ReactDOM.findDOMNode(this);
    node.className = 'close';

    this.props.onRequestClose();
  }

  applySettings(e) {
    this.props.applySettings(e);
    this.onRequestClose();
  }

  render() {
    const { isOpen, host, port } = this.props;

    return (
      <Modal 
        title='Settings'
        closeTimeoutMS={150}
        onRequestClose={this.onRequestClose.bind(this)} 
        className={'settings ' + (isOpen ? 'open' : 'close')} 
        isOpen={isOpen}
      >
      <form onSubmit={this.applySettings.bind(this)}>
        <InputField
          ref='name'
          label={{for: 'name', text: 'Username'}}
          input={{type: 'text', name: 'name', value: this.props.name}}
        />
        <InputField 
          ref='host'
          label={{for: 'host', text: 'Host'}}
          input={{type: 'text', name: 'host', value: this.props.host}}
        />
        <InputField
          ref='port'
          label={{for: 'port', text: 'Port'}}
          input={{type: 'text', name: 'port', value: this.props.port, style: {width:'50'} }}
        />
        <InputField
          ref='theme'
          label={{for: 'theme', text: 'Theme'}}
          input={{type: 'select', name: 'theme', value: this.props.theme,
            options: [{
              text: 'Default', value: 'default'
            },{
              text: 'Hacker', value: 'hacker'
            }]
          }}
        />
        <InputField
          ref="timestamps"
          label={{for: 'timestamps', text: 'Show Timestamps'}}
          input={{type: 'checkbox', name: 'timestamps', value: this.props.timestamps, id: 'timestamps'}}
        />
        <button type="submit">Apply Settings</button>
        </form>
      </Modal>
    );
  }
}