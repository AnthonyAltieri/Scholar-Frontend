/**
 * @author Anthony Altieri on 9/29/16.
 */

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("[ERROR] in localStorage > loadState : " + error);

    return undefined;
  }
};

export const saveState = (state) => {
  try {
    console.log("IN SAVE STATE LOCAL STORAGE");
    console.log(JSON.stringify(state));
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    // console.error("[ERROR] in localStorage > saveState : " + error);
  }
};
