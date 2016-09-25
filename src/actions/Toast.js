/**
 * @author Anthony Altieri on 9/7/16.
 */

export const showToast = (type, content) => {
  return {
    type: 'SHOW_TOAST',
    toastType: type,
    content,
  }
};
