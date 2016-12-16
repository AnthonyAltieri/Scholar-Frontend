/**
 * Created by bharatbatra on 12/15/16.
 */
export const receivedActiveAlerts = (activeAlerts, attendance, graph) => {
  return {
    type: 'RECEIVED_ACTIVE_ALERTS',
    activeAlerts,
    attendance,
    graph
  }
};

export const updateActiveAlertsStudent = (activeAlerts, attendance, graph) => {
  return {
    type: 'UPDATE_ACTIVE_ALERTS_STUDENT',
    activeAlerts,
    attendance
  }
};