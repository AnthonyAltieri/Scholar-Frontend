import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../../util/Colors';

const TextInstructionsDialog = ({
  isOpen,
  onCancelClick
}) => {
  let code = '';
  return (
    <Dialog
      autoScrollBodyContent={true}
      title="Text Message Instructions"
      open={isOpen}
      actions={[
        <FlatButton
          label="Close"
          onTouchTap={onCancelClick}
          style={{ color: Colors.red }}
        />
      ]}
    >
      <p className="dialog-text">
        You can use Scholar by sending text messages to the number <span style={{color : Colors.green}}>888-997-5717</span>

        <br />
        NOTE: notice the “ : “ between the instruction and its content
        <br />
        <br />
        1.	To Send an Alert:
        <br />
        Simply send an exclamation point
        <br />
        Eg. <span style={{color : Colors.green}}>!</span>

        <br />
        <br />
        2.	To Ask A Question
        <br />
        <span style={{color : Colors.green}}>q : [content]</span>
        <br />
        Eg. q : What is a cation?
        <br />
        <br />

        3.	To Answer an Instant Assessment:
        <br />
        <span style={{color : Colors.green}}>answer : [option letter]</span>
        <br />
        eg. answer : a
        <br />
        <br />

        4.	To Answer a reflective Assessment:
        <br />
        <span style={{color : Colors.green}}>answer : [answer content]</span>
        <br />
        eg. answer : this is a sample answer
        <br />
        <br />

        5.	To join the attendance list:
        <br />
        <span style={{color : Colors.green}}>code : [code]</span>
        <br />
        Where [code] is the attendance code provided to you by your professor


      </p>

    </Dialog>
  );
};

export default TextInstructionsDialog;
