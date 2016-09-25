/**
 * @author Anthony Altieri on 9/6/16.
 */

const Server = {
  post,
};

const PREFIX = process.env.NODE_ENV === 'production'
  ? 'http://usescholar.xyz'
  : 'http://localhost:8000';

function post(url, params) {
  console.log('posting with url: ', url);
  return new Promise((resolve, reject) => {
    const ajax = new XMLHttpRequest();
    ajax.open('POST', PREFIX + url, true);
    ajax.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    ajax.withCredentials = true;
    ajax.onreadystatechange = () => {
      if (ajax.status === 200 && ajax.readyState === 4) {
        try {
          resolve(JSON.parse(ajax.response));
        } catch (e) {
          reject({
            error: {
              info: 'JSON parse failed',
            }
          })
        }
      } else {
        switch (ajax.status) {
          // Redirection
          case 300: {
            // Do nothing
            return;
          }

          // Client Error
          case 400: {
            reject({
              error: {
                code: 400,
                info: 'Client Error',
              }
            });
            return;
          }

          // Server Error
          case 500: {
            reject({
              error: {
                code: 500,
                info: 'Server Error',
              }
            });
            return;
          }
        }
      }
    };

    console.log('params', params);
    try {
      ajax.send(JSON.stringify(params));
    } catch (e) {
      reject({
        error: {
          code: null,
          info: 'Stringify Failed: ' + e
        }
      })
    }
  })
}

export default Server;
