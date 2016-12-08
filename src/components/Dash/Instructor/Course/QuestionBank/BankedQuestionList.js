import React from 'react';
import BankedQuestion from './BankedQuestion';

const ELEMENTS_PER_PAGE = 3;
const determineNumberPages = (numberBQ) => (
  Math.ceil(numberBQ / ELEMENTS_PER_PAGE)
);

const BankedQuestionList = ({
  bankedQuestions,
  page,
  onBankedQuestionClick,
}) => (
  <ul className="banked-question-list">
    {bankedQuestions.reduce((acc, cur, i) => {
      // NOTE: page is 1,2,...
      const startingIndex = page * 3 ;
      return (i >= startingIndex && !!acc && acc.length < 3)
        ? [...acc, cur]
        : acc;
      }, [])
      .map((bq) => (
        <BankedQuestion
          key={bq.id}
          id={bq.id}
          content={bq.content}
          options={bq.options || []}
          onBankedQuestionClick={onBankedQuestionClick}
        />
      ))
    }

  </ul>
);

export default BankedQuestionList;
