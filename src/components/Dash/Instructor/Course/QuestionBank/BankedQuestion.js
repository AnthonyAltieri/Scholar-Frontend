import React from 'react';
import Colors from '../../../../../util/Colors';
import FlatButton from 'material-ui/FlatButton';
import Option from './Option';

const BankedQuestion = ({
  content,
  options,
  isQuestionEdited,
  isContentEdited,
}) => {
  return (
    <li className="banked-question">
      <div className="strip">
        <p className="strip-label">Question</p>
        {!!isQuestionEdited
          ? null
          : <p className="edited">Edited</p>
        }
      </div>
      <p className="question-content">{content}</p>
      <div className="strip">
        <p className="strip-label">Options</p>
        {!!isContentEdited
          ? null
          : <p className="edited">Edited</p>
        }
      </div>
      {options
        .reduce((acc, cur, i) => [...acc, {...cur, index: i }],[])
        .map((o) => (
          <Option
            key={o.index}
            content={o.content}
            index={o.index}
            onClearClick={() => {
            }}
          />
      ))}
      <div className="strip">
        <p className="strip-label">Actions</p>
      </div>
      <div className="bq-actions">
        <FlatButton
          label="Remove"
          labelStyle={{ color: Colors.red }}
        />
        <FlatButton
          label="Save"
          labelStyle={{ color: Colors.green }}
        />
      </div>
    </li>
  );
};

export default BankedQuestion;
