import React from 'react';

export default class ChatInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.message);

    this.setState({
      message: ''
    });
  }

  onInputChange(e) {
    const message = e.target.value;

    this.setState({
      message
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="c-chat__input">
        <input onChange={this.onInputChange} className="c-chat__input-text" type="text" value={this.state.message}/>
        <button type="submit" className="c-chat__input-send">Send</button>
      </form>
    );
  }
}
