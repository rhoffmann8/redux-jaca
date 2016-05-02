import expect from 'expect';
import * as settingsActions from '../app/actions/settings';
import * as messageActions from '../app/actions/messages';
import * as userActions from '../app/actions/users';
import * as socketActions from '../app/actions/socket';

import messages from '../app/reducers/messages';
import settings from '../app/reducers/settings';
import users from '../app/reducers/users';
import socket from '../app/reducers/socket';

const mockSocket = {
  connect: () => {},
  emit: (...args) => { console.log.apply(null, ['emit'].concat(args)); },
  removeAllListeners: () => {},
  disconnect: () => {}
}

describe('reducers', () => {
  describe('messages reducer', () => {
    it('should should return initial state', () => {
      expect(messages(undefined, {})).toEqual([]);
    })
    it('should handle MSG_RECV', () => {
      const now = Date.now();
      expect(messages([], {
        type: messageActions.MSG_RECV,
        messageData: {
          type: 'user',
          user: 'TestUser',
          text: 'Test message',
          timestamp: now
        }
      })).toEqual([{
        type: 'user',
        user: 'TestUser',
        text: 'Test message',
        timestamp: now
      }])
    })
    it('should handle SOCKET_CONNECT_SUCCESS', () => {
      expect(messages([], {
        type: socketActions.SOCKET_CONNECT_SUCCESS
      })).toEqual([{
        type: 'system',
        text: 'Connected to server'
      }])
    })
    it('should handle SOCKET_CONNECT_FAILURE', () => {
      expect(messages([], {
        type: socketActions.SOCKET_CONNECT_FAILURE
      })).toEqual([{
        type: 'system',
        text: 'Connection failed'
      }])
    })
  })
  describe('settings reducer', () => {
    it('should return initial state', () => {
      const initialState = {
        isOpen: true,
        host: 'localhost',
        port: 8081,
        timestamps: false,
        theme: 'default',
        user: ''
      };
      expect(settings(undefined,{})).toEqual(initialState);
    })
    it('should handle TOGGLE_SETTINGS', () => {
      expect(settings({
        isOpen: true
      }, {
        type: settingsActions.TOGGLE_SETTINGS
      })).toEqual({
        isOpen: false
      })
    })
    it('should handle APPLY_SETTINGS', () => {
      expect(settings({
        isOpen: true
      },{
        type: settingsActions.APPLY_SETTINGS,
        settings: {
          host: 'www.example.com',
          port: 3000,
          user: 'Bob',
          theme: 'hacker',
          timestamps: true
        }
      })).toEqual({
        isOpen: false,
        host: 'www.example.com',
        port: 3000,
        user: 'Bob',
        theme: 'hacker',
        timestamps: true
      })
    })
  })
  describe('users reducer', () => {
    it('should return initial state', () => {
      const initialState = {
        self: null,
        list: []
      };
      expect(users(undefined, {})).toEqual(initialState);
    })
    it('should handle USER_JOIN', () => {
      const userList = ['TestUser', 'TestUser1'];
      expect(users({
        self: null,
        list: []
      },{
        type: userActions.USER_JOIN,
        userList
      })).toEqual({
        self: null,
        list: userList
      })
    })
    it('should handle USER_LEAVE', () => {
      const userList = ['TestUser', 'TestUser1'];
      expect(users({
        self: null,
        list: []
      },{
        type: userActions.USER_LEAVE,
        userList
      })).toEqual({
        self: null,
        list: userList
      })
    })
    it('should handle USER_RENAME', () => {
      const name = 'TestUser';
      expect(users({
        self: null,
        list: []
      },{
        type: userActions.USER_RENAME,
        name
      })).toEqual({
        self: {
          name: 'TestUser'
        },
        list: []
      })
    })
  })
  describe('socket reducer', () => {
    it('should return initial state', () => {
      const initialState = {
        socket: null,
        status: 'pending'
      };
      expect(socket(undefined,{})).toEqual(initialState);
    })
    it('should handle SOCKET_CONNECT_SUCCESS', () => {
      expect(socket({
        socket: null,
        status: 'pending'
      },{
        type: socketActions.SOCKET_CONNECT_SUCCESS,
        socket: mockSocket
      })).toEqual({
        socket: mockSocket,
        status: 'success'
      })
    })
    it('should handle SOCKET_CONNECT_FAILURE', () => {
      expect(socket({
        socket: null,
        status: 'pending'
      },{
        type: socketActions.SOCKET_CONNECT_FAILURE
      })).toEqual({
        socket: null,
        status: 'failure'
      })
    })
    it('should handle SOCKET_DISCONNECT', () => {
      expect(socket({
        socket: mockSocket,
        status: 'success'
      },{
        type: socketActions.SOCKET_DISCONNECT
      })).toEqual({
        socket: null,
        status: 'pending'
      })
    })
  })
})