const initialState = {
  connectionStatus: 'DISCONNECTED',
};

const Socket = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SOCKET_CONNECTION_STATUS': {
      return {
        connectionStatus: action.connectionStatus,
      }
    }

    default: {
      return state;
    }
  }
};

export default Socket;
