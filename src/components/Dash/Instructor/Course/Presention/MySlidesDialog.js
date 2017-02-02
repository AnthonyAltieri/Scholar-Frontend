import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {toastr} from 'react-redux-toastr'
import TextField from '../../../../TextField'
import Colors from '../../../../../util/Colors';
class MySlidesDialog extends Component {
  render(){
    const {isOpen, onCancelClick, onSubmitClick} = this.props;

    const handleCancelClicked = () => {
      onCancelClick();
    };

    let slideUrl = "";

    return (<Dialog
      title={"Insert a link to your Google Slides Presentation"}
      open={isOpen}
      modal={false}
      contentStyle={{
      }}
      actions={[
        <FlatButton
          label="Submit"
          onTouchTap={() => {
            console.log(" SlideUrl : ", slideUrl.value);
            onSubmitClick(slideUrl.value);
          }}
          style={{ color: Colors.green }}
        />,
        <FlatButton
          label="Cancel"
          onTouchTap={handleCancelClicked}
          style={{ color: Colors.red }}
        />]}>
        <TextField
          style={{width: '600px'}}
          floatingLabelText="Google Slides URL"
          id="new-slides-url"
          ref={() => {
             slideUrl = document.getElementById('new-slides-url');
          }}
        />

  </Dialog>
    )
  }
}

export default MySlidesDialog;