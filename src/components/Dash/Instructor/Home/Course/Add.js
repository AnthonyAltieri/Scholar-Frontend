/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import moment from 'moment';
import TextField from '../../../../TextField';
import TimePicker from '../../../../TimePicker';
import DatePicker from '../../../../DatePicker';
import SelectField from '../../../../SelectField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectDays from './SelectDays';
import Colors from '../../../../../util/Colors';
import { connect } from 'react-redux';
import * as AddCourseActions from '../../../../../actions/DashInstructor/Home/AddCourse';
import { push } from 'react-router-redux';
import { create } from '../../../../../api/Course';
import { toastr } from 'react-redux-toastr';

const subjectMenuItems = [
  {
    value: 'COMPUTER_SCIENCE',
    primaryText: 'Computer Science',
  },
  {
    value: 'ENGLISH',
    primaryText: 'English',
  },
  {
    value: 'HISTORY',
    primaryText: 'History',
  },
  {
    value: 'POLITICAL_SCIENCE',
    primaryText: 'Political Science',
  },
  {
    value: 'ANTHROPOLOGY',
    primaryText: 'Anthropology',
  },
  {
    value: 'PSYCHOLOGY',
    primaryText: 'Psychology',
  },
  {
    value: 'BIOLOGY',
    primaryText: 'Biology',
  },
  {
    value: 'CHEMISTRY',
    primaryText: 'Chemistry',
  },
  {
    value: 'ENGINEERING',
    primaryText: 'Engineering',
  },
];

const termsMenuItems = [
  {
    value: 'fall',
    primaryText: 'Fall',
  },
  {
    value: 'winter',
    primaryText: 'Winter',
  },
  {
    value: 'spring',
    primaryText: 'Spring',
  },
  {
    value: 'summer',
    primaryText: 'Summer',
  },
];

const validateData = (
  schoolId,
  subject,
  term,
  title,
  abbreviation,
  timeStart,
  timeEnd,
  dateStart,
  dateEnd,
  days,
) => {
    if (!title) {
      toastr.info(
        'Invalid Title',
        'Please enter a valid title for your course'
      );
      return false;
    }

    if (!abbreviation) {
      toastr.info(
        'Invalid Course Abbreviation',
        'Please enter a valid abbreviation for your course'
      );
      return false;
    }

    if (!timeStart) {
      toastr.info(
        'Invalid Time Start',
        'Please enter the time that your course starts'
      );
      return false;
    }

    if (!timeEnd) {
      toastr.info(
        'Invalid Time End',
        'Please enter the time that your course ends'
      );
      return false;
    }

    if (!subject) {
      toastr.info(
        'Invalid Subject',
        'Please select a subject that represents your course'
      );
      return false;
    }

    if (!term) {
      toastr.info(
        'Invalid Term',
        'Please select a term for your class'
      );
      return false;
    }

    if (!dateStart) {
      toastr.info(
        'Invalid Date Start',
        'Please enter the date when your course starts'
      );
      return false;
    }

    if (!dateEnd) {
      toastr.info(
        'Invalid Date End',
        'Please enter the date when your course ends'
      );
      return false;
    }

    if (days.filter(d => !!d).length === 0) {
      toastr.info(
        'Invalid Days',
        'Please check the days that your course occurs on'
      );
      return false;
    }

    return true;
};

