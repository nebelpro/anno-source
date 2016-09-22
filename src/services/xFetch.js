import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    location.href = '/401';
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}
function responseToText(response) {
  if (response.status >= 400) throw new Error("Bad server response");
  return response.text();
}
function jsonParse(res) {
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function errorMessageParse(res) {
  const { success, message } = res.jsonResult;
  if (!success) {
    return Promise.reject(message);
  }
  return res;
}

export let  fetchJson = (url, options) =>{
  const opts = { ...options };
  opts.headers = {
    ...opts.headers,
    authorization: cookie.get('authorization') || '',
  };

  return fetch(url, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse);
}
export let  fetchDoc = (url, options) =>{
  const opts = { ...options };

  return fetch(url, opts)

    .then(check404)
    .then(function(res){
      return res.text();
    })
}
