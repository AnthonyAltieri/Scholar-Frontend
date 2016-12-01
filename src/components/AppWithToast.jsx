/**
 * @author Anthony Altieri on 9/8/16.
 */

import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { connect } from 'react-redux';
import '../../node_modules/react-redux-toastr/src/less/index.less';
import Loading from '../components/Loading';
import Colors from '../colors';
import { grey100, grey300, grey500, darkBlack, fullBlack,
} from '../../node_modules/material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from '../../node_modules/material-ui/utils/colorManipulator';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.primary,
    primary2Color: Colors.primaryDark,
    primary3Color: Colors.gray,
    accent1Color: Colors.bright,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: Colors.dark,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: Colors.primaryLight,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  fontFamily: 'Lato, Helvetica, sans-serif',
  appbar: {
    height: 52,
  },
});

class AppWithToast extends Component {
  render() {
    const { children, isLoading } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {isLoading ? <Loading /> : ''}
          {children}
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            position="bottom-center"
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
AppWithToast = connect(
  (state) => ({
    isLoading: state.Loading,
  })
)(AppWithToast);

export default AppWithToast;
