import { post } from '../api/Ajax';

const ROUTE_TO_SERVICE = 'test';

/**
 * [apply description]
 * @param  {Object[]}  answers Student Answers
 * @param  {Object[]}  reviews [description]
 * @return {Object[]}         [description]
 */
export async function apply(answers, reviews) {
  try {
    return await post(ROUTE_TO_SERVICE, { answers });
  } catch (e) {
    console.error('[ERROR] QuestionClustering apply', e);
    return null;
  }
}
