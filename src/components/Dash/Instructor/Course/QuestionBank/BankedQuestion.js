import React from 'react';
import Colors from '../../../../../util/Colors';
import FlatButton from 'material-ui/FlatButton';
import Option from './Option';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import Tag from './Tag';
import AddTag from './AddTag';
import CancelTag from './CancelTag';
import TextField from '../../../../TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RedRaisedButton from '../../../../buttons/RedRaisedButton';

const DropdownArrow = ({
  isOpen,
  onClick,
}) => (
  <FontIcon
    className="material-icons dropdown-arrow"
    onClick={onClick}
    style={{
      display: 'inline-block',
      curspor: 'pointer',
    }}
  >
      {!isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
  </FontIcon>
);

const BankedQuestion = ({
  id,
  question,
  options,
  tags,
  questionEdit,
  optionsEdited,
  isOptionsVisible,
  questionEditMode,
  optionEditModes,
  onQuestionClick,
  onOptionsDropdownClick,
  onOptionClick,
  onOptionClearClick,
  editQuestionClear,
  editOptionClear,
  onSaveClick,
  onRemoveClick,
  addTagMode,
  enterAddTagMode,
  cancelAddTagMode,
  onTagSaveClick,
  onTagRemoveClick,
  inQueue,
  onToBankClick,
  onToQueueClick,
  isAssessmentActive,
  onUseForReflectiveClick,
  onUseForInstantClick,
  inAssess,
}) => {
  const isQuestionEdited = !!questionEdit;
  const isOptionsEdited = optionEditModes.filter(o => !!o).length > 0;
  let questionEditNode;
  let optionNodes = [];
  let enteredTag;
  console.log('tags', tags);

  return (
    <li className="banked-question">
      <div className="tag-strip">
        <p className="label">Tags:</p>
          {tags
            .reduce((a, c, i) => [...a, { content: c, index: i }], [])
            .map((t) => (<Tag
              key={`${t.index}@@${t.content}@@${id}`}
              content={t.content}
              onClearClick={() => {
                console.log('t', t);
                console.log('tags', tags);
                onTagRemoveClick(
                  t.index,
                  tags,
                  id,
                )
            }}
            />))
          }
          {!!addTagMode
            ? <CancelTag onClick={() => cancelAddTagMode(id)} />
            : <AddTag onClick={() => enterAddTagMode(id)} />
          }
      </div>
      {!!addTagMode
        ? (<div className="section-add-tag">
          <TextField
            hintText="Enter tag here..."
            id={`${id}**entered-tag`}
            ref={() => {
              enteredTag = document.getElementById(`${id}**entered-tag`);
            }}
          />
          <RaisedButton
            label="save"
            primary
            onTouchTap={() => {
              onTagSaveClick(enteredTag.value, tags, id);
            }}
           />
        </div>

        )
        : null
      }
      <div className="strip">
        <p className="strip-label">Question</p>
        {!!questionEditMode
          ? (<div className="r">
            <a
              className="cancel"
              onClick={() => editQuestionClear()}
            >
              Press To Cancel
            </a>
            <p className="edited">Edited</p>
          </div>
            )
          : null
        }
      </div>
      {!!questionEditMode
        ? (<textarea
          className="question-content-edit"
          defaultValue={question}
          ref={(n) => {
            questionEditNode = n;
          }}
        />)
        : (<p
            className="question-content"
            onClick={onQuestionClick}
          >
            {question}
          </p>)
      }
      <div className="strip">
        <div className="r">
          <p className="strip-label">Options</p>
          <DropdownArrow
            isOpen={isOptionsVisible}
            onClick={() => {
              onOptionsDropdownClick()
              console.log('onOptionsDropdownClick');
            }}
          />
        </div>
        {!!isOptionsEdited
          ? (<div className="r">
            <a
              className="cancel"
              onClick={() => editOptionClear()}
            >
              Press To Cancel
            </a>
            <p className="edited">Edited</p>
          </div>)
          : null
        }
      </div>
      {!!isOptionsVisible && options
        .reduce((a, c, index) => [...a, { content: c, index }],[])
        .map((o) => (
          <Option
            key={`${o.index}$$${o.content}$$${id}`}
            content={!!optionEditModes[o.index]
              ? optionsEdited[o.index]
              : o.content
            }
            isEditable={!!optionEditModes[o.index]}
            index={o.index}
            onClearClick={() => { onOptionClearClick(o.index) }}
            onContentClick={() => { onOptionClick(o.index) }}
            editRef={(n) => {
              optionNodes = [
                ...optionNodes,
                { node: n, index: o.index },
              ];
            }}
          />
      ))}
      <div className="strip">
        <p className="strip-label">Actions</p>
      </div>
      <div className="bq-actions">
        <RedRaisedButton
          label="Remove"
          onTouchTap={() => onRemoveClick(id)}
          style={{ margin: '8px 0' }}
        />
        <RaisedButton
          label="Cancel Edits"
          // labelStyle={{ color: Colors.red }}
          secondary
          onTouchTap={() => {
            editOptionClear();
            editQuestionClear();
          }}
          style={{ margin: '8px 0' }}
        />
        <RaisedButton
          label="Save"
          primary
          style={{ margin: '8px 0' }}
          onTouchTap={() => {
            console.log('click')
            console.log('questionEditMode', questionEditMode);
            if (!isOptionsEdited && !questionEditMode) return;
            const questionToSave = !!questionEditMode
              ? questionEditNode.value
              : question;
            let optionsToSave = options.slice(0);
            optionNodes.forEach((on) => {
              optionsToSave = [
                ...optionsToSave.slice(0, on.index),
                on.node.value,
                ...optionsToSave.slice(on.index + 1)
              ]
            })
            console.log('optionsToSave', optionsToSave);
            onSaveClick(
              questionToSave,
              optionsToSave,
              id,
            )
          }}
        />
        {!!inQueue
          ? (
            <RaisedButton
              label="To Bank"
              onTouchTap={onToBankClick}
              style={{ margin: '8px 0' }}
            />
          )
          : (
            <RaisedButton
              label="To Queue"
              onTouchTap={onToQueueClick}
              style={{ margin: '8px 0' }}
            />
          )
        }
        {!!inAssess
          ? (
            <RaisedButton
              label="Use For Reflective"
              disabled={!!isAssessmentActive}
              style={{ margin: '8px 0' }}
              onTouchTap={() => {
                onUseForReflectiveClick(question);
              }}
            />
          )
          : null
        }
        {!!inAssess
          ? (
            <RaisedButton
              label="Use For Instant"
              disabled={!!isAssessmentActive}
              style={{ margin: '8px 0' }}
              onTouchTap={() => {
                onUseForInstantClick(question, options);
              }}
            />
          )
          : null
        }
      </div>
    </li>
  );
};

export default BankedQuestion;
