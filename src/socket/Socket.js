/**
 * @author Anthony Altieri on 11/12/16.
 */

var pusher;
var channels = {};

function connect() {
  pusher = new Pusher(
    'be327c8cfdbd733ab9e5',
    {
      authTransport: 'jsonp',
      authEndpoint: 'http://localhost:8000/pusher/auth'
    }
  );
}

function subscribe(name) {
  if (!pusher) connect();
  channels[name] = pusher.subscribe(name);
  if (!console.group) {
    console.log('[SOCKET] subscribed to ' + name);
  } else {
    console.group('[SOCKET]')
    console.log('%c Subscribe To', 'color: red', name);
    console.log('%c Now Subscribed To', 'color: blue', channels);
    console.groupEnd();
  }
}

function bind(channelName, event, callback) {
  const channel = channels[channelName];
  if (!channel) {
    throw new Error(`Channel ${channelName} does not exist.`);
  }
  channel.bind(event, (data) => {
    if (!data) {
      console.log('[SOCKET] data undefined')
      return () => {};
    }
    if (!console.group) {
      console.log(`[SOCKET] channelName: ${channelName} | event: ${event}`);
    } else {
      console.group('[SOCKET]')
      console.log('%c Channel Name', 'color: blue', channelName)
      console.log('%c Event', 'color: green', event)
      console.log('%c Data', 'color: gray', data)
      console.groupEnd();
    }
    return callback(data)
  }
  );
}

function disconnect() {
  if (!pusher) return;
  try {
    unsubscribeAll();
    pusher.disconnect();
  } catch (e) {
    console.error('Socket disconnect', e);
  }
}

function unsubscribeAll() {
  console.log('[SOCKET] unscubscribe all');
  if (!pusher) return;
  const keys = Object.keys(channels);
  keys.forEach(k => { pusher.unsubscribe(k) });
  channels = {};
}

function getPusher() {
  return pusher;
}

function mainTainPersistence() {
  // 2 seconds
  const PERSISTENCE_TIME = 2000;
  window.socketPersistence = window.setInterval(() => {
    try {
      if (!pusher || !pusher.connection.connection) {
        connect();
      }
    } catch (e) {

    }
  }, PERSISTENCE_TIME);
}

function clearPersistenceInterval() {
  if (!!window.socketPersistence) {
    clearInterval(window.socketPersistence);
  }
}


export default {
  connect,
  subscribe,
  bind,
  disconnect,
  getPusher,
  mainTainPersistence,
  clearPersistenceInterval,
}
