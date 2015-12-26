import React, { Component } from 'react';

export default class UserList extends Component {
  render() {
    return (
      <div className="user-list">
        <h2>Users</h2>
        <ul>
          {this.props.users.map((user, i) => {
            return <li key={i}>{user}</li>;
          })}
        </ul>
      </div>
    );
  }
}