import React from 'react';

const Filter = ({
  text,
  isActive,
  onClick,
}) => (
  <div
    className={'filter' + (!!isActive ? ' active' : '')}
    onClick={onClick}
  >
    <a>
      {text}
    </a>
  </div>
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
      <div className="r-around fullwidth">
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
          text="Least Recent"
          onClick={() => navigate('/dash/student/leastRecent')}
          isActive={filter === 'leastRecent'}
        />
        <Filter
          text="Most Voted"
          onClick={() => navigate('/dash/student/mostVoted')}
          isActive={filter === 'mostVoted'}
        />
        <Filter
          text="Least Voted"
          onClick={() => navigate('/dash/student/leastVoted')}
          isActive={filter === 'leastVoted'}
        />
      </div>
    </div>
  );
}

export default FilterBar;
