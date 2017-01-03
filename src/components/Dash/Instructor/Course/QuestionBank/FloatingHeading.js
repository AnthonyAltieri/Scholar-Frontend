import React from 'react';
import Heading from '../../Heading/Heading'
import TextField from '../../../../TextField';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Colors from '../../../../../util/Colors';

const TagBar = ({
  onClearClick,
  inputId,
  inputRef,
  onChange,
  value,
}) => (
  <div className="r-center fullwidth">
    <TextField
      hintText="tag(s)"
      id={inputId}
      ref={inputRef}
      onChange={onChange}
      value={value}
    />
    <IconButton
      iconStyle={{
        color: Colors.red,
      }}
      onTouchTap={onClearClick}
    >
      <FontIcon className="material-icons">
        clear
      </FontIcon>
    </IconButton>
  </div>
);


const FloatingHeading = ({
  inputTagBankRef,
  onTagBankClear,
  onInputTagBankChange,
  tagBankValue,
  inputTagQueueRef,
  onTagQueueClear,
  onInputTagQueueChange,
  tagQueueValue,
}) => (
  <div className="floating-heading">
    <Heading
      text="Assessment Bank"
    />
    <div className="r fullwidth">
      <div className="partition-half">
        <p className="bank-section">BANK</p>
        <TagBar
          inputId="tag-input-bank"
          inputRef={() => {
            inputTagBankRef(document.getElementById('tag-input-bank'));
          }}
          onChange={onInputTagBankChange}
          value={tagBankValue}
          onClearClick={onTagBankClear}
        />
      </div>
      <div className="partition-half">
        <p className="bank-section">QUEUE</p>
        <TagBar
          inputId="tag-input-queue"
          inputRef={() => {
            inputTagQueueRef(document.getElementById('tag-input-queue'));
          }}
          onChange={onInputTagQueueChange}
          value={tagQueueValue}
          onClearClick={onTagQueueClear}
        />
      </div>
    </div>
  </div>
);

export default FloatingHeading;
