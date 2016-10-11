/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';
import StudentQuestionList from './StudentQuestionList';
import AskQuestion from './AskQuestion';

const Content = ({
  mode, params
}) => {
  const { filter } = params;

  switch (mode) {
    case 'ALERT':
    case 'QUESTIONS': {
      return <StudentQuestionList filter={filte} />
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