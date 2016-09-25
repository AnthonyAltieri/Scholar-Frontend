/**
 * @author Anthony Altieri on 9/4/16.
 */

import { store } from 'redux';
import { Component } from 'react';
import Link from './Link';

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active={
          props.filter === state.StudentQuestionList.VisibleQuestionFilter
        }
        onClick={
          store.dispatch()
        }

      >

      </Link>
    );
  }
}