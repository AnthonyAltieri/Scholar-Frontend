/**
 * @author Anthony Altieri on 1/2/17.
 */

import React from 'react';

const Filter = ({ isActive, text, onClick }) => (
  <a
    onClick={() => !isActive ? onClick() : null}
    className={`filter ${!!isActive ? 'active' : ''}`}
  >
    {text}
  </a>
);

const QuestionsFilterBar = ({
  activeFilter,
  onMostRecentClick,
  onLeastRecentClick,
  onMostVotedClick,
  onLeastVotedClick,
}) => (
  <div
    className="filter-bar "
    style={{
      padding: '0 8px',
      flexWrap: 'none',
    }}
  >
    <p className="filter-label">Filters:</p>
    <div className="r-between fullwidth">
      <Filter
        isActive={activeFilter === 'MOST_RECENT'}
        text="Most Recent"
        onClick={onMostRecentClick}
      />
      <Filter
        isActive={activeFilter === 'LEAST_RECENT'}
        text="Least Recent"
        onClick={onLeastRecentClick}
      />
      <Filter
        isActive={activeFilter === 'MOST_VOTED'}
        text="Most Voted"
        onClick={onMostVotedClick}
      />
      {/*<Filter*/}
        {/*isActive={activeFilter === 'LEAST_VOTED'}*/}
        {/*text="Least Voted"*/}
        {/*onClick={onLeastVotedClick}*/}
      {/*/>*/}
    </div>
  </div>
);

export default QuestionsFilterBar;
