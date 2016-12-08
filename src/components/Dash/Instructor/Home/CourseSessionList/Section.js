/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import Filter from '../../Section/Filter';
import CourseSessionList from './CourseSessionList';

const Section = ({

}) => {
  return (
    <div className="bottom-pane">
      <div className="header">
        <h1 className="heading">Course Session List</h1>
      </div>
      <div className="r">
        <p className="filters-text">Filters:</p>
        <Filter
          isActive
          text="All"
        />
        <Filter
          text="Active"
        />
        <Filter
          text="Inactive"
        />
      </div>
      <CourseSessionList />
    </div>

  );
};

export default Section;
