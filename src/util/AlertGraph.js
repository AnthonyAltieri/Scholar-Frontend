/**
 * Created by bharatbatra on 12/13/16.
 */
import { getActiveAlerts } from '../api/Alert'
/*
Constants for the alert Graph initialization
 */
export const INTERVAL_TIME = 5000;//1 request per second
// export const INTERVAL_TIME = 10000000000;
const TOTAL_MINUTES = 10;//the amount we want to show the instructor
const TOTAL_TIME = TOTAL_MINUTES * 60000;//convert from minutes to milliseconds
export const NUM_DATAPOINTS = TOTAL_TIME / INTERVAL_TIME;
const STEP_SIZE = Number((TOTAL_MINUTES / NUM_DATAPOINTS));
const COLOR_BLUE = '#7777ff';
const COLOR_GREEN = '#42AFAC';
const COLOR_RED = '#FC539C';
const DEFAULT_THRESHOLD = 30;

export function initInstructorAlertGraph(currentThreshold = DEFAULT_THRESHOLD) {
  let confusionValues =  [];
  let threshValues = [];

  for(let i = 0; i <= NUM_DATAPOINTS; i++){
    //Start confusion at 0
    confusionValues.push({
      x : Number(((-1) * (TOTAL_MINUTES) + (i) * STEP_SIZE).toFixed(2)),
      y : 0
    });

    //Initialize threshold line to be constant at initial threshold
    threshValues.push({
      x : Number(((-1) * (TOTAL_MINUTES) + (i) * STEP_SIZE).toFixed(2)),
      y : currentThreshold
    });
  }

  return[
    {
      values : confusionValues,
      key : 'Live Confusion',
      color : COLOR_BLUE,
      area : true
    },
    {
      values : threshValues,
      key : 'Confusion Threshold',
      color : COLOR_GREEN
    }
  ];
}

export async function getAlerts(courseSessionId) {

  try {
    const payload = await getActiveAlerts(courseSessionId);


    const { activeAlerts, error }  = payload;

    if( !!error ) {
      console.error("[ERROR] in util/AlertGraph > getAlerts : " + error);
      return null;
    }
    else {
      return activeAlerts;
    }
  } catch (e) {
    console.log("[ERROR] in util/AlertGraph > getAlerts : " + e)
  }

}


export function updateInstructorAlertGraph(graph, activeAlerts, attendance, currentThreshold = DEFAULT_THRESHOLD) {
try {

  let returnGraph = graph;

  if (( activeAlerts / attendance * 100 ) >= currentThreshold) {
    returnGraph[0].color = COLOR_RED;
  }
  else {
    returnGraph[0].color = COLOR_BLUE;
  }

  let i = 0;

  //slide the window forward by shifting values left one datapoint on the x axis
  for (i; i < graph.length; i++) {
    for(let j = 0; j< returnGraph[i].values.length - 1 ; j++){
      returnGraph[i].values[j].y = returnGraph[i].values[j+1].y;
    }
  }

  let mostRecentConfusionPercentage = (activeAlerts / attendance) * 100;

  /*
   Accounting for NUll Value Bugs
   */
  if (!mostRecentConfusionPercentage) {
    mostRecentConfusionPercentage = 0;
  }

  if (!currentThreshold) {
    currentThreshold = 0;
  }
  returnGraph[0].values[returnGraph[0].values.length-1].y = mostRecentConfusionPercentage;
  returnGraph[1].values[returnGraph[1].values.length-1].y = currentThreshold;

}
catch (e) {
  console.error("[ERROR] in AlertGraph Util > updateAlertGraph() : " + e);
}
  return graph;
}
