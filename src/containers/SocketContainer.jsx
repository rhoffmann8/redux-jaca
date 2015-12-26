import { init, userJoin, userLeave, messageRecv } from '../actions';

const CONNECT = 'connect';
const DISCONNECT = 'disconnect';
const INIT = 'init';
const USER_JOIN = 'user:join';
const USER_LEAVE = 'user:leave';
const MESSAGE_RECV = 'message';

export default class SocketContainer {
  constructor(props) {
    this.props = props;

    const { io, host, port } = this.props;

    var socket = io(`http://${host}:${port}`);
    this.props.socket = socket;

    this.initListeners();

    socket.connect();
  }

  getSocket() {
    return this.props.socket;
  }

  destroy() {
    this.props.socket.disconnect();
    this.removeListeners();
  }

  initListeners() {
    const { socket, dispatch } = this.props;

    this.listeners = {
      [CONNECT]: function() {},
      [DISCONNECT]: function() {
        dispatch(messageRecv({
          type: 'system',
          timestamp: Date.now(),
          text: 'Disconnected from host'
        }));
      },
      [INIT]: function(info) {
        dispatch(init(info));
      },
      [USER_JOIN]: function(user) {
        dispatch(userJoin(user));
      },
      [USER_LEAVE]: function(msg) {
        dispatch(userLeave(msg));
      },
      [MESSAGE_RECV]: function(msg) {
        dispatch(messageRecv(msg));
      }
    };

    socket.on(CONNECT, this.listeners[CONNECT]);
    socket.on(DISCONNECT, this.listeners[DISCONNECT]);
    socket.on(INIT, this.listeners[INIT]);
    socket.on(USER_JOIN, this.listeners[USER_JOIN]);
    socket.on(USER_LEAVE, this.listeners[USER_LEAVE]);
    socket.on(MESSAGE_RECV, this.listeners[MESSAGE_RECV]);
  }

  removeListeners(){
    const { socket } = this.props;
    for (let listener in this.listeners) {
      socket.removeListener(listener, this.listeners[listener]);
    }
  }
}