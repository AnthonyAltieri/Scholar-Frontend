const initialState = {
  channels: {},
}

const Socket = (state = initialState, action) => {
  switch (action.type) {
    case 'SOCKET_CONNECT': {
      return {
        ...state,
        pusher: action.pusher,
      }
    }

    case 'SOCKET_DISCONNECT': {
      return {
        ...state,
        pusher: null,
        channels: {},
      }
    }

    case 'ADD_CHANNEL': {
      return {
        ...state,
        channels: {
          ...channels,
          [action.name]: action.value,
        }
      }
    }

    case 'REMOVE_CHANNEL': {
      return {
        ...state,
        channels: {
          ...channels,
          [action.name]: null,
        }
      }
    }

    default: {
      return state;
    }
  }
}

export default Socket;
