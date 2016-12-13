/**
 * @author Anthony Altieri on 9/6/16.
 */

import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { startLoading } from '../actions/Loading';
import AppWithToast from './AppWithToast.jsx';
import Login from './LogIn/LogIn';
import Signup from './Signup/Signup';
import SignupInstructor from './Signup/SignupInstructor'
import DashCourses from './Dash/Courses/DashCourses';
import DashAdmin from '../components/Dash/Admin/DashAdmin';
import AddCourses from '../components/Dash/Admin/AddCourses';
import DeleteCourse from '../components/Dash/Admin/DeleteCourse';
import GetCourses from '../components/Dash/Admin/GetCourses';
import AddUser from '../components/Dash/Admin/AddUser';
import GetUsers from '../components/Dash/Admin/GetUsers';
import DashStudent from './Dash/Student/DashStudent';
import StudentQuestionList from './Dash/Student/StudentQuestionList';
import InstructorHome from './Dash/Instructor/Home/Home';
import DashInstructor from './Dash/Instructor/DashInstructor';
import AddCourse from './Dash/Instructor/Home/Course/Add';
import DashCourse from './Dash/Instructor/Course/DashCourse';
import InstructorSettings from './Dash/Instructor/InstructorSettings';
import InstructorConfusion from './Dash/Instructor/Course/Confusion';
import InstructorAsk from './Dash/Instructor/Course/Ask/Ask';

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
            <Route path="signup/instructor" components={SignupInstructor}/>
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
                {/*<Route path="questions" components={StudentQuestionList} />*/}
              {/*<Route path="ask" components={AskQuestion} />*/}
              {/*<Route path="assessment" components={} />*/}
              </Route>
              <Route path="instructor" components={DashInstructor} >
                <IndexRedirect to="/dash/instructor/home"/>
                <Route path="home" components={InstructorHome} />
                <Route path="home/addCourse" components={AddCourse} />
                <Route path="course/:courseId" components={DashCourse} />
                <Redirect from="course" to="home" />
                <Route path="settings" components={InstructorSettings} />
                <Route path="confusion" components={InstructorConfusion} />
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