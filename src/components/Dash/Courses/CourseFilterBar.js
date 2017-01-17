import React from 'react';
import FilterButton from './FilterButton';

const style = {
  height: 82,
};

const CourseFilterBar = ({
  onActiveClick,
  onInactiveClick,
  filter,
}) => (
  <div
    className="r-center"
    style={style}
  >
    <FilterButton
      isActive={filter === 'active'}
      onClick={onActiveClick}
      label="Active"
      style={{
        marginRight: 8,
      }}
    />
    <FilterButton
      isActive={filter === 'inactive'}
      onClick={onInactiveClick}
      label="Inactive"
      style={{
        marginLeft: 8,
      }}
    />
  </div>
);

export default CourseFilterBar;