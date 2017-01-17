/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';

const backSrc = require('../../../img/App/back.svg');

const Nav = ({
  onBackClick,
  isMenuOpen,
  closeMenu,
  openMenu,
  isDrawerOpen,
  closeDrawer,
  openDrawer,
  code,
  mode
}) => (
  <AppBar
    title={code}
    onLeftIconButtonTouchTap={() => {
      if (isDrawerOpen) {
        closeDrawer();
        return;
      }
      openDrawer();
    }}
    onRightIconButtonTouchTap={() => {
      if (isMenuOpen) {
        closeMenu();
        return;
      }
      openMenu();
    }}
  />
);

export default Nav;
