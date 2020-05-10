import axios from 'axios';
import Config from '@Config';
import * as AxiosLogger from 'axios-logger';

const axiosInstance = axios.create();
AxiosLogger.setGlobalConfig({
  prefixText: 'NewsApi',
  dateFormat: 'HH:MM:ss',
  status: true,
  headers: true,
  url: true,
  method: true,
  data: true,
});
axiosInstance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
// axiosInstance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);

export default class AbstractService {
  /**
   * Function to perform get requests to the API
   *
   * @static
   * @param {String} url
   * @param {String} queryParams
   * @returns {Promise}
   *
   * @memberof AbstractService
   */
  static get(url, queryParams) {
    return this.request({
      url,
      queryParams,
    });
  }

  /**
   * Function to perform post requests to the API
   *
   * @static
   * @param {String} url
   * @param {Object} data         [Object to be used in the request body]
   * @param {Object} queryParams  [Object of items to be used as queryParameters]
   * @returns {Promise}
   *
   * @memberof AbstractService
   */
  static post(url, data, queryParams) {
    return this.request({
      method: 'post',
      url,
      data,
      queryParams,
    });
  }

  /**
   * Function to perform put requests to the API
   *
   * @static
   * @param {String} url
   * @param {Object} data        [Object to be used in the request body]
   * @param {Object} queryParams [Object of items to be used as queryParameters]
   * @returns {Promise}
   *
   * @memberof AbstractService
   */
  static put(url, data, queryParams) {
    return this.request({
      method: 'put',
      url,
      data,
      queryParams,
    });
  }

  /**
   * Function to perform delete requests to the API
   *
   * @static
   * @param {String} url
   * @param {Object} data [Object of items to be used as queryParameters]
   * @returns {Promise}
   *
   * @memberof AbstractService
   */
  static del(url, data) {
    return this.request({
      method: 'delete',
      url,
      data,
    });
  }

  /**
   * Function to perform all of the requests to the API
   *
   * @static
   * @param {Object} { url, method = 'get', data, queryParams, config }
   * @returns
   *
   * @memberof AbstractService
   */
  static request({url, method = 'get', data, queryParams, config}) {
    return new Promise((resolve, reject) => {
      this._request({
        url,
        method,
        data,
        queryParams,
        ...config,
      })
        .then(resolve)
        .catch(error => reject(error.response));
    });
  }

  /**
   * Function to perform an HTTP request with the given parameters,
   * every single Request should be executed through this function,
   * even if the request is to an third-party API
   *
   * @static
   * @param  {Object}   { baseURL = Config.API.baseUrl, url, method, data, queryParams, timeout = Config.API.timeout, withCredentials = true, headers = { Accept : 'application/json' } }
   * @returns {Promise}
   *
   * @memberof AbstractService
   */
  static async _request({
    baseURL = Config.API.baseUrl,
    url,
    method,
    data,
    queryParams,
    timeout = Config.API.timeout,
    withCredentials = true,
    headers = {Accept: 'application/json'},
  }) {
    const _headers = {
      ...headers,
    };

    return axiosInstance({
      baseURL,
      url,
      method,
      data,
      params: queryParams,
      timeout,
      withCredentials,
      headers: _headers,
    });
  }
}
