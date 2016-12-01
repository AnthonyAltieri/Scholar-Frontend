/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import Colors from '../../util/Colors';
import TextField from '../TextField';
import AutoComplete from 'material-ui/AutoComplete';
import ButtonRound from '../buttons/ButtonRound';
import schools from '../../Data/Schools';

const srcBack = require('../../img/App/back.svg');
const InstructorCredentials = ({
  handleBack,
}) => {
  let firstName = '';
  let lastName = '';
  let email = '';
  let password = '';
  let phone = '';
  let institutionId = '';
  let school = '';

  return (
    <div
      className="sign-up fullscreen background-primary"
    >
      <div className="navigation">
        <img
          src={srcBack}
          className="back"
          onClick={handleBack}
        />
        <h2
          className="text"
          onClick={handleBack}
        >
          Referral Code
        </h2>
      </div>
      <div
        className="c"
        style={{
            paddingLeft: "12px",
            paddingRight: "12px",
            maxWidth: "500px",
            margin: "auto",
            backgroundColor: Colors.primary,
          }}
      >
        <TextField
          floatingLabelText="School Email"
          hintText="instructor@college.edu"
          type="email"
          onChange={(event) => {
              email = event.target.value;
            }}
          underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
          fullWidth
        />
        <TextField
          floatingLabelText="Password"
          hintText="Minimum 6 Characters"
          type="password"
          onChange={(event) => {
              password = event.target.value;
            }}
          underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
          fullWidth
        />
        <TextField
          floatingLabelText="First Name"
          type="text"
          onChange={(event) => {
              firstName = event.target.value;
            }}
          underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
          fullWidth
        />
        <TextField
          floatingLabelText="Last Name"
          type="text"
          onChange={(event) => {
              lastName = event.target.value;
            }}
          underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
          fullWidth
        />
        <TextField
          floatingLabelText="School Id"
          type="text"
          onChange={(event) => {
              institutionId = event.target.value;
            }}
          underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
          fullWidth
        />
        <TextField
          floatingLabelText="Phone Number"
          hintText="xxx-xxx-xxxx"
          type="text"
          onChange={(event) => {
              phone = event.target.value;
            }}
          underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
          fullWidth
        />
        <AutoComplete
          floatingLabelText="School Name"
          type="text"
          floatingLabelFocusStyle={{
              color: Colors.bright,
            }}
          underlineFocusStyle={{
              borderColor: Colors.bright,
            }}
          underlineStyle={{
              borderColor: "rgba(0,0,0,0.3)",
            }}
          style={{
              marginBottom: "12px",
            }}
          dataSource={schools || []}
          ref={(n) => {
              school = n;
            }}
          filter={AutoComplete.caseInsensitiveFilter}
          fullWidth
        />
        <ButtonRound
          style={{
              marginBottom: "12px",
            }}
          onClick={() => {
              startLoading();
              const validCredentials = hasValidCredentials(
                firstName,
                lastName,
                email,
                password,
                phone,
                institutionId,
                school.state.searchText,
                endLoading
              );
              if (validCredentials) {
                handleSignUp(
                  firstName,
                  lastName,
                  email,
                  password,
                  phone,
                  institutionId,
                  school,
                  navigate,
                  endLoading,
                );
              }
            }}
        >
          SIGN UP
        </ButtonRound>
      </div>

    </div>

  )
};

export default InstructorCredentials;
