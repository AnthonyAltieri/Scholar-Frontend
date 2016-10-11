/**
 * @author Anthony Altieri on 9/6/16.
 */

import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { startLoading } from '../actions/Loading';
import AppWithToast from './AppWithToast.jsx';
import Login from './LogIn/LogIn';
import Signup from '../components/Signup/Signup';
import DashCourses from './Dash/Courses/DashCourses';
import DashAdmin from '../components/Dash/Admin/DashAdmin';
import AddCourses from '../components/Dash/Admin/AddCourses';
import DeleteCourse from '../components/Dash/Admin/DeleteCourse';
import GetCourses from '../components/Dash/Admin/GetCourses';
import AddUser from '../components/Dash/Admin/AddUser';
import GetUsers from '../components/Dash/Admin/GetUsers';
import DashStudent from './Dash/Student/DashStudent';
import StudentQuestionList from './Dash/Student/StudentQuestionList';
import DashInstructor from './Dash/Instructor/DashInstructor';
import InstructorSettings from './Dash/Instructor/InstructorSettings';
import InstructorConfusion from './Dash/Instructor/Confusion';
import InstructorAsk from './Dash/Instructor/Ask';

class Root extends Component {
  componentWillMount() {
    this.props.dispatch(startLoading());
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Router history={syncHistoryWithStore(browserHistory, store)}>
          <Route path="/" component={AppWithToast}>
            <IndexRedirect to="/login/"/>
            <Route path="login" component={Login}/>
            <Route path="signup" components={Signup}/>
            <Route path="dash/">
              <Route path="courses" components={DashCourses}/>
              <Route path="courses/:filter" components={DashCourses}/>
              <Route path="admin" components={DashAdmin}>
                <Route path="addCourse" component={AddCourses}/>
                <Route path="deleteCourse" component={DeleteCourse}/>
                <Route path="getCourses" component={GetCourses}/>
                <Route path="addUser" component={AddUser}/>
                <Route path="getUsers" component={GetUsers}/>
              </Route>
              <Route path="student" components={DashStudent}>
                <Route path="questions" components={StudentQuestionList} />
              {/*<Route path="ask" components={AskQuestion} />*/}
              {/*<Route path="assessment" components={} />*/}
              </Route>
              <Route path="instructor" components={DashInstructor} >
                <Route path="confusion" components={InstructorConfusion} />
                <Route path="settings" components={InstructorSettings} />
                <Route path="ask" components={InstructorAsk} />
              </Route>
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}
Root = connect()(Root);

export default Root;