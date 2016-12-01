/**
 * @author Anthony Altieri on 9/8/16.
 */


export const showOverlay = () => ({
  type: 'SHOW_OVERLAY',
});

export const hideOverlay = () => ({
  type: 'HIDE_OVERLAY',
});

export const setOverlayType = (overlayType)  => ({
  type: 'SET_OVERLAY_TYPE',
  overlayType,
});

export const clearOverlayType = () => ({
  type: 'CLEAR_OVERLAY_TYPE',
});
