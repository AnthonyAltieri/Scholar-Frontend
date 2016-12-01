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
}

function bind(channelName, event, callback) {
  const channel = channels[channelName];
  if (!channel) {
    throw new Error(`Channel ${channelName} does not exist.`);
  }
  channel.bind(event, callback);
}

export default {
  connect,
  subscribe,
  bind,
}


