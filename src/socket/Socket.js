/**
 * @author Anthony Altieri on 11/12/16.
 */

var pusher;
var channels = {};

function connect() {
  window.pusher = new Pusher(
    'be327c8cfdbd733ab9e5',
    {
      authTransport: 'jsonp',
      authEndpoint: 'http://localhost:7000/pusher/auth'
    }
  );
}

function subscribe(name) {
  if (!window.pusher) connect();
  channels[name] = window.pusher.subscribe(name);
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
  if (!console.group) {
    console.log('[SOCKET] bind to ' + channelName + ' | ' + event);
  } else {
    console.group('[SOCKET] - bind');
    console.log('%c Channel Name', 'color: blue', channelName);
    console.log('%c Event', 'color: green', event);
    console.groupEnd();
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

function determineConnectionStatus(channelName, requiredEvents) {
  // If there is no channelName that means we don't need to be connected
  // to anything right now
  if (channelName === null) {
    return {
      status: 'NONE',
      reason: process.env.NODE_ENV !== 'production'
        ? 'channelName is null'
        : '',
    };
  }
  const pusher = window.pusher;
  // If there is no pusher object we are disconnected
  if (!pusher) {
    return {
      status: 'DISCONNECTED',
      reason: process.env.NODE_ENV !== 'production'
        ? 'pusher is falsey'
        : '',
    };
  }
  // If there are no channels in the pusher object we are disconnected
  if (!pusher.channels) {
    return {
      status: 'DISCONNECTED',
      reason: process.env.NODE_ENV !== 'production'
        ? 'pusher.channels is falsey'
        : '',
    };
  }
  // Get the names of the channels that are subscribed to now
  const channelNames = Object.keys(pusher.channels.channels);
  // If there are none we are disconnected
  if (!channelNames) {
    return {
      status: 'DISCONNECTED',
      reason: process.env.NODE_ENV !== 'production'
        ? 'channelNames is falsey'
        : '',
    };
  }
  // Determine if we are connected to the provided channelName
  // if not, we are disconnected
  if (!channelNames.filter(cn => cn === channelName)[0]) {
    return {
      status: 'DISCONNECTED',
      reason: process.env.NODE_ENV !== 'production'
        ? `not connected to channelName: ${channelName}`
        : '',
    };
  }
  // Get that channel if we are
  const channel = pusher.channels.channels[channelName];
  // Determine the events we are bound to, events are stored
  // as `callbacks` in pusher
  const callbackNames = Object
    .keys(channel.callbacks._callbacks)
    .map(cb => cb.split('').slice(1).reduce((a, c) => a + c));
  // If we are missing being bound from at least one of these events
  // we are only partially connected
  Object.keys(requiredEvents)
    .map(k => requiredEvents[k])
    .forEach((re) => {
    if (!callbackNames.filter(cbn => cbn === re.name)) {
      return {
        status: 'PARTIAL',
        reason: process.env.NODE_ENV !== 'production'
          ? 'missing a bound event'
          : '',
      };
    }
  });
  // If we are subscribed to the channel and bound to every event
  // that we need to be bound to we are connected
  return {
    status: 'CONNECTED',
    reason: process.env.NODE_ENV !== 'production'
      ? 'nothing went wrong'
      : '',
  };
}

function bindAllEvents(events, channelName) {
  const keys = Object.keys(events);
  keys.forEach((key) => {
    const event = events[key];
    bind(
      channelName,
      event.name,
      event.handler
    )
  });
}

function getEventNamesConnected(channelName) {
  const pusher = window.pusher;
  if (!pusher) return [];
  const channel = pusher.channels.channels[channelName];
  if (!channel) return [];
  return Object
    .keys(channel.callbacks._callbacks)
    .map(cb => cb.split('').slice(1).reduce((a, c) => a + c));
}

export default {
  connect,
  subscribe,
  bind,
  disconnect,
  getPusher,
  determineConnectionStatus,
  bindAllEvents,
  getEventNamesConnected,
}
