/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import Course from '../Course';
import AddCourse from './AddCourse';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import Colors from '../../../../../util/Colors';

const getDayFromIndex = (index) => {
  switch (index) {
    case 1: { return 'Su' }
    case 2: { return 'M' }
    case 3: { return 'Tu' }
    case 4: { return 'W' }
    case 5: { return 'Th' }
    case 6: { return 'F' }
    case 7: { return 'Sa' }

    default: {
      throw new Error(`Invalid day index: ${index}`);
    }
  }
};


const CourseList = ({
  navigate,
  goToCourse,
  joinCourse,
  courses,
  noAddCourse,
  onCourseClick,
}) => {
  console.log('CourseList courses',courses);
  return (
    <div className="course-list">
      <p className="pages">pages <br/> 1/1</p>
      <RaisedButton
        className="next-page"
        label="Next"
        labelStyle={{
            color: "#FFFFFF"
        }}
        buttonStyle={{
            backgroundColor: Colors.secondary,
        }}
      />
      <RaisedButton
        className="prev-page"
        label="Previous"
        labelStyle={{
            color: "#FFFFFF"
        }}
        buttonStyle={{
            backgroundColor: Colors.secondary,
        }}
      />
      {!!noAddCourse
        ? (
          <AddCourse
            onClick={() => {
                navigate('/dash/instructor/home/addCourse');
            }}
          />
        )
        : null
      }
        {courses.map((c) => {
          const time = moment(c.timeStart).format('h:mm a') + ' - '
            + moment(c.timeEnd).format('h:mm a');
          const days = c.days.reduce((acc, cur, i) => {
            if (!!cur) {
              if (acc.length === 0) {
                return acc += getDayFromIndex(i + 1)
              } else {
                return acc + ` ${getDayFromIndex(i + 1)}`
              }
            } else {
              return acc;
            }
          }, '');

            return (
              <Course
                key={c.id}
                subject={c.subject}
                abbreviation={c.abbreviation}
                time={time}
                days={days}
                onClick={() => {
                  if (!!onCourseClick) {
                    joinCourse(
                      c.id,
                      c.abbreviation,
                      c.title,
                      c.activeCourseSessionId || null,
                      c.timeStart,
                      c.timeEnd,
                    );
                    goToCourse(c.id)
                  } else {
                    onCourseClick(c);
                  }
                }}
              />
            )
        })}
    </div>
  );

};

export default CourseList;
