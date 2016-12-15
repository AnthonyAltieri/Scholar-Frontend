/**
 * Created by bharatbatra on 12/13/16.
 */

/*
Constants for the alert Graph initialization
 */
const INTERVAL_TIME = 3000;//1 request every 3 seconds
const TOTAL_MINUTES = 10;//the amount we want to show the instructor
const TOTAL_TIME = TOTAL_MINUTES * 60000;//convert from minutes to milliseconds
const NUM_DATAPOINTS = TOTAL_TIME / INTERVAL_TIME;
const STEP_SIZE = Number((TOTAL_MINUTES / NUM_DATAPOINTS).toFixed(2));
const COLOR_BLUE = '#7777ff';
const COLOR_GREEN = '#42AFAC';
const DEFAULT_THRESHOLD = 10;

export function initAlertGraph(currentThreshold = DEFAULT_THRESHOLD) {
  let confusionValues =  [];
  let threshValues = [];

  for(let i = 0; i <= NUM_DATAPOINTS; i++){
    //Start confusion at 0
    confusionValues.push({
      x:Number(((-1) * (TOTAL_MINUTES) + (i) * STEP_SIZE).toFixed(2)),
      y:0
    });

    //Initialize threshold line to be constant at initial threshold
    threshValues.push({
      x:Number(((-1) * (TOTAL_MINUTES) + (i) * STEP_SIZE).toFixed(2)),
      y:currentThreshold
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

export function updateAlertGraph(currentThreshold = DEFAULT_THRESHOLD) {
  const promiseGetAlertsInWindow = window.setInterval(() => {
    ServerService.post(CourseSessionRoutes.ALERTS_GET_NUMBER_ACTIVE, {
      courseSessionId: vm.courseSession.id
    }, responseSuccess => {
      const { data } = responseSuccess;
      const { success } = data;
      const { activeAlerts }  = data;
      if (success) {
        vm.courseSession.activeAlerts = activeAlerts;

        if((vm.courseSession.activeAlerts/vm.courseSession.attendance*100)>=vm.courseSession.confusionThreshold){
          vm.confusionGraph.data[0].color = '#FC539C';
        }
        else{
          vm.confusionGraph.data[0].color = '#7777ff';
        }

        let str = " STR ";

        let i = 0;

        //for each of the series
        for(i; i<vm.confusionGraph.data.length; i++){
          vm.confusionGraph.data[i].values = vm.confusionGraph.data[i].values.splice(1,(vm.confusionGraph.data[i].values.length-1));
          vm.confusionGraph.data[i].values.forEach(function(val){
            val.x= Number((val.x-STEP_SIZE).toFixed(2));
            str+= val.x + " ; ";
          });
        }


        let mostRecentConfusionPercentage = (vm.courseSession.activeAlerts/vm.courseSession.attendance)*100;
        let mostRecentConfusionThreshold = vm.courseSession.confusionThreshold;

        /*
         Accounting for NUll Value Bugs
         */
        if(!mostRecentConfusionPercentage){
          mostRecentConfusionPercentage = 0;
        }
        if(!mostRecentConfusionThreshold){
          mostRecentConfusionThreshold = 0;
        }
        vm.confusionGraph.data[0].values.push( {x:0, y: mostRecentConfusionPercentage, series : 0});
        vm.confusionGraph.data[1].values.push({x:0, y:mostRecentConfusionThreshold, series: 1});
        writeLocalStorage(vm.courseSession.id+"-confusionData", vm.confusionGraph);



      }
    }, responseFail => {

    });

  }, INTERVAL_TIME);//set at every 15 sec.
  intervalPromises.push(promiseGetAlertsInWindow);
}