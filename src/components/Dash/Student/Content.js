/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';
import StudentQuestionList from './StudentQuestionList';
import AskQuestion from './AskQuestion';

const Content = ({
  mode,
  params,
}) => {
  console.log('in Content', params);
  const { filter } = params;
  console.log('filter', filter);

  switch (mode) {
    case 'ALERT':
    case 'QUESTIONS': {
      return (
        <div className="displayed-content">
          <StudentQuestionList filter={filter || ''} />
        </div>);
    }

    case 'ASK': {
      return (
        <div className="displayed-content">
          <AskQuestion />
        </div>
      );
    }

    //
    // case 'ASSESSMENT': {
    //   return <Assessment />
    // }

    default:
      throw new Error(`Invalid mode: ${mode}`);
  }
};

export default Content;
