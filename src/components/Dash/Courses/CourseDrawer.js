import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

const CourseDrawer = ({
  isOpen,
  closeDrawer,
  navigate,
  onLogOutClick,
  pathname,
  startLoading,
  onLeave,
}) => (
  <Drawer
    docked={false}
    width={200}
    open={isOpen}
    onRequestChange={(open, reason) => {
      if (!open) {
        closeDrawer();
      }
    }}
  >
    <MenuItem
      rightIcon={
        <FontIcon className="material-icons">
          not_interested
        </FontIcon>
      }
      onTouchTap={() => {
        onLogOutClick()
      }}
    >
      Log Out
    </MenuItem>
    <MenuItem
      rightIcon={
        <FontIcon className="material-icons">
          account_box
        </FontIcon>
      }
      onTouchTap={() => {
        console.log('pathname', pathname);
        if (pathname === '/dash/account/') return;
        startLoading();
        navigate('/dash/account');
        closeDrawer();
      }}
    >
      Account
    </MenuItem>
    <MenuItem
      rightIcon={
        <FontIcon className="material-icons">
          view_headline
        </FontIcon>
      }
      onTouchTap={() => {
        if (pathname === '/dash/courses/active') return;
        if (pathname === '/dash/courses/inactive') return;
        if (!!onLeave) onLeave();
        navigate('/dash/courses/active');
        closeDrawer();
      }}
    >
      Courses
    </MenuItem>
  </Drawer>
);


export default CourseDrawer;