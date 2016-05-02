export const USER_LOGIN = 'USER_LOGIN';
export const USER_JOIN = 'USER_JOIN';
export const USER_LEAVE = 'USER_LEAVE';
export const USER_RENAME = 'USER_RENAME';

export function userLogin(name) {
  return (dispatch, getState) => {
    const socket = getState().socket.socket;
    socket.emit('user:login', name);

    dispatch({
      type: USER_LOGIN,
      name
    });
  };
}

export function userJoin(userList) {
  return {
    type: USER_JOIN,
    userList
  };
}

export function userLeave(userList) {
  return {
    type: USER_LEAVE,
    userList
  };
}

export function userRename(name) {
  return (dispatch, getState) => {
    const socket = getState().socket.socket;
    socket.emit('user:rename', name);

    dispatch({
      type: USER_RENAME,
      name
    });
  };
}