export const connect = (pusher)  => ({
  type: 'SOCKET_CONNECT',
  pusher,
});

export const disconnect = () => ({
  type: 'SOCKET_DISCONNECT',
});

export const addChannel = (name, value) => ({
  type: 'ADD_CHANNEL',
  name,
  value,
});

export const removeChannel = (name) => ({
  type: 'REMOVE_CHANNEL',
  name,
});
