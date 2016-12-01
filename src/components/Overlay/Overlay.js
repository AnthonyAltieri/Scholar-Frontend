/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';
import ButtonRound from '../buttons/ButtonRound';

const Overlay = ({
  onConfirmClick,
  cardText,
  buttonText,
  yesNo
}) => {
  return (
    <div className="overlay">
      <div className="card">
        <div className="content">
          <p className="text">
            {cardText}
          </p>
        </div>
        {yesNo
          ?<div>
          </div>
          : <ButtonRound
            className="confirm"
            onClick={onConfirmClick}
          >
            {buttonText}
          </ButtonRound>
        }
      </div>
    </div>
  );
};

export default Overlay;