/**
 * @author Anthony Altieri on 11/18/16.
 */

export const setTitle = (title) => ({
  type: 'SET_TITLE',
  title,
});

export const setDays = (days) => ({
  type: 'SET_DAYS',
  days,
});

export const setAbbreviation = (abbreviation) => ({
  type: 'SET_ABBREVIATION',
  abbreviation,
});

export const setTimeStart = (timeStart) => ({
  type: 'SET_TIME_START',
  timeStart
});

export const setTimeEnd = (timeEnd) => ({
  type: 'SET_TIME_END',
  timeEnd,
});

export const setSubject = (subject) => ({
  type: 'SET_SUBJECT',
  subject,
});

export const setTerm = (term) => ({
  type: 'SET_TERM',
  term,
});

export const setDateStart = (dateStart) => ({
  type: 'SET_DATE_START',
  dateStart,
});

export const setDateEnd = (dateEnd) => ({
  type: 'SET_DATE_END',
  dateEnd,
});

export const clearAddCourse = () => ({
  type: 'CLEAR_ADD_COURSE',
});

