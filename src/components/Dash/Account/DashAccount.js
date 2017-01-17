/**
 * @author Anthony Altieri on 1/16/17.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import {
  getAccountInfo,
  saveAccountInfo,
} from '../../../api/User';
import * as UserActions from '../../../actions/User'
import * as LoadingActions from '../../../actions/Loading'
import * as DrawerActions from '../../../actions/Drawer';
import * as OverlayActions from '../../../actions/Overlay';
import * as AccountActions from '../../../actions/Dash/Account';
import Colors from '../../../util/Colors';
import Nav from '../Courses/Nav';
import CourseDrawer from '../Courses/CourseDrawer';
import LogOutDialog from '../Courses/LogOutDialog';
import EditableValue from './EditableValue';
import GreenRaisedButton from '../../buttons/GreenRaisedButton';
import RaisedButton from 'material-ui/RaisedButton';

const validPhone = (phone) => {
  phone = phone.replace('-', '');
  phone = phone.replace(' ', '');
  phone = phone.replace('(', '');
  phone = phone.replace(')', '');
  const regEx = /\d{7}/;
  return regEx.test(phone);
};

const formatPhone = (phone) => {
  let formattedPhone = phone;
  formattedPhone = formattedPhone.replace('-', '');
  formattedPhone = formattedPhone.replace(' ', '');
  formattedPhone = formattedPhone.replace('(', '');
  formattedPhone = formattedPhone.replace(')', '');
  formattedPhone = formattedPhone.trim();
  return formattedPhone;
};

async function handleAccountSave(
  userId,
  username,
  firstName,
  lastName,
  phone,
  institutionId,
  displayedFirstName,
  displayedLastName,
  displayedPhone,
  displayedInstitutionId,
  logOut,
  receivedAccountInfo,
) {
};


class DashAccount extends Component {
  async componentDidMount() {
    const {
      userId,
      receivedAccountInfo,
      endLoading,
    } = this.props;
    try {
      const payload = await getAccountInfo(userId);
      if (!!payload.error) {
        toastr.error('Something went wrong please refresh the page');
        return;
      }
      if (!!payload.noUserFound) {
        // TODO: LOG OUT
      }
      const {
        firstName,
        lastName,
        email,
        phone,
        institutionId,
      } = payload.accountInfo;
      console.log('institutionId', institutionId);
      receivedAccountInfo(firstName, lastName, email, phone, institutionId);
      endLoading();
    } catch (e) {
      console.error('[ERROR] DashAccount getAccountInfo', e);
      toastr.error('Something went wrong please refresh the page');
    }
  }

  render() {
    const {
      userId,
      username,
      openDrawer,
      closeDrawer,
      isDrawerOpen,
      showOverlay,
      navigate,
      pathname,
      hideOverlay,
      onLogoutClick,
      isOverlayVisible,
      overlayType,
      firstName,
      lastName,
      phone,
      studentId,
      setAccountFirstName,
      setAccountLastName,
      setAccountPhone,
      setAccountStudentId,
      displayedFirstName,
      displayedLastName,
      displayedPhone,
      displayedInstitutionId,
      receivedAccountInfo,
    } = this.props;
    let inputFirstName = null;
    let inputLastName= null;
    let inputPhone = null;
    let inputStudentId = null;
    return (
      <div>
        <Nav
          title="Account"
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          isDrawerOpen={isDrawerOpen}
        />
        <CourseDrawer
          isOpen={isDrawerOpen}
          closeDrawer={closeDrawer}
          onLogOutClick={() => showOverlay('LOG_OUT')}
          navigate={navigate}
          pathname={pathname}
        />
        <LogOutDialog
          isOpen={isOverlayVisible && overlayType === 'LOG_OUT'}
          onYesClick={() => {
            onLogoutClick();
          }}
          onNoClick={() => { hideOverlay() }}
        />
        <div className="c">
          <EditableValue
            floatingLabelText="First Name"
            defaultValue={firstName}
            hasBeenEdited={firstName.trim() !== displayedFirstName.trim()}
            onChange={(e, v) => {
              setAccountFirstName(v)
            }}
            id="account-info-first-name"
            ref={() => {
              inputFirstName = document
              .getElementById('account-info-first-name');
            }}
          />
          <EditableValue
            floatingLabelText="Last Name"
            defaultValue={lastName}
            hasBeenEdited={lastName.trim() !== displayedLastName.trim()}
            onChange={(e, v) => {
              setAccountLastName(v)
            }}
            id="account-info-last-name"
            ref={() => {
              inputLastName = document
              .getElementById('account-info-last-name');
            }}
          />
          <EditableValue
            floatingLabelText="Phone Number"
            defaultValue={phone}
            hasBeenEdited={phone.trim() !== displayedPhone.trim()}
            onChange={(e, v) => {
              setAccountPhone(v)
            }}
            id="account-info-phone"
            ref={() => {
              inputPhone = document
              .getElementById('account-info-phone');
            }}
          />
          <EditableValue
            floatingLabelText="Student Id"
            defaultValue={studentId}
            hasBeenEdited={studentId.trim() !== displayedInstitutionId.trim()}
            onChange={(e, v) => {
              setAccountStudentId(v)
            }}
            id="account-info-studentId"
            ref={() => {
              inputStudentId = document
              .getElementById('account-info-studentId');
            }}
          />
          <GreenRaisedButton
            label="Save"
            style={{
              width: 120,
              marginTop: 20,
            }}
            onTouchTap={async () => {
              let isSaveNeeded = false;
              if (firstName !== displayedFirstName) {
                isSaveNeeded = true;
              }
              if (lastName !== displayedLastName) {
                isSaveNeeded = true;
              }
              if (phone !== displayedPhone) {
                if (!validPhone(displayedPhone)) {
                  toastr.info('Phone Number is invalid');
                  return;
                }
                isSaveNeeded = true;
              }
              if (studentId !== displayedInstitutionId) {
                isSaveNeeded = true;
              }
              if (isSaveNeeded) {
                try {
                  const payload = await saveAccountInfo(
                    userId,
                    displayedFirstName,
                    displayedLastName,
                    formatPhone(displayedPhone),
                    displayedInstitutionId
                  );
                  if (!!payload.error) {
                    toastr.error('Something went wrong please try again');
                    return;
                  }
                  if (!!payload.noUserFound) {
                    toastr.error('You have been logged out please log in again');
                    logOut();
                    return;
                  }
                  if (!!payload.phoneInUse) {
                    toastr.info(
                      'This Phone Number is already in use',
                      ('Email contact@crowdconnect.io if you think someone else is ' +
                      'using your phone number')
                    );
                    return;
                  }
                  toastr.success('Account info has been saved');
                  receivedAccountInfo(
                    displayedFirstName,
                    displayedLastName,
                    username,
                    displayedPhone,
                    displayedInstitutionId,
                  );
                } catch (e) {
                  console.error('[ERROR] DashAccount saveAccountInfo', e);
                  toastr.error('Something went wrong please try again');
                }
              }

            }}
          />
          <RaisedButton
            label="cancel"
            backgroundColor={Colors.bright}
            labelColor="#FFFFFF"
            style={{
              marginTop: 18,
              width: 120,
            }}
            onTouchTap={() => {
              setAccountFirstName(firstName);
              setAccountLastName(lastName);
              setAccountPhone(phone);
              setAccountStudentId(studentId);
              inputFirstName.value = firstName;
              inputLastName.value = lastName;
              inputPhone.value = phone;
              inputStudentId.value = studentId;
            }}
          />
        </div>
      </div>
    )
  }
};

function getFirstName(name) {
  if (name.split(' ').length < 1)
    return 'ERROR';
  if (!!name.split(' ')[0])
    return name.split(' ')[0];
  return 'ERROR'
}

function getLastName(name) {
  if (name.split(' ').length < 2)
    return 'ERROR';
  if (!!name.split(' ')[1])
    return name.split(' ')[1];
  return 'ERROR'
}

const stateToProps = (state) => ({
  userId: state.User.id,
  username: state.User.username,
  isDrawerOpen: !!state.Drawer.isOpen,
  pathname: state.routing.locationBeforeTransitions.pathname,
  isOverlayVisible: state.Overlay.isVisible,
  overlayType: state.Overlay.type,
  firstName: getFirstName(state.User.name),
  lastName: getLastName(state.User.name),
  phone: state.User.phone,
  studentId: state.User.institutionId,
  displayedFirstName: state.Dash.Account.firstName,
  displayedLastName: state.Dash.Account.lastName,
  displayedPhone: state.Dash.Account.phone,
  displayedInstitutionId: state.Dash.Account.institutionId,
});
const dispatchToProps = (dispatch) => ({
  receivedAccountInfo: (
    firstName,
    lastName,
    email,
    phone,
    institutionId,
  ) => {
    dispatch(
      UserActions.receivedAccountInfo(
        firstName,
        lastName,
        email,
        phone,
        institutionId
      )
    );
  },
  endLoading: () => {
    dispatch(LoadingActions.endLoading());
  },
  openDrawer: () => {
    dispatch(DrawerActions.openDrawer());
  },
  closeDrawer: () => {
    dispatch(DrawerActions.closeDrawer())
  },
  navigate: (url) => {
    dispatch(push(url));
  },
  showOverlay: (overlayType) => {
    dispatch(OverlayActions.setOverlayType(overlayType));
    dispatch(OverlayActions.showOverlay());
  },
  hideOverlay: () => {
    dispatch(OverlayActions.clearOverlayType());
    dispatch(OverlayActions.hideOverlay());
  },
  onLogoutClick: () => {
    dispatch(UserActions.logOut());
    dispatch(OverlayActions.clearOverlayType());
    dispatch(OverlayActions.hideOverlay());
    dispatch(push('/login'));
  },
  setAccountFirstName: (firstName) => {
    dispatch(AccountActions.setAccountFirstName(firstName));
  },
  setAccountLastName: (lastName) => {
    dispatch(AccountActions.setAccountLastname(lastName));
  },
  setAccountPhone: (phone) => {
    dispatch(AccountActions.setAccountPhone(phone));
  },
  setAccountStudentId: (institutionId) => {
    dispatch(AccountActions.setAccountStudentId(institutionId));
  },
});

DashAccount = connect(
  stateToProps,
  dispatchToProps,
)(DashAccount);

export default DashAccount;
