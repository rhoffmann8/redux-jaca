import React from 'react';

export default class ChatSettings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...props.settings,
      error: false
    };

    this.onSettingChange = this.onSettingChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSettingChange(e) {
    const { id, type, value, checked } = e.target;
    this.setState({
      [id]: type == 'checkbox' ? checked : value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    if (!(this.state.host && this.state.port && this.state.user)) {
      this.setState({
        error: true
      });
      return;
    }

    this.props.onSubmit && this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form className="c-settings" onSubmit={this.onSubmit}>
        {this.state.error && <span className="c-settings__error">Please specify host, port, and username</span>}
        <div className="c-settings__field">
          <label htmlFor="host">Host</label>
          <input type="text" id="host" value={this.state.host} onChange={this.onSettingChange}/>
        </div>
        <div className="c-settings__field">
          <label htmlFor="port">Port</label>
          <input type="number" id="port" value={this.state.port} onChange={this.onSettingChange}/>
        </div>
        <div className="c-settings__field">
          <label htmlFor="user">Username</label>
          <input type="text" id="user" value={this.state.user} onChange={this.onSettingChange}/>
        </div>
        <div className="c-settings__field">
          <label htmlFor="theme">Theme</label>
          <select id="theme" onChange={this.onSettingChange} value={this.state.theme}>
            {['default', 'hacker'].map((theme, i) => {
              return <option key={i} value={theme}>{theme}</option>
            })}
          </select>
        </div>
        <div className="c-settings__field">
          <label htmlFor="timestamps">Show timestamps</label>
          <input type="checkbox" id="timestamps" checked={this.state.timestamps} onChange={this.onSettingChange}/>
        </div>
        <button className="c-settings__submit" type="submit">Apply Settings</button>
      </form>
    );
  }
}
