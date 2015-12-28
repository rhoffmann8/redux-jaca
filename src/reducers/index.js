import { combineReducers } from 'redux';
import { 
  EVENT_INIT,
  EVENT_MSG_SEND,
  EVENT_MSG_RECV,
  EVENT_USER_JOIN,
  EVENT_USER_LEAVE,
  EVENT_USER_RENAME_RESPONSE,
  EVENT_LOGIN_RESPONSE,
  TOGGLE_SETTINGS,
  APPLY_SETTINGS
} from '../actions';

const initialState = {
  messages: [],
  users: [],
  userInfo: {
    loggedIn: false
  },
  settings: {
    isOpen: false,
    name: '',
    host: require('../../settings').server.host,
    port: require('../../settings').server.port,
    theme: 'default',
    timestamps: false
  }
};

export function messages(state = [], action) {
  switch (action.type) {
    case EVENT_MSG_RECV:
      let newState = [...state, action.message];
      return newState;
    default:
      return state;
  }
};

export function users(state = [], action) {
  switch (action.type) {
    case EVENT_USER_JOIN:
    case EVENT_USER_LEAVE:
      let newState = action.users;
      return newState;
    default:
      return state;
  }
}

export function userInfo(state = initialState.userInfo, action) {
  switch (action.type) {
    case EVENT_LOGIN_RESPONSE:
    case EVENT_INIT:
      return action.userInfo;
    case EVENT_USER_RENAME_RESPONSE:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};

export function settings(state = initialState.settings, action) {
  switch (action.type) {
    case TOGGLE_SETTINGS:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case EVENT_LOGIN_RESPONSE:
      return {
        ...state,
        name: action.userInfo.name,
      };
    case APPLY_SETTINGS:
      return {
        ...state,
        ...action.settings
      };
    default:
      return state;
  }
}

const reducers = combineReducers({
  users,
  messages,
  userInfo,
  settings
});

export default reducers;