/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Colors from '../../../../util/Colors';
import NavBtn from './NavBtn';



const HomeNav = ({
  navigate,
  logOut,
}) => {
  return (
    <div className="c">
      <br />
      <NavBtn
        icon="exit_to_app"
        label="log out"
        onTouchTap={() => {
          logOut();
          navigate('/login');
        }}
      />
      <NavBtn
        icon="home"
        label="home"
        onTouchTap={() => {
          navigate('/dash/instructor/home')
        }}
      />
      <NavBtn
        icon="school"
        label="Grades"
        onTouchTap={() => {
          navigate('/dash/instructor/grades');
        }}
      />
      {/* <NavBtn
        icon="settings"
        label="settings"
        onTouchTap={() => {
          navigate('/dash/instructor/settings')
        }}
      /> */}
    </div>
  )
};

export default HomeNav;
