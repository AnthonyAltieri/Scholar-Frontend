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
}) => {
  return (
    <div className="c">
      <br />
      <NavBtn
        icon="exit_to_app"
        label="log out"
        onClick={() => {
          // TODO: implement log-out
        }}
      />
      <NavBtn
        icon="home"
        label="home"
        onClick={() => {
          navigate('/dash/instructor/home')
        }}
      />
      <NavBtn
        icon="settings"
        label="settings"
        onClick={() => {
          navigate('/dash/instructor/settings')
        }}
      />

    </div>
  )
};

export default HomeNav;
