import { post } from './Ajax';

const routes = {
  CREATE: '/api/bankedAssessment/create',
  EDIT_BY_ID: '/api/bankedAssessment/edit/id',
  GET_BY_BANKID: '/api/bankedAssessment/get/bankId',
  CLEAR_OPTION: '/api/bankedAssessment/clear/option',
  EDIT_TAGS: '/api/bankedAssessment/edit/tags/id',
  REMOVE: '/api/bankedAssessment/remove/id'
};

export async function create(
  question,
  options,
  tags,
  created,
  courseId,
  bankId,
  userId,
) {
  try {
    return await post(
      routes.CREATE,
      {
        question,
        tags,
        options,
        created,
        courseId,
        bankId,
        userId,
      }
    )
  } catch (e) {
    console.error('[ERROR] BankedAssessment create', e);
    return null;
  }
}

export async function editById(
  bankedAssessmentId,
  questionEdit,
  optionsEdit
) {
  try {
    return await post(
      routes.EDIT_BY_ID,
      {
        bankedAssessmentId,
        questionEdit,
        optionsEdit,
      }
    );
  } catch (e) {
    console.error('[ERROR] BankedAssessment editById', e);
    return null;
  }
}

export async function getByBankId(bankId) {
  try {
    return await post(routes.GET_BY_BANKID, { bankId });
  } catch (e) {
    console.error('[ERROR] BankedAssessment getByBankId', e);
    return null;
  }
}

export async function clearOption(index, bankedAssessmentId) {
  try {
    return await post(
      routes.CLEAR_OPTION,
      { index, bankedAssessmentId }
    )
  } catch (e) {
    console.error('[ERROR] BankedAssessment clearOption', e);
    return null;
  }
}

export async function editTags(tags, bankedAssessmentId) {
  try {
    return await post(
      routes.EDIT_TAGS,
      { bankedAssessmentId, tags }
    );
  } catch (e) {
    console.error('[ERROR] BankedAssessment Api editTags', e);
    return { error: true };
  }
}

export async function remove(bankedAssessmentId) {
  try {
    return await post(routes.REMOVE, { bankedAssessmentId });
  } catch (e) {
    console.error('[ERROR] BankedAssessment Api remove', e);
    return { error: true };
  }
}
