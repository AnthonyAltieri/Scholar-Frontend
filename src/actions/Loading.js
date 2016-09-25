/**
 * @author Anthony Altieri on 9/7/16.
 */

export const startLoading = () => {
  return {
    type: 'START_LOADING',
  }
};

export const endLoading = () => {
  return {
    type: 'END_LOADING',
  }
};
