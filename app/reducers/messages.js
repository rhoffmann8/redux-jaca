import {
  SOCKET_CONNECT_SUCCESS,
  SOCKET_CONNECT_FAILURE,
  SOCKET_DISCONNECT
} from '../actions/socket';

import { MSG_SEND, MSG_RECV } from '../actions/messages';

export default function messages(state = [], action) {
  switch (action.type) {
    case MSG_RECV:
      return [
        ...state,
        action.messageData
      ];
    case SOCKET_CONNECT_SUCCESS:
      return [
        ...state,
        {
          type: 'system',
          text: 'Connected to server'
        }
      ]
    case SOCKET_CONNECT_FAILURE:
      return [
        ...state,
        {
          type: 'system',
          text: 'Connection failed'
        }
      ]
    case SOCKET_DISCONNECT:
      return [
        ...state,
        {
          type: 'system',
          text: 'Disconnected from server'
        }
      ];
    default:
      return state;
  }
}