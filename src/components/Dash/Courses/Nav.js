/**
 * @author Anthony Altieri on 9/7/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';

const Nav = ({
  title,
  openDrawer,
  closeDrawer,
  isDrawerOpen,
}) => (
  <AppBar
    title={title}
    onLeftIconButtonTouchTap={() => {
      console.log('isDrawerOpen', isDrawerOpen);
      if (isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }}
  />
);

//   return (
//     <div className="nav">
//       <div className="nav-top">
//         <a
//           className="logout"
//           onClick={onLogoutClick}
//         >
//           LOG OUT
//         </a>
//         <h1 className="header">Courses</h1>
//       </div>
//       <div className="nav-tabs">
//         <a
//           className={filter === 'active' ? 'tab tab-active' : 'tab'}
//           onClick={onActiveClick}
//         >
//           ACTIVE
//         </a>
//         <a
//           to="inactive"
//           className={filter === 'inactive' ? 'tab tab-active' : 'tab'}
//           onClick={onInactiveClick}
//         >
//           INACTIVE
//         </a>
//       </div>
//     </div>
//   );
// }

export default Nav;
