import request from 'request';
import _ from 'lodash';

class Request {
  constructor(uribase) {
    this.base = uribase;
  }

  get(uri, query, headers) {
    return new Promise((resolve, reject) => {
      const rq = this._prepareRequest('GET', uri, query, headers, true);
      this._call(rq, resolve, reject);
    });
  }

  post(uri, body, query, headers) {
    return new Promise((resolve, reject) => {
      const rq = this._prepareRequest('POST', uri, query, headers, body);
      this._call(rq, resolve, reject);
    });
  }

  put(uri, body, query, headers) {
    return new Promise((resolve, reject) => {
      const rq = this._prepareRequest('PUT', uri, query, headers, body);
      this._call(rq, resolve, reject);
    });
  }

  _prepareRequest(method, uri = {}, query = {}, headers = {}, json) {
    const url = this._getURL(uri, query);
    return {
      method, url, headers, json,
    };
  }

  _getURL(uri, query) {
    return `${this.base}/${uri}?${this._getQueryString(query)}`;
  }

  _getQueryString(options) {
    return _.map(_.omitBy(options, _.isUndefined), (value, key) => `${key}=${encodeURIComponent(value)}`).join('&');
  }

  _call(rq, resolve, reject) {
    request(rq, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      if (Math.floor(response.statusCode / 100) != 2) {
        if (body.error) {
          return reject(body.error);
        }
        return reject(body);
      }
      return resolve(body);
    });
  }
}

export default Request;
