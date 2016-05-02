import { combineReducers } from 'redux';
import users from './users';
import messages from './messages';
import settings from './settings';
import socket from './socket';

export default combineReducers({
  users,
  messages,
  settings,
  socket
});