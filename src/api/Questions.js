/**
 * @author Anthony Altieri on 9/30/16.
 */

import { post, postAbsoluteUrl } from './Ajax';
const ML_SERVER = "http://54.70.189.112:8888";
// const ML_SERVER = "http://localhost:8888";
const QUESTION_SIMILARITY_PATH = "/similarity";
const DEFAULT_SIMILARITY_THRESHOLD = 0.65;
const ROUTER_PREFIX = '/api/question';

const routes = {
  GET_COURSE_SESSION: `${ROUTER_PREFIX}/get/courseSession`,
  DISMISS: `${ROUTER_PREFIX}/dismiss`,
  ENDORSE_ADD: `${ROUTER_PREFIX}/endorse/add`,
  ENDORSE_REMOVE: `${ROUTER_PREFIX}/endorse/remove`,
};

/**
 * Get the questions trees from a course session
 *
 * @param courseSessionId
 * @returns { error, questions }
 */
export async function fetchQuestions(courseSessionId) {
  try {
    return await post(
      routes.GET_COURSE_SESSION,
      { courseSessionId }
    )
  } catch (e) {
    console.error('[ERROR] fetch questions', e);
    return null;
  }
}

export async function dismiss(questionId, courseSessionId) {
  try {
    return await post(
      routes.DISMISS,
      { questionId, courseSessionId },
    );
  } catch (e) {
    console.error('[ERROR] dismiss question', e);
    return null;
  }
}

export async function endorseAdd(
  userId,
  questionId,
  courseSessionId,
) {
  try {
    return await post(
      routes.ENDORSE_ADD,
      { userId, questionId, courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] Question Api endorseAdd', e);
    return null;
  }
};

export async function endorseRemove(
  userId,
  questionId,
  courseSessionId,
) {
  try {
    return await post(
      routes.ENDORSE_REMOVE,
      { userId, questionId, courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] Question Api endorseRemove', e);
    return null;
  }
}

/*
TODO: Question Utility: Extract into Util
 */
/*
 Formats the questionlist into the desired form for similarity comparison
 */
function formatQuestionListContents(questionList){
  let str = "";
  if(questionList){
    questionList.forEach(q => {
      str+=q.content;
      str+="%";
    });
  }

  return str;
}

//returns -1 on fail
export async function checkSimilarity(questionContent, questionList, threshold = DEFAULT_SIMILARITY_THRESHOLD) {
 try{
   let params = {string1: questionContent, string2: formatQuestionListContents(questionList), threshold: threshold }
   return await postAbsoluteUrl(ML_SERVER+QUESTION_SIMILARITY_PATH, params);
 }
 catch (e) {
   console.error('[ERROR] Question Api > checkSimilarity', e);
   return -1;
 }

}
