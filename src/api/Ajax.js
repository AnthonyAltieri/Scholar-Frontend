/**
 * @author Anthony Altieri on 11/1/16.
 */

//const SERVER_PREFIX = process.NODE_ENV === 'production'
  //? 'http://scholarapp.xyz'
  //: 'http://localhost:7000';

const SERVER_PREFIX = 'http://scholarapp.xyz';

export const send = (type, url, params = {}, withCredentials = true) => {
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    if (type !== 'POST' && type !== 'GET') {
      throw new Error(`Invalid xmlhttp type ${type}`);
    }
    if (url !== '/api/alert/get/active') {
      console.log(`sending ${type} at ${SERVER_PREFIX + url}`);
    }
    xmlhttp.open(type, SERVER_PREFIX + url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.withCredentials = withCredentials;
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState !== 4) return;
      if (xmlhttp.status === 200) {
        try {
          const payload = JSON.parse(xmlhttp.responseText);
          if (url !== '/api/alert/get/active') {
            console.log('payload', payload);
          }
          resolve(payload);
        } catch (e) {
          reject({
            text: 'response parse error'
          })
        }
      } else {
        reject({
          code: xmlhttp.status,
          text: xmlhttp.statusText,
        })
      }
    }
    try {
      const parameters = JSON.stringify(params);
      if (url !== '/api/alert/get/active') {
        console.log('parameters', parameters);
      }
      xmlhttp.send(parameters);
    } catch (e) {
      reject({
        text: 'params stringify error',
      })
    }
  });
};

export const post = (url, params = {}, withCredentials = true) => {
  return new Promise((resolve, reject) => {
    send('POST', url, params, withCredentials)
      .then((payload) => { resolve(payload) })
      .catch((error) => { reject(error) })
  })
};

export const sendAbsoluteUrl = (type, url, params = {}, withCredentials = true) => {
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    if (type !== 'POST' && type !== 'GET') {
      throw new Error(`Invalid xmlhttp type ${type}`);
    }
    if (url !== '/api/alert/get/active') {
      console.log(`sending ${type} at ${url}`);
    }
    xmlhttp.open(type,  url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.withCredentials = withCredentials;
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState !== 4) return;
      if (xmlhttp.status === 200) {
        try {
          const payload = JSON.parse(xmlhttp.responseText);
          if (url !== '/api/alert/get/active') {
            console.log('payload', payload);
          }
          resolve(payload);
        } catch (e) {
          reject({
            text: 'response parse error'
          })
        }
      } else {
        reject({
          code: xmlhttp.status,
          text: xmlhttp.statusText,
        })
      }
    }
    try {
      const parameters = JSON.stringify(params);
      if (url !== '/api/alert/get/active') {
        console.log('parameters', parameters);
      }
      xmlhttp.send(parameters);
    } catch (e) {
      reject({
        text: 'params stringify error',
      })
    }
  });
};

export const postAbsoluteUrl = (url, params = {}, withCredentials = true) => {
  return new Promise((resolve, reject) => {
    sendAbsoluteUrl('POST', url, params, withCredentials)
      .then((payload) => { resolve(payload) })
      .catch((error) => { reject(error) })
  })
};
