import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../../../util/Colors';
import AttendanceCodeBox from './AttendanceCodeBox'
import StatBlock from './StatBlock'
import { createAttendanceCode, closeAttendance } from '../../../../api/CourseSession';
import * as AttendanceActions from '../../../../actions/Attendance';
import {toastr} from 'react-redux-toastr'
const INACTIVE_CODE_TEXT = "INACTIVE";


class AttendanceDialog extends Component {

  render() {
    const {
      isOpen,
      onStartClick,
      onEndClick,
      onCancelClick,
      numberAttendees,
      courseSessionId,
      handleCodeActivated,
      handleCodeDeactivated,
      numberInCourseSession
    } = this.props;

    let { code } = this.props;
    let isAttendanceOpen = false;

    if(!code){
      code = INACTIVE_CODE_TEXT;
    }

    const getCode =  async () => {
      const payload = await createAttendanceCode(courseSessionId);
      let { code, error } = payload;
      if(!!error) {
        //TODO: handle this error
        return;
      }
      handleCodeActivated(code);
    };

    const deactivateCode = async () => {
      const payload = await closeAttendance(courseSessionId);
      const { error } = payload;
      if(!!error) {
        //TODO: handle error
        return;
      }
      handleCodeDeactivated();
    };

    const handleCancelClicked = () => {
      if(!!isAttendanceOpen) {
        toastr.warning("The Attendance is still open and students can continue to join.")
      }
      onCancelClick();

    };

    let stage;
    let stageHeading = " : STAGE 1";

    //if code is not invalid and therefore attendance is open
    if(!!code && code!==INACTIVE_CODE_TEXT){
      stageHeading = " : STAGE 2";
      isAttendanceOpen = true;
      stage = (
        <div>
          Show this code to your students!
          <br/>  Whenever you're ready to close the attendance, press "CLOSE".
          <br/>
        </div>
      );
    }
    else{
      stageHeading = " : STAGE 1";
      isAttendanceOpen = false;
      stage = (
        <div>
          Generate a code by clicking "GET CODE"!
          <br/> number students in-app (present) and number students who entered code correctly (attendance)
          <br/>
        </div>
      )
    }

    let content = (
      <Dialog
        title={"Take Attendance" + stageHeading}
        open={isOpen}
        modal={false}
        contentStyle={{
        }}
        actions={[
          <FlatButton
            label="Get Code"
            style={{
              color: !!isAttendanceOpen ? Colors.lightGray : Colors.green
            }}
            disabled={isAttendanceOpen}
            onTouchTap={getCode}
          />,
          <FlatButton
            label="Close"
            onTouchTap={deactivateCode}
            disabled={!isAttendanceOpen}
            style={{
              color: !!isAttendanceOpen ? Colors.red : Colors.lightGray
            }}
          />,
          <FlatButton
            label="Exit"
            onTouchTap={handleCancelClicked}
          />,

        ]}
      >
        {stage}



        <div className="r-center">
          <p
            style={{
              marginRight: 8,
            }}
          >
            CODE :
          </p>
          <p>
            <AttendanceCodeBox style={{ width: 220 }} code={code}/>
          </p>
          </div>
        <div className="r-center">
          <p
            style={{
              marginRight: 8,
            }}
          >
            Present :
          </p>
          <p
            style={{
              marginRight: 18,
            }}
          >
            <AttendanceCodeBox code={numberInCourseSession}/>
          </p>
          <p
            style={{
              marginRight: 8,
            }}
          >
            Attendance :
          </p>
          <p>
            <AttendanceCodeBox code={numberAttendees}/>
          </p>
        </div>


      </Dialog>
    );

    return content;
  }
}



const stateToProps = state => ({
  code : (state.Course.Attendance)?state.Course.Attendance.code : INACTIVE_CODE_TEXT,
  numberAttendees : (state.Course.Attendance)? state.Course.Attendance.numberAttendees : 0,
  numberInCourseSession: (state.Course.Attendance) ? state.Course.Attendance.numberInCourseSession : 0,
  courseSessionId : state.Course.activeCourseSessionId
});

const dispatchToProps = (dispatch, ownProps) => ({
  handleCodeActivated: (code) =>  dispatch(AttendanceActions.activateCode(code)),
  handleCodeDeactivated: () => dispatch(AttendanceActions.deactivateCode()),
});

AttendanceDialog = connect(
  stateToProps,
  dispatchToProps,
) (AttendanceDialog);

export default AttendanceDialog;
