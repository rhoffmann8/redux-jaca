import {
  SOCKET_DISCONNECT
} from '../actions/socket';

import {
  USER_LOGIN,
  USER_JOIN,
  USER_LEAVE,
  USER_RENAME,
} from '../actions/users';

export default function users(state = {
  self: null,
  list: []
}, action) {
	switch (action.type) {
    case USER_LOGIN:
    case USER_RENAME:
      return Object.assign({}, state, {
        self: {
          name: action.name
        }
      });
		case USER_JOIN:
		case USER_LEAVE:
			return Object.assign({}, state, {
        list: action.userList
      });
    case SOCKET_DISCONNECT:
      return {
        self: null,
        list: []
      };
		default:
			return state;
	}
}