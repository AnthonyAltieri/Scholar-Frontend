import React from 'react';
import GreenRaisedButton from '../../../../buttons/GreenRaisedButton';
import RedRaisedButton from '../../../../buttons/RedRaisedButton';

const Buttons = ({
  isStartDisabled,
  isEndDisabled,
  onStartClick,
  onEndClick,
  isPager,
  page,
  maxNumPages,
  onNextPageClick,
  onPrevPageClick,
}) => {
  if (isPager && (page < 1 || page > maxNumPages)) {
    throw new Error(`Invalid page number: ${page}`);
  }
  return !isPager
    ? (
      <div className="card-buttons">
        <RedRaisedButton
          label="End"
          style={{
            marginRight: "8px",
          }}
          disabled={isEndDisabled}
          onClick={onEndClick}
        />
        <GreenRaisedButton
          label="Start"
          disabled={isStartDisabled}
          onClick={onStartClick}
        />
      </div>
    )
    : (
      <div className="card-buttons">
        <div className="pages">
          page<br/>{page}/{maxNumPages}
        </div>
        <RedRaisedButton
          label="Prev"
          style={{
            marginRight: "8px",
          }}
          disabled={page === 1}
          onClick={onPrevPageClick}
        />
        <GreenRaisedButton
          label="Next"
          disabled={page === maxNumPages}
          onClick={onNextPageClick}
        />
      </div>
    )
};

export default Buttons;
