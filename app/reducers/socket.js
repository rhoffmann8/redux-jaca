import {
  SOCKET_CONNECT_SUCCESS,
  SOCKET_CONNECT_FAILURE,
  SOCKET_DISCONNECT
} from '../actions/socket';

export default function socket(state = {
  socket: null,
  status: 'pending'
}, action) {
  switch (action.type) {
    case SOCKET_CONNECT_SUCCESS:
      return {
        socket: action.socket,
        status: 'success'
      };
    case SOCKET_CONNECT_FAILURE:
      return {
        socket: null,
        status: 'failure'
      };
    case SOCKET_DISCONNECT:
      return {
        socket: null,
        status: 'pending'
      };
    default:
      return state;
  }
}