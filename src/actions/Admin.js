/**
 * @author Anthony Altieri on 9/23/16.
 */

export const receivedCourses = (courses) => ({
    type: 'RECEIVED_COURSES',
    courses,
});

export const receivedUsers = (users) => ({
    type: 'RECEIVED_USERS',
    users,
});
