import React from 'react';
import { connect } from 'react-redux';

export default class ChatUserList extends React.Component {

  constructor(props) {
    super(props);
  }

  renderUsers() {
    const users = this.props.users || [];

    return users.map((user, i) => {
      return <li key={i} className="c-chat__user">{user}</li>;
    });
  }

  render() {
    return (
      <div className="c-chat__users">
        <h1>Users</h1>
        <ul className="c-chat__user-list">
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
}
