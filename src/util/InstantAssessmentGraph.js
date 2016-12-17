/**
 * Created by bharatbatra on 12/16/16.
 */
const NUM_OPTIONS = 5;

export function initGraph() {
  return [
    {
      key: "first attempt",
      values:
        [
          {
            "label" : "A" ,
            "value" : 0
          } ,
          {
            "label" : "B" ,
            "value" : 0
          } ,
          {
            "label" : "C" ,
            "value" : 0
          } ,
          {
            "label" : "D" ,
            "value" : 0
          } ,
          {
            "label" : "E" ,
            "value" : 0
          }]
    }
  ];
}

export function countsToDatum(counts, numberAnswered) {
  if(numberAnswered === 0){
    return initGraph();
  }
  return [
    {
      key: "first attempt",
      values:
        [
          {
            "label" : "A" ,
            "value" : (counts[0] / numberAnswered) * 100
          } ,
          {
            "label" : "B" ,
            "value" : (counts[1] / numberAnswered) * 100
          } ,
          {
            "label" : "C" ,
            "value" : (counts[2] / numberAnswered) * 100
          } ,
          {
            "label" : "D" ,
            "value" : (counts[3] / numberAnswered) * 100
          } ,
          {
            "label" : "E" ,
            "value" : (counts[4] / numberAnswered) * 100
          }]
    }
  ];
}

export function reduceAnswersToCounts(answers){
  let counts = [];
  for( let i = 0; i < NUM_OPTIONS; i++) { counts[i] = 0; }

  if( !answers || answers.length === 0){
    return counts;
  }

  try {
    answers.reduce( (acc, c) => {
      counts[c.optionIndex] += 1;
    }, counts);
  }
  catch (e) {
    console.error("[ERROR] in InstantAssessmentGraph Util > reduceAnswersToCounts : " + e );
  }

  return counts;
}