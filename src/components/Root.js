/**
 * @author Anthony Altieri on 9/6/16.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import AppWithToast from './AppWithToast.jsx';
import { syncHistoryWithStore } from 'react-router-redux';
import Login from './LogIn/LogIn';
import Signup from '../components/Signup/Signup';
import DashCourses from '../components/Dash/DashCourses/DashCourses';
import DashAdmin from '../components/Dash/Admin/DashAdmin';
import AddCourses from '../components/Dash/Admin/AddCourses';
import DeleteCourse from '../components/Dash/Admin/DeleteCourse';
import GetCourses from '../components/Dash/Admin/GetCourses';
import AddUser from '../components/Dash/Admin/AddUser';
import GetUsers from '../components/Dash/Admin/GetUsers';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route path="/" component={AppWithToast}>
        <IndexRedirect to="/login/"/>
        <Route path="login" component={Login} />
        <Route path="signup" components={Signup} />
        <Route path="dash/">
          <Route path="courses" components={DashCourses} />
          <Route path="courses/:filter" components={DashCourses} />
          <Route path="admin" components={DashAdmin}>
            <Route path="addCourse" component={AddCourses} />
            <Route path="deleteCourse" component={DeleteCourse} />
            <Route path="getCourses" component={GetCourses} />
            <Route path="addUser" component={AddUser} />
            <Route path="getUsers" component={GetUsers} />
          </Route>
          {/*<Route path="student" components={DashStudent}>*/}
            {/*<Route path="questions" components={StudentQuestionList} />*/}
            {/*<Route path="ask" components={AskQuestion} />*/}
            {/*<Route path="assessment" components={} />*/}
          {/*</Route>*/}
          {/*<Route path="instructor" components={DashInstructor} />*/}
        </Route>
      </Route>
    </Router>
  </Provider>
);

export default Root;