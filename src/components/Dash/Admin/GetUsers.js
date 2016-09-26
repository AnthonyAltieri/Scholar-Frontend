/**
 * @author Anthony Altieri on 9/26/16.
 */

import React, { Component } from 'react';
import User from './UserList/User';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../../api/User';
import * as AdminActions from '../../../actions/Admin'

class GetCourses extends Component{
  componentDidMount() {
    fetchAllUsers()
      .then((users) => {
        this.props.receivedUsers(users);
      })
  }

  render() {
    const { users } = this.props;
    return (
      <div className="formcard">
        <ul className="list">
          {users.map((u) => (
            <User
              id={u.id}
              firstname={u.firstname}
              lastname={u.lastname}
              type={u.type}
              key={u.id}
            />
          ))}
        </ul>
      </div>
    );
  }
};
GetCourses = connect(
  (state) => ({
    users: state.Admin.users,
  }),
  (dispatch) => ({
    receivedUsers: (users) => {
      dispatch(AdminActions.receivedUsers(users));
    }
  })
)(GetCourses);

export default GetCourses;