let Add = ({
  title,
  abbreviation,
  timeStart,
  timeEnd,
  dateStart,
  dateEnd,
  subject,
  term,
  setTitle,
  setAbbreviation,
  setTimeStart,
  setTimeEnd,
  setSubject,
  setTerm,
  setDateStart,
  setDateEnd,
  clearAddCourse,
  navigate,
  userId,
  name,
  schoolId,
  days,
  selectDay,
  unselectDay,
}) => {
  if (!!timeStart) {
    console.log('timeStart', moment(timeStart).format('h:mm a') )
  }

  return (
    <div className="section">
      <div className="full-pane">
        <div className="header" >
          <h1 className="heading">Add Course</h1>
        </div>
        <div
          className="r-center"
          style={{
            padding: "12px 32px",
            alignItems: "flex-start",
          }}
        >
          <div
            className="c"
            style={{ marginRight: "32px"}}
          >
            <TextField
              floatingLabelText="Title"
              hintText="Intro to Modern Cryptography"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              floatingLabelText="Course abbreviation"
              hintText="CSE 107"
              value={abbreviation}
              onChange={(e) => {
                setAbbreviation(e.target.value);
              }}
            />
            <TimePicker
              hintText="Time Start"
              value={timeStart}
              onChange={(e, date) => {
                console.log('e', e);
                setTimeStart(date);
              }}
            />
            <TimePicker
              hintText="Time End"
              value={timeEnd}
              onChange={(e, date) => {
                setTimeEnd(date);
              }}
            />
          </div>
          <div
            className="c-start"
            style={{
              height: "100%",
              marginLeft: "32px"
            }}
          >
            <SelectField
              floatingLabelText="Subject"
              menuItems={subjectMenuItems}
              value={subject}
              onChange={(e, n, v) => {
                setSubject(v);
              }}
            />
            <SelectField
              floatingLabelText="Term"
              menuItems={termsMenuItems}
              value={term}
              onChange={(e, n, v) => {
                setTerm(v);
              }}
            />
            {!!dateStart
              ? <DatePicker
                hintText="Date Start"
                value={dateStart}
                onChange={(e, date) => {
                setDateStart(date);
              }}
              />
              : <DatePicker
                hintText="Date Start"
                onChange={(e, date) => {
                setDateStart(date);
              }}
              />
            }
            {!!dateEnd
              ? <DatePicker
                hintText="Date End"
                value={dateEnd}
                onChange={(e, date) => {
                setDateEnd(date);
              }}
              />
              : <DatePicker
                hintText="Date End"
                onChange={(e, date) => {
                setDateEnd(date);
              }}
              />
            }
          </div>
        </div>
        <div className="r-center">
          <SelectDays
            days={days}
            selectDay={selectDay}
            unselectDay={unselectDay}
          />
        </div>
        <div
          className="c-center"
          style={{
            marginTop: "36px",
          }}
        >
          <RaisedButton
            label="Submit"
            backgroundColor={Colors.green}
            labelColor="#FFFFFF"
            buttonStyle={{
              width: "200px"
            }}
            onClick={() => {
              const isDataValid = validateData(
                schoolId,
                subject,
                term,
                title,
                abbreviation,
                timeStart,
                timeEnd,
                dateStart,
                dateEnd,
                days,
              );
              if (isDataValid) {
                create(
                  userId,
                  name.split(' ')[1],
                  schoolId,
                  subject,
                  term,
                  title,
                  abbreviation,
                  timeStart,
                  timeEnd,
                  dateStart,
                  dateEnd,
                  days,
                )
                .then((payload) => {
                  const { error } = payload;
                  if (!!error) {
                    toastr.error('Something went wrong please try again');
                    return;
                  }
                  toastr.success('Course successfully created');
                  navigate('/dash/instructor/home');
                  clearAddCourse();
                })
                .catch((error) => {
                    toastr.error('Something went wrong please try again');
                })
              }
            }}
          />
          <FlatButton
            style={{
              marginTop: "32px",
            }}
            label="Back to home"
            secondary
            onClick={() => {
              navigate('/dash/instructor/home');
              clearAddCourse();
            }}
          />
        </div>
      </div>
    </div>
  );
};

const handleDate = (date = null) => {
  const type = typeof date;
  if (type === 'object') {
    return date;
  } else if (type === 'string') {
    return new Date(date);
  }
  throw new Error(`Invalid date type: ${type}`);
};

//                     Su      M       Tu     W     Th     F     Sa
const DEFAULT_DAYS = [false, false, false, false, false, false, false];

const stateToProps = (state) => ({
  userId: state.User.id,
  name: state.User.name,
  schoolId: state.User.schoolId,
  title: state.Dash.Instructor.Home.AddCourse.title || '',
  days: state.Dash.Instructor.Home.AddCourse.days || DEFAULT_DAYS,
  abbreviation: state.Dash.Instructor.Home.AddCourse.abbreviation || '',
  timeStart: handleDate(state.Dash.Instructor.Home.AddCourse.timeStart),
  timeEnd: handleDate(state.Dash.Instructor.Home.AddCourse.timeEnd),
  dateStart: handleDate(state.Dash.Instructor.Home.AddCourse.dateStart),
  dateEnd: handleDate(state.Dash.Instructor.Home.AddCourse.dateEnd),
  subject: state.Dash.Instructor.Home.AddCourse.subject || null,
  term: state.Dash.Instructor.Home.AddCourse.term || null,
});

const setDay = (days, dayIndex, isSelected) => {
  console.log('SET DAY dayIndex', dayIndex)
  return [
    ...days.slice(0, dayIndex),
    isSelected,
    ...days.slice(dayIndex + 1)
  ]
};

const dispatchToProps = (dispatch) => ({
  navigate: (url) => {
    dispatch(push(url))
  },
  selectDay: (days, dayIndex) => {
    dispatch(
      AddCourseActions.setDays(setDay(days, dayIndex, true))
    )
  },
  unselectDay: (days, dayIndex) => {
    dispatch(
      AddCourseActions.setDays(setDay(days, dayIndex, false))
    )
  },
  setTitle: (title) => {
    dispatch(AddCourseActions.setTitle(title));
  },
  setAbbreviation: (abbreviation) => {
    dispatch(AddCourseActions.setAbbreviation(abbreviation));
  },
  setTimeStart: (timeStart) => {
    dispatch(AddCourseActions.setTimeStart(timeStart));
  },
  setTimeEnd: (timeEnd) => {
    dispatch(AddCourseActions.setTimeEnd(timeEnd));
  },
  setSubject: (subject) => {
    dispatch(AddCourseActions.setSubject(subject));
  },
  setTerm: (term) => {
    dispatch(AddCourseActions.setTerm(term));
  },
  setDateStart: (dateStart) => {
    dispatch(AddCourseActions.setDateStart(dateStart));
  },
  setDateEnd: (dateEnd) => {
    dispatch(AddCourseActions.setDateEnd(dateEnd));
  },
  clearAddCourse: () => {
    dispatch(AddCourseActions.clearAddCourse());
  }
});

Add = connect(
  stateToProps,
  dispatchToProps,
)(Add);

export default Add;
