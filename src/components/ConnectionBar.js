
import React, { Component } from 'react';
import Socket from '../socket/Socket';
import Events from '../socket/Events';

function reconnectDisconnectedSockets(
  isCourseSessionActive,
  courseSessionId,
  eventsConnected,
  requiredEvents,
) {
  // Get the array of events
  const events = Object
    .keys(requiredEvents)
    .map(k => requiredEvents[k]);
  if (isCourseSessionActive) {
    // Calculate which events are connected
    const notConnected = events.reduce((a, c) => {
      if (!eventsConnected.filter(e => e === c.name)[0]) {
        return [...a, c]
      }
      return a;
    }, []);
    Socket.bindAllEvents(notConnected, `private-${courseSessionId}`);
  }
}


const secondsToMili = seconds => seconds * 1000;
const INTERVAL_TIME = process.env.NODE_ENV === 'production'
  ? secondsToMili(3)
  : secondsToMili(10);

class ConnectionBar extends Component {
  componentDidMount() {
    const {
      isCourseSessionActive,
      courseSessionId,
      requiredEvents,
      connectionStatus,
      setConnectionStatus,
    } = this.props;
    try {
      // Determine new connection status
      const result = Socket.determineConnectionStatus(
        `private-${courseSessionId}`,
        requiredEvents
      );
      console.log('result', result);
      const newConnectionStatus = result.status;
      console.log('newConnectionStatus', newConnectionStatus);

      if (process.env.NODE_ENV !== 'production') {
        console.group('[SOCKET] - Status');
        console.log('%c Connection Status', 'color: blue', newConnectionStatus);
        console.log('%c Reason', 'color: green', result.reason);
        console.groupEnd();
      }
      // If that is not the same as it used to be, change it
      if (newConnectionStatus !== connectionStatus) {
        setConnectionStatus(newConnectionStatus);
      }
      if (newConnectionStatus === 'DISCONNECTED'
        || newConnectionStatus === 'PARTIAL') {
        reconnectDisconnectedSockets(
          isCourseSessionActive,
          courseSessionId,
          Socket.getEventNamesConnected(`private-${courseSessionId}`),
          requiredEvents,
        )
      }
    } catch (e) {
      console.error('[ERROR] socketConnectionInterval', e);
    }
    window.socketConnectionInterval = window.setInterval(() => {
      try {
        // Determine new connection status
        let result = Socket
          .determineConnectionStatus(
            `private-${courseSessionId}`,
            requiredEvents
          );
        const newConnectionStatus = result.status;
        if (process.NODE_ENV !== 'production') {
          console.group('[SOCKET] - Status');
          console.log('%c Connection Status', 'color: blue', newConnectionStatus);
          console.log('%c Reason', 'color: green', result.reason);
          console.groupEnd();
        }
        // If that is not the same as it used to be, change it
        if (newConnectionStatus !== connectionStatus) {
          setConnectionStatus(newConnectionStatus);
        }
        if (newConnectionStatus === 'DISCONNECTED'
          || newConnectionStatus === 'PARTIAL') {
          reconnectDisconnectedSockets(
            isCourseSessionActive,
            courseSessionId,
            Socket.getEventNamesConnected(`private-${courseSessionId}`),
            requiredEvents,
          )
        }
      } catch (e) {
        console.error('[ERROR] socketConnectionInterval', e);
      }
    }, INTERVAL_TIME);
  }

  componentWillUnmount() {
    if (!!window.socketConnectionInterval) {
      window.clearInterval(window.socketConnectionInterval);
    }
  }

  render() {
    const {
      connectionStatus,
      isCourseSessionActive,
    } = this.props;
    let statusText = 'disconnected';
    if (connectionStatus === 'DISCONNECTED' || !isCourseSessionActive) {
      statusText = 'disconnected';
    } else if (connectionStatus === 'PARTIAL') {
      statusText = 'partial';
    } else if (connectionStatus === 'CONNECTED') {
      statusText = 'connected';
    } else {
      throw new Error(`Invalid Socket status ${connectionStatus}`);
    }
    return (
      <div className={`connection-bar ${statusText}`}>
        <p>
          <span
            style={{
              fontWeight: 300,
              marginRight: 4,
            }}
          >
            Connection Status:
          </span>
          {statusText}
        </p>
      </div>
    );
  }
}

export default ConnectionBar;
