import React from 'react';

export default class InputField extends React.Component {
  static propTypes = {
    type: function(props, propName, componentName) {
      const validTypes = ['text', 'textarea', 'email', 'password', 'checkbox', 'select'];
      if (validTypes.indexOf(props.input.type) == -1) {
        return new Error('Invalid input type passed to InputField');
      }
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.input.value
    };
  }

  onChange(e) {
    const { input } = this.props;
    
    if (input.type == 'checkbox') {
      this.setState({
        value: e.target.checked
      });
    } else {
      this.setState({
        value: e.target.value
      });
    }
  }

  render() {
    const { label, input } = this.props;
    const validTypes = ['text', 'textarea', 'email', 'password', 'checkbox'];

    return (
      <div className="settings-field">
        <label htmlFor={label.for}>{label.text}</label>
        {(() => {
          if (input.type == 'select') {
            return (
              <select
                id={input.id}
                name={input.name}
                value={this.state.value}
                style={input.style}
                onChange={this.onChange.bind(this)}
              >
              {input.options && input.options.map((option, i) => {
                return <option key={i} value={option.value}>{option.text}</option>
              })}
              </select>
            );
          } else {
            return (
              <input 
                id={input.id}
                type={input.type}
                name={input.name} 
                checked={input.type == 'checkbox' ? this.state.value : null}
                value={this.state.value}
                style={input.style}
                onChange={this.onChange.bind(this)}
              />
            );
          }
        })()}
      </div>
    );
  }
}