import expect from 'expect';
import * as actions from '../src/actions';
import { messages, settings, userInfo, users } from '../src/reducers';

describe('reducers', () => {
  describe('messages reducer', () => {
    it('should return the initial state' , () => {
      expect(messages(undefined, {})).toEqual([])
    });

    it('should handle EVENT_MSG_RECV', () => {
      const now = Date.now();
      expect(messages([], {
        type: actions.EVENT_MSG_RECV,
        message: {
          type: 'user',
          text: 'Test message',
          timestamp: now
        }
      })).toEqual([{
        type: 'user',
        text: 'Test message',
        timestamp: now
      }])
    });
  });

  describe('users reducer', () => {
    it('should return the initial state', () => {
      expect(users(undefined, {})).toEqual([]);
    });

    it('should handle EVENT_USER_JOIN', () => {
      expect(users([], {
        type: actions.EVENT_USER_JOIN,
        users: ['TestUser']
      })).toEqual(['TestUser']);
    });

    it('should handle EVENT_USER_LEAVE', () => {
      expect(users(['TestUser'], {
        type: actions.EVENT_USER_LEAVE,
        users: []
      })).toEqual([]);
    });
  });

  describe('userInfo reducer', () => {
    it('should return the initial state', () => {
      const initialState = {
        loggedIn: false
      };
      expect(userInfo(initialState, {})).toEqual({loggedIn: false});
    });

    it('should handle EVENT_LOGIN_RESPONSE', () => {
      expect(userInfo({
        loggedIn: false
      }, {
        type: actions.EVENT_LOGIN_RESPONSE,
        userInfo: {
          name: 'TestUser1',
          loggedIn: true
        }
      })).toEqual({
        name: 'TestUser1',
        loggedIn: true
      })
    });

    it('should handle EVENT_INIT', () => {
      expect(userInfo({
        loggedIn: false
      }, {
        type: actions.EVENT_INIT,
        userInfo: {
          loggedIn: false
        }
      })).toEqual({
        loggedIn: false
      })
    })

    it('should handle EVENT_USER_RENAME_RESPONSE', () => {
      expect(userInfo({
        loggedIn: true,
        name: 'TestUser1'
      },{
        type: actions.EVENT_USER_RENAME_RESPONSE,
        name: 'TestUser2'
      })).toEqual({
        loggedIn: true,
        name: 'TestUser2'
      })
    })
  });

  describe('settings reducer', () => {
    let initialState;

    beforeEach(() => {
      initialState = {
        isOpen: false,
        name: '',
        host: 'localhost',
        port: 8081,
        theme: 'default',
        timestamps: false
      };
    });

    it('should return initial state', () => {
      expect(settings(initialState, {})).toEqual({
        isOpen: false,
        name: '',
        host: 'localhost',
        port: 8081,
        theme: 'default',
        timestamps: false
      });
    });

    it('should handle TOGGLE_SETTINGS', () => {
      expect(settings(initialState, {
        type: actions.TOGGLE_SETTINGS
      })).toEqual({
        isOpen: true,
        name: '',
        host: 'localhost',
        port: 8081,
        theme: 'default',
        timestamps: false
      })
    });

    it('should handle EVENT_LOGIN_RESPONSE', () => {
      expect(settings(initialState, {
        type: actions.EVENT_LOGIN_RESPONSE,
        userInfo: {
          name: 'TestUser1'
        }
      })).toEqual({
        isOpen: false,
        name: 'TestUser1',
        host: 'localhost',
        port: 8081,
        theme: 'default',
        timestamps: false
      })
    });

    it('should handle APPLY_SETTINGS', () => {
      expect(settings(initialState, {
        type: actions.APPLY_SETTINGS,
        settings: {
          name: 'TestUser1',
          host: 'localhost2',
          port: '8082',
          theme: 'hacker',
          timestamps: true
        }
      })).toEqual({
        isOpen: false,
        name: 'TestUser1',
        host: 'localhost2',
        port: '8082',
        theme: 'hacker',
        timestamps: true
      })
    })
  })
});