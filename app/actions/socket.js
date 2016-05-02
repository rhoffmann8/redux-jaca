import io from 'socket.io-client';

// export const SOCKET_INIT = 'SOCKET_INIT';
export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const SOCKET_CONNECT_SUCCESS = 'SOCKET_CONNECT_SUCCESS';
export const SOCKET_CONNECT_FAILURE = 'SOCKET_CONNECT_FAILURE';
export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';

import { userJoin, userLeave } from './users';
import { receiveMessage } from './messages';

const socketioActions = {
  userJoin: 'user:join',
  userLeave: 'user:leave',
  userRename: 'user:rename',
  receiveMessage: 'message'
};

export function socketDisconnect() {
  return (dispatch, getState) => {
    const { socket } = getState().socket;

    if (socket) {
      // remove listeners
      socket.removeAllListeners('user:join');
      socket.removeAllListeners('user:leave');
      socket.removeAllListeners('message');

      socket.disconnect();
    }

    dispatch({
      type: SOCKET_DISCONNECT
    });
  }
}

export function socketConnect() {
  return (dispatch, getState) => {
    const { host, port } = getState().settings;
    const socket = io.connect(`http://${host}:${port}`, {
      reconnection: false
    });

    socket.on('connect', () => {
      dispatch({
        type: SOCKET_CONNECT_SUCCESS,
        socket
      });
    }).on('connect_error', () => {
      dispatch({
        type: SOCKET_CONNECT_FAILURE
      });
    });

    // set up listeners
    socket.on('user:join', (...args) => { dispatch(userJoin.apply(null, args)); });
    socket.on('user:leave', (...args) => { dispatch(userLeave.apply(null, args)); });
    socket.on('message', (...args) => { dispatch(receiveMessage.apply(null, args)); });

    dispatch({
      type: SOCKET_CONNECT
    });
  };
}