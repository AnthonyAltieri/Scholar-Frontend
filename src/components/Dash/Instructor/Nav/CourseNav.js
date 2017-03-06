// /**
//  * @author Anthony Altieri on 11/18/16.
//  */
//
// import React from 'react';
// import NavBtn from './NavBtn';
//
// const IMG_PATH = '../../../../img';
// // require('../../../../img')
//
//
// const CourseNav = ({
//   navigate,
//   setMode,
//   showOverlay,
//   isCourseSessionActive,
//   courseAbbreviation,
//   clearCourse,
// }) => {
//   return (
//     <div className="c">
//       <ActiveBar
//         isCourseSessionActive={isCourseSessionActive}
//       />
//       <h2 className="code">{courseAbbreviation}</h2>
//       <NavBtn
//         icon="home"
//         label="home"
//         onClick={() => {
//           console.log('CLICK HOME')
//           navigate('/dash/instructor/home')
//           clearCourse();
//         }}
//       />
//       {/* <NavBtn
//         icon="settings"
//         label="settings"
//         onClick={() => {
//           setMode('SETTINGS')
//         }}
//       /> */}
//       <NavBtn
//         icon="power_settings_new"
//         label="session"
//         onClick={() => {
//           showOverlay('COURSE_SESSION');
//         }}
//       />
//       {/* <NavBtn
//         icon="dashboard"
//         label="main"
//         onClick={() => {
//           setMode('MAIN')
//         }}
//       /> */}
//       <NavBtn
//         icon="chat"
//         label="ask  "
//         onClick={() => {
//           setMode('ASK')
//         }}
//       />
//       <NavBtn
//         icon="priority_high"
//         label="alert"
//         onClick={() => {
//           setMode('ALERT')
//         }}
//       />
//       <NavBtn
//         icon="school"
//         label="assess"
//         onClick={() => {
//           setMode('ASSESS')
//         }}
//       />
//       <NavBtn
//         icon="monetization_on"
//         label="Bank"
//         onClick={() => {
//           setMode('QUESTION_BANK')
//         }}
//       />
//       <NavBtn
//         icon="pan_tool"
//         label="Attendance"
//         onClick={() => {
//           showOverlay('ATTENDANCE')
//         }}
//       />
//     </div>
//   );
// };
//
// export default CourseNav;
