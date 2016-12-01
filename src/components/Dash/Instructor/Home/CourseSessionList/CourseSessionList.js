/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import Course from '../Course';
import RaisedButton from 'material-ui/RaisedButton';
import Colors from '../../../../../util/Colors';

const CourseList = ({}) => {
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
    </div>
  );

};

export default CourseList;
