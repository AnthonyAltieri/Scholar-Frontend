import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../../../util/Colors';
import AttendanceCodeBox from './AttendanceCodeBox'
import { createAttendanceCode, closeAttendance } from '../../../../api/CourseSession';
import * as AttendanceActions from '../../../../actions/Attendance';
import Socket from '../../../../socket/Socket';
import Events from '../../../../socket/Events';
const INACTIVE_CODE_TEXT = "INACTIVE";

function setUpSockets(props) {
  const { courseSessionId, handleStudentJoinedAttendance } = props;
  const courseSessionChannel = `private-${courseSessionId}`;
  if (!Socket.getPusher() ||
    !Socket.getPusher().connection.connection) {
    Socket.connect();
  }
  Socket.subscribe(courseSessionChannel);

  Socket.bind(
    courseSessionChannel,
    Events.STUDENT_JOINED_ATTENDANCE,
    (data) => {
      console.log("Student Joined Attendance");
      console.log(JSON.stringify(data, null, 2));
      handleStudentJoinedAttendance(data.attendance);
    }
  );
  Socket.mainTainPersistence();
}

class AttendanceDialog extends Component {

  componentDidMount() {
    setUpSockets(this.props);
  }
  render() {
    const {
      isOpen,
      onStartClick,
      onEndClick,
      onCancelClick,
      numberAttendees,
      courseSessionId,
      handleCodeActivated,
      handleCodeDeactivated
    } = this.props;

    let { code } = this.props;

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

    let stage;
    let stageHeading = " : STAGE 1";

    let isAttendanceOpen = false;
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
      stage = (<div>
        Generate a code by clicking "GET CODE"!
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
            style={
              !isAttendanceOpen?
              { color: Colors.green }:
              { color: Colors.lightGray }
            }
            disabled={isAttendanceOpen}
            onTouchTap={getCode}
          />,
          <FlatButton
            label="Close"
            onTouchTap={deactivateCode}
            disabled={!isAttendanceOpen}
            style={
              !isAttendanceOpen?
              { color: Colors.lightGray }:
              { color: Colors.red }
            }
          />,
          <FlatButton
            label="Exit"
            onTouchTap={onCancelClick}
          />,

        ]}
      >
        {stage}



        <div className="r-center">
          <p>
            CODE :
          </p>
          <p>
            <AttendanceCodeBox code={code}/>
          </p>
          </div>
        <div className="r-center">
          <p>
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

  componentWillUnmount() {
    Socket.disconnect();
    Socket.clearPersistenceInterval();
  }
}



const stateToProps = state => ({
  code : (state.Course.Attendance)?state.Course.Attendance.code : INACTIVE_CODE_TEXT,
  numberAttendees : (state.Course.Attendance)? state.Course.Attendance.numberAttendees : 0,
  courseSessionId : state.Course.activeCourseSessionId
});

const dispatchToProps = (dispatch, ownProps) => ({
  handleCodeActivated: (code) =>  {dispatch(AttendanceActions.activateCode(code))},
  handleCodeDeactivated: () => {dispatch(AttendanceActions.deactivateCode())},
  handleStudentJoinedAttendance: (attendance) => {dispatch(AttendanceActions.studentJoined(attendance))}
});

AttendanceDialog = connect(
  stateToProps,
  dispatchToProps,
) (AttendanceDialog);

export default AttendanceDialog;
