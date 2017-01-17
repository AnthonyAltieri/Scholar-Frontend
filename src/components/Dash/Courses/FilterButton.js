import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import GreenRaisedButton from '../../buttons/GreenRaisedButton';

const FilterButton = ({
  label,
  onClick,
  isActive,
  ...props,
}) => {
  if (!!isActive) {
    return (
      <GreenRaisedButton
        onTouchTap={onClick}
        label={label}
        {...props}
      />
    )
  }
  return (
    <RaisedButton
      onTouchTap={onClick}
      label={label}
      {...props}
    >
    </RaisedButton>
  );
};

export default FilterButton;