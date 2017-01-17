/**
 * @author Anthony Altieri on 1/16/17.
 */

import React from 'react';
import TextField from '../../TextField';


const EditedIcon = ({
  hasBeenEdited,
}) => {
  if (!hasBeenEdited) return null;
  return (
    <p className="edited-icon">
      edited
    </p>
  )
};

const EditableValue = ({
  hasBeenEdited,
  defaultValue,
  floatingLabelText,
  onChange,
  id,
  ref,
}) => (
  <div
    className="r-center"
    style={{
      position: 'relative',
    }}
  >
    <EditedIcon hasBeenEdited={hasBeenEdited} />
    <TextField
      floatingLabelText={floatingLabelText}
      defaultValue={defaultValue}
      onChange={onChange}
      id={id}
      ref={ref}
    />
  </div>
);

export default EditableValue;

