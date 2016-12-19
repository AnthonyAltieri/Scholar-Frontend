export const connect = (pusher)  => ({
  type: 'SOCKET_CONNECT',
  pusher,
});

export const disconnect = () => ({
  type: 'SOCKET_DISCONNECT',
});
