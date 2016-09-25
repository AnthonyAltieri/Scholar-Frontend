/**
 * @author Anthony Altieri on 9/8/16.
 */

import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { connect } from 'react-redux';
import '../../node_modules/react-redux-toastr/src/less/index.less';
import Loading from '../components/Loading';

class AppWithToast extends Component {
  render() {
    const { children, isLoading } = this.props;

    return (
      <div>
        {isLoading ? <Loading /> : ''}
        {children}
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          position="bottom-center"
        />
      </div>
    );
  }
}
AppWithToast = connect(
  (state) => ({
    isLoading: state.Loading,
  })
)(AppWithToast);

export default AppWithToast;
