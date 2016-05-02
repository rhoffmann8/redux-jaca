export const MSG_RECV = 'MSG_RECV';
export const MSG_SEND = 'MSG_SEND';

export function sendMessage(message) {
  return (dispatch, getState) => {
    const socket = getState().socket.socket;
    socket.emit('message', message);

    dispatch({
      type: MSG_SEND,
      message
    });
  }
}

export function receiveMessage(messageData) {
  return {
    type: MSG_RECV,
    messageData
  };
}