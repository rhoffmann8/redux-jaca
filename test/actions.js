import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as settingsActions from '../app/actions/settings';
import * as messageActions from '../app/actions/messages';
import * as userActions from '../app/actions/users';
import * as socketActions from '../app/actions/socket';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const mockSocket = {
  connect: () => {},
  emit: (...args) => { console.log.apply(null, ['emit'].concat(args)); },
  removeAllListeners: () => {},
  disconnect: () => {}
}

describe('actions', () => {
  describe('settings', () => {
    it('should create an action to toggle settings', () => {
      const expectedAction = {
        type: settingsActions.TOGGLE_SETTINGS
      };
      expect(settingsActions.toggleSettings()).toEqual(expectedAction);
    })
    it('should create an action to apply settings', () => {
      const settings = {
        host: 'localhost',
        port: 8000,
        user: 'TestUser',
        theme: 'default',
        timestamps: true
      };
      const expectedAction = {
        type: settingsActions.APPLY_SETTINGS,
        settings
      };
      expect(settingsActions.applySettings(settings)).toEqual(expectedAction);
    })
  })
  describe('messages', () => {
    it('should emit a message and dispatch MSG_SEND', () => {
      const message = 'Test message';
      const expectedActions = [{
        type: messageActions.MSG_SEND,
        message
      }];
      const store = mockStore({
        messages: [],
        socket: {
          socket: mockSocket
        }
      });

      store.dispatch(messageActions.sendMessage(message));
      expect(store.getActions()).toEqual(expectedActions);
    })
    it('should create an action to receive message', () => {
      const messageData = {
        type: 'user',
        user: 'TestUser',
        text: 'Test message',
        timestamp: Date.now()
      };
      const expectedAction = {
        type: messageActions.MSG_RECV,
        messageData
      };
      expect(messageActions.receiveMessage(messageData)).toEqual(expectedAction);
    })
  })
  describe('socket', () => {
    it('should create an action to create a socket', () => {
      const expectedActions = [{
        type: socketActions.SOCKET_CONNECT
      }];
      const store = mockStore({
        settings: {
          host: 'localhost',
          port: 8081
        },
        socket: {
          socket: mockSocket
        }
      });
      store.dispatch(socketActions.socketConnect());
      expect(store.getActions()).toEqual(expectedActions);
    })
    it('should create an action to disconnect the socket', () => {
      const expectedActions = [{
        type: socketActions.SOCKET_DISCONNECT,
      }];
      const store = mockStore({
        socket: {
          socket: mockSocket
        }
      });
      store.dispatch(socketActions.socketDisconnect());
      expect(store.getActions()).toEqual(expectedActions);
    })
  })
  describe('users', () => {
    it('should create an action for user join', () => {
      const userList = ['TestUser', 'TestUser1'];
      const expectedAction = {
        type: userActions.USER_JOIN,
        userList
      };
      expect(userActions.userJoin(userList)).toEqual(expectedAction);
    })
    it('should create an action for user leave', () => {
      const userList = ['TestUser', 'TestUser1'];
      const expectedAction = {
        type: userActions.USER_LEAVE,
        userList
      };
      expect(userActions.userLeave(userList)).toEqual(expectedAction);
    })
    it('should dispatch an action for user login', () => {
      const name = 'TestUser';
      const expectedActions = [{
        type: userActions.USER_LOGIN,
        name
      }];
      const store = mockStore({
        socket: {
          socket: mockSocket
        },
        user: {
          self: null
        }
      });
      store.dispatch(userActions.userLogin(name));
      expect(store.getActions()).toEqual(expectedActions);
    })
    it('should dispatch an action for user rename', () => {
      const name = 'NewTestUser';
      const expectedActions = [{
        type: userActions.USER_RENAME,
        name
      }];
      const store = mockStore({
        socket: {
          socket: mockSocket
        },
        users: {
          self: 'TestUser'
        }
      });
      store.dispatch(userActions.userRename(name));
      expect(store.getActions()).toEqual(expectedActions);
    })
  })
})