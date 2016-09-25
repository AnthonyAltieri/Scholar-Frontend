/**
 * @author Anthony Altieri on 9/4/16.
 */

import React, { Component } from 'react';
import Loading from './Loading';

class App extends Component {
  componentDidMount() {
    // this.context.store.dispatch(startLoading())
    this.unsubscribe = this.context.store.subscribe(() => {
      this.forceUpdate();
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // const props = this.props;
    // const path = props.location.pathname;
    const { store } = this.context;
    const state = store.getState();
    // const { loading, User, View, CourseList } = state;
    const { loading } = state;

    if (loading) {
      return <Loading />
    }
  }
}
App.contextTypes = {
  store: React.PropTypes.object,
};

export default App;
