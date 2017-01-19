import Socket from './Socket';
import Events from './Events';

export function getEvents(props) {
  const {
    addQuestion,
    addVote,
    removeVote,
    dismissQuestion,
    addFlag,
    removeFlag,
    receivedActiveAssessment,
    deactivateAssessment,
    reflectiveStartReview,
    addEndorse,
    removeEndorse,
    userId,
    studentJoinedAttendance,
    studentJoinedCourseSession,
    goToCourses,
    addResponse,
    removeResponse,
  } = props;
  const events = {
    [Events.QUESTION_ASKED]: {
      name: Events.QUESTION_ASKED,
      handler: (data) => addQuestion(data.question),
    },
    [Events.QUESTION_REMOVED]: {
      name: Events.QUESTION_REMOVED,
      handler: (data) => dismissQuestion(data.id),
    },
    [Events.RESPONSE_ADD]: {
      name: Events.RESPONSE_ADD,
      handler: (data) => addResponse(data.response),
    },
    [Events.RESPONSE_REMOVED]: {
      name: Events.RESPONSE_ADD,
      handler: (data) => removeResponse(data.response)
    },
    [Events.VOTE_ADD]: {
      name: Events.VOTE_ADD,
      handler: (data) => {
        if (data.vote.userId === userId) return;
        addVote(data.targetId, data.vote)
      },
    },
    [Events.VOTE_REMOVE]: {
      name: Events.VOTE_REMOVE,
      handler: (data) => {
        if (data.userId === userId) return;
        removeVote(data.id, data.userId)
      },
    },
    [Events.ADD_FLAG]: {
      name: Events.ADD_FLAG,
      handler: (data) => addFlag(data.id),
    },
    [Events.REMOVE_FLAG]: {
      name: Events.REMOVE_FLAG,
      handler: (data) => removeFlag(data.id),
    },
    [Events.ASSESSMENT_ACTIVATED]: {
      name: Events.ASSESSMENT_ACTIVATED,
      handler: (data) => receivedActiveAssessment(
        data.assessmentId,
        data.assessmentType,
        data.question,
        data.options,
      ),
    },
    [Events.ASSESSMENT_DEACTIVATED]: {
      name: Events.ASSESSMENT_DEACTIVATED,
      handler: (data) => deactivateAssessment(),
    },
    [Events.REFLECTIVE_ASSESSMENT_START_REVIEW]: {
      name: Events.REFLECTIVE_ASSESSMENT_START_REVIEW,
      handler: (data) => reflectiveStartReview(
        data.toReview.filter(a => a.userId !== userId)
      ),
    },
    [Events.ADD_ENDORSE]: {
      name: Events.ADD_ENDORSE,
      handler: (data) => addEndorse(data.id),
    },
    [Events.REMOVE_ENDORSE]: {
      name: Events.REMOVE_ENDORSE,
      handler: (data) => removeEndorse(data.id),
    },
    [Events.STUDENT_JOINED_ATTENDANCE]: {
      name: Events.STUDENT_JOINED_ATTENDANCE,
      handler: (data) => studentJoinedAttendance(data.attendance),
    },
    [Events.END_COURSESESSION]: {
      name: Events.END_COURSESESSION,
      handler: (data) => goToCourses(userId),
    },
    [Events.STUDENT_JOINED_COURSESESSION]: {
      name: Events.STUDENT_JOINED_COURSESESSION,
      handler: (data) => studentJoinedCourseSession(
        data.numberInCourseSession,
      ),
    },
  };
  return events;
}

export default function(props) {
  const { courseSessionId } = props;
  const courseSessionChannel = `private-${courseSessionId}`;
  Socket.subscribe(courseSessionChannel);
  Socket.bindAllEvents(getEvents(props), courseSessionChannel);
}