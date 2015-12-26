export const EVENT_INIT = 'EVENT_INIT';
export const EVENT_USER_JOIN = 'EVENT_USER_JOIN';
export const EVENT_USER_LEAVE = 'EVENT_USER_LEAVE';
export const EVENT_USER_RENAME_REQUEST = 'EVENT_USER_RENAME_REQUEST';
export const EVENT_USER_RENAME_RESPONSE = 'EVENT_USER_RENAME_RESPONSE';
export const EVENT_MSG_SEND = 'EVENT_MSG_SEND';
export const EVENT_MSG_RECV = 'EVENT_MSG_RECV';
export const EVENT_LOGIN_REQUEST = 'EVENT_LOGIN_REQUEST';
export const EVENT_LOGIN_RESPONSE = 'EVENT_LOGIN_RESPONSE';
export const EVENT_MSG_REQUEST = 'EVENT_MSG_REQUEST';
export const EVENT_MSG_RESPONSE = 'EVENT_MSG_RESPONSE';
export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS';
export const APPLY_SETTINGS = 'APPLY_SETTINGS';

export const toggleSettings = function() {
  return {
    type: TOGGLE_SETTINGS
  };
}

export const applySettings = function(settings) {
  return {
    type: APPLY_SETTINGS,
    settings
  };
}

export const init = function(userInfo) {
  return {
    type: EVENT_INIT,
    userInfo: userInfo
  };
};

export const login = function(socket, username) {
  return dispatch => {
    dispatch(loginRequest());

    socket.on('user:login', function(info) {
      dispatch(loginResponse(info));
    });
    socket.emit('user:login', username);
  }
}

function loginRequest() {
  return {
    type: EVENT_LOGIN_REQUEST
  };
}

function loginResponse(info) {
  return {
    type: EVENT_LOGIN_RESPONSE,
    userInfo: info
  };
}

export const sendMessage = function(socket, message) {
  return dispatch => {
    dispatch(messageSend(message));
    socket.emit('message', message);
  }
}

export const userJoin = function(users) {
  return {
    type: EVENT_USER_JOIN,
    users: users
  };
}

export const userLeave = function(users) {
  return {
    type: EVENT_USER_LEAVE,
    users: users
  };
}

export const userRename = function(socket, name) {
  return dispatch => {
    dispatch(userRenameRequest());
    socket.on('user:rename', function(name) {
      dispatch(userRenameResponse(name));
    });
    socket.emit('user:rename', name);
  };
}

function userRenameRequest() {
  return {
    type: EVENT_USER_RENAME_REQUEST
  };
}

function userRenameResponse(name) {
  return {
    type: EVENT_USER_RENAME_RESPONSE,
    name: name
  };
}

export const messageRecv = function(message) {
  return {
    type: EVENT_MSG_RECV,
    message: message
  };
}

function messageSend(msg) {
  return {
    type: EVENT_MSG_SEND,
    msg: msg
  };
}