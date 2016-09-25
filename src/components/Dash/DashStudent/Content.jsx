/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';
import StudentQuestionList from './StudentQuestionList.jsx';
import AskQuestion from './AskQuestion.jsx';

const Content = ({
  mode,
}) => {
  switch (mode) {
    case 'ALERT':
    case 'QUESTIONS': {
      return <StudentQuestionList />
    }

    case 'ASK': {
      return <AskQuestion />
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