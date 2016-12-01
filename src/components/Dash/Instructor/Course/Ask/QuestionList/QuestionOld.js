/**
 * @author Anthony Altieri on 10/10/16.
 */

import React from 'react';
import Ink from 'react-ink';

const Question = ({
  onProposeClick,
  onResolveClick,
  onDismissClick,
  rank,
  content,
}) => {
  return (
    <div className="question">
      <p className="rank">{rank}</p>
      <p className="content">
        {content}
      </p>
      <div className="buttons">
        <a
          className="btn"
          onClick={onProposeClick}
        >
          <Ink
            style={{ color: '#333333' }}
          />
          PROPOSE
        </a>
        <hr />
        <a
          className="btn"
          onClick={onResolveClick}
        >
          <Ink
            style={{ color: '#333333' }}
          />
          RESOLVE
        </a>
        <hr />
        <a
          className="btn"
          onClick={onDismissClick}
        >
          <Ink
            style={{ color: '#333333' }}
          />
          DISMISS
        </a>
      </div>
    </div>
  );
};

export default Question;
