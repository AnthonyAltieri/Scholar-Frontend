/**
 * Created by bharatbatra on 12/19/16.
 */
export const activateCode = ( code ) => ({
  type: "ATTENDANCE_CODE_ACTIVATED",
  code: code
});

export const deactivateCode = () => ({
  type: "ATTENDANCE_CODE_DEACTIVATED"
});

export const studentJoined = (attendance) => ({
  type: "STUDENT_JOINED_ATTENDANCE",
  attendance: attendance
});

export const studentJoinedCourseSession = (numberInCourseSession) => ({
  type: 'STUDENT_JOINED_COURSESESSION',
  numberInCourseSession,
});
