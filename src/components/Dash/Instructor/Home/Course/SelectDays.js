/**
 * @author Anthony Altieri on 11/24/16.
 */

import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const Day = ({
  day,
  isChecked,
  onCheck,
}) => {
  return (
    <div
      className="c-center"
      style={{
        display: "inline-block"
      }}
    >
      <p
        style={{
          textAlign: "center",
        }}
      >
        {day}
        </p>
      <Checkbox
        style={{
          position: "relative",
          left: "8px",
        }}
        onCheck={onCheck}
        checked={isChecked}
      />
    </div>
  )
};

const generateOnCheck = (index, days, selectDay, unselectDay) => (
  (event, isInputChecked) => {
    if (isInputChecked) {
      selectDay(days, index)
      return
    }
    unselectDay(days, index)
});

const SelectDays = ({
  days,
  selectDay,
  unselectDay,
}) => {
  return (
    <div className="c-center">
      <p
        style={{
          marginBottom: "0"
        }}
      >
        Class occurs on which days
      </p>

      <div className="r-center">
        <Day
          day="Su"
          isChecked={!!days[0]}
          onCheck={generateOnCheck(0, days, selectDay, unselectDay)}
        />
        <Day
          day="M"
          isChecked={!!days[1]}
          onCheck={generateOnCheck(1, days, selectDay, unselectDay)}
        />
        <Day
          day="Tu"
          isChecked={!!days[2]}
          onCheck={generateOnCheck(2, days, selectDay, unselectDay)}
        />
        <Day
          day="W"
          isChecked={!!days[3]}
          onCheck={generateOnCheck(3, days, selectDay, unselectDay)}
        />
        <Day
          day="Th"
          isChecked={!!days[4]}
          onCheck={generateOnCheck(4, days, selectDay, unselectDay)}
        />
        <Day
          day="F"
          isChecked={!!days[5]}
          onCheck={generateOnCheck(5, days, selectDay, unselectDay)}
        />
        <Day
          day="Sa"
          isChecked={!!days[6]}
          onCheck={generateOnCheck(6, days, selectDay, unselectDay)}
        />

      </div>
    </div>
  )
};

export default SelectDays;
