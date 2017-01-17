// @flow

/**
 * @author Anthony Altieri on 10/14/16.
 * @author Bharat Batra on 10/14/16.
 */


export const set = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value, (k, v) => {
      if (typeof v === 'function') {
        return v + '';
      }
      return v;
    });
    if (typeof window.localStorage === 'undefined') {
      document.cookie = `${key}=${serializedValue}`;
    } else {
      window.localStorage.setItem(key, serializedValue);
    }
  } catch (e) {
    return false;
  }
};

export const get = (key) => {
  // console.log('get Storage');
  if (typeof window.localStorage === 'undefined') {
    const cookies = document.cookie.split(';');
    cookies.forEach((c) => {
      const [cookieKey, cookieValue] = c.split('=');
      if (key === cookieKey) {
        try {
          return JSON.stringify(cookieValue);
        } catch (e) {
          console.log('e in get', e);

          return false;
        }
      }
    });
    return undefined;
  } else {
    const serialized = window.localStorage.getItem(key);
    try {
      return JSON.parse(serialized);
    } catch (e) {
      console.log('e in get', e);
      return undefined;
    }
  }
};
