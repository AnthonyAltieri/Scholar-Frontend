import React from 'react';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Option from './Option';
import Tag from './Tag';
import TextField from '../../../../TextField';
import Colors from '../../../../../util/Colors';
import { toastr } from 'react-redux-toastr';


const AddDialoge = ({
  isOpen,
  addOptionClick,
  onCancelClick,
  onSaveClick,
  onOptionClearClick,
  options,
  tags,
  onTagAddClick,
  onTagClearClick,
}) => {
  let question;
  let enteredTag;
  let optionNodes = [];
  console.log('tags', tags);
  console.log('options', options);
  return (
    <Dialog
      title="Enter an Assessment to Bank"
      autoScrollBodyContent
      open={isOpen}
      modal={false}
      actions={[
      <FlatButton
        label="Cancel"
        onTouchTap={onCancelClick}
        style={{ color: Colors.red }}
      />,
      <FlatButton
        label="Save"
        onTouchTap={() => {
          if (!question.value || !question.value.trim()) {
            toastr.info('A Banked Assessment must have a question');
            return;
          }
          const optionContents = optionNodes.reduce((a, c) => (
            !!c.value ? [...a, c.value] : [...a, '']
          ), []);
          onSaveClick(
            question.value,
            optionContents,
            tags,
          )
        }}
        style={{ color: Colors.green }}
      />
    ]}
    >
      <p className="banked-assessment-add-label">
        Tags
      </p>
      <div
        className="r wrap"
        style={{
          maxHeight: 82,
          overflowY: 'auto',
        }}
      >
        {tags
          .reduce((a, c, i) => ([...a, { content: c, index: i }]), [])
          .map((t) => (
            <Tag
              key={t.index}
              content={t.content}
              onClearClick={() => {
                onTagClearClick(t.index, tags);
              }}
            />
          ))
        }
      </div>
      <div className="r-around">
        <TextField
          hintText="Enter tag here..."
          id="banked-assessment-add-tag"
          ref={() => {
            enteredTag = document.getElementById('banked-assessment-add-tag');
          }}
        />
        <RaisedButton
          label="add tag"
          onClick={() => {
            onTagAddClick(enteredTag.value);
            enteredTag.value = '';
          }}
          primary
        />

      </div>
      <p className="banked-assessment-add-label">
        Question
      </p>
      <div className="c">
        <textarea
          className="banked-assessment-add-question"
          placeholder="Enter question here..."
          ref={(n) => {
            if (!n) return;
            question = n;
          }}
        />
      </div>
      <p className="banked-assessment-add-label">
        Options
      </p>
      <ul>
        {options
          .reduce((a, c, i) => [...a, { content: c, index: i }], [])
          .map((o) => (
            <Option
              key={`${o.index}-${o.content}`}
              editContentId={`${o.index}-option`}
              ref={(n) => {
                optionNodes = [
                  ...optionNodes,
                  document.getElementById(`${o.index}-option`),
                ];
              }}
              isEditable={true}
              index={o.index}
              content={o.content}
              onClearClick={() => {
                const optionValues = optionNodes.reduce((a, c, i) => (
                  [...a, (c.value || '')]
                ), [])
                console.log('optionValues', optionValues);
                onOptionClearClick(o.index, optionValues)
              }}
            />))
        }
      </ul>

      <div className="c">
        {options.length > 4
          ? null
          : (<RaisedButton
            label="Add option"
            onClick={addOptionClick}
            primary
            fullWidth
          />)
        }
      </div>
    </Dialog>
  );
};


export default AddDialoge;
