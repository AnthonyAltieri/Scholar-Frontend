import { post } from '../Ajax';

const routes = {
  'CREATE': '/api/instantAssessment/create',
  'DEACTIVATE': '/api/instantAssessment/deactivate',
  ANSWER: '/api/instantAssessment/answer',
}

export async function create(
    courseId,
    courseSessionId,
    creatorId,
    question,
    options,
    correctOption,
    bankId = null,
) {
  if (correctOption > (options.length - 1)) {
    throw new Error(`Invalid correct option of ${correctOption}`);
  }
  try {
    return await post(
      routes.CREATE,
      {
        courseId,
        courseSessionId,
        creatorId,
        question,
        options,
        correctOption,
        bankId,
      }
    )
  } catch (e) {
    console.error('[ERROR] Instant Api create', e);
  }
}

export async function deactivate(
  courseSessionId,
  correctOption,
  assessmentId,
) {
  console.log('courseSessionId', courseSessionId);
  console.log('correctOption', correctOption);
  console.log('assessmentId', assessmentId);
  try {
    return await post(
      routes.DEACTIVATE,
      { courseSessionId, correctOption, assessmentId }
    );
  } catch (e) {
    console.error('[ERROR] Instant Api deactivate', e);
  }
}

export async function answer(
  courseSessionId,
  userId,
  assessmentId,
  courseId,
  optionIndex,
) {
  try {
    return await post(
      routes.ANSWER,
      {
        courseSessionId,
        userId,
        assessmentId,
        courseId,
        optionIndex,
      }
    );
  } catch (e) {
    console.error('[ERROR] Instant Api answer', e);
  }
}
