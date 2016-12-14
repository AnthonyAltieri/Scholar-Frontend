/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';
import StudentQuestionList from './StudentQuestionList';
import AskQuestion from './AskQuestion';

const Content = ({
  mode,
  params
}) => {
  console.log('in Content', params);
  // const { filter } = params;

  switch (mode) {
    case 'ALERT':
    case 'QUESTIONS': {
      return (
        <div className="content">
          <StudentQuestionList filter={''} />
        </div>);
    }

    case 'ASK': {
      return (
        <div className="content">
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
