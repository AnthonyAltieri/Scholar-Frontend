const Socket = (state = {}, action) => {
  switch (action.type) {
    case 'SOCKET_CONNECT': {
      return {
        pusher: action.pusher,
      }
    }

    case 'SOCKET_DISCONNECT': {
      return {
        pusher: null,
      }
    }

    default: {
      return state;
    }
  }
}

export default Socket;
