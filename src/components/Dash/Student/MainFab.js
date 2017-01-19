/**
 * @flow
 * @author Anthony Altieri on 1/18/17.
 */
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

const fabAskStyle = {
  position: "absolute",
  bottom: "40px",
  right: "16px",
  zIndex: "10",
};

const MainFab = ({
  mode,
  setModeToQuestions,
  setModeToAsk,
}) => (
  <FloatingActionButton
    style={fabAskStyle}
    secondary
    onTouchTap={() => {
      if (mode === 'ASK' || mode === 'ASSESSMENT') {
        setModeToQuestions();
      } else {
        setModeToAsk();
      }
    }}
  >
    {mode === 'ASK' || mode === 'ASSESSMENT'
      ? <FontIcon className="material-icons">
        view_list
      </FontIcon>
      : <FontIcon className="material-icons">
        chat
      </FontIcon>
    }
  </FloatingActionButton>
);

export default MainFab;
