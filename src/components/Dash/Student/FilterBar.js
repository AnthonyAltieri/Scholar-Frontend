import React from 'react';

const Filter = ({
  text,
  isActive,
  onClick,
}) => (
  <a
    className={'filter' + (!!isActive ? ' active' : '')}
    onClick={onClick}
  >
    {text}
  </a>
)

const FilterBar = ({
  navigate,
  filter,
}) => {
  console.log('FilterBar')
  console.log('filter', filter);

  return (
    <div className="filter-bar">
      <p className="filter-label">Filter:</p>
      <Filter
        text="All"
        onClick={() => navigate('/dash/student/')}
        isActive={!filter || filter === ''}
      />
      <Filter
        text="Most Recent"
        onClick={() => navigate('/dash/student/mostRecent')}
        isActive={filter === 'mostRecent'}
      />
      <Filter
        text="Most Voted"
        onClick={() => navigate('/dash/student/mostVoted')}
        isActive={filter === 'mostVoted'}
      />
    </div>
  );
}

export default FilterBar;
