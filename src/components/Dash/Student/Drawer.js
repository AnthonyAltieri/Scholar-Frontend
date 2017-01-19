/**
 * @flow
 * @author Anthony Altieri on 1/18/17.
 */

import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

const DRAWER_WIDTH = 200;

const StudentDrawer = ({
  closeDrawer,
  onCoursesClick,
  onAttendanceClick,
  onSMSHelpClick,
  isDrawerOpen,
}) => (
  <Drawer
    docked={false}
    width={DRAWER_WIDTH}
    open={isDrawerOpen}
    onRequestChange={(open, reason) => !open ? closeDrawer() : null}
  >
    <MenuItem
      onTouchTap={onCoursesClick}
      rightIcon={ <FontIcon className="material-icons"> list </FontIcon> }
    >
      Go To Courses
    </MenuItem>
    <MenuItem
      onTouchTap={onAttendanceClick}
      rightIcon={ <FontIcon className="material-icons"> pan_tool </FontIcon> }
    >
      Attendance
    </MenuItem>
    <MenuItem
      onTouchTap={onSMSHelpClick}
      rightIcon={<FontIcon className="material-icons">phone_iphone</FontIcon>}
    >
      SMS Text Help
    </MenuItem>
  </Drawer>
);

export default StudentDrawer;

