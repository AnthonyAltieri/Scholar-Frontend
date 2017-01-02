/**
 * Created by bharatbatra on 12/15/16.
 */
export const receivedActiveAlerts = (activeAlerts, graph) => {
  return {
    type: 'RECEIVED_ACTIVE_ALERTS',
    activeAlerts,
    graph
  }
};

export const updateActiveAlertsStudent = (activeAlerts) => {
  return {
    type: 'UPDATE_ACTIVE_ALERTS_STUDENT',
    activeAlerts
  }
};