import axios from 'axios';
import queryString, { stringify } from 'qs';
import React, { useRef, useState, useCallback, useEffect, Component, cloneElement, Fragment, useContext } from 'react';
import { createAction, handleActions } from 'redux-actions';
import { bindActionCreators, applyMiddleware, createStore, combineReducers } from 'redux';
import { connect, useSelector } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import _, { identity, cloneDeep, debounce } from 'lodash';
import { isFSA } from 'flux-standard-action';
import JSZip from 'jszip';
import { pathToRegexp } from 'path-to-regexp';
import { v4 } from 'uuid';
import PubSub from 'pubsub-js';
import { Modal, Spin, Button, ConfigProvider, Breadcrumb, Menu, BackTop, Avatar, Tree, Input, Popconfirm, Empty, Select, Row, Col, Form, InputNumber, TreeSelect, Checkbox, Radio, Cascader, Switch, DatePicker, TimePicker, Transfer, Tooltip, Dropdown, Pagination, Table, Card, Alert } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AntdIcon, { createFromIconfontCN, getTwoToneColor, setTwoToneColor, MenuUnfoldOutlined, MenuFoldOutlined, CloseOutlined, CloseCircleOutlined, CloseSquareOutlined, VerticalLeftOutlined, VerticalRightOutlined, VerticalAlignTopOutlined, CopyrightOutlined, ExclamationCircleOutlined, QuestionCircleOutlined, UserOutlined, SaveOutlined, EditOutlined, DeleteOutlined, PlusOutlined, LoadingOutlined, DownOutlined, DownCircleOutlined, UpCircleOutlined, AppstoreOutlined, CaretDownOutlined, FullscreenExitOutlined, FullscreenOutlined, SettingOutlined, CopyOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import * as allIcons from '@ant-design/icons/es/icons';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import warning$1 from 'rc-util/es/warning';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';
import classNames from 'classnames';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { preRouter ,IframeUrl} from '../commons/PRE_ROUTER'

/**
 * ????????????Promise?????????
 * <br/>
 * finally???
 * Promise??????????????????????????????then?????????catch?????????????????????????????????????????????????????????????????????????????????
 * ?????????Promise??????????????????????????????????????????
 * ?????????????????????????????????done????????????????????????????????????????????????????????????????????????????????????
 * <br/>
 * <br/>
 * done???
 * finally????????????????????????Promise???????????????????????????????????????????????????
 * ??????done??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * @module ??????Promise????????????
 */

/* eslint-disable */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var P = this.constructor;
    return this.then(function (value) {
      return P.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return P.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}

if (!Promise.prototype.done) {
  Promise.prototype.done = function (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected).catch(function (reason) {
      // ????????????????????????
      setTimeout(function () {
        throw reason;
      }, 0);
    });
  };
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var SXAjax = /*#__PURE__*/function () {
  /**
   * ???????????????????????????????????????????????????
   * axios???????????????????????????sxAjax?????????????????????
   * sxAjax.defaults.xxx sxAjax.mockDefaults.xxx????????????
   *
   * @param onShowErrorTip ????????????????????????
   * @param onShowSuccessTip ????????????????????????
   * @param isMock ????????????????????????mock????????????url?????????'/mock'????????????????????????mock????????????
   * @param reject ??????????????????reject ??????true
   */
  function SXAjax() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$onShowSuccessTip = _ref.onShowSuccessTip,
        onShowSuccessTip = _ref$onShowSuccessTip === void 0 ? function () {
      return (
        /* response, successTip  */
        true
      );
    } : _ref$onShowSuccessTip,
        _ref$onShowErrorTip = _ref.onShowErrorTip,
        onShowErrorTip = _ref$onShowErrorTip === void 0 ? function () {
      return (
        /* err, errorTip */
        true
      );
    } : _ref$onShowErrorTip,
        _ref$isMock = _ref.isMock,
        isMock = _ref$isMock === void 0 ? function () {
      return (
        /* url, data, method, options */
        false
      );
    } : _ref$isMock,
        _ref$reject = _ref.reject,
        reject = _ref$reject === void 0 ? true : _ref$reject;

    _classCallCheck(this, SXAjax);

    this.instance = axios.create();
    this.mockInstance = axios.create();
    this.setDefaultOption(this.instance);
    this.setDefaultOption(this.mockInstance);
    this.defaults = this.instance.defaults;
    this.mockDefaults = this.mockInstance.defaults;
    this.onShowSuccessTip = onShowSuccessTip;
    this.onShowErrorTip = onShowErrorTip;
    this.isMock = isMock;
    this.reject = reject;
  }

  _createClass(SXAjax, [{
    key: "setDefaultOption",
    value: function setDefaultOption(instance) {
      instance.defaults.timeout = 10000; // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      // instance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

      instance.defaults.headers.post['Content-Type'] = 'application/json';
      instance.defaults.headers.put['Content-Type'] = 'application/json';
      instance.defaults.baseURL = '/';
      instance.defaults.withCredentials = true; // ????????????cookie
    }
    /**
     *
     * @param url
     * @param d
     * @param method
     * @param options ??????????????????????????????successTip????????????????????????url data method????????????
     * @returns {Promise}
     */

  }, {
    key: "ajax",
    value: function ajax(url) {
      var _this = this;

      var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      // ??? null?????????
      var data = d || {};
      options = options || {};
      var useReject = 'reject' in options ? options.reject : this.reject;
      var _options = options,
          _options$successTip = _options.successTip,
          successTip = _options$successTip === void 0 ? false : _options$successTip,
          errorTip = _options.errorTip,
          _options$noEmpty = _options.noEmpty,
          noEmpty = _options$noEmpty === void 0 ? false : _options$noEmpty,
          _options$originRespon = _options.originResponse,
          originResponse = _options$originRespon === void 0 ? false : _options$originRespon; // ?????? ?????????????????? null '' undefined ??????????????????????????????

      if (noEmpty === true && _typeof(data) === 'object' && !Array.isArray(data)) {
        var noEmptyData = {};
        Object.keys(data).forEach(function (key) {
          var value = data[key];

          if (value !== null && value !== '' && value !== void 0) {
            noEmptyData[key] = value;
          }
        });
        data = noEmptyData;
      }

      var CancelToken = axios.CancelToken;
      var cancel;
      var isGet = method === 'get';
      var isDelete = method === 'delete';
      var isMock = this.isMock(url, data, method, options);
      var instance = this.instance;
      /*
       * ??????????????????????????????????????????????????????????????????????????????????????????
       * axiosInstance.interceptors.request.use(cfg => {
       *   // Do something before request is sent
       *   return cfg;
       * }, error => {
       *   // Do something with request error
       *   return Promise.reject(error);
       * });
       *
       * */

      if (isMock) {
        instance = this.mockInstance;
      }
      /*
      *
      * Content-Type application/x-www-form-urlencoded ????????????
      * ?????????https://github.com/axios/axios/issues/362
      *
      * */


      var defaultsContentType = instance.defaults.headers[method]['Content-Type'] || instance.defaults.headers[method]['content-type'] || instance.defaults.headers[method]['contentType'] || '';
      var contentType = options.headers && options.headers['Content-Type'] || options.headers && options.headers['content-type'] || options.headers && options.headers['contentType'] || '';
      var ct = contentType || defaultsContentType;
      var isFormType = ct.indexOf('application/x-www-form-urlencoded') > -1;

      if (isFormType) {
        data = stringify(data);
      }

      var params = {};

      if (isGet || isDelete) {
        params = data; // params ???get???delete???????????????url??????

        data = {}; // data ???put???post ????????????????????????
      }

      var ajaxPromise = new Promise(function (resolve, reject) {
        instance(_objectSpread2({
          method: method,
          url: url,
          data: data,
          params: params,
          cancelToken: new CancelToken(function (c) {
            return cancel = c;
          })
        }, options)).then(function (response) {
          _this.onShowSuccessTip(response, successTip);

          resolve(originResponse ? response : response.data);
        }).catch(function (err) {
          var isCanceled = err && err.message && err.message.canceled;
          if (isCanceled) return; // ?????????????????????cancel????????????????????????????????????????????????

          _this.onShowErrorTip(err, errorTip);

          useReject ? reject(err) : resolve({
            $type: 'unRejectError',
            $error: err
          });
        });
      });

      ajaxPromise.cancel = function () {
        cancel({
          canceled: true
        });
      };

      return ajaxPromise;
    }
    /**
     * ????????????get?????????????????????????????????
     * @param {string} url ????????????
     * @param {object} [params] ???????????????????????????????????????????????????query string ?????????url??????
     * @param {object} [options] axios ????????????
     * @returns {Promise}
     */

  }, {
    key: "get",
    value: function get(url, params, options) {
      return this.ajax(url, params, 'get', options);
    }
    /**
     * ????????????post?????????????????????????????????
     * @param {string} url ????????????
     * @param {object} [data] ????????????????????????
     * @param {object} [options] axios ????????????
     * @returns {Promise}
     */

  }, {
    key: "post",
    value: function post(url, data, options) {
      return this.ajax(url, data, 'post', options);
    }
    /**
     * ????????????put?????????????????????????????????
     * @param {string} url ????????????
     * @param {object} [data] ????????????????????????
     * @param {object} [options] axios ????????????
     * @returns {Promise}
     */

  }, {
    key: "put",
    value: function put(url, data, options) {
      return this.ajax(url, data, 'put', options);
    }
    /**
     * ????????????patch???????????????????????????????????????
     * @param {string} url ????????????
     * @param {object} [data] ????????????????????????
     * @param {object} [options] axios ????????????
     * @returns {Promise}
     */

  }, {
    key: "patch",
    value: function patch(url, data, options) {
      return this.ajax(url, data, 'patch', options);
    }
    /**
     * ????????????delete????????????????????????????????????params???????????????http?????????????????????
     * @param {string} url ????????????
     * @param {object} [data] ????????????????????????
     * @param {object} [options] axios ????????????
     * @returns {Promise}
     */

  }, {
    key: "del",
    value: function del(url, data, options) {
      return this.ajax(url, data, 'delete', options);
    }
  }]);

  return SXAjax;
}();

/**
 * ajax hooks
 *
 * 1. ??????loading?????????withLoading???true
 * 2. ???????????????????????????
 *
 * @example
 const [loading, fetchDataSource] = useGet('/users', initOptions);

 // ????????????????????????????????????????????????
 await fetchDataSource(params);

 // ????????????options?????????????????????initOptions?????? {...initOptions, ...options}
 await fetchDataSource(params, options);

 // url?????????????????????
 const [deleting, deleteOne] = useDel('/users/:id', options);

 // ????????????????????????????????????????????????????????????????????????key???url????????????
 await deleteOne(1);

 // key ??????url????????????
 await deleteOne({id});
 *
 * ??????????????????
 *  ??????loading?????????ajax???finally????????????????????????????????????????????????setState???????????????setLoading?????????????????????render
 */

function createHooks(ajax) {
  var create = function create(method) {
    return function (url) {
      var initOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ajaxHandler = useRef(null);

      var _useState = useState(false),
          _useState2 = _slicedToArray(_useState, 2),
          loading = _useState2[0],
          setLoading = _useState2[1];
      /**
       * ??????ajax???????????????
       * @param params
       * @param options
       * @returns {Promise}
       */


      var handleAjax = useCallback(function (params) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        // ??????url???????????? ???:id?????????{id}???
        // ???params?????????key??????????????????url???????????????params??????????????????
        var urls = url.split('/');

        var _url = urls.map(function (item) {
          if (!item.startsWith(':') && !item.startsWith('{')) return item;
          var key = item.replace(':', '').replace('{', '').replace('}', ''); // ??????????????????object ?????????params??????value

          if (_typeof(params) !== 'object') {
            var value = params;
            params = null;
            return value;
          }

          if (!(key in params)) throw Error("\u7F3A\u5C11\u300C".concat(key, "\u300D\u53C2\u6570"));
          return params[key]; // const value = params[key];
          // Reflect.deleteProperty(params, key);
          //
          // return value;
        }).join('/');

        var mergedOptions = _objectSpread2(_objectSpread2({}, initOptions), options);

        var _mergedOptions$withLo = mergedOptions.withLoading,
            withLoading = _mergedOptions$withLo === void 0 ? true : _mergedOptions$withLo;
        withLoading && setLoading(true); // ajaxToken ?????????promise
        // ?????????????????????ajax??????

        var ajaxToken = ajax[method](_url, params, _objectSpread2({
          reject: true
        }, mergedOptions));
        ajaxHandler.current = ajaxToken; // ??????????????????loading?????????token

        ajaxToken.finally(function () {
          withLoading && setLoading(false);
          ajaxHandler.current = null;
        });
        return ajaxToken;
      }, [url]);
      useEffect(function () {
        return function () {
          // ????????????????????????????????????ajax??????
          // ??????hooks ?????????????????????????????????
          if (ajaxHandler.current) {
            ajaxHandler.current.cancel();
          }
        };
      }, []);
      return [loading, handleAjax];
    };
  };

  return {
    useGet: create('get'),
    usePost: create('post'),
    usePut: create('put'),
    useDel: create('del'),
    usePatch: create('patch')
  };
}

/**
 * ?????? ajax ????????????
 *
 * ??????????????????????????????????????????
 * props?????????ajax??????
 *
 * ???????????????
 * this.props.ajax.get(...)
 *
 * @param sxAjax
 * @returns {function({propName?: *}=): function(*): WithAjax}
 */

var createAjaxHoc = function createAjaxHoc(sxAjax) {
  return function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$propName = _ref.propName,
        propName = _ref$propName === void 0 ? 'ajax' : _ref$propName;

    return function (WrappedComponent) {
      var ajaxHooks = createHooks(sxAjax);

      var WithAjax = /*#__PURE__*/function (_Component) {
        _inherits(WithAjax, _Component);

        var _super = _createSuper(WithAjax);

        function WithAjax(props) {
          var _this;

          _classCallCheck(this, WithAjax);

          _this = _super.call(this, props);
          _this._$ajax = _objectSpread2({}, ajaxHooks);
          _this._$ajaxTokens = [];
          var methods = ['get', 'post', 'put', 'patch', 'del', 'singleGet'];

          var _loop = function _loop() {
            var method = _methods[_i];

            _this._$ajax[method] = function () {
              var ajaxToken = sxAjax[method].apply(sxAjax, arguments);

              _this._$ajaxTokens.push(ajaxToken);

              return ajaxToken;
            };
          };

          for (var _i = 0, _methods = methods; _i < _methods.length; _i++) {
            _loop();
          }

          return _this;
        }

        _createClass(WithAjax, [{
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            this._$ajaxTokens.forEach(function (item) {
              return item.cancel();
            });
          }
        }, {
          key: "render",
          value: function render() {
            var injectProps = _defineProperty({}, propName, this._$ajax);

            return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, injectProps, this.props));
          }
        }]);

        return WithAjax;
      }(Component);

      WithAjax.displayName = "WithAjax(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")");
      return WithAjax;
    };
  };
};

var createHoc = createAjaxHoc;
var createHooks$1 = createHooks;

// middleware
var SYNC_STATE_TO_STORAGE = '@@redux/SYNC_STATE_TO_STORAGE-' + Math.random().toString(36).substring(7).split('').join('.');
var GET_STATE_FROM_STORAGE = '@@redux/GET_STATE_FROM_STORAGE-' + Math.random().toString(36).substring(7).split('').join('.');

var _actionTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SYNC_STATE_TO_STORAGE: SYNC_STATE_TO_STORAGE,
    GET_STATE_FROM_STORAGE: GET_STATE_FROM_STORAGE
});

var _handleError = function _handleError(_ref) {
  var error = _ref.error,
      errorTip = _ref.errorTip;
  console.error(error);

  if (errorTip) {
    alert(errorTip);
  }
};

var _handleSuccess = function _handleSuccess(_ref2) {
  var successTip = _ref2.successTip;
  if (successTip) alert(successTip);
};

var _storage = null;
/**
 * storage ????????????????????? setItem multiGet
 * @param storage
 * @param handleError
 * @param handleSuccess
 */

function init(_ref3) {
  var storage = _ref3.storage,
      handleError = _ref3.handleError,
      handleSuccess = _ref3.handleSuccess;
  if (handleError) _handleError = handleError;
  if (storage) _storage = storage;
  if (handleSuccess) _handleSuccess = handleSuccess;
}
function getHandleSuccess() {
  return _handleSuccess;
}
function getHandleError() {
  return _handleError;
}
function getStorage() {
  return _storage;
}

function actionUtils (_ref) {
  var _ref$syncKeys = _ref.syncKeys,
      syncKeys = _ref$syncKeys === void 0 ? [] : _ref$syncKeys;
  return {
    // ?????????????????????state?????????????????????????????????????????????action??????????????????????????????reducer????????????????????????????????????
    getStateFromStorage: createAction(GET_STATE_FROM_STORAGE, function () {
      var Storage = getStorage();
      return Storage.local.multiGet(syncKeys);
    }, function (onResolve, onReject, onComplete) {
      return {
        onResolve: onResolve,
        onReject: onReject,
        onComplete: onComplete
      };
    })
  };
}

function checkActions(acs) {
  var actionsFunctions = {};

  for (var _i = 0, _Object$keys = Object.keys(acs); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var action = acs[key];

    for (var _i2 = 0, _Object$keys2 = Object.keys(action); _i2 < _Object$keys2.length; _i2++) {
      var k = _Object$keys2[_i2];

      if (actionsFunctions[k]) {
        throw Error("\u4E0D\u4E88\u8BB8\u5B9A\u4E49\u540C\u540D\u7684action\u65B9\u6CD5\uFF1A".concat(key, ".").concat(k, " \u4E0E ").concat(actionsFunctions[k]._module, ".").concat(k, " \u65B9\u6CD5\u51B2\u7A81\uFF01"));
      } else {
        actionsFunctions[k] = action[k];
        actionsFunctions[k]._module = key;
      }
    }
  }

  return actionsFunctions;
}

/**
 * promise??????reducer????????????
 * ??????????????????????????? (state, action)??????????????????state????????????????????????????????????state
 * ???????????????pending -> resolve(reject)->complete
 *
 * @param always = (state) => ({...state}),     // ?????????????????????????????????pending???resolve???reject???complete??????????????????
 * @param pending = (state) => ({...state}),    // ??????????????????
 * @param resolve = (state) => ({...state}),    // ??????
 * @param reject = (state) => ({...state}),     // ??????
 * @param complete = (state) => ({...state}),   // ??????????????????????????????????????????
 * @returns {function(*=, *=)}
 */
function handleAsyncReducer(_ref) {
  var _ref$always = _ref.always,
      always = _ref$always === void 0 ? function (state) {
    return _objectSpread2({}, state);
  } : _ref$always,
      _ref$pending = _ref.pending,
      pending = _ref$pending === void 0 ? function (state) {
    return _objectSpread2({}, state);
  } : _ref$pending,
      _ref$resolve = _ref.resolve,
      resolve = _ref$resolve === void 0 ? function (state) {
    return _objectSpread2({}, state);
  } : _ref$resolve,
      _ref$reject = _ref.reject,
      reject = _ref$reject === void 0 ? function (state) {
    return _objectSpread2({}, state);
  } : _ref$reject,
      _ref$complete = _ref.complete,
      complete = _ref$complete === void 0 ? function (state) {
    return _objectSpread2({}, state);
  } : _ref$complete;
  return function (state, action) {
    var _action$meta = action.meta,
        meta = _action$meta === void 0 ? {} : _action$meta,
        error = action.error;
    var _meta$sequence = meta.sequence,
        sequence = _meta$sequence === void 0 ? {} : _meta$sequence;

    function getReturnState(preState, method) {
      var newState = method(preState, action) || {}; // if (!newState) {
      //     throw Error(`handleAsyncReducer's ${method} method must return an object to compose a new state`);
      // }

      return _objectSpread2(_objectSpread2({}, preState), newState);
    }

    var alwaysState = getReturnState(state, always);

    if (sequence.type === 'start') {
      return getReturnState(alwaysState, pending);
    }

    if (sequence.type === 'next' && error) {
      var rejectState = getReturnState(alwaysState, reject);
      return getReturnState(rejectState, complete);
    }

    if (sequence.type === 'next' && !error) {
      var resolveState = getReturnState(alwaysState, resolve);
      return getReturnState(resolveState, complete);
    }
  };
}

function asyncActionCallbackMiddleware() {
  return function (next) {
    return function (action) {
      var _action$meta = action.meta,
          meta = _action$meta === void 0 ? {} : _action$meta,
          error = action.error,
          payload = action.payload;
      var _meta$sequence = meta.sequence,
          sequence = _meta$sequence === void 0 ? {} : _meta$sequence,
          onResolve = meta.onResolve,
          onReject = meta.onReject,
          onComplete = meta.onComplete;
      if (sequence.type !== 'next') return next(action); // do callback

      if (error) {
        // error ????????????????????? payload???error??????
        onReject && onReject(payload);
        onComplete && onComplete(payload);
      } else {
        onResolve && onResolve(payload);
        onComplete && onComplete(null, payload);
      }

      next(action);
    };
  };
}

function defaultConnect(_ref) {
  var actions = _ref.actions,
      options = _ref.options;
  return function connectComponent(component) {
    var _component$mapStateTo = component.mapStateToProps,
        mapStateToProps = _component$mapStateTo === void 0 ? function () {
      return {};
    } : _component$mapStateTo,
        _component$mapDispatc = component.mapDispatchToProps,
        mapDispatchToProps = _component$mapDispatc === void 0 ? function (dispatch) {
      var ac = bindActionCreators(actions, dispatch);
      Object.keys(actions).forEach(function (key) {
        if (_typeof(actions[key]) === 'object') {
          ac[key] = bindActionCreators(actions[key], dispatch);
        }
      });
      return {
        action: ac
      };
    } : _component$mapDispatc,
        mergeProps = component.mergeProps,
        LayoutComponent = component.LayoutComponent; // ?????????????????????mapStateToProps??????????????????redux????????????
    // ????????????LayoutComponent???????????????????????????default

    if (mapStateToProps) {
      var com = LayoutComponent || component.default;
      if (!com) return component;
      return connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(com);
    }

    return LayoutComponent || component.default || component; // ?????? component????????????????????????LayoutComponent???????????????????????????
  };
}

var _createConnectHOC = (function (connect) {
  return function () {
    var mapStateToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (state) {
      return {};
    };
    return function (WrappedComponent) {
      return connect({
        mapStateToProps: mapStateToProps,
        LayoutComponent: WrappedComponent
      });
    };
  };
});

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function promiseMiddleware(_ref) {
  var dispatch = _ref.dispatch;
  return function (next) {
    return function (action) {
      if (!isFSA(action)) {
        return isPromise(action) ? action.then(dispatch) : next(action);
      }

      var _action$meta = action.meta,
          meta = _action$meta === void 0 ? {} : _action$meta,
          payload = action.payload;

      var id = _.uniqueId();

      if (isPromise(payload)) {
        dispatch(_objectSpread2(_objectSpread2({}, action), {}, {
          payload: undefined,
          meta: _objectSpread2(_objectSpread2({}, meta), {}, {
            sequence: {
              type: 'start',
              id: id
            }
          })
        }));
        return payload.then( // ??????????????????????????????reducer????????????????????????
        function (result) {
          return dispatch(_objectSpread2(_objectSpread2({}, action), {}, {
            payload: result,
            meta: _objectSpread2(_objectSpread2({}, meta), {}, {
              sequence: {
                type: 'next',
                id: id
              }
            })
          }));
        }, function (error) {
          return dispatch(_objectSpread2(_objectSpread2({}, action), {}, {
            payload: error,
            error: true,
            meta: _objectSpread2(_objectSpread2({}, meta), {}, {
              sequence: {
                type: 'next',
                id: id
              }
            })
          }));
        });
      }

      return next(action);
    };
  };
}

/**
 * ?????? mapObj ?????????????????? originObj ?????????????????????
 * @param originObj
 * @param mapObj
 * @param result
 * @returns {{}}
 */

function filterObjectByObject(originObj) {
  var mapObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.keys(mapObj).forEach(function (key) {
    var value = mapObj[key];

    if (value === true) {
      result[key] = originObj[key];
    }

    if (_typeof(value) === 'object') {
      if (Array.isArray(value)) {
        var mo = value[0];
        result[key] = originObj[key].map(function (item) {
          return filterObjectByObject(item, mo);
        });
      } else {
        result[key] = filterObjectByObject(originObj[key], value, result[key]);
      }
    }
  });
  return result;
}
/**
 * Storage ?????????????????????Storage.local.setItem??????????????????data??????????????????
 * ????????????data.syncType????????????????????????local???session???server???
 *
 * @param key
 * @param syncStorage
 * @param state
 */


function syncToStorage(key, syncStorage, state) {
  var Storage = getStorage(); // ?????? syncStorage ?????? ?????? state?????????????????????syncStorage === true ??????state???????????????

  var data = syncStorage === true ? state : filterObjectByObject(state, syncStorage);
  Storage.local.setItem(key, data);
}

var _middlewareSyncReducerToLocalStorage = (function (_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      setTimeout(function () {
        // ???getState?????????????????????state
        var pageState = getState().pageState;

        if (pageState) {
          Object.keys(pageState).forEach(function (key) {
            var state = pageState[key];

            if (state && state.syncStorage) {
              syncToStorage(key, state.syncStorage, state);
            }
          });
        }
      });

      if (!isFSA(action)) {
        return next(action);
      }

      var _action$meta = action.meta,
          meta = _action$meta === void 0 ? {} : _action$meta,
          _action$sequence = action.sequence,
          sequence = _action$sequence === void 0 ? {} : _action$sequence,
          error = action.error,
          payload = action.payload;
      var __model_sync_name = meta.__model_sync_name,
          __model_sync_state = meta.__model_sync_state;

      if (action.type === SYNC_STATE_TO_STORAGE) {
        var state = getState();
        var syncModelName = payload.syncModelName,
            syncModelState = payload.syncModelState;
        syncToStorage(syncModelName, syncModelState, state[syncModelName]);
      }

      if (!__model_sync_name || sequence.type === 'start' || error) {
        return next(action);
      }

      next(action);
      setTimeout(function () {
        dispatch({
          type: SYNC_STATE_TO_STORAGE,
          payload: {
            syncModelName: __model_sync_name,
            syncModelState: __model_sync_state
          }
        });
      }, 16);
    };
  };
});

function utilsMiddleware() {
  return function (next) {
    return function (action) {
      var handleError = getHandleError();
      var handleSuccess = getHandleSuccess();
      var payload = action.payload,
          error = action.error,
          _action$meta = action.meta,
          meta = _action$meta === void 0 ? {} : _action$meta;
      var _meta$sequence = meta.sequence,
          sequence = _meta$sequence === void 0 ? {} : _meta$sequence,
          successTip = meta.successTip,
          errorTip = meta.errorTip; // error handle

      if (error) {
        handleError({
          error: payload,
          errorTip: errorTip
        });
      }

      if (sequence.type === 'next' && !error) {
        handleSuccess({
          successTip: successTip
        });
      }

      next(action);
    };
  };
}

var middlewareAsyncActionCallback = asyncActionCallbackMiddleware;
var createConnectHOC = _createConnectHOC;
var middlewarePromise = promiseMiddleware;
var middlewareSyncReducerToLocalStorage = _middlewareSyncReducerToLocalStorage;
var middlewareUtils = utilsMiddleware;
var actionTypes = _actionTypes;
function model(options) {
  var models = options.models,
      storage = options.storage,
      handleError = options.handleError,
      handleSuccess = options.handleSuccess,
      _options$middlewares = options.middlewares,
      middlewares = _options$middlewares === void 0 ? [] : _options$middlewares;
  init({
    storage: storage,
    handleError: handleError,
    handleSuccess: handleSuccess
  });

  var _getActionsAndReducer = getActionsAndReducers({
    models: models
  }),
      actions = _getActionsAndReducer.actions,
      reducers = _getActionsAndReducer.reducers;

  var middleware = [thunkMiddleware, middlewarePromise, middlewareAsyncActionCallback, middlewareUtils, middlewareSyncReducerToLocalStorage].concat(_toConsumableArray(middlewares));

  var _store = configureStore();

  var dispatch = _store.dispatch;

  var _action = bindActionCreators(actions, dispatch);

  Object.keys(actions).forEach(function (key) {
    if (_typeof(actions[key]) === 'object') {
      _action[key] = bindActionCreators(actions[key], dispatch);
    }
  });
  /**
   *
   * ?????????js?????????
   *  ????????????store.getState???????????????
   *  ????????????action.side.hide(); ????????????
   */

  var store = _store;
  var action = _action;

  function configureStore(initialState) {
    return applyMiddleware.apply(void 0, _toConsumableArray(middleware))(createStore)(combineReducers(reducers), initialState);
  } // ???redux???????????? ??????


  var connectComponent = defaultConnect({
    actions: actions,
    options: {
      ref: true
    }
  }); // ???redux???????????? ?????????


  var connect = createConnectHOC(connectComponent); // ??????action???hooks

  var useAction = function useAction() {
    return _action;
  }; // ?????????????????? useSelector


  return {
    store: store,
    action: action,
    configureStore: configureStore,
    connectComponent: connectComponent,
    connect: connect,
    useAction: useAction,
    useSelector: useSelector
  };
}
/**
 * ??????????????? actions reducers
 * @param models
 * @returns {{actions, reducers: {pageState}}}
 */

function getActionsAndReducers(_ref) {
  var models = _ref.models;
  var syncKeys = Object.keys(models).filter(function (key) {
    var syncStorage = models[key].syncStorage;
    return !!syncStorage;
  });
  var utils = actionUtils({
    syncKeys: syncKeys
  });

  var _actions = checkActions({
    utils: utils
  });

  var _reducers = {};
  Object.keys(models).forEach(function (modelName) {
    var model = models[modelName];
    var _model$initialState = model.initialState,
        initialState = _model$initialState === void 0 ? {} : _model$initialState,
        syncStorage = model.syncStorage,
        _model$actions = model.actions,
        actions = _model$actions === void 0 ? {} : _model$actions,
        _model$reducers = model.reducers,
        reducers = _model$reducers === void 0 ? {} : _model$reducers;
    var __actionTypes = {};
    initialState.__actionTypes = __actionTypes; // ??????action reducer ????????????
    // ??????'initialState', 'syncStorage', 'actions', 'reducers'?????????????????????????????????actions???reducers????????????

    var ar = {};
    Object.keys(model).forEach(function (item) {
      if (['initialState', 'syncStorage', 'actions', 'reducers'].indexOf(item) === -1) {
        ar[item] = model[item];
      }
    });
    var arActions = {};
    var arReducers = {};
    Object.keys(ar).forEach(function (actionName, index) {
      var type = "type-".concat(actionName, "-").concat(modelName, "-").concat(index).toUpperCase(); // ?????????????????????type???????????????????????????

      __actionTypes[actionName] = type;
      var arValue = ar[actionName];

      if (typeof arValue === 'function') {
        // ar ????????????
        arActions[actionName] = createAction(type); // arReducers[type] = arValue;

        arReducers[type] = function (state, action) {
          var payload = action.payload;
          return arValue(payload, state, action);
        };
      } else {
        // ar ????????????
        var _arValue$payload = arValue.payload,
            payload = _arValue$payload === void 0 ? identity : _arValue$payload,
            meta = arValue.meta,
            _arValue$reducer = arValue.reducer,
            reducer = _arValue$reducer === void 0 ? function (state) {
          return _objectSpread2({}, state);
        } : _arValue$reducer; // ??????meta?????????

        if (!meta) {
          if (payload && typeof payload.then === 'function') {
            // is promise
            meta = commonAsyncMeta; // ????????????meta
          } else {
            meta = identity; // ??????????????? meta
          }
        }

        var metaCreator = meta;
        var payloadCreator = payload; // ?????????????????????

        if (typeof payloadCreator !== 'function') payloadCreator = function payloadCreator() {
          return payload;
        };
        if (typeof metaCreator !== 'function') metaCreator = function metaCreator() {
          return meta;
        };
        arActions[actionName] = createAction(type, payloadCreator, metaCreator);
        arReducers[type] = reducer;
      }
    });
    reducers = _objectSpread2(_objectSpread2({}, reducers), arReducers);
    actions = _objectSpread2(_objectSpread2({}, actions), arActions); // ??????reducer

    var __reducers = {};
    Object.keys(reducers).forEach(function (key) {
      var reducer = reducers[key];

      if (_typeof(reducer) === 'object') {
        // ???????????? ????????????reducer
        // _handleAsyncReducer??????????????????state??????????????????????????????reducer???????????????padding???resolve????????????????????????????????????
        __reducers[key] = handleAsyncReducer(reducer);
      } else {
        // ??????????????????reducer, ???????????????state?????????model??????reducer????????????????????????
        __reducers[key] = function (state, action) {
          var newState = reducer(state, action) || {}; // ??????reducer???????????????
          // ?????? newState???????????????

          var isObject = _typeof(newState) === 'object' && !Array.isArray(newState);

          if (!isObject) {
            console.error("model method must return an object! check '".concat(modelName, "' method"));
          } // ??????????????????????????????????????????state??????????????????


          var newStateKeys = Object.keys(newState);
          var initialStateKeys = Object.keys(initialState);
          newStateKeys.forEach(function (newKey) {
            if (!initialStateKeys.includes(newKey)) {
              console.error("model method return {".concat(newKey, "} is not in ").concat(modelName, ".initialState! please define '").concat(newKey, "' in ").concat(modelName, ".initialState!"));
            }
          });
          return _objectSpread2(_objectSpread2({}, state), newState);
        };
      }
    });

    if (syncStorage) {
      // ???meta??????__model_sync_name ??? __model_sync_state ?????????????????????????????????
      Object.keys(actions).forEach(function (item) {
        var actionCreator = actions[item];

        actions[item] = function () {
          var action = actionCreator.apply(void 0, arguments);
          action.meta = action.meta === void 0 ? {} : action.meta;
          if (_typeof(action.meta) !== 'object') throw new Error("when model has syncStorage property\uFF0Cmeta must be an object! check ".concat(modelName, " ").concat(item, " action method"));
          action.meta.__model_sync_name = modelName;
          action.meta.__model_sync_state = syncStorage;
          return action;
        };
      }); // ??? store??????????????????reducer ??????????????????????????????reducers

      if (!__reducers[actionTypes.GET_STATE_FROM_STORAGE]) {
        __reducers[actionTypes.GET_STATE_FROM_STORAGE] = function (state, action) {
          var _action$payload = action.payload,
              payload = _action$payload === void 0 ? {} : _action$payload; // state ????????????????????????????????????data??????????????????????????????

          var data = payload[modelName];
          if (!data) return state; // ?????????????????????????????????????????????????????????????????????????????????

          return setObjectByObject(state, data);
        };
      }
    }

    _actions[modelName] = actions;
    _reducers[modelName] = handleActions(__reducers, initialState);
  });
  return {
    actions: _actions,
    reducers: _reducers
  };
}
/**
 * ?????? mapObj ?????????????????? originObj ?????????????????????
 * @param originObj
 * @param mapObj
 * @returns {{}}
 */

function setObjectByObject(originObj) {
  var mapObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!originObj) return mapObj;
  mapObj && Object.keys(mapObj).forEach(function (key) {
    var value = mapObj[key];

    if (_typeof(value) === 'object' && !Array.isArray(value)) {
      originObj[key] = setObjectByObject(originObj[key], value);
    } else {
      originObj[key] = value;
    }
  });
  return originObj;
}
/**
 * ????????????Meta?????????????????????errorTip?????????successTip???onResolve???onReject??????
 * @param options
 * @returns {{successTip: boolean, errorTip, onResolve: *, onReject: *, onComplete: *}}
 */


function commonAsyncMeta(options) {
  var _options$successTip = options.successTip,
      successTip = _options$successTip === void 0 ? false : _options$successTip,
      errorTip = options.errorTip,
      onResolve = options.onResolve,
      onReject = options.onReject,
      onComplete = options.onComplete;
  return {
    successTip: successTip,
    errorTip: errorTip,
    onResolve: onResolve,
    onReject: onReject,
    onComplete: onComplete
  };
}

/**
 * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * @example
 * import {compressImageToSize, getImageFileInfo} from 'path/to/image-utils';
 *
 * handleChange = (e) => {
 *     const images = [...this.state.images];
 *     if (!e.target.files) return;
 *     Array.from(e.target.files).forEach(f => getImageFileInfo(f, (info, err) => {
 *         if (err) return;
 *         compressImageToSize({
 *             data: info.data,
 *             type: info.type,
 *         }).then(imageData => {
 *             images.push(<span><img src={imageData} alt={info.name}/> data size: {imageData.length / 1024} K</span>);
 *             this.setState({images});
 *         });
 *     }));
 *     // ??????value ????????????????????????
 *     e.target.value = '';
 * }
 *
 * render() {
 *     const {images} = this.state;
 *     return (
 *         <div>
 *             <input type="file" multiple onChange={this.handleChange}/>
 *             {images.map((item, index) => <div key={index}>{item}</div>)}
 *         </div>
 *     );
 * }
 * @module ??????????????????
 */

/**
 * ????????????????????????????????????????????????????????????????????????????????????
 * @param fileName
 * @returns {*}
 */

function getImageType(fileName) {
  var imageTypes = ['jpg', 'jpeg', 'gif', 'png', 'tiff', 'svg', 'ico', 'bmp', 'tag', 'psd', 'tiff', 'dds', 'pic', 'pcx', 'cdr', 'hdri', 'raw', 'SVG', 'ai', 'swf', 'svg', 'eps'];

  if (fileName) {
    var index = fileName.lastIndexOf('.');
    var type = fileName.substr(index + 1);
    type = type.toLowerCase();

    if (imageTypes.includes(type)) {
      return "image/".concat(type);
    }
  }

  return false;
}
/**
 * ???????????????????????????????????????img???src?????????????????????
 * @param {Blob} file ???????????????????????????
 * @returns {Promise}
 */

function getImageData(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onloadend = function () {
      return resolve(reader.result);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
/**
 * ???????????????????????????options??????????????????????????????
 * @param {string} data ???????????? FileReader readAsDataURL?????????????????????
 * @param {string} [type='image/jpeg'] ??????????????????????????????
 * @param {Number} [quality=0.8] ??????????????????
 * @returns {Promise}
 */

function compressImage(_ref) {
  var data = _ref.data,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'image/jpeg' : _ref$type,
      _ref$quality = _ref.quality,
      quality = _ref$quality === void 0 ? 0.8 : _ref$quality;
  if (!data) return;
  return new Promise(function (resolve, reject) {
    var canvas = document.createElement('canvas');
    var img = new Image();

    img.onload = function () {
      img.width *= quality;
      img.height *= quality;
      var ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height; // canvas??????

      ctx.clearRect(0, 0, canvas.width, canvas.height); // ??????????????????canvas???

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // ???????????????????????????canvas????????????canvas??????????????????

      resolve(canvas.toDataURL(type));
    };

    img.onerror = reject; // ??????????????????????????????????????????src???????????????img????????????????????????canvas

    img.src = data;
  });
}
/**
 * ????????????base64????????????????????????????????????????????????????????????<3????????????????????????1~3???
 * @param imageBase64Data
 * @returns {number}
 */

function getImageSizeByBase64(imageBase64Data) {
  // (((4 * e.file.size) / 3) + 3) & ~3 === base64Data.length
  // ~3 = -4
  var arr = imageBase64Data.split(',');
  var base64Data = arr[1];
  var fileSize = (base64Data.length - 3) * 3 / 4;
  return window.parseInt(fileSize) + 3;
}
/**
 * ??????????????????????????????????????????
 * @param {string} data ???????????? FileReader readAsDataURL?????????????????????
 * @param {string} [type='image/jpeg'] ??????????????????????????????
 * @param {Number} [size=300 * 1024] ???????????????
 * @param {Number} [qualityStep=0.9] ??????????????????????????????????????????????????????????????????
 * @returns {Promise}
 */

function compressImageToSize(_ref2) {
  var data = _ref2.data,
      _ref2$type = _ref2.type,
      type = _ref2$type === void 0 ? 'image/jpeg' : _ref2$type,
      _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 300 * 1000 : _ref2$size,
      _ref2$qualityStep = _ref2.qualityStep,
      qualityStep = _ref2$qualityStep === void 0 ? 0.9 : _ref2$qualityStep;

  if (getImageSizeByBase64(data) < size) {
    return Promise.resolve(data);
  }

  var loop = function loop(d) {
    return compressImage({
      data: d,
      type: type,
      quality: qualityStep
    }).then(function (result) {
      if (getImageSizeByBase64(result) < size) {
        return Promise.resolve(result);
      }

      return loop(result);
    }, function (err) {
      return Promise.reject(err);
    });
  };

  return loop(data);
}
/**
 * ?????????????????????????????????????????????????????????zip???????????????zip???????????????
 * @param {Blob} file ????????????????????????zip??????????????????????????????????????????????????????
 * @param {Function} cb ?????????????????????????????????
 */

function getImageFileInfo(file, cb) {
  var fileName = file.name;
  var fileSize = file.size;
  var fileType = file.type;

  if (fileType.startsWith('image')) {
    // ?????????
    getImageData(file).then(function (data) {
      cb(null, [{
        name: fileName,
        size: fileSize,
        type: fileType,
        data: data
      }]);
    }, function (err) {
      return cb(err);
    });
    return;
  }

  JSZip.loadAsync(file).then(function (zip) {
    var size = Object.keys(zip.files).length;
    var results = [];
    zip.forEach(function (relativePath, zipEntry) {
      var name = zipEntry.name;
      var imgType = getImageType(name);

      if (!zipEntry.dir && imgType) {
        // ?????????
        zipEntry.async('base64').then(function (content) {
          size--;
          results.push({
            name: name,
            size: content.length,
            type: imgType,
            data: "data:".concat(imgType, ";base64,").concat(content)
          });

          if (size <= 0) {
            cb(null, results);
          }
        }, function (err) {
          size--;
          if (size <= 0) cb(err);
        });
      } else {
        size--;
        if (size <= 0) cb(Error("\u8BF7\u4E0A\u4F20\u538B\u7F29\u5305\u6216\u8005\u56FE\u7247\u683C\u5F0F\u6587\u4EF6\uFF01[".concat(name, "]")));
      }
    });
  }, function (err) {
    return cb(err);
  });
}

var image = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getImageType: getImageType,
    getImageData: getImageData,
    compressImage: compressImage,
    getImageSizeByBase64: getImageSizeByBase64,
    compressImageToSize: compressImageToSize,
    getImageFileInfo: getImageFileInfo
});

/*
 * ?????????????????????
 * */
// ip
var ip = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/; // ?????????

var port = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/; // ?????????

var mobile = /^1\d{10}$/; // /^1[3|4|5|7|8][0-9]{9}$/;
// ?????????

var landLine = /^([0-9]{3,4}-)?[0-9]{7,8}$/; // qq???

var qq = /^[1-9][0-9]{4,9}$/; // ????????????

var cardNumber = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/; // ??????

var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // ????????? = 0 + ?????????

var number = /^[1-9]\d*$|^0?$/; // ?????? = ????????? + 0 + ?????????

var integer = /^[-]?[1-9]\d*$|^0?$/; // ????????? ?????????0

var positiveInteger = /^[1-9]\d*$/; // ???????????????????????????

var numberWithTwoDecimal = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

var regexp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ip: ip,
    port: port,
    mobile: mobile,
    landLine: landLine,
    qq: qq,
    cardNumber: cardNumber,
    email: email,
    number: number,
    integer: integer,
    positiveInteger: positiveInteger,
    numberWithTwoDecimal: numberWithTwoDecimal
});

/**
 * ??????????????????????????????
 * @param {Array} arr ?????????????????????
 * @param {Array} items ?????????????????????
 */

function arrayRemoveAll(arr, items) {
  if (!arr || !Array.isArray(arr) || !arr.length) return arr;
  if (!items || !Array.isArray(items) || !items.length) return arr;
  return arr.filter(function (item) {
    return !items.find(function (it) {
      return it === item;
    });
  });
}
/**
 * ??????????????????????????????????????????????????????????????????
 * @param {Array} array
 * @returns {Array} ?????????
 */

function uniqueArray(array) {
  var n = {}; // hash ???

  var r = []; // ????????????

  for (var i = 0; i < array.length; i++) {
    // ??????????????????
    if (!n[array[i]]) {
      // ??????hash?????????????????????
      n[array[i]] = true; // ??????hash???

      r.push(array[i]); // ???????????????????????????push?????????????????????
    }
  }

  return r;
}
/**
 * ??????????????????????????????
 * @param {Array} arr ?????????????????????
 * @param {*} item ??????????????????????????????????????????'==='?????????
 */

function arrayRemove(arr, item) {
  if (!arr || !Array.isArray(arr) || !arr.length) return arr;
  var newArr = cloneDeep(arr);
  var itemIndex = -1;

  for (var i = 0; i < newArr.length; i++) {
    if (newArr[i] === item) {
      itemIndex = i;
      break;
    }
  }

  if (itemIndex > -1) {
    newArr.splice(itemIndex, 1);
  }

  return newArr;
}
/**
 * ??????????????????tree????????????
 * @param {object} data ??????????????????object
 * @param {String} [keyField='id'] ??????data????????????????????????????????????key
 * @param {String} [titleField='name'] ??????data????????????????????????????????????name
 * @returns {{name: *, key: *}}
 */

function generateTreeNode(data) {
  var keyField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var titleField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'name';
  return _objectSpread2(_objectSpread2({}, data), {}, {
    title: data[titleField],
    key: data[keyField]
  });
}
/**
 * ??????????????????tree????????????
 * @param {Array} data ??????????????????????????????
 * @param {String} [keyField='id'] ??????data????????????????????????????????????key
 * @param {String} [titleField='name'] ??????data????????????????????????????????????name
 * @returns {Array}
 */

function generateTreeNodes(data) {
  var keyField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var titleField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'name';
  var arr = [];

  if (data && data.length) {
    arr = data.map(function (d) {
      return generateTreeNode(d, keyField, titleField);
    });
  }

  return arr;
}
/**
 * ??????key ???node?????????????????????
 * @param {Array} treeData ????????????????????????
 * @param {String} key ?????????key???
 */

function setLeaf(treeData, key) {
  var loopLeaf = function loopLeaf(data) {
    var _iterator = _createForOfIteratorHelper(data),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;

        if (item.key === key) {
          item.isLeaf = true;
          break;
        }

        if (item.children && item.children.length) {
          loopLeaf(item.children);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  loopLeaf(treeData);
}
/**
 * ?????????key????????????????????????
 * @param {Array} treeData ????????????????????????
 * @param {String} key ?????????key???
 * @param {Array} child ?????????????????????
 */

function appendChildrenByKey(treeData, key, child) {
  var loop = function loop(data) {
    var _iterator2 = _createForOfIteratorHelper(data),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var item = _step2.value;

        if (key === item.key) {
          if (item.children) {
            item.children = item.children.concat(child);
          } else {
            item.children = child;
          }

          if (!item.children || !item.children.length) {
            setLeaf(treeData, key);
          }

          break;
        }

        if (item.children && item.children.length) {
          loop(item.children);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  };

  loop(treeData);
}
/**
 * ???????????????????????????parent??????
 * @param {Array} rows ?????????????????????????????????????????????
 * @param {object} row ?????????????????????
 * @returns {boolean}
 */

function hasParent(rows, row) {
  var parentKey = row.parentKey;
  return rows.find(function (r) {
    return r.key === parentKey;
  });
}
/**
 * ??????key??????????????????????????????????????????????????????
 * @param {Array} rows ??????key???parentKey???????????????????????????
 * @param {object} key ?????????????????? key
 * @returns {Array}
 */

function getGenerationsByKey(rows, key) {
  // ????????????????????????????????????rows??????????????????????????????????????????
  rows = cloneDeep(rows);
  var parentNode = rows.find(function (item) {
    return item.key === key;
  });
  if (!parentNode) return [];
  var nodes = [parentNode];
  var generationNodes = [cloneDeep(parentNode)]; // ????????????????????????

  var toDo = nodes.map(function (v) {
    return v;
  });

  var _loop = function _loop() {
    // ????????????????????????????????????
    var node = toDo.shift(); // ??????????????????

    rows.forEach(function (row) {
      if (row.parentKey === node.key) {
        var child = cloneDeep(row);
        generationNodes.push(child); // child??????toDo???????????????

        toDo.push(child);
      }
    });
  };

  while (toDo.length) {
    _loop();
  }

  return generationNodes;
}
/**
 * js????????????????????????????????????parentKeys,parentNodes,parentTexts?????????????????????????????????
 * @param {Array} rows ??????key???parentKey?????????????????????????????????????????????text
 * @param {object} [parentNode=null] ????????????
 * @returns {Array}
 */

function convertToTree(rows) {
  var parentNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // ????????????????????????????????????rows??????????????????????????????????????????
  rows = cloneDeep(rows);
  parentNode = cloneDeep(parentNode);
  var nodes = [];

  if (parentNode) {
    nodes.push(parentNode);
  } else {
    // ???????????????????????????
    nodes = rows.filter(function (r) {
      return !hasParent(rows, r);
    });
  } // ????????????????????????


  var toDo = nodes.map(function (v) {
    return v;
  });

  var _loop2 = function _loop2() {
    // ????????????????????????????????????
    var node = toDo.shift(); // ??????????????????

    rows.forEach(function (row) {
      if (row.parentKey === node.key) {
        var child = cloneDeep(row);
        var parentKeys = [node.key];

        if (node.parentKeys) {
          parentKeys = node.parentKeys.concat(node.key);
        }

        child.parentKeys = parentKeys;
        var parentTexts = [node.text];

        if (node.parentTexts) {
          parentTexts = node.parentTexts.concat(node.text);
        }

        child.parentTexts = parentTexts;
        var tempNode = cloneDeep(node);
        delete tempNode.children;
        delete tempNode.parentKeys;
        delete tempNode.parentNodes;
        delete tempNode.parentTexts;
        var parentNodes = [tempNode];

        if (node.parentNodes) {
          parentNodes = node.parentNodes.concat(parentNodes);
        }

        child.parentNodes = parentNodes;

        if (node.children) {
          node.children.push(child);
        } else {
          node.children = [child];
        } // child??????toDo???????????????


        toDo.push(child);
      }
    });
  };

  while (toDo.length) {
    _loop2();
  }

  if (parentNode) {
    return nodes[0].children;
  }

  return nodes;
}
/**
 * ???????????????????????????????????????node???????????????path????????? getNodeByPropertyAndValue(treeData, 'path', '/user/list')
 * @param {Array} treeData ??????????????????
 * @param {String} key key????????????'path'???'text'?????????????????????
 * @param {*} value ??????????????????????????????
 * @param {Function} [compare] ????????????????????????????????????????????? ?????? === ??????
 * @returns {object} ???????????? key value??????????????????
 */

function getNodeByPropertyAndValue(treeData, key, value, compare) {
  if (!treeData || !treeData.length) return null;
  if (!compare) compare = function compare(a, b, item) {
    return a === b;
  };
  var node = null;

  var loop = function loop(data) {
    var _iterator3 = _createForOfIteratorHelper(data),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var item = _step3.value;

        if (compare(item[key], value, item)) {
          node = _objectSpread2({}, item);
          break;
        }

        if (item.children && item.children.length) {
          loop(item.children);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  };

  loop(treeData);
  return node;
}
/**
 * ??????key????????????
 * @param {Array} treeData ??????????????????
 * @param {String} key
 * @returns {object} ??????key??????????????????
 */

function getNodeByKey(treeData, key) {
  return getNodeByPropertyAndValue(treeData, 'key', key);
}
/**
 * ??????key?????????????????????key
 * @param {Array} treeData ??????????????????
 * @param {String} key
 * @returns {*[]} ??????key??????????????????????????????key
 */

function getGenerationKeys(treeData, key) {
  var node = getNodeByKey(treeData, key);
  var keys = [];

  var loop = function loop(node) {
    var key = node.key,
        children = node.children;
    keys.push(key);

    if (children === null || children === void 0 ? void 0 : children.length) {
      children.forEach(loop);
    }
  };

  loop(node);
  return keys.filter(function (item) {
    return item !== key;
  });
}
/**
 * ??????key????????????????????????
 * @param {Array} treeData ??????????????????
 * @param {String} key
 * @returns {Array} ??????key??????????????????????????????
 */

function getGenerationalNodesByKey(treeData, key) {
  var node = getNodeByKey(treeData, key);

  if (!node.children || !node.children.length) {
    return [];
  }

  var allNodes = [];

  var loop = function loop(data) {
    data.forEach(function (d) {
      allNodes.push(d);

      if (d.children && d.children) {
        loop(d.children);
      }
    });
  };

  loop(node.children);
  return allNodes;
}
/**
 * ?????????????????????keys????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * @param treeData ??????????????????
 * @param {Array} checkedKeys ??????????????????????????????keys
 * @param {boolean} checked ??????????????? checked ???true????????? unchecked???false???
 * @param {String} checkNodeKey ?????????????????????key
 * @returns {Array} ?????????keys
 */

function getCheckedKeys(treeData, checkedKeys, checked, checkNodeKey) {
  // TODO ?????????????????????
  var allKeys = _toConsumableArray(checkedKeys);

  var generationalNodes = getGenerationalNodesByKey(treeData, checkNodeKey);
  var generationalKeys = generationalNodes.map(function (n) {
    return n.key;
  });

  if (checked) {
    // ????????????????????????
    allKeys = allKeys.concat(generationalKeys); // ?????????????????????

    var node = getNodeByKey(treeData, checkNodeKey);

    if (node.parentKeys) {
      allKeys = allKeys.concat(node.parentKeys);
    }
  } else {
    // ??????????????????????????????
    allKeys = arrayRemoveAll(allKeys, generationalKeys.concat(checkNodeKey)); // ???????????????????????????????????????????????????????????????????????????????????????

    var _node = getNodeByKey(treeData, checkNodeKey);

    if (_node.parentKeys) {
      var pks = _toConsumableArray(_node.parentKeys);

      pks.reverse();
      pks.forEach(function (key) {
        var pNode = getNodeByKey(treeData, key);

        if (pNode.children && pNode.children.length) {
          var hasCheckedChild = false;

          var _iterator4 = _createForOfIteratorHelper(pNode.children),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var pCNode = _step4.value;

              if (allKeys.indexOf(pCNode.key) > -1) {
                hasCheckedChild = true;
                break;
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          if (!hasCheckedChild) {
            allKeys = arrayRemove(allKeys, key);
          }
        }
      });
    }
  }

  return uniqueArray(allKeys);
}
/**
 * ??????key????????????
 * @param {Array} treeData ????????????????????????
 * @param {String} key ??????????????????key???
 */

function removeNodeByKey(treeData, key) {
  if (!treeData || !treeData.length) return null;

  var loop = function loop(data) {
    for (var i = 0; i < data.length; i++) {
      var item = data[i];

      if (item.key === key) {
        data.splice(i, 1);
        break;
      } else if (item.children && item.children.length) {
        loop(item.children);
      }
    }
  };

  loop(treeData);
}
/**
 * ?????????key???node?????????????????????????????????
 * @param {Array} treeData ????????????????????????
 * @param {String} key ?????????????????????key???
 * @param {object} newNode ????????????????????????
 */

function addNodeChildByKey(treeData, key, newNode) {
  if (!treeData || !treeData.length) return null;
  newNode.isLeaf = true;

  var loop = function loop(data) {
    var _iterator5 = _createForOfIteratorHelper(data),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var item = _step5.value;

        if (item.key === key) {
          if (item.children) {
            item.children.push(_objectSpread2({}, newNode));
          } else {
            item.children = [_objectSpread2({}, newNode)];
          }

          break;
        }

        if (item.children && item.children.length) {
          loop(item.children);
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  };

  loop(treeData);
}
/**
 * ??????????????????
 * @param {Array} treeData ????????????????????????
 * @param {object} newNode ??????????????????????????????????????????key????????????????????????
 */

function updateNode(treeData, newNode) {
  if (!treeData || !treeData.length) return null;

  var loop = function loop(data) {
    var _iterator6 = _createForOfIteratorHelper(data),
        _step6;

    try {
      var _loop3 = function _loop3() {
        var item = _step6.value;

        if (item.key === newNode.key) {
          Object.keys(item).forEach(function (key) {
            item[key] = newNode[key];
          });
          return "break";
        }

        if (item.children && item.children.length) {
          loop(item.children);
        }
      };

      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _ret = _loop3();

        if (_ret === "break") break;
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  };

  loop(treeData);
}
/**
 * ?????????????????????????????????????????????
 * @param {Array} treeData ??????????????????
 * @param {object} node ????????????
 * @returns {object} ???????????????
 */

function getTopNodeByNode(treeData, node) {
  if (!treeData || !treeData.length || !node) return null;
  if (node && !node.parentKey) return node;
  var parentNode = null;

  var loop = function loop(data) {
    // ??????node????????????
    var _iterator7 = _createForOfIteratorHelper(data),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var item = _step7.value;

        if (item.key === node.parentKey) {
          parentNode = _objectSpread2({}, item);
          break;
        }

        if (item.children && item.children.length) {
          loop(item.children);
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  };

  loop(treeData);
  return getTopNodeByNode(treeData, parentNode); // ????????????parentNode????????????
}
/**
 * ????????????cb(node[, children nodes])
 * @param {Array} treeData ????????????????????????
 * @param {function} cb ???????????????cb(node[, children nodes])
 */

function renderNode(treeData, cb) {
  var loop = function loop(data) {
    return data.map(function (item) {
      if (item.children) {
        return cb(item, loop(item.children)); // item children Item
      }

      return cb(item); // ????????????
    });
  };

  return loop(treeData);
}
/**
 * ???????????????????????????????????????property?????????????????????????????????
 * @param {Array} treeData ????????????????????????
 * @param {object} node ????????????
 * @param {String} property ??????????????? key??? path???
 * @returns {*}
 */

function getFirstValue(treeData, node, property) {
  if (node[property]) return node[property];
  var firstValue = null;

  var loop = function loop(data) {
    var _iterator8 = _createForOfIteratorHelper(data),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var item = _step8.value;

        if (item[property]) {
          firstValue = item[property];
          break;
        }

        if (item.children && item.children.length) {
          loop(item.children);
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
  };

  if (node.children && node.children.length) {
    loop(node.children);
  }

  return firstValue;
}

var tree = /*#__PURE__*/Object.freeze({
    __proto__: null,
    arrayRemoveAll: arrayRemoveAll,
    uniqueArray: uniqueArray,
    arrayRemove: arrayRemove,
    generateTreeNode: generateTreeNode,
    generateTreeNodes: generateTreeNodes,
    setLeaf: setLeaf,
    appendChildrenByKey: appendChildrenByKey,
    hasParent: hasParent,
    getGenerationsByKey: getGenerationsByKey,
    convertToTree: convertToTree,
    getNodeByPropertyAndValue: getNodeByPropertyAndValue,
    getNodeByKey: getNodeByKey,
    getGenerationKeys: getGenerationKeys,
    getGenerationalNodesByKey: getGenerationalNodesByKey,
    getCheckedKeys: getCheckedKeys,
    removeNodeByKey: removeNodeByKey,
    addNodeChildByKey: addNodeChildByKey,
    updateNode: updateNode,
    getTopNodeByNode: getTopNodeByNode,
    renderNode: renderNode,
    getFirstValue: getFirstValue
});

var ROUTE_BASE_NAME = process.env.BASE_NAME || '';
var getNodeByPropertyAndValue$1 = getNodeByPropertyAndValue,
    convertToTree$1 = convertToTree;
var isMobile = document.body.clientWidth < 575;
/**
 * ??????path?????????????????????
 * @param path
 * @param menuTreeData
 * @returns {*}
 */

function getSelectedMenuByPath(path, menuTreeData) {
  path = path.replace(ROUTE_BASE_NAME, '');
  var selectedMenu;
  if (menuTreeData) {
    if (path.indexOf('/_') > -1) {
      path = path.substring(0, path.indexOf('/_'));
    } // ???????????????
    selectedMenu = getNodeByPropertyAndValue$1(menuTreeData, 'path', path, function (itemValue, value, item) {
      var isTop = item.children && item.children.length;
      return itemValue === value && !isTop; // ??????????????????
    }); // ???????????????????????????`:id`?????????
    // fixme ??????????????????a/b/:id,????????? a/b/1, a/b/detail?????????????????????????????????????????????????????????a/b/tab/:id ?????????:id??????????????????????????????id?????????
    if (!selectedMenu && path !== `${preRouter}`) {
      selectedMenu = getNodeByPropertyAndValue$1(menuTreeData, 'path', path, function (itemValue, value, item) {
        var isTop = item.children && item.children.length;
        var re = pathToRegexp(itemValue);
        return !!re.exec(value) && !isTop; // ??????????????????
      });
    }
  }

  return selectedMenu;
}
/**
 * ?????????????????????????????? ??? ??????????????????????????????
 * @param menus ?????????????????????
 */

function getMenuTreeDataAndPermissions(menus) {
  // ????????????code?????????????????????????????? 1 => ?????? 2 => ??????
  var permissions = menus.map(function (item) {
    if (item.type === '1') return item.key;
    if (item.type === '2') return item.code;
    return null;
  }); // ?????????????????????????????????

  menus = menus.filter(function (item) {
    return item.type !== '2';
  }); // ??????basePath

  var setBasePath = function setBasePath(node, basePath) {
    if (!basePath) return;
    var path = node.path,
        url = node.url;

    if (basePath.endsWith('/')) {
      basePath = basePath.substr(0, basePath.length - 1);
    }

    if (path && !path.startsWith(basePath)) {
      node.path = "".concat(basePath).concat(path);
    }

    if (url && !url.startsWith('http') && !url.startsWith('//') && !url.startsWith(basePath)) {
      node.url = "".concat(basePath).concat(url);
    }
  };

  var loop = function loop(nodes, basePath) {
    nodes.forEach(function (item) {
      var key = item.key;
      var children = menus.filter(function (it) {
        return it.parentKey === key;
      });
      setBasePath(item, basePath);

      if (children === null || children === void 0 ? void 0 : children.length) {
        loop(children, basePath);
      }
    });
  };

  menus.forEach(function (top) {
    var basePath = top.basePath,
        key = top.key;
    var children = menus.filter(function (it) {
      return it.parentKey === key;
    });
    if (!basePath) return;
    setBasePath(top, basePath);

    if (children === null || children === void 0 ? void 0 : children.length) {
      loop(children, basePath);
    }
  }); // ??????path??? ????????????url??????iframe??????

  menus = menus.map(function (item) {
    if (item.url) {
      let reg=/^\//;
      if(reg.test(item.url)){//true ??? / ?????? ???????????? ip??????
        item.url=`${IframeUrl}${item.url}`;
      }
      item.path = `${preRouter}/iframe_page_/`.concat(window.encodeURIComponent(item.url));
    }

    return item;
  }); // ????????????order ??????

  var orderedData = _toConsumableArray(menus).sort(function (a, b) {
    var aOrder = a.order || 0;
    var bOrder = b.order || 0; // ??????order????????????????????? text ??????

    if (!aOrder && !bOrder) {
      return a.text > b.text ? 1 : -1;
    }

    return bOrder - aOrder;
  }); // ??????????????????path???????????????????????????path??????????????????????????????????????????path


  var findPath = function findPath(node) {
    var children = orderedData.filter(function (item) {
      return item.parentKey === node.key;
    });
    var path = '';

    if (children && children.length) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (child.path) {
          path = child.path;
          break;
        }

        path = findPath(child);
      }
    }

    return path;
  };

  orderedData.forEach(function (item) {
    if (!item.path) {
      item.path = findPath(item);
    }
  });
  var menuTreeData = convertToTree$1(orderedData);
  return {
    menuTreeData: menuTreeData,
    permissions: permissions
  };
}
/**
 * ??????????????????
 * @param functions
 * @returns {*}
 */

function compose(functions) {
  if (functions.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (functions.length === 1) {
    return functions[0];
  }

  return functions.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * ?????? JavaScript
 * @param src
 * @returns {Promise<any>}
 */

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
/**
 * ???????????????????????????json??????
 * @param str
 * @returns {boolean}
 */

function isJson(str) {
  try {
    if (_typeof(JSON.parse(str)) == 'object') {
      return true;
    }
  } catch (e) {
    return false;
  }
}
/**
 * ???????????????????????????
 * @module ??????????????????
 * */

/**
 * ???????????????????????????????????????
 * @param {String} str
 * @returns {String}
 */

function firstUpperCase(str) {
  var s = typeof str !== 'string' ? "".concat(str) : str;
  return s.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2;
  });
}
/**
 * ???????????????????????????????????????
 * @param {String} str
 * @returns {String}
 */

function firstLowerCase(str) {
  var s = typeof str !== 'string' ? "".concat(str) : str;
  return s.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return $1.toLowerCase() + $2;
  });
}
/**
 * ???????????????????????????????????????????????????
 * @param {String} value
 * @returns {number}
 */

function getStringByteLength(value) {
  if (!value) return 0;
  var s = typeof value !== 'string' ? "".concat(value) : value;
  var length = s.length;

  for (var i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 127) {
      length++;
    }
  }

  return length;
}
/**
 * ??????????????????
 * @example
 * stringFormat('H{0}llo W{1}rld!', 'e', 'o');
 * stringFormat('H{eKey}llo W{oKey}rld!', {eKey: 'e', oKey: 'o'});
 * @param {String} value ???????????????????????????
 * @param {*} args ????????????????????????
 * @returns {*}
 */

function stringFormat(value) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (!value) return value;
  if (typeof value !== 'string') return value;
  if (!args || !args.length) return value;

  if (args.length === 1 && _typeof(args[0]) === 'object') {
    var arg = args[0];
    Object.keys(arg).forEach(function (key) {
      if (arg[key] !== undefined) {
        var reg = new RegExp("({".concat(key, "})"), 'g');
        value = value.replace(reg, arg[key]);
      }
    });
    return value;
  }

  for (var i = 0; i < args.length; i++) {
    if (args[i] !== undefined) {
      var reg = new RegExp("({)".concat(i, "(})"), 'g');
      value = value.replace(reg, args[i]);
    }
  }

  return value;
}
/**
 * ??????cookie
 * @param {String} objName ??????coolie????????????key
 * @returns {String}
 */

function getCookie(objName) {
  var arrStr = document.cookie.split('; ');

  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split('=');
    if (temp[0] === objName) return unescape(temp[1]);
  }

  return '';
}
/**
 * ???????????????
 * @returns {number}
 */

function getScrollBarWidth() {
  var scrollDiv = document.createElement('div');
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  window.document.body.removeChild(scrollDiv);
  return scrollBarWidth;
}
/**
 * ????????????????????????
 * @param el
 * @param direction
 * @returns {boolean}
 */

function hasScrollBar(el) {
  var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'vertical';

  if (direction === 'vertical') {
    return el.scrollHeight > el.clientHeight;
  } else if (direction === 'horizontal') {
    return el.scrollWidth > el.clientWidth;
  }
}
/**
 * ???????????????????????????????????????
 * @param {number} min ?????????
 * @param {number} max ????????????
 * @returns {number}
 */

function getRandomNum(min, max) {
  var range = max - min;
  var rand = Math.random();
  return min + Math.round(rand * range);
}
/**
 * ?????????????????????????????????????????????
 * @param element
 * @returns {number | Requireable<number>}
 */

function getElementTop(element) {
  if (!element) return 0;
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}
/**
 * ??????className ??????????????????
 * @param el
 * @param parentClassName
 * @returns {*}
 */

function getParentByClassName(el, parentClassName) {
  var parentNode = el.parentNode;
  if (!parentNode) return null;
  var classList = Array.from(parentNode.classList || []);

  if ((classList === null || classList === void 0 ? void 0 : classList.length) && classList.includes(parentClassName)) {
    return parentNode;
  } else {
    return getParentByClassName(parentNode, parentClassName);
  }
}
/**
 * ?????????dom????????????class
 * @param {string} selector document.querySelectory ??????????????????
 * @param {string} className ????????????class
 */

function removeClass(selector, className) {
  var doms = selector;

  if (typeof selector === 'string') {
    doms = document.querySelectorAll(selector);
  }

  if (!doms || !doms.length) return;
  if (!doms.length) doms = [doms];
  doms.forEach(function (dom) {
    var domClass = dom.className;

    if (domClass) {
      domClass = domClass.split(' ');
      if (!domClass || !domClass.length) return;
      dom.className = domClass.filter(function (c) {
        return c !== className;
      }).join(' ');
    }
  });
}
/**
 * ?????????dom????????????class
 * @param {string} selector document.querySelectory ??????????????????
 * @param {string} className ????????????class
 */

function addClass(selector, className) {
  var doms = selector;

  if (typeof selector === 'string') {
    doms = document.querySelectorAll(selector);
  }

  if (!doms || !doms.length) return;
  if (!doms.length) doms = [doms];
  doms.forEach(function (dom) {
    var domClass = dom.className;

    if (domClass) {
      domClass = domClass.split(' ');
      if (!domClass || !domClass.length || domClass.indexOf(className) > -1) return;
      domClass.push(className);
      dom.className = domClass.join(' ');
    } else {
      dom.className = className;
    }
  });
}
/**
 * ??????get????????????url
 * @param {string} url
 * @param {object} params ????????????
 * @returns {string} ????????????url
 */

function mosaicUrl(url, params) {
  if (!params) return url;
  var queryString = [];
  Object.keys(params).forEach(function (key) {
    var value = params[key];

    if (value !== undefined && value !== null) {
      queryString.push("".concat(key, "=").concat(value));
    }
  });
  var qStr = queryString.join('&');

  if (url.indexOf('?') < 0) {
    url += "?".concat(qStr);
  } else if (url.endsWith('&')) {
    url += qStr;
  } else if (url.endsWith('?')) {
    url += "".concat(qStr);
  } else {
    url += "&".concat(qStr);
  }

  return url;
}
/**
 * ??????keyPath????????????object????????????
 * @param obj ?????????????????????
 * @param {string} keyPath ????????? a.b.c
 * @returns {*} ??????????????????
 */

function findObjByKeyPath(obj, keyPath) {
  var keys = keyPath.split('.');
  var targetObj = obj;
  keys.forEach(function (k) {
    targetObj = targetObj[k];
  });
  return targetObj;
}
/**
 * ??????????????????????????????
 * @param {Array} arr ?????????????????????
 * @param {*} item ??????????????????????????????????????????'==='?????????
 */


function arrayRemove$1(arr, item) {
  if (!arr || !Array.isArray(arr) || !arr.length) return arr;
  var newArr = cloneDeep(arr);
  var itemIndex = -1;

  for (var i = 0; i < newArr.length; i++) {
    if (newArr[i] === item) {
      itemIndex = i;
      break;
    }
  }

  if (itemIndex > -1) {
    newArr.splice(itemIndex, 1);
  }

  return newArr;
}
/**
 * ??????????????????????????????
 * @param {Array} arr ?????????????????????
 * @param {Array} items ?????????????????????
 */

function arrayRemoveAll$1(arr, items) {
  if (!arr || !Array.isArray(arr) || !arr.length) return arr;
  if (!items || !Array.isArray(items) || !items.length) return arr;
  return arr.filter(function (item) {
    return !items.find(function (it) {
      return it === item;
    });
  });
}
/**
 * ?????????????????????????????????????????????????????????
 * @param array
 * @param item
 * @returns {...*[]}
 */

function arrayPush(array, item) {
  if (!array || !Array.isArray(array)) return array;

  var arr = _toConsumableArray(array);

  if (!arr.includes(item)) arr.push(item);
  return arr;
}
/**
 * ????????????keyPath ????????????
 * @param obj ??????????????????
 * @param {string} keyPath ????????????a.b.c????????????value?????????c
 * @param {*} value ??????????????????
 * @throws Will throw error if keyPath dose not point to an object
 */

function objSetValue(obj, keyPath, value) {
  var newObj = cloneDeep(obj);
  var pointLastIndex = keyPath.lastIndexOf('.');

  if (pointLastIndex < 0) {
    if (_typeof(newObj) !== 'object') {
      throw new Error('keyPath dose not point to an object!');
    }

    newObj[keyPath] = value;
    return newObj;
  }

  var key = keyPath.substr(pointLastIndex + 1, keyPath.length);
  keyPath = keyPath.substr(0, pointLastIndex);
  var targetObj = findObjByKeyPath(newObj, keyPath);

  if (_typeof(targetObj) !== 'object') {
    throw new Error('keyPath dose not point to an object!');
  }

  targetObj[key] = value;
  return newObj;
}
/**
 * ??????keyPath???????????????????????????????????????
 * @param obj ??????????????????
 * @param {string} keyPath keyPath ????????????a.b.c?????????c??????
 * @throws Will throw error if keyPath dose not point to an object
 */

function objRemove(obj, keyPath) {
  var newObj = cloneDeep(obj);
  var pointLastIndex = keyPath.lastIndexOf('.');

  if (pointLastIndex < 0) {
    if (_typeof(newObj) !== 'object') {
      throw new Error('keyPath dose not point to an object!');
    }

    delete newObj[keyPath];
    return newObj;
  }

  var key = keyPath.substr(pointLastIndex + 1, keyPath.length);
  keyPath = keyPath.substr(0, pointLastIndex);
  var targetObj = findObjByKeyPath(newObj, keyPath);

  if (_typeof(targetObj) !== 'object') {
    throw new Error('keyPath dose not point to an object!');
  }

  delete targetObj[key];
  return newObj;
}
/**
 * ??????keyPath???????????????????????????????????????
 * @param obj ??????????????????
 * @param keyPath ????????????a.b.c?????????keyPath????????????obj???????????????
 * @param value ??????append?????????
 * @throws Will throw error if keyPath dose not point to an array
 */

function arrAppendValue(obj, keyPath, value) {
  var newObj = cloneDeep(obj);
  var targetObj = findObjByKeyPath(newObj, keyPath);

  if (!Array.isArray(targetObj)) {
    throw new Error('keyPath dose not point to an array!');
  }

  if (Array.isArray(value) && value.length) {
    value.forEach(function (v) {
      return targetObj.push(v);
    });
  } else {
    targetObj.push(value);
  }

  return newObj;
}
/**
 * ??????keyPath??????????????????????????????????????????
 * @param obj ??????????????????
 * @param keyPath ????????????a.b.c?????????keyPath????????????obj???????????????
 * @param value ???????????????????????????
 * @throws Will throw error if keyPath dose not point to an array
 */

function arrRemove(obj, keyPath, value) {
  var newObj = cloneDeep(obj);
  var targetObj = findObjByKeyPath(newObj, keyPath);

  if (!Array.isArray(targetObj)) {
    throw new Error('keyPath dose not point to an array!');
  }

  targetObj = arrayRemove$1(targetObj, value);
  return objSetValue(newObj, keyPath, targetObj);
}
/**
 * ??????keyPath???????????????????????????????????????value???????????????
 * @param obj ??????????????????
 * @param keyPath ????????????a.b.c?????????keyPath????????????obj???????????????
 * @param value ?????????????????????
 * @throws Will throw error if keyPath dose not point to an array
 */

function arrRemoveAll(obj, keyPath, value) {
  var newObj = cloneDeep(obj);
  var targetObj = findObjByKeyPath(newObj, keyPath);

  if (!Array.isArray(targetObj)) {
    throw new Error('keyPath dose not point to an array!');
  }

  while (targetObj.indexOf(value) > -1) {
    targetObj = arrayRemove$1(targetObj, value);
  }

  return objSetValue(newObj, keyPath, targetObj);
}
/**
 * ??????????????????????????????????????????????????????????????????
 * @param {Array} array
 * @returns {Array} ?????????
 */

function uniqueArray$1(array) {
  var n = {}; // hash ???

  var r = []; // ????????????

  for (var i = 0; i < array.length; i++) {
    // ??????????????????
    if (!n[array[i]]) {
      // ??????hash?????????????????????
      n[array[i]] = true; // ??????hash???

      r.push(array[i]); // ???????????????????????????push?????????????????????
    }
  }

  return r;
}
/**
 * ???????????????????????????
 * @returns {{width: (Number|number), height: (Number|number)}}
 */

function getWindowSize() {
  var w = window;
  var d = document;
  var e = d.documentElement;
  var g = d.getElementsByTagName('body')[0];
  var width = w.innerWidth || e.clientWidth || g.clientWidth;
  var height = w.innerHeight || e.clientHeight || g.clientHeight;
  return {
    width: width,
    height: height
  };
}
/**
 * ???dom??????????????????
 * @param element {Object} ?????????????????????dom??????
 * @param type {String} ????????????????????? 'click'
 * @param handler {function} ??????????????????
 */

function addEventListener(element, type, handler) {
  if (!element) return;

  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent("on".concat(type), handler);
  } else {
    element["on".concat(type)] = handler;
  }
}
/**
 * ???dom??????????????????
 * @param element {Object} ?????????????????????dom??????
 * @param type {String} ????????????????????? 'click'
 * @param handler {function} ??????????????????
 */

function removeEventListener(element, type, handler) {
  if (!element) return;

  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent("on".concat(type), handler);
  } else {
    element["on".concat(type)] = null;
  }
}
/**
 * ????????????????????????????????????????????????
 *
 * @param num ??????(Number??????String)
 * @param options ????????????
 * @param options.prefix ??????????????????????????????????????? ??? ??? $
 * @param options.decimalNum ?????????????????????????????????2 ????????? 0 1 2
 * @param options.splitSymbol ????????????????????????????????????????????????????????????????????????
 * @return ????????????????????????,???'???1,234,567.45'
 * @type String
 */

function formatCurrency(num) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var decimalNum = options.decimalNum,
      splitSymbol = options.splitSymbol;
  var _options$prefix = options.prefix,
      prefix = _options$prefix === void 0 ? '???' : _options$prefix;
  var centsPercent = 100;
  if (splitSymbol === undefined) splitSymbol = ',';
  if (decimalNum !== 0 && decimalNum !== 1 && decimalNum !== 2) decimalNum = 2;
  if (decimalNum === 0) centsPercent = 1;
  if (decimalNum === 1) centsPercent = 10;
  num = num.toString().replace(/\$|,/g, '');
  if (isNaN(num)) num = '0';
  var sign = num === Math.abs(num).toString() ? '' : '-';
  num = Math.abs(num);
  num = Math.floor(num * centsPercent + 0.50000000001);
  var cents = num % centsPercent;
  num = Math.floor(num / centsPercent).toString();

  if (cents < 10 && decimalNum === 2) {
    cents = "0".concat(cents);
  }

  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    var endPosition = 4 * i + 3;
    num = num.substring(0, num.length - endPosition) + splitSymbol + num.substring(num.length - endPosition);
  }

  if (decimalNum === 0) {
    return prefix + sign + num;
  }

  return "".concat(prefix).concat(sign).concat(num, ".").concat(cents);
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isMobile: isMobile,
    getSelectedMenuByPath: getSelectedMenuByPath,
    getMenuTreeDataAndPermissions: getMenuTreeDataAndPermissions,
    compose: compose,
    loadScript: loadScript,
    isJson: isJson,
    firstUpperCase: firstUpperCase,
    firstLowerCase: firstLowerCase,
    getStringByteLength: getStringByteLength,
    stringFormat: stringFormat,
    getCookie: getCookie,
    getScrollBarWidth: getScrollBarWidth,
    hasScrollBar: hasScrollBar,
    getRandomNum: getRandomNum,
    getElementTop: getElementTop,
    getParentByClassName: getParentByClassName,
    removeClass: removeClass,
    addClass: addClass,
    mosaicUrl: mosaicUrl,
    arrayRemove: arrayRemove$1,
    arrayRemoveAll: arrayRemoveAll$1,
    arrayPush: arrayPush,
    objSetValue: objSetValue,
    objRemove: objRemove,
    arrAppendValue: arrAppendValue,
    arrRemove: arrRemove,
    arrRemoveAll: arrRemoveAll,
    uniqueArray: uniqueArray$1,
    getWindowSize: getWindowSize,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener,
    formatCurrency: formatCurrency
});

function ip$1() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '??????????????????IP?????????';
  return {
    pattern: ip,
    message: message
  };
}
function port$1() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '??????????????????????????????';
  return {
    pattern: port,
    message: message
  };
}
function noSpace() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '?????????????????????';
  return {
    validator: function validator(rule, value) {
      if (/\s/g.test(value)) return Promise.reject(message);
      return Promise.resolve();
    }
  };
}
function mobile$1() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '??????????????????????????????';
  // ?????????
  return {
    pattern: mobile,
    message: message
  };
}
function landline() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '??????????????????????????????';
  // ??????
  return {
    pattern: landLine,
    message: message
  };
}
function qq$1() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '??????????????????qq??????';
  // qq???
  return {
    pattern: qq,
    message: message
  };
}
function cardNumber$1() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '?????????????????????????????????';
  // ????????????????????????????????????X?????????
  return {
    pattern: cardNumber,
    message: message
  };
}
function email$1() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '???????????????????????????';
  return {
    type: 'email',
    message: message
  };
}
function number$1() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '???????????????.';
  // ????????????????????? + -
  return {
    pattern: number,
    message: message
  };
}
function integer$1() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '??????????????????';
  // ??????
  return {
    pattern: integer,
    message: message
  };
}
function positiveInteger$1() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '?????????????????????';
  // ????????? = ????????????0
  return {
    pattern: positiveInteger,
    message: message
  };
}
function numberWithTwoDecimal$1() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '????????????????????????????????????.';
  return {
    pattern: numberWithTwoDecimal,
    message: message
  };
}
function numberRange(min, max) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '?????????{min}???{max}????????????.';
  return {
    validator: function validator(rule, value) {
      if (!value) return Promise.resolve();
      value = Number(value);
      if (!value && value !== 0) return Promise.resolve();
      value < min || value > max ? Promise.reject(stringFormat(message, {
        min: min,
        max: max
      })) : Promise.resolve();
    }
  };
}
function numberMaxRange(max) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '????????????{max}';
  return {
    validator: function validator(rule, value) {
      if (!value) return Promise.resolve();
      value = Number(value);
      if (!value && value !== 0) return Promise.resolve();
      value > max ? Promise.reject(stringFormat(message, {
        max: max
      })) : Promise.resolve();
    }
  };
}
function numberMinRange(min) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '????????????{min}';
  return {
    validator: function validator(rule, value) {
      if (!value) return Promise.resolve();
      value = Number(value);
      if (!value && value !== 0) return Promise.resolve();
      value < min ? Promise.reject(stringFormat(message, {
        min: min
      })) : Promise.resolve();
    }
  };
}
function stringByteRangeLength(min, max) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '????????? {min}-{max} ?????????(?????????2?????????).';
  return {
    validator: function validator(rule, value) {
      if (!value) return Promise.resolve();
      var length = getStringByteLength(value);
      length < min || length > max ? Promise.reject(stringFormat(message, {
        min: min,
        max: max
      })) : Promise.resolve();
    }
  };
}
function stringByteMinLength(min) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '????????????{min}?????????(?????????2?????????).';
  return {
    validator: function validator(rule, value) {
      if (!value) return Promise.resolve();
      var length = getStringByteLength(value);
      length < min ? Promise.reject(stringFormat(message, {
        min: min
      })) : Promise.resolve();
    }
  };
}
function stringByteMaxLength(max) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '????????????{max}?????????(?????????2?????????).';
  return {
    validator: function validator(rule, value) {
      if (!value) return Promise.resolve();
      var length = getStringByteLength(value);
      length > max ? Promise.reject(stringFormat(message, {
        max: max
      })) : Promise.resolve();
    }
  };
}
function arrayMaxLength(max) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '??????{max}??????';
  return {
    validator: function validator(rule, value) {
      if (!value || !Array.isArray(value)) return Promise.resolve();
      var length = value.length;
      length > max ? Promise.reject(stringFormat(message, {
        max: max
      })) : Promise.resolve();
    }
  };
}

var validationRule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ip: ip$1,
    port: port$1,
    noSpace: noSpace,
    mobile: mobile$1,
    landline: landline,
    qq: qq$1,
    cardNumber: cardNumber$1,
    email: email$1,
    number: number$1,
    integer: integer$1,
    positiveInteger: positiveInteger$1,
    numberWithTwoDecimal: numberWithTwoDecimal$1,
    numberRange: numberRange,
    numberMaxRange: numberMaxRange,
    numberMinRange: numberMinRange,
    stringByteRangeLength: stringByteRangeLength,
    stringByteMinLength: stringByteMinLength,
    stringByteMaxLength: stringByteMaxLength,
    arrayMaxLength: arrayMaxLength
});

/**
 * localStorage ??? sessionStorage ??????
 *
 *
 * @example
 * // ??????
 * import * as storage from 'path/to/storage';
 *
 * @example
 // ???????????????????????????keyPrefix?????????????????????
 storage.init({
    keyPrefix: user.id,
 });
 *
 * @example
 * // ??????localStorage????????????
 * storage.local.setItem('user', userObj);
 *
 * @example
 * // ??????sessionStorage????????????
 * import {session} from 'path/to/storage';
 * session.setItem('user', userObj);
 *
 *
 * @module ????????????
 */
var localStorage = window.localStorage;
var sessionStorage = window.sessionStorage;
var _keyPrefix = 'default-prefix-';
/**
 * ???????????????
 * @param options keyPrefix??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 */

function init$1(options) {
  var _options$keyPrefix = options.keyPrefix,
      keyPrefix = _options$keyPrefix === void 0 ? 'default-prefix' : _options$keyPrefix;
  _keyPrefix = "".concat(keyPrefix, "-");
}
var local = {
  /**
   * localStorage ????????????
   * @param {string} key ?????????key
   * @param {*} value ??????????????????
   */
  setItem: function setItem(key, value) {
    key = _keyPrefix + key;
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },

  /**
   * localStorage ????????????
   * @param {string} key
   * @return {json} key ???????????????
   */
  getItem: function getItem(key) {
    key = _keyPrefix + key;
    var value = localStorage.getItem(key);
    return JSON.parse(value);
  },

  /**
   * localStorage ????????????
   * @param key
   */
  removeItem: function removeItem(key) {
    key = _keyPrefix + key;
    localStorage.removeItem(key);
  },

  /**
   * localStorage ??????keyPrefix????????????
   */
  clear: function clear() {
    var localStorageKeys = Object.keys(localStorage);

    if (localStorageKeys && localStorageKeys.length) {
      localStorageKeys.forEach(function (item) {
        if (item.startsWith(_keyPrefix)) {
          localStorage.removeItem(item);
        }
      });
    }
  },

  /**
   * localStorage ??????keys ??????????????????
   * @param {array} keys
   * @returns {{json}}
   */
  multiGet: function multiGet(keys) {
    var _this = this;

    var values = {};
    keys.forEach(function (key) {
      return values[key] = _this.getItem(key);
    });
    return values;
  },

  /**
   * localStorage ??????keys ??????????????????
   * @param {array} keys
   */
  multiRemove: function multiRemove(keys) {
    var _this2 = this;

    keys.forEach(function (key) {
      return _this2.removeItem(key);
    });
  }
};
/**
 * sessitonStorage ???????????????localStorage????????????
 *
 * @type {{setItem(*=, *=): void, getItem(*=): *, clear(): void, removeItem(*=): void, multiGet(*): *, multiRemove(*): void}}
 */

var session = {
  setItem: function setItem(key, value) {
    key = _keyPrefix + key;
    value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
  },
  getItem: function getItem(key) {
    key = _keyPrefix + key;
    var value = sessionStorage.getItem(key);
    return JSON.parse(value);
  },
  // ?????? keyPrefix ??????????????????
  clear: function clear() {
    var sessionStorageKeys = Object.keys(sessionStorage);

    if (sessionStorageKeys && sessionStorageKeys.length) {
      sessionStorageKeys.forEach(function (item) {
        if (item.startsWith(_keyPrefix)) {
          sessionStorage.removeItem(item);
        }
      });
    }
  },
  removeItem: function removeItem(key) {
    key = _keyPrefix + key;
    sessionStorage.removeItem(key);
  },
  multiGet: function multiGet(keys) {
    var _this3 = this;

    var values = {};
    keys.forEach(function (key) {
      return values[key] = _this3.getItem(key);
    });
    return values;
  },
  multiRemove: function multiRemove(keys) {
    var _this4 = this;

    keys.forEach(function (key) {
      return _this4.removeItem(key);
    });
  }
};
var globalStorage = {};
/**
 * ?????????????????????????????????????????????
 * @type {{setItem(*, *): void, getItem(*): *, clear(): void, removeItem(*): void, multiGet(*): *, multiRemove(*): void}}
 */

var global = {
  setItem: function setItem(key, value) {
    key = _keyPrefix + key;
    globalStorage[key] = value;
  },
  getItem: function getItem(key) {
    key = _keyPrefix + key;
    return globalStorage[key];
  },
  clear: function clear() {
    Object.keys(globalStorage).forEach(function (key) {
      if (key.startsWith(_keyPrefix)) {
        delete globalStorage[key];
      }
    });
  },
  removeItem: function removeItem(key) {
    key = _keyPrefix + key;
    delete globalStorage[key];
  },
  multiGet: function multiGet(keys) {
    var _this5 = this;

    var values = {};
    keys.forEach(function (key) {
      return values[key] = _this5.getItem(key);
    });
    return values;
  },
  multiRemove: function multiRemove(keys) {
    var _this6 = this;

    keys.forEach(function (key) {
      return _this6.removeItem(key);
    });
  }
};

var storage = /*#__PURE__*/Object.freeze({
    __proto__: null,
    init: init$1,
    local: local,
    session: session,
    global: global
});

function domEvent() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$addPropName = _ref.addPropName,
      addPropName = _ref$addPropName === void 0 ? 'addEventListener' : _ref$addPropName,
      _ref$removePropName = _ref.removePropName,
      removePropName = _ref$removePropName === void 0 ? 'removeEventListener' : _ref$removePropName;

  return function (WrappedComponent) {
    var WithDomEvent = /*#__PURE__*/function (_Component) {
      _inherits(WithDomEvent, _Component);

      var _super = _createSuper(WithDomEvent);

      function WithDomEvent(props) {
        var _this;

        _classCallCheck(this, WithDomEvent);

        _this = _super.call(this, props);
        _this._addedEvents = [];

        _this[addPropName] = function (element, type, handler) {
          _this._addedEvents.push({
            element: element,
            type: type,
            handler: handler
          });

          addEventListener(element, type, handler);
        };

        _this[removePropName] = function (element, type, handler) {
          removeEventListener(element, type, handler);
        };

        return _this;
      }

      _createClass(WithDomEvent, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          // ?????????????????????????????????????????????????????????
          this._addedEvents.forEach(function (item) {
            var element = item.element,
                type = item.type,
                handler = item.handler;
            removeEventListener(element, type, handler);
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _injectProps;

          var injectProps = (_injectProps = {}, _defineProperty(_injectProps, addPropName, this[addPropName]), _defineProperty(_injectProps, removePropName, this[removePropName]), _injectProps);
          return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, injectProps, this.props));
        }
      }]);

      return WithDomEvent;
    }(Component);

    WithDomEvent.displayName = "WithDomEvent(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")");
    return WithDomEvent;
  };
}

/**
 * ????????????????????????
 * ???subscribe publish ???????????????????????????props??????????????????????????????this.props.on(topic, callback)??????????????????;
 * ??????on ?????????????????????????????????????????????componentWillUnmount????????????????????????????????????
 * @example
 * import {event} from 'path/to/utils/react-hoc';
 * // ??????????????????
 * // @event()
 * // class SomeComponent extends Component {...}
 *
 * // ??????????????????????????????props??????
 * // @event({subscribePropName = '$on'}) // ??????????????????this.props.$on
 * // class SomeComponent extends Component {...}
 *
 * @example
 * // ????????????
 * import {event} from 'path/to/utils/react-hoc';
 * const WrappedComponent = event()(SomeComponent);
 *
 * @module ????????????????????????
 */

function event() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$subscribePropNam = _ref.subscribePropName,
      subscribePropName = _ref$subscribePropNam === void 0 ? 'subscribe' : _ref$subscribePropNam,
      _ref$publishPropName = _ref.publishPropName,
      publishPropName = _ref$publishPropName === void 0 ? 'publish' : _ref$publishPropName;

  return function (WrappedComponent) {
    var WithPubSub = /*#__PURE__*/function (_Component) {
      _inherits(WithPubSub, _Component);

      var _super = _createSuper(WithPubSub);

      function WithPubSub(props) {
        var _this;

        _classCallCheck(this, WithPubSub);

        _this = _super.call(this, props);
        _this._channel = v4();
        _this.tokens = [];

        _this[subscribePropName] = function (topic, fn) {
          // subscribe??????
          var token = PubSub.subscribe(topic, fn);

          _this.tokens.push(token);

          return token;
        };

        _this[publishPropName] = function (topic, args) {
          // publish??????
          PubSub.publish(topic, args);
        };

        return _this;
      }

      _createClass(WithPubSub, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          // ??????????????????????????????????????????????????????????????????
          this.tokens.forEach(function (token) {
            PubSub.unsubscribe(token);
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _injectProps;

          var injectProps = (_injectProps = {}, _defineProperty(_injectProps, subscribePropName, this[subscribePropName]), _defineProperty(_injectProps, publishPropName, this[publishPropName]), _injectProps);
          return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, injectProps, this.props));
        }
      }]);

      return WithPubSub;
    }(Component);

    WithPubSub.displayName = "WithPubSub(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")");
    return WithPubSub;
  };
}

var hocQuery = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$propName = _ref.propName,
      propName = _ref$propName === void 0 ? 'query' : _ref$propName;

  return function (WrappedComponent) {
    var WithQuery = /*#__PURE__*/function (_Component) {
      _inherits(WithQuery, _Component);

      var _super = _createSuper(WithQuery);

      function WithQuery(props) {
        var _this;

        _classCallCheck(this, WithQuery);

        _this = _super.call(this, props);
        var search = queryString.parse(window.location.search, {
          ignoreQueryPrefix: true
        });
        _this.query = search || {};
        return _this;
      }

      _createClass(WithQuery, [{
        key: "render",
        value: function render() {
          var injectProps = _defineProperty({}, propName, this.query);

          return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, injectProps, this.props));
        }
      }]);

      return WithQuery;
    }(Component);

    WithQuery.displayName = "WithQuery(".concat(WrappedComponent.displayName || WrappedComponent.name || 'Component', ")");
    return WithQuery;
  };
});

/**
 *  modal???????????????????????????????????????????????????????????????
 *  ??????modal????????????????????????????????????????????????????????????
 *
 * @param options ???????????????????????????
 *      string???modal ??? title
 *      function??????????????? modal ???options
 *      object???Modal???????????????????????????????????????antd Modal??????
 *          title: string | ReactNode | function(props)
 *          fullScreen: boolean ??????????????????modal
 *          ?????? ant Modal ??????
 *
 * @param options
 * @returns {function(*): {displayName, new(): ModalComponent, prototype: ModalComponent}}
 */

var model$1 = (function (options) {
  return function (WrappedComponent) {
    var _class, _temp;

    var componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    return _temp = _class = /*#__PURE__*/function (_Component) {
      _inherits(ModalComponent, _Component);

      var _super = _createSuper(ModalComponent);

      function ModalComponent() {
        _classCallCheck(this, ModalComponent);

        return _super.apply(this, arguments);
      }

      _createClass(ModalComponent, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              visible = _this$props.visible,
              onCancel = _this$props.onCancel,
              _this$props$top = _this$props.top,
              top = _this$props$top === void 0 ? 100 : _this$props$top,
              style = _this$props.style;
          var title;
          var others = {}; // options ???????????????????????????????????????

          if (typeof options === 'function') options = options(this.props); // options ?????????????????????????????????title

          if (typeof options === 'string') options = {
            title: options
          }; // options ????????????????????????title

          if (_typeof(options) === 'object') {
            title = options.title;
            others = options;
          } // ??????title???????????????????????????title


          if (typeof title === 'function') title = title(this.props);
          var _others = others,
              fullScreen = _others.fullScreen,
              _others$width = _others.width,
              width = _others$width === void 0 ? 800 : _others$width;
          var fstl = {
            top: top
          };

          if (fullScreen) {
            width = '100%';
            fstl = {
              top: 0,
              maxWidth: '100%',
              margin: 0,
              padding: 0
            };
          }

          var stl = _objectSpread2(_objectSpread2({}, style), fstl);

          return /*#__PURE__*/React.createElement(Modal, _extends({
            destroyOnClose: true,
            width: width,
            bodyStyle: {
              padding: 0
            },
            style: stl,
            footer: null,
            maskClosable: false
          }, others, {
            title: title,
            onCancel: onCancel,
            visible: visible
          }), /*#__PURE__*/React.createElement(WrappedComponent, this.props));
        }
      }]);

      return ModalComponent;
    }(Component), _class.displayName = "WithModal(".concat(componentName, ")"), _temp;
  };
});

/**
 * ??????????????????????????????????????????????????????
 * @param options
 * @returns {function(*): WithConfig}
 */

var createConfigHoc = (function (_ref) {
  var reduxConnect = _ref.connect,
      getLoginUser = _ref.getLoginUser,
      ajaxHoc = _ref.ajaxHoc;
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (WrappedComponent) {
      var _class, _class2, _temp;

      var _options$path = options.path,
          path = _options$path === void 0 ? void 0 : _options$path,
          _options$title = options.title,
          title = _options$title === void 0 ? true : _options$title,
          _options$breadcrumbs = options.breadcrumbs,
          breadcrumbs = _options$breadcrumbs === void 0 ? true : _options$breadcrumbs,
          _options$appendBreadc = options.appendBreadcrumbs,
          appendBreadcrumbs = _options$appendBreadc === void 0 ? [] : _options$appendBreadc,
          head = options.head,
          headFixed = options.headFixed,
          tabs = options.tabs,
          side = options.side,
          sideCollapsed = options.sideCollapsed,
          _options$router = options.router,
          router = _options$router === void 0 ? false : _options$router,
          _options$query = options.query,
          query = _options$query === void 0 ? false : _options$query,
          _options$ajax = options.ajax,
          ajax = _options$ajax === void 0 ? true : _options$ajax,
          _options$connect = options.connect,
          connect = _options$connect === void 0 ? false : _options$connect,
          _options$event = options.event,
          event$1 = _options$event === void 0 ? false : _options$event,
          _options$pubSub = options.pubSub,
          pubSub = _options$pubSub === void 0 ? false : _options$pubSub,
          _options$modal = options.modal,
          modal = _options$modal === void 0 ? false : _options$modal,
          _options$convertParam = options.convertParams,
          convertParams = _options$convertParam === void 0 ? true : _options$convertParam,
          _options$convertQuery = options.convertQuery,
          convertQuery = _options$convertQuery === void 0 ? true : _options$convertQuery;
      var hocFunctions = []; // ??????modal????????????

      if (modal) hocFunctions.push(model$1(modal));
      if (event$1) hocFunctions.push(domEvent());
      if (pubSub) hocFunctions.push(event());
      if (query === true) hocFunctions.push(hocQuery({
        convertQuery: convertQuery
      }));
      if (router === true) hocFunctions.push(withRouter);
      if (ajax === true) hocFunctions.push(ajaxHoc());
      hocFunctions.push(reduxConnect());
      if (connect === true) hocFunctions.push(reduxConnect());
      if (typeof connect === 'function') hocFunctions.push(reduxConnect(connect));
      var higherOrderComponents = compose(hocFunctions);
      var componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

      var WithConfig = higherOrderComponents(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inherits(WithConfig, _Component);

        var _super = _createSuper(WithConfig);

        function WithConfig() {
          var _this;

          _classCallCheck(this, WithConfig);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _super.call.apply(_super, [this].concat(args));

          _this.initFrame = function () {
            var layout = _this.props.action.layout; // path ????????????????????????????????????

            var isRoutePage = !!path; // ??????????????????

            if (title === false) {
              layout.setTitle('');
            }

            if (title && title !== true) {
              var nextTitle = title;

              if (typeof title === 'function') {
                nextTitle = title(_this.props);
              }

              layout.setTitle(nextTitle); // ????????????????????????????????????????????????timeout

              setTimeout(function () {
                return layout.setCurrentTabTitle(nextTitle);
              }, 100);
            } // ?????????????????????


            if (breadcrumbs === false) {
              layout.setBreadcrumbs([]);
            }

            if (breadcrumbs && breadcrumbs !== true) {
              var nextBreadcrumbs = breadcrumbs;

              if (typeof breadcrumbs === 'function') {
                nextBreadcrumbs = breadcrumbs(_this.props);
              }

              layout.setBreadcrumbs(nextBreadcrumbs);
            }

            if (Array.isArray(appendBreadcrumbs) && appendBreadcrumbs.length) {
              layout.appendBreadcrumbs(appendBreadcrumbs);
            }

            if (typeof appendBreadcrumbs === 'function') {
              var nextAppendBreadcrumbs = appendBreadcrumbs(_this.props);
              layout.appendBreadcrumbs(nextAppendBreadcrumbs);
            } // ????????????????????????


            if (head !== undefined) {
              head ? layout.showHead() : layout.hideHead();
            } else if (isRoutePage) {
              layout.setShowHeadToDefault();
            } // ????????????????????????


            if (tabs !== undefined) {
              layout.showTabs(tabs);
            } else if (isRoutePage) {
              layout.setShowTabsToDefault();
            } // ????????????????????????


            if (headFixed !== undefined) {
              layout.setHeadFixed(headFixed);
            } else if (isRoutePage) {
              layout.setHeadFixedToDefault();
            } // ????????????????????????


            if (side !== undefined) {
              side ? layout.showSide() : layout.hideSide();
            } else if (isRoutePage) {
              // ?????????????????????side?????????????????????
              layout.setShowSideToDefault();
            } // ????????????????????????


            if (sideCollapsed !== undefined) {
              layout.setSideCollapsed(sideCollapsed);
            }
          };

          _this.initFrame();

          return _this;
        }

        _createClass(WithConfig, [{
          key: "componentDidMount",
          value: function componentDidMount() {
            var _this$props, _this$props$match;

            // ??????????????????????????????????????? ???????????????????????????id???????????????
            var params = this === null || this === void 0 ? void 0 : (_this$props = this.props) === null || _this$props === void 0 ? void 0 : (_this$props$match = _this$props.match) === null || _this$props$match === void 0 ? void 0 : _this$props$match.params;

            if (convertParams && params) {
              Object.entries(params).forEach(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 2),
                    key = _ref3[0],
                    value = _ref3[1];

                if (key.toLowerCase().endsWith('id') && /^[1-9][0-9]*$/.test(value)) params[key] = Number(value);
              });
            }
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {} // ??????????????????????????????

        }, {
          key: "render",
          value: function render() {
            var _this$props2, _this$props2$match;

            var user = getLoginUser() || {};
            var params = this === null || this === void 0 ? void 0 : (_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : (_this$props2$match = _this$props2.match) === null || _this$props2$match === void 0 ? void 0 : _this$props2$match.params;

            if (convertParams && params) {
              Object.entries(params).forEach(function (_ref4) {
                var _ref5 = _slicedToArray(_ref4, 2),
                    key = _ref5[0],
                    value = _ref5[1];

                if (key.toLowerCase().endsWith('id') && /^[1-9][0-9]*$/.test(value)) params[key] = Number(value);
              });
            }

            return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, this.props, {
              user: user
            }));
          }
        }]);

        return WithConfig;
      }(Component), _class2.displayName = "WithConfig(".concat(componentName, ")"), _temp)) || _class;

      return WithConfig;
    };
  };
});

/**
 * Modal ????????????????????????????????????????????????????????????????????????
 */

var ModalContent = /*#__PURE__*/function (_Component) {
  _inherits(ModalContent, _Component);

  var _super = _createSuper(ModalContent);

  function ModalContent() {
    var _this;

    _classCallCheck(this, ModalContent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      height: 'auto'
    };

    _this.handleWindowResize = function () {
      var prefixCls = _this.context.getPrefixCls();

      var _this$props = _this.props,
          otherHeight = _this$props.otherHeight,
          fullScreen = _this$props.fullScreen;
      if (fullScreen && otherHeight === undefined) otherHeight = 55;
      var windowHeight = document.documentElement.clientHeight;

      if (!otherHeight) {
        var top = getElementTop(_this.wrapper);
        var bottom = 24;
        var antModalDom = getParentByClassName(_this.wrapper, "".concat(prefixCls, "-modal"));

        if (antModalDom) {
          var classList = Array.from(antModalDom.classList);
          var isFullScreen = classList.find(function (item) {
            return item.startsWith('full-screen');
          });
          if (isFullScreen) bottom = 0;
        }

        otherHeight = top + bottom;
      }

      var height = windowHeight - otherHeight;

      _this.setState({
        height: height
      });
    };

    return _this;
  }

  _createClass(ModalContent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          surplusSpace = _this$props2.surplusSpace,
          fullScreen = _this$props2.fullScreen;

      if (surplusSpace || fullScreen) {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this$props3 = this.props,
          surplusSpace = _this$props3.surplusSpace,
          fullScreen = _this$props3.fullScreen;
      if (surplusSpace || fullScreen) window.removeEventListener('resize', this.handleWindowResize);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          surplusSpace = _this$props4.surplusSpace,
          fullScreen = _this$props4.fullScreen,
          loading = _this$props4.loading,
          loadingTip = _this$props4.loadingTip,
          otherHeight = _this$props4.otherHeight,
          style = _this$props4.style,
          bodyStyle = _this$props4.bodyStyle,
          footer = _this$props4.footer,
          okHtmlType = _this$props4.okHtmlType,
          okText = _this$props4.okText,
          resetText = _this$props4.resetText,
          cancelText = _this$props4.cancelText,
          onOk = _this$props4.onOk,
          onCancel = _this$props4.onCancel,
          onReset = _this$props4.onReset,
          children = _this$props4.children,
          others = _objectWithoutProperties(_this$props4, ["surplusSpace", "fullScreen", "loading", "loadingTip", "otherHeight", "style", "bodyStyle", "footer", "okHtmlType", "okText", "resetText", "cancelText", "onOk", "onCancel", "onReset", "children"]);

      var height = this.state.height;
      var prefixCls = this.context.getPrefixCls();
      return /*#__PURE__*/React.createElement(Spin, {
        spinning: loading,
        tip: loadingTip
      }, /*#__PURE__*/React.createElement("div", _extends({
        className: "modal-content",
        ref: function ref(node) {
          return _this2.wrapper = node;
        },
        style: _objectSpread2({
          display: 'flex',
          flexDirection: 'column',
          height: height
        }, style)
      }, others), /*#__PURE__*/React.createElement("div", {
        className: "modal-content-inner",
        style: _objectSpread2({
          flex: 1,
          padding: 16,
          overflow: surplusSpace || fullScreen ? 'auto' : ''
        }, bodyStyle)
      }, children), footer !== false ? /*#__PURE__*/React.createElement("div", {
        className: "".concat(prefixCls, "-modal-footer"),
        style: {
          flex: 0
        }
      }, footer ? footer : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        type: "primary",
        onClick: onOk,
        htmlType: okHtmlType
      }, okText), onReset ? /*#__PURE__*/React.createElement(Button, {
        onClick: onReset
      }, resetText) : null, /*#__PURE__*/React.createElement(Button, {
        onClick: onCancel
      }, cancelText))) : null));
    }
  }]);

  return ModalContent;
}(Component);

ModalContent.contextType = ConfigProvider.ConfigContext;
ModalContent.propTypes = {
  fullScreen: PropTypes.bool,
  surplusSpace: PropTypes.bool,
  // ??????????????????????????????
  otherHeight: PropTypes.number,
  // ?????????????????????????????????????????????????????????????????????
  loading: PropTypes.bool,
  // ???????????????
  loadingTip: PropTypes.any,
  // ?????????????????????
  footer: PropTypes.any,
  // ??????
  okHtmlType: PropTypes.any,
  // ??????????????????
  okText: PropTypes.any,
  // ??????????????????
  onOk: PropTypes.func,
  // ????????????
  cancelText: PropTypes.any,
  // ??????????????????
  onCancel: PropTypes.func,
  // ????????????
  resetText: PropTypes.any,
  // ??????????????????
  onReset: PropTypes.func,
  // ??????????????????
  style: PropTypes.object,
  // ?????????????????????
  bodyStyle: PropTypes.object // ??????????????????

};
ModalContent.defaultProps = {
  loading: false,
  style: {},
  bodyStyle: {},
  surplusSpace: false,
  okText: '??????',
  okHtmlType: '',
  resetText: '??????',
  cancelText: '??????',
  onOk: function onOk() {
    return void 0;
  },
  onCancel: function onCancel() {
    return void 0;
  }
};

var warning = (function (valid, component, message) {
  warning$1(valid, '[antd-compatible: '.concat(component, '] ').concat(message));
});

var fillTester = /-fill$/;
var outlineTester = /-o$/;
var twoToneTester = /-twotone$/;
function getThemeFromTypeName(type) {
  var result = null;

  if (fillTester.test(type)) {
    result = 'filled';
  } else if (outlineTester.test(type)) {
    result = 'outlined';
  } else if (twoToneTester.test(type)) {
    result = 'twoTone';
  }

  return result;
}
function removeTypeTheme(type) {
  return type.replace(fillTester, '').replace(outlineTester, '').replace(twoToneTester, '');
}
var themeMap = {
  filled: 'filled',
  outlined: 'outlined',
  twoTone: 'twoTone'
};
function withThemeSuffix(type, theme) {
  var result = upperFirst(camelCase(type));
  var realTheme = upperFirst(themeMap[theme]);

  if (theme !== 'outlined' && !realTheme) {
    warning(false, 'Icon', 'This icon \''.concat(type, '\' has unknown theme \'').concat(theme, '\''));
  }

  return result + realTheme;
} // For alias or compatibility

function alias(type) {
  var newType = type;

  switch (type) {
    case 'cross':
      newType = 'close';
      break;
    // https://github.com/ant-design/ant-design/issues/13007

    case 'interation':
      newType = 'interaction';
      break;
    // https://github.com/ant-design/ant-design/issues/16810

    case 'canlendar':
      newType = 'calendar';
      break;
    // https://github.com/ant-design/ant-design/issues/17448

    case 'colum-height':
      newType = 'column-height';
      break;
  }

  warning(newType === type, 'Icon', 'Icon \''.concat(type, '\' was a typo and is now deprecated, please use \'').concat(newType, '\' instead.'));
  return newType;
}

var iconsMap = allIcons;

function LegacyTypeIcon(props) {
  var type = props.type;
  var theme = props.theme; // ???????????? AppstoreOutlined ???????????????type

  var targetIconComponent = iconsMap[type];

  if (targetIconComponent) {
    return targetIconComponent ? /*#__PURE__*/React.createElement(targetIconComponent, props) : null;
  }

  if (theme) {
    var themeInName = getThemeFromTypeName(type);
    warning(!themeInName || theme === themeInName, 'Icon', 'The icon name \''.concat(type, '\' already specify a theme \'').concat(themeInName, '\',') + ' the \'theme\' prop \''.concat(theme, '\' will be ignored.'));
  } // antd 3 ??????????????????type: appstore


  var computedType = withThemeSuffix(removeTypeTheme(alias(type)), theme || 'outlined');
  targetIconComponent = iconsMap[computedType];
  warning(targetIconComponent, 'Icon', 'The icon name \''.concat(type, '\'').concat(theme ? 'with '.concat(theme) : '', ' doesn\'t exist, please check it at https://ant.design/components/icon'));
  return targetIconComponent ? /*#__PURE__*/React.createElement(targetIconComponent, props) : null;
}

function Icon(props) {
  var type = props.type,
      component = props.component,
      children = props.children;
  warning(Boolean(type || component || children), 'Icon', 'Should have `type` prop or `component` prop or `children`.');

  if (component || children) {
    return /*#__PURE__*/React.createElement(AntdIcon, Object.assign({}, props));
  }

  if (typeof type === 'string') {
    return /*#__PURE__*/React.createElement(LegacyTypeIcon, Object.assign({}, props, {
      type: type
    }));
  }

  return /*#__PURE__*/React.createElement(AntdIcon, null);
}

Icon.propTypes = {
  /** @ant-design/icons AppstoreOutlined  antd3.x appstore */
  type: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};
Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".style-module_breadcrumb__4Rlie .font-icon {\n  margin-right: 8px;\n}\n.system-breadcrumb-dark {\n  color: #fff;\n}\n.system-breadcrumb-dark * {\n  color: #fff !important;\n}\n";
var styles = {"breadcrumb":"style-module_breadcrumb__4Rlie"};
styleInject(css_248z);

var Item = Breadcrumb.Item;

var BreadcrumbComponent = /*#__PURE__*/function (_Component) {
  _inherits(BreadcrumbComponent, _Component);

  var _super = _createSuper(BreadcrumbComponent);

  function BreadcrumbComponent() {
    _classCallCheck(this, BreadcrumbComponent);

    return _super.apply(this, arguments);
  }

  _createClass(BreadcrumbComponent, [{
    key: "renderItems",
    value: function renderItems() {
      var dataSource = this.props.dataSource;
      var iconStyle = {
        marginRight: 4
      };

      if (dataSource && dataSource.length) {
        return dataSource.map(function (_ref) {
          var key = _ref.key,
              icon = _ref.icon,
              text = _ref.text,
              path = _ref.path;

          if (path) {
            return /*#__PURE__*/React.createElement(Item, {
              key: key
            }, /*#__PURE__*/React.createElement(Link, {
              to: path
            }, icon ? /*#__PURE__*/React.createElement(Icon, {
              type: icon,
              style: iconStyle
            }) : null, text));
          }

          return /*#__PURE__*/React.createElement(Item, {
            key: key
          }, icon ? /*#__PURE__*/React.createElement(Icon, {
            type: icon,
            style: iconStyle
          }) : null, text);
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var theme = this.props.theme;
      return /*#__PURE__*/React.createElement("div", {
        className: [styles.breadcrumb, "system-breadcrumb-".concat(theme)].join(' ')
      }, /*#__PURE__*/React.createElement(Breadcrumb, null, this.renderItems()));
    }
  }]);

  return BreadcrumbComponent;
}(Component);

BreadcrumbComponent.propTypes = {
  dataSource: PropTypes.array // ?????????

};
BreadcrumbComponent.defaultProps = {
  dataSource: []
};

var css_248z$1 = ".style-module_pageHeader__YOP55 {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  background: #fff;\n  height: 45px;\n  padding: 0 16px;\n  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);\n}\n.style-module_pageHeader__YOP55 h1 {\n  display: inline-block;\n  margin: 0;\n  font-size: 16px;\n  padding: 0;\n  font-weight: normal;\n}\n.style-module_breadcrumb__19smY {\n  float: right;\n  margin-top: 4px;\n}\n";
var styles$1 = {"pageHeader":"style-module_pageHeader__YOP55","breadcrumb":"style-module_breadcrumb__19smY"};
styleInject(css_248z$1);

var PageHead = /*#__PURE__*/function (_Component) {
  _inherits(PageHead, _Component);

  var _super = _createSuper(PageHead);

  function PageHead() {
    _classCallCheck(this, PageHead);

    return _super.apply(this, arguments);
  }

  _createClass(PageHead, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          breadcrumbs = _this$props.breadcrumbs;
      title = _typeof(title) === 'object' ? title.text : title;
      return /*#__PURE__*/React.createElement("div", {
        className: styles$1.pageHeader
      }, isMobile ? null : /*#__PURE__*/React.createElement("h1", null, title), /*#__PURE__*/React.createElement("div", {
        className: styles$1.breadcrumb
      }, /*#__PURE__*/React.createElement(BreadcrumbComponent, {
        dataSource: breadcrumbs
      })));
    }
  }]);

  return PageHead;
}(Component);

PageHead.propTypes = {
  title: PropTypes.any,
  breadcrumbs: PropTypes.array
};
PageHead.defaultProps = {
  title: '',
  breadcrumbs: []
};

var logo = "data:image/png;base64,";

var css_248z$2 = ".style-module_logo__1ojDc {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding-left: 24px;\n  height: 100%;\n  width: 100%;\n}\n.style-module_logo__1ojDc img {\n  height: 28px;\n}\n.style-module_logo__1ojDc h1 {\n  padding: 0;\n  font-size: 20px;\n  margin: 0 0 0 12px;\n  font-weight: 600;\n  white-space: nowrap;\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n  -webkit-transform-origin: left;\n      -ms-transform-origin: left;\n          transform-origin: left;\n  -webkit-transform: scale(1);\n      -ms-transform: scale(1);\n          transform: scale(1);\n  font-family: Impact;\n  letter-spacing: 2px;\n  color: #fff;\n}\n.style-module_logo__1ojDc .style-module_titleHide__1Mml1 {\n  -webkit-transform: scale(0);\n      -ms-transform: scale(0);\n          transform: scale(0);\n}\n";
var styles$2 = {"logo":"style-module_logo__1ojDc","titleHide":"style-module_titleHide__1Mml1"};
styleInject(css_248z$2);

var Logo = /*#__PURE__*/function (_Component) {
  _inherits(Logo, _Component);

  var _super = _createSuper(Logo);

  function Logo() {
    _classCallCheck(this, Logo);

    return _super.apply(this, arguments);
  }

  _createClass(Logo, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          min = _this$props.min,
          title = _this$props.title,
          logo = _this$props.logo,
          others = _objectWithoutProperties(_this$props, ["min", "title", "logo"]);

      return /*#__PURE__*/React.createElement("div", {
        className: styles$2.logo
      }, /*#__PURE__*/React.createElement("img", {
        src: logo,
        alt: "logo"
      }), /*#__PURE__*/React.createElement("h1", _extends({}, others, {
        className: min ? styles$2.titleHide : ''
      }), title));
    }
  }]);

  return Logo;
}(Component);

Logo.propTypes = {
  min: PropTypes.bool
};
Logo.defaultProps = {
  logo: logo,
  title: 'React Web',
  min: false
};

var css_248z$3 = ".style-module_headerMenu__1Tp5z {\n  display: block;\n  height: 100%;\n}\n.style-module_headerMenu__1Tp5z .ant-menu {\n  border-color: transparent;\n}\n.style-module_headerMenu__1Tp5z .ant-menu > li {\n  padding: 0 16px !important;\n  margin: 0 0 !important;\n  color: #fff;\n}\n.style-module_headerMenu__1Tp5z .ant-menu > li > .ant-menu-submenu-title,\n.style-module_headerMenu__1Tp5z .ant-menu > li > a {\n  color: #fff;\n}\n.style-module_headerMenu__1Tp5z .ant-menu > li.ant-menu-item-selected,\n.style-module_headerMenu__1Tp5z .ant-menu > li.ant-menu-submenu-selected,\n.style-module_headerMenu__1Tp5z .ant-menu > li:hover {\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n.style-module_headerMenu__1Tp5z .ant-menu > li.ant-menu-item-selected a,\n.style-module_headerMenu__1Tp5z .ant-menu > li.ant-menu-submenu-selected a,\n.style-module_headerMenu__1Tp5z .ant-menu > li:hover a {\n  color: #fff;\n}\n.style-module_headerMenu__1Tp5z .portal-menu {\n  border-color: transparent;\n}\n.style-module_headerMenu__1Tp5z .portal-menu > li {\n  padding: 0 16px !important;\n  margin: 0 0 !important;\n  color: #fff;\n}\n.style-module_headerMenu__1Tp5z .portal-menu > li > .portal-menu-submenu-title,\n.style-module_headerMenu__1Tp5z .portal-menu > li > a {\n  color: #fff;\n}\n.style-module_headerMenu__1Tp5z .portal-menu > li.portal-menu-item-selected,\n.style-module_headerMenu__1Tp5z .portal-menu > li.portal-menu-submenu-selected,\n.style-module_headerMenu__1Tp5z .portal-menu > li:hover {\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n.style-module_headerMenu__1Tp5z .portal-menu > li.portal-menu-item-selected a,\n.style-module_headerMenu__1Tp5z .portal-menu > li.portal-menu-submenu-selected a,\n.style-module_headerMenu__1Tp5z .portal-menu > li:hover a {\n  color: #fff;\n}\n";
var styles$3 = {"headerMenu":"style-module_headerMenu__1Tp5z"};
styleInject(css_248z$3);

var SubMenu = Menu.SubMenu;

var HeaderMenu = /*#__PURE__*/function (_Component) {
  _inherits(HeaderMenu, _Component);

  var _super = _createSuper(HeaderMenu);

  function HeaderMenu() {
    _classCallCheck(this, HeaderMenu);

    return _super.apply(this, arguments);
  }

  _createClass(HeaderMenu, [{
    key: "renderMenus",
    value: function renderMenus() {
      var dataSource = this.props.dataSource;
      if (dataSource && dataSource.length) {
        return renderNode(dataSource, function (item, children) {
          var key = item.key,
              path = item.path,
              text = item.text,
              icon = item.icon,
              target = item.target,
              url = item.url;
          var title = /*#__PURE__*/React.createElement("span", null, text);
          if (icon) title = /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
            type: icon
          }), /*#__PURE__*/React.createElement("span", null, text));

          if (children) {
            return /*#__PURE__*/React.createElement(SubMenu, {
              key: key,
              title: title
            }, children);
          }

          return /*#__PURE__*/React.createElement(Menu.Item, {
            key: key
          }, target ? /*#__PURE__*/React.createElement("a", {
            href: url,
            target: target
          }, title) : /*#__PURE__*/React.createElement(Link, {
            to: {
              pathname: path,
              state: {
                from: 'menu'
              }
            }
          }, title));
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          selectedKeys = _this$props.selectedKeys;
      return /*#__PURE__*/React.createElement("div", {
        className: styles$3.headerMenu
      }, /*#__PURE__*/React.createElement(Menu, {
        selectedKeys: selectedKeys,
        mode: "horizontal",
        theme: theme
      }, this.renderMenus()));
    }
  }]);

  return HeaderMenu;
}(Component);

HeaderMenu.propTypes = {
  dataSource: PropTypes.array,
  // ????????????
  theme: PropTypes.string,
  // ??????
  selectedKeys: PropTypes.array // ????????????keys

};
HeaderMenu.defaultProps = {
  dataSource: [],
  theme: 'default',
  selectedKeys: []
};

var PAGE_FRAME_LAYOUT = {
  TOP_SIDE_MENU: 'top-side-menu',
  TOP_MENU: 'top-menu',
  SIDE_MENU: 'side-menu'
}; // ???????????????????????????syncState??????????????????????????????????????????????????????????????????????????????????????????

var setItem = function setItem(key, value) {
  return window.localStorage.setItem(key, value);
};

var persistTab = process.env.REACT_APP_PERSIST_TAB !== 'false';
var INIT_WIDTH = 256;
var model$2 = {
  initialState: {
    theme: 'default',
    appName: 'React Admin',
    breadcrumbs: [],
    // ??????????????? [{key, text, path}]
    title: '',
    // ??????title {text, icon}
    showHead: false,
    // ????????????????????????
    headFixed: true,
    // ????????????????????????
    loading: false,
    loadingTip: '',
    showSide: true,
    sideWidth: INIT_WIDTH,
    // ?????????????????????
    sideCurrentWidth: INIT_WIDTH,
    // ??????????????????
    sideCollapsedWidth: 80,
    // ???????????????
    sideCollapsed: false,
    // ????????????/??????
    sideDragging: false,
    // ??????????????????
    openKeys: [],
    // ??????????????????keys
    selectedMenu: null,
    // ??????????????????
    topMenu: [],
    // ?????????????????????????????????
    keepOtherMenuOpen: true,
    // ????????????????????????????????????????????????????????????
    menus: [],
    // ???????????????????????????
    plainMenus: [],
    // ????????????????????????
    loginUser: void 0,
    // ??????????????????
    permissions: [],
    // ???????????????????????? [code, code, ...]
    userPaths: [],
    // ?????????????????????????????????path?????????????????????????????????????????????????????????[path, path, ...]
    primaryColor: '#a054d3',
    // ???????????????
    keepAlive: false,
    // ????????????????????????????????????????????????????????????div????????????????????????????????????????????????????????????????????????
    noFrame: false,
    // ?????????????????????????????????????????????????????????????????????????????????
    isMobile: isMobile,
    pageFrameLayout: isMobile ? PAGE_FRAME_LAYOUT.SIDE_MENU : PAGE_FRAME_LAYOUT.SIDE_MENU,
    tabs: [],
    // ?????????tab?????? {path, text, icon, component, active, scrollTop}
    showTabs: false,
    // ????????????
    defaultShowSide: true,
    defaultShowHead: false,
    defaultHeadFixed: false,
    defaultShowTabs: false
  },
  syncStorage: {
    sideWidth: true,
    sideCurrentWidth: true,
    sideCollapsed: true,
    openKeys: true,
    selectedMenu: true,
    topMenu: true,
    keepOtherMenuOpen: true,
    keepAlive: true,
    tabs: persistTab ? [{
      path: true,
      text: true,
      icon: true,
      active: true,
      scrollTop: true
    }] : false,
    pageFrameLayout: true,
    showTabs: true,
    defaultShowSide: true,
    defaultShowHead: true,
    defaultHeadFixed: true,
    defaultShowTabs: true
  },
  setAntdPrefixCls: function setAntdPrefixCls(antdPrefixCls) {
    return {
      antdPrefixCls: antdPrefixCls
    };
  },
  setDefaultShowSide: function setDefaultShowSide(defaultShowSide) {
    return {
      defaultShowSide: defaultShowSide
    };
  },
  setShowSideToDefault: function setShowSideToDefault(arg, state) {
    var sideCurrentWidth = state.sideCollapsed ? state.sideCollapsedWidth : state.sideWidth;
    sideCurrentWidth = state.defaultShowSide ? sideCurrentWidth : 0;
    return {
      showSide: state.defaultShowSide,
      sideCurrentWidth: sideCurrentWidth
    };
  },
  setDefaultShowHead: function setDefaultShowHead(defaultShowHead) {
    return {
      defaultShowHead: defaultShowHead
    };
  },
  setShowHeadToDefault: function setShowHeadToDefault(arg, state) {
    return {
      showHead: state.defaultShowHead
    };
  },
  setDefaultHeadFixed: function setDefaultHeadFixed(defaultHeadFixed) {
    return {
      defaultHeadFixed: defaultHeadFixed
    };
  },
  setHeadFixedToDefault: function setHeadFixedToDefault(arg, state) {
    return {
      headFixed: state.defaultHeadFixed
    };
  },
  setDefaultShowTabs: function setDefaultShowTabs(defaultShowTabs) {
    return {
      defaultShowTabs: defaultShowTabs
    };
  },
  setShowTabsToDefault: function setShowTabsToDefault(arg, state) {
    return {
      showTabs: state.defaultShowTabs
    };
  },
  setHeadFixed: function setHeadFixed(headFixed) {
    return {
      headFixed: headFixed
    };
  },
  showHead: function showHead() {
    return {
      showHead: true
    };
  },
  hideHead: function hideHead() {
    return {
      showHead: false
    };
  },
  setTitle: function setTitle(title) {
    return {
      title: title
    };
  },
  setBreadcrumbs: function setBreadcrumbs(breadcrumbs) {
    return {
      breadcrumbs: breadcrumbs
    };
  },
  appendBreadcrumbs: function appendBreadcrumbs(_appendBreadcrumbs, state) {
    var _state$breadcrumbs = state.breadcrumbs,
        breadcrumbs = _state$breadcrumbs === void 0 ? [] : _state$breadcrumbs;
    breadcrumbs = breadcrumbs.concat(_appendBreadcrumbs);
    return {
      breadcrumbs: breadcrumbs
    };
  },
  showLoading: function showLoading(loadingTip) {
    return {
      loading: true,
      loadingTip: loadingTip
    };
  },
  hideLoading: function hideLoading() {
    return {
      loading: false,
      loadingTip: ''
    };
  },
  setSideDragging: function setSideDragging(sideDragging) {
    return {
      sideDragging: sideDragging
    };
  },
  hideSide: function hideSide() {
    // ???????????????????????????????????????
    if (isMobile) {
      return {
        showSide: true
      };
    }

    return {
      showSide: false,
      sideCurrentWidth: 0
    };
  },
  showSide: function showSide(args, state) {
    var sideCurrentWidth = state.sideCollapsed ? state.sideCollapsedWidth : state.sideWidth;
    return {
      showSide: true,
      sideCurrentWidth: sideCurrentWidth
    };
  },
  setSideWidth: function setSideWidth(sideWidth, state) {
    var sideCurrentWidth = state.sideCollapsed ? state.sideCollapsedWidth : sideWidth;
    if (!state.showSide) sideCurrentWidth = 0;
    return {
      sideWidth: sideWidth,
      sideCurrentWidth: sideCurrentWidth
    };
  },
  initSideWidth: function initSideWidth(args, state) {
    var sideCurrentWidth = state.sideCollapsed ? state.sideCollapsedWidth : INIT_WIDTH;
    if (!state.showSide) sideCurrentWidth = 0;
    return {
      sideWidth: INIT_WIDTH,
      sideCurrentWidth: sideCurrentWidth
    };
  },
  setSideCollapsed: function setSideCollapsed(sideCollapsed, state) {
    var sideCurrentWidth = sideCollapsed ? state.sideCollapsedWidth : state.sideWidth;
    if (!state.showSide) sideCurrentWidth = 0;
    return {
      sideCollapsed: sideCollapsed,
      sideCurrentWidth: sideCurrentWidth
    };
  },
  setKeepOtherMenuOpen: function setKeepOtherMenuOpen(keepOtherMenuOpen) {
    return {
      keepOtherMenuOpen: keepOtherMenuOpen
    };
  },
  setOpenKeys: function setOpenKeys(openKeys) {
    return {
      openKeys: openKeys
    };
  },
  setMenus: function setMenus(menus) {
    return {
      menus: menus
    };
  },
  setPlainMenus: function setPlainMenus(plainMenus) {
    return {
      plainMenus: plainMenus
    };
  },
  getMenuStatus: function getMenuStatus(arg, state) {
    
    var path = window.location.pathname;
    var keepOtherMenuOpen = state.keepOtherMenuOpen;

    var openKeys = _toConsumableArray(state.openKeys);

    var selectedMenu = getSelectedMenuByPath(path, state.menus);
    console.log(selectedMenu)
    var topMenu = {}; // ?????????????????????????????????????????????
    
    if (!selectedMenu && path !== `${preRouter}`) {
      // ????????????
      selectedMenu = state.selectedMenu;
    }

    if (selectedMenu) {
      topMenu = getTopNodeByNode(state.menus, selectedMenu);
      var parentKeys = selectedMenu.parentKeys || [];
      openKeys = keepOtherMenuOpen ? openKeys.concat(parentKeys) : _toConsumableArray(parentKeys);
      openKeys = uniqueArray$1(openKeys);
    }
    return {
      topMenu: topMenu,
      selectedMenu: selectedMenu,
      openKeys: openKeys
    };
  },
  setKeepPage: function setKeepPage(keepAlive) {
    return {
      keepAlive: keepAlive
    };
  },
  showTabs: function showTabs(_showTabs) {
    return {
      showTabs: _showTabs
    };
  },
  setTabs: function setTabs(tabs) {
    return {
      tabs: tabs
    };
  },
  setCurrentTabTitle: function setCurrentTabTitle(title, state) {
    var tabs = _toConsumableArray(state.tabs);

    var tab = tabs.find(function (item) {
      return item.active;
    });

    if (tab) {
      if (typeof title === 'string') {
        tab.text = title;
      }

      if (_typeof(title) === 'object') {
        tab.text = (title === null || title === void 0 ? void 0 : title.text) || tab.text;
        tab.icon = (title === null || title === void 0 ? void 0 : title.icon) || tab.icon;
      }
    }

    return {
      tabs: tabs
    };
  },
  setPrimaryColor: function setPrimaryColor(primaryColor) {
    setItem('primaryColor', primaryColor);
    return {
      primaryColor: primaryColor
    };
  },
  setAppName: function setAppName(appName) {
    return {
      appName: appName
    };
  },
  setLoginUser: function setLoginUser(loginUser) {
    return {
      loginUser: loginUser
    };
  },
  setPermissions: function setPermissions(permissions) {
    return {
      permissions: permissions
    };
  },
  setUserPaths: function setUserPaths(userPaths) {
    return {
      userPaths: userPaths
    };
  },
  setPageFrameLayout: function setPageFrameLayout(pageFrameLayout, state) {
    var sideCurrentWidth = state.sideCollapsed ? state.sideCollapsedWidth : state.sideWidth;
    var defaultShowSide = true;

    if (pageFrameLayout === PAGE_FRAME_LAYOUT.TOP_MENU) {
      sideCurrentWidth = 0;
      defaultShowSide = false;
    }

    return {
      pageFrameLayout: pageFrameLayout,
      sideCurrentWidth: sideCurrentWidth,
      defaultShowSide: defaultShowSide
    };
  }
};

var css_248z$4 = ".style-module_header__3EUC2 {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: fixed;\n  z-index: 999;\n  top: 0;\n  right: 0;\n  left: 0;\n  width: 100vw;\n  height: 50px;\n  padding-right: 16px;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA3QAAAAyCAYAAAAUeZlXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNjgwMTE3NDA3MjA2ODExODIyQTlGNDU4NzI1NzQzQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2RjlDMjkwQUQxNUExMUU5OTRGMTk5QkUzRTcwNUJFOCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2RjlDMjkwOUQxNUExMUU5OTRGMTk5QkUzRTcwNUJFOCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDBBRTVDMkRDRTIxNjgxMTgyMkE5RjQ1ODcyNTc0M0EiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDY4MDExNzQwNzIwNjgxMTgyMkE5RjQ1ODcyNTc0M0EiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz47hayKAAAaF0lEQVR42uxdh1ZbWbItSSQhgkkmOWB3293z5v8/5b2ZHoONsckZRE5PNezqeyRLQuGmc+/ea51l2m1bcEJV7YqFp6cnIZqiXFsfamuotm5q61ttXSf4/QzU1p/4da22znlEPeFjbU3U1r8TPk9fUait32prDHfwa21FIUT03f1Pbd3V1v9y24kYMVdby7V1W1t/1dZDbb2qrXe1Vayti9pax90ksgE92+naWq2tKrcjNptG93wW8l5xX1uHWLd9/vuDtfVP6Pl/h6T7ZmprHv+2QAfuQCYQyWEcdskJZHNuHxTRHFdQ5iu4LJ9rawMXJgks4byOSOb6wr0j7EnouscTnBuf8C7e1NaPCD5nCr8ec8uJmLGPu62On7cgbnP4f3u1tR2RE4NIDgVHvhHRYhQkbsrZdyVEB7CvnkL8HMVliLrvAGRTid1ryIlxOAF26AxIDBc4n0qeN4GErj3UM6vRsAWsFSj7rZgFvwqMaZCRLR5LKISOd7+/d6GRuc9QbOpJ3Q35M6bx6xG3m4hJFw46S509GoV+hf//WFvfa+uUW5VJFJ1zJqLZX31L6hgpO3t9BJJ0FRFxDJPQNSN2SkrnISt+J7FLDI+Q2Xq3hqT/6K6PWKBR2xl2IBTeQyCpoFiXeFJuVBC+wdebDiEheoOd2SC3oi/cgtSpEluU57TksKLX6mUbxptjFJXoB4UGomZrqOG/Cx3IYY3WTYLUndP4z9w9MWOdCA8qxzUapw66En7vGoRIsy8eIvzsqAidS+yO8HOQ2CWPCxC6McmfI/g1CV13OKut/8hzlE4Nzs8gdVHnTs9DKJ4L08/CACN04UEVpUYtPsDZcRfSe2B0jugEpRbkzF0DHcqEO2c9wUAzA/QODosK7uY0yNw5yN2Z0NHmOxihC5ccT4DIjTvk5wRELi6SU8bnXkX8Oe2I3SWI3RmvRSyEbhZyOk+2g/7MWpL1SKO2O6hS/yLPEbNpPFhNgdyP6PNGwLxVyfzg9ocCRujCxSnewBKI3Re8k34Mq1dQknRg5NcgHHiBqA06Rng7Q+u2gaw1/rcROIMaAx9B5o4kqPNZxe+poTrp/DrpGBOnWDc8Qi/vnAgjdP1A3+wMDMxBR99ak5M4mwgN4fu5jPFMjdgdOcRuFPKExC56VB0ZnhdMg4/o3VsnoeseSq428ECXsUZBuML27r2DotmWfOYERwFG6MLHHhToLJTXF+k9YjEJw1m9uQ/c2syh9AJJG5TOnC16N67bkLS7Hu6gkrQVEMU9OCrGcLcL+MxjLP3vcYfcVbCW8H0ZubvkkXsBRuh6xxhk/6RDjNW43geBSYIkW7rlVUJ7YnKCxC4+mNwfgZ7Juv0wBY6gWNc7RaO2d1gh7wo2VsP72v0vLO+s1epdSXQRQBI6IixswvBV41Yjdas9KnKmW/oJi6q1ImgWbeskqtaOpNkK2/CedpTjFgidGQn2vd82fJ9njmE2KkHEbgRrHn//TIK6O0aA0nt/hefTFQG2kQMjjpNF5fahJF/7HHX9XL/E7grEjk2WwkUVe13JOGmedPTV3826aNT2B02zsdEG6qWy0Qb9PlI1Hhbx9Q8qmdAJ3ZMw5TJs/DfkL8/jDCoQNt97uPfjOCOO5kiX8dauoYjVqr3UWMSNqrVbcUPT2pfw9UaDM8FN0W6XJXGJpdkUww6507cwg/XokLszYQQ6bXdchBG6lzAiQZMT2zMlJ9bkJC37lxZC10jsVCZox3Sbc0xiF75NnnVCNw7OUQA/+Ls0hYQuHIKwBgL2Go90F4+0VyL2BsJyX5iyE9WZkdCFD1XmNs5gCgbwdhd/f9pRfnRixAOrVWtXs1bq4N9pRc7cSFsajeUlCeqU15sYAb3U3GqWxh6W7qvV26kifiVBjahbd8eU+uQJHWVOcxRwf5XIjeH3rMb5QNI5VLssQSv7NMHeO4lddIROJLt1dGO4L/omf8pzNFxI6MKFCrctkC+NTFho/bt0X8fxCo+9W2OY6Bx3jrF6x+0IfW+V1H3CO1DjttP0SRsmznTLcAzUTmrVXoqqPeIM2zUWuffQGNaf+y2cCDZX8aLFfe6W0Lm4l6BRQlHq6+7GsJZh0Jmxd8Xrm8h9YHSuHnrnrcmJ2Yq3EjQ5SWtnV6uhukixXGpF7JSA7gobgvWKa7zjUbzpLDlpRnFHiuAGB41/gIQuXJzgQq1Acdtog06jbCUodwH7poKJBm4dHQld+LjCvf8Ao1n3+KUUylEo4isatC/ipVq1Aem8Xf+t82uzCFsW0wKLkNET+BnXpLUnP8yuuI+OIVeQ+rq7MtYCPtP+XFUYOYrrTnD0xDPGQeImJHD4nMGA9CGNzQaX+5DdZO98Am9fZYKOAJonsesJlvkwjnuQlQw3/Vl+A0fYxRISung8BDqvTiN1Gm37JE1Coy2wBMPhRNgFKUrc8f5HjjPc+7cwnr9I+/QXNkMJbwh2s6has5VHoqAKUZsSVLBHa9I+3TGqMSdmeOjagjPDyN0oDOpZEGq3qQrr7qJ7e3kmziUJmpwM4/csunwgfqUEp61+rlN9eUZiFwqM0FUyQuhGHDKnafwtM/do0EYDq8ewYvu3eKCb0jrqZsXzDzCEiehwH5GRRtTjEMbBawnGGdy1MKamJNuz50rSvqlIr0OwG1Mh74WRhlYYhGK0SPBaB3sV19zKawnSrQalvu5uynkfVQm8+swuCAd5bohSBombcvbhEiTuxNM9SXpkQRTEbsEhdozYv0zozKb2vUP8MHTWAN7kVrs/TEIXLfYgHFdA1sogerdNDNq3+HqLBllshI73P3psgcBotNrGGTQaCTZ77tTDux/lEOxmNWtU5v0pxiGQIh0x00m0Ky5C1/iZVqdUlPph5uNYb6BbjNxd84j7esOSo7dlDrRZh/yoTD6CAXzl+c9WlqCjrq8wYqdvXaN0Wmtr/RlI7DondD5Ddc7v+FXf5ouBHhq00UONh79gzKrw/AOkzq0p0kc6gj97yC2LxWDi/Y8PGxBKKmDf4/67yiit6ZbFDohaUkOwic5h9QcDID/rXRhDjzi/pKL5+vknWAW8ITc1U9ci7pWRuzQ3g0gj8hKhG5Jg5IDpPk07PoDszUI67wjOs5qRMzvHUkK3QGLXscy8gtwfEj87CLtkTs/4Ryd/iQZtfARC082WIVDVuNjGgxzG43zq9NCI0AgdUy7jE7AaEfkMQ1TTkDcdGWSz5+KsG21H0NI+BJvoHNbmWSPA6iz72YMBdOcYikmepaVcVvF+ylLfVGUO68Ehd+e8fy8i6xG6CQmanNjPeQoil7V5nz7Wz3UCffOrLYjdPmQbiV2AC8jEMfGvLn8AHGEYNtFGp2dLQhevMv4JQaPpMosQPjaQV2eQ3HCbYgFTLpPZ8zWQujmQIFVEU7j/YXkai/JyUxGfh2ATnUOJzgrOWp1nvY6BMUI3JOlK47KOsDu410bu1IiZxnqU+ro7RoKbywzJGPEdkKDJyZAjgw9B5LIqu7JK6JoROyVzln5tETsSu4DQ6d2veEboShLUeauz5Vs350mDNn4cQQl/gPIVELldbk3shI4Runih91znfWkqwTJI3Qz+XyfNUAbk5cYi/QzBdmvWGNXwG3qvrC55U/orjvchRfsOhvoB3oDbVGUC663UDzOnA/EZWYrQWXO1KefnslKOkxwY+z6NLOiX2FVx3gskdk33x96Db2SuLEGdd1dnSEKXzKFNOobnE87BOq8R0ePB2XciXqhBqSkE77HUO36NM6lI+5q1vA7BJrqDGjWLEqSx9+uh9c0B9AAHyTHezJgE0bsK1hLeilt3l1f4HqErStDkpOz8LBaNy0vDHGuIYnM186JP11oQuz3cgTw6J03f25D5Bw/esPXZuASZ6/rcaNDGB91rbd8+gwv2BENDD1I7AGrU4mvOFWvcD35IOH8oCaihOQwFJBC6/+jAqG5F0rI8BJvoDhr5nZNgdEwYdZm3nhE6FyrbrLHCT6kfZj4CnfQa78sdZp4nI9DXCN2wBE1OzEF8LUGTk7wZ8mWcZR4d4y6xe433vYyv80rsqnB0VCTdc50LIHNjeL9rvdoyJHTxEblZkLcnPK5dx1BYwp/5LUQjhHiZIAzhfFgLlYyhaVBFcykcgk30pxTfQYGrMgzTOZalFO1LrG3IP7fubgbrEQTQCF7WHSUlRw75cM+tycm4I0tPQOSqOZYBow65ySv0Z/8GcruQc2J34QGhMzI3DjK32o+8JaFLlsgZtnCIizhcTUk75hZGCrfTJQldvJjDXTfFou9D65yYckz0Ar0/KzB09S2vSbhpZlntimuNifahr9y6OyN6IvVNVbKcypZmp9GgQ7gHnXtp8wqpw/weKB42rtoQu32Q/6wTu7TPozMnpMrdG+itvppWkdAlS+Rc7OIwtXBda4tKeHRENGCny2QwDcXyBIUzgv/WvP8v3B6iS6ic/AilbUoxbNKRhzEnKg+PJCgDcOvuxrCWQZSN3F1m6A4p0hiJHIMtMSlBaug5bIMzYeZCM0J3ya1oSuy0rk7Le5YcYrefYWJ3jZ9tVNJZWqO2/pQETsi+nTI0ZsPDoAQ1ct0QOReHUCrvYeCWhN0vSeiyAzVK3uHrdRgmVbyZCoQbI9NENzLXWjyrEfdVomnLn7e5lY8gC7p+SP0w8xGseeyLW3dHchEewbQmJyMO2TwCkWN30l9RxF5xnExrYreOPVoAsdMsmbkMEzuVRxqlGwehTRPRV/t+Gnd1VUJyQtKYDZ/IPeJx7PUoWE4gvD/gwekZbXKbaaR5DhWqK/h6A0agCd1NGOZL+H2ODCBewjDuzJAE83qiujdPIIp5lRUXWFvYd7dj5izWgwR1d2fiV91dWiJ0IxI0OSk6hriSuGPKxbbIy7iCfnH9ArE7kGzVzBqhq6Tobizhndts3tAcNCR06SFyLs5x0B/x0FTh/BB6QMMEI3TxoQIHhaY9aKe9oyb3/RRGonr+t7llRBuMQjbq21UH2PcYZOMdPm9A8j2c+wY6bg974aZlvsLSs3Dr7hgxaY0C9syGIJsDQWXkobDrdTcygYSuN2I37xA7NxUzC8TOraPbT8H3s4A9fpDwa71pzKaMyDVeRK0pUi+0tSVeJ6kL1UCz8ySiQxnGdxFErVVdqEbpJuDAUEPmlltHNME4nANF3KXNmGTiHe7yYM4JnYt7CZpyFKW+mcq4BDOxrhxyl8aGFUlE6AZB4mYcO+xWgpEDvGO9ETo2ROme2KlDbAfEbgqkYy4jxC5NjVHmsbePIHOh31USus4xBCI3HTGRa3xsqyB1k/j1qzD1IixjhG8gWlhaXAnvpF096C3+jAo9bb7wjdtHNEC9yFpfXIABshPjZ7sOIBqNv+LRIW0Fqa+7K0vQbe9W6oeZ581BOS5BkxPDmQRNToj+CB0jmr1BI+8b0NHNiN2Bp06GR8jrMmz4pBzF+uats7fa8JFEkmnMdkbk5kHkCjgQSzm5j+mhWaRO01psADk9eOEYaHwD0WAQd1X3Vz34Wx38nV28M0vhqnIbCUchvsHXmxJ/+gwj+p3DUi6rOCs1pmwkwiiMRF0PEtTcnUlyjsqoI3QlyDW9w8P4PesqeiDMRghjf4exjw/cjkiI3Wvc1bjs3jBxARlUSeitTUN3WWfvyOwaGrPdEbn9hC70nUPqRmEoh9LmNMd4xKKBFo1c+R17q8X8P7s4EyV+1uX1L2GKMfFsUCzgLiQ1o5OErndcYe1i/9y6u2ksPVu3qUqcuq0Q0b87ChKnkeWiY1we4g5TtoW3zwrWz4VP7HYcO9jGcflG7C4kqFGNW3coIX6Ht74OGRep4UWkl8i5UM+Tpl/aVPlPEnKHnBziHuedxhklvqIEMjcMw2yjy709doTvjHAWY97xBvdB5fC3qBUiCV0s+3iAVZKg7m7CWWaEnYHgXUf8PRUdHRvGv2VNToxoPILEHQjTdUno/IJGtLQh367HxM7ScMdi/lx3TJPb2ZuELgYMS1AjlyYi58Lyb99DaRipo5Lo3bgYwjtgtDMcY8bmgmlawXqPRFnTtD7Lc875sTCNJo8oOHLuXiKsOyChSwz6rk+wClI/zLyCpTLgRurr7qK4ayL9OfXUfpjBshTOGwmanFCGRQeOLEiW2B1KtL0kwvje72CXlGJ6izamqSAxZpWQ0D0LYssVLuCw01wEqkrnO75PVR5WU8di4O5x7xhpJHT9G0UaPR6FYu1nLtgllMQMDLqf3N7cOQYsE0HfZejtnUnoUqnXzrF+wkh3m6q8xlKZbZG7cwmn7s4idL38WxMwaiecn+MU9sM5jzUWVEjoYid2OxJ0e5/Dr2kmdmofv8Jdibr50Ji0H9NEQhcjkfOhTesTHtUDHpVGRdaFXbJ6NdLo2OifzK3AAL+Gg6HfN7QNAWyKglHofEDf4kc4Bq4lPbXC95C7JHTxwOru1HAckvrIndXdPUp93V2vDthuI3QDEkTjhhxdYiMc6ByMV17om7wRdv+O23baBIHzgdjFRehsRupLY5pI6EjkfsEWvudFeASSahjgK9wIHdE73sLYuoEBfh/S2Wh6x5I8jzFY5TZnHvoOLWX3UtLXzfce3yNrbuPFraOjS1Jfc2dEz4y2Exhs3dSWdxqhU2PQmpwYCazCaDvlnUgEHFeQTmKn7+QIOjwNXVyrzhuOCmXoL5UnO9J+TBMJXZ8YwYXLApFzsQtDQ43q91B4bCTRHaFjhK53aNOKaQj2rxKuV24fCmIMRtQJtzvT8vk3ECaNuvSTshul8TIorLlNEg8wFI+gx92mKlZ3pw6gawnq7l5KxWsXoSvCZpiVoFbLbXJyzSNJBaFjBkc6iN2uBLV1M7AN0kDsrvFuRyUah5zpL5u5u5PED5kHQ1Y3egEGoRnxViOXlULlQ/ws1u69lIR3wFMhJMIIXa9YhODWNxVFx9UnKAlNYdBIXZKzqohojbKP0EdK2r9LOqMdt/heWXObDjxJMMNOQOYsajeCNY+zsrTM8yZ3q1mEbsQxSEuOUWhNTiiH0kXoWD+XDqgtsCVBxC4txE7fvEZx1QFUDvm+DIPMDUA+bCW1+VkmdK2I3H5GhfEJSN0HGNoDMIaJ9sInL46NsPEaxpLeua8SnafaDLYJfOYOtz5TGIfMKkI2b3ogL+gASicusLZhZLl1d7MSjL84cwieyi93Dp2NHBhzDMFjGGpM60snodMzYoTOH2J3DGJ3k4B8GIc8CIvQqS6wmbtKWBNt4JZFQzZvRM6Feh81UqLebs1jVs/iD2FufyswQtcbVDAvSTAbLGrv6CYEsSoGNh3IDmzoagFEfYfygggJNzAm92DnTMAmsPTtV9CLVec8/3S+tnl5h+LPAOW8wdKfr4QR07QTu13YpHMgdVMJEDtzyFTAB8Ikc8ewtRNFlgidhlHnc0rkGi/tF3kOAVu6yDpJXUthk1XHRpRG+Fvcp3UJio2jNs72QeiW8bmE35jDWSp+ih91vyR0/sp5q7vTSLBbdzfeYKCd4y6eUWemHky39AcaCd+BHk+K2LmELgzupDb2MGTFRhrkRRYMWSVyCxJ0urqToEYur14bTX9bxYWbxK9fhV6sRjxikdB1BjWA3uHrDYl3TMYOhL952as8Dm+xgGUzNX1pdkNClw2Zb81S1Bj75Mj/O9xHRuT8InRMt8wGsTsBsbuO8O1fgTPouJFea/k0SKKROc0GtAZeqXD+FD0nclp78QdIi3XZ+Zc8p1nknbyot+MLHscYLiCJS3MjreT5W4gDeodW5Dk9TlML4h6Poe95G18v8zi8hN6dtyBzep5fxa/OpSR02YGNyBiALDvF732gLvCO0LG20V9i93/Q6w8gdX/CzhiJ6HP7jdKVJBitU00TmfOV0LUjcnlLr+zEANFI3SWE3+80Rn4B0y47U5xm6Gg+/GFC38cR7rLKgBkei3dk7j3O7R5y6dxDeUpC5z8GoAuHQOQ02+A7ZIsaeu+4Rd7oJTWmOTrCb2K36xA71Q2vIiR2/RC6IuygUciK1I3WKXr2eEnkeiMsZjzp49AUk2Fuyy9GGgldc+id0SY7NgpjL+Hvx7pILUrQTpxIN4q4Q6qoNc3li/hZ9/IAPUNC5y8sXcpqX9ZBCixifIt7usStSjWGcZZXwlrHLODxBWJXDpnQjXX59wrgH2O4c2uSwrFnPhA6ZdIa4vxMItfXY1Flpd7IIZC6Mrflb8IrNNJaKk13vsp2Cr4nJQJH+J4WeESph0VDtPnENcjcjcc/D1O0/SZzbrrUegMZuIeeVEPNWq0T6QQbomSf2G1C3iqx+wOEql+79Rb/5oh07hA2Mmc6LJVkLu2EzojcJ2ykHsJPHDSJXPewroRHjpFV4bYwQtcCVmOSivkqDdjG+5+V6HLtif5hziM1vqz77l1G5AUdQH6hMV2qVZMwNdisLuaNPDeCItKHMgld5omd2vn/cojdZEjErpu0SyVz7yAHbkDmUts0KY2Erh2ROxCG1/sldVovsCeBtzLvCosRul9hLXmtxuRHyr4/lQk7ELZskJJOuOndZ5JiryYJXebRLF2qnUO46si8FWE2SxpRIaHLPbH7KL0FJbohdNrEa0qCfhSpdkgOpOyBLkgwF0Y3TkOvhyRxoWMLxtUiFJ2SvOOc7gUjdPUoQVBaS971lL4/FfIzEsyUOuXRpUqWW93lEYzjp4zJCxI6v8hct+lSem+HYJPoXf6P+B9dzhLKMPZvuBW5InbKB3TMgc6cnsBSO2VHOu92Wu2Q0L3BZ3lB5tJixI5BaFqRoj7QPQhUErnooGT5Hh6I9zC+DnK4D+xyGcBNS1Lh+C3Fb1C/r00YW8sQ6kzDTh6qYFdwl/ZxRlkCCZ1fZK6fdCk1EjXCPAU5syrZiDL7jhHIlwvaiLkkdgcgdjMgduNYnRK7a/w7o5ARze6QNkWahbxY88Vx8P8CDABzWTeFvZWA0QAAAABJRU5ErkJggg==);\n  background-repeat: no-repeat;\n  background-position: right;\n}\n.style-module_header__3EUC2 .style-module_logoContainer__taerx {\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0;\n      -ms-flex: 0;\n          flex: 0;\n  position: relative;\n  height: 50px;\n  overflow: hidden;\n  -webkit-transition: -webkit-box-flex 0.3s cubic-bezier(0.2, 0, 0, 1) 0s, -webkit-flex 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;\n  transition: -webkit-box-flex 0.3s cubic-bezier(0.2, 0, 0, 1) 0s, -webkit-flex 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;\n  transition: flex 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;\n  transition: flex 0.3s cubic-bezier(0.2, 0, 0, 1) 0s, -webkit-box-flex 0.3s cubic-bezier(0.2, 0, 0, 1) 0s, -webkit-flex 0.3s cubic-bezier(0.2, 0, 0, 1) 0s, -ms-flex 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;\n}\n.style-module_header__3EUC2 .style-module_logoContainer__taerx h1 {\n  color: #fff;\n}\n.style-module_header__3EUC2 .style-module_logoContainer__taerx a {\n  width: 100%;\n  height: 100%;\n}\n.style-module_header__3EUC2 .style-module_trigger__2uZhH {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0;\n      -ms-flex: 0;\n          flex: 0;\n  height: 100%;\n  font-size: 20px;\n  cursor: pointer;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  padding: 0 5px;\n  color: #fff;\n}\n.style-module_header__3EUC2 .style-module_trigger__2uZhH:hover {\n  opacity: 0.5;\n}\n.style-module_header__3EUC2 .style-module_center__3QrhN {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  overflow: auto;\n}\n.style-module_header__3EUC2 .style-module_center__3QrhN .ant-menu {\n  background: none;\n}\n.style-module_header__3EUC2 .style-module_center__3QrhN .ant-breadcrumb a,\n.style-module_header__3EUC2 .style-module_center__3QrhN .ant-breadcrumb .ant-breadcrumb-link,\n.style-module_header__3EUC2 .style-module_center__3QrhN .ant-breadcrumb .ant-breadcrumb-separator {\n  color: #fff;\n}\n.style-module_header__3EUC2 .style-module_center__3QrhN .portal-menu {\n  background: none;\n}\n.style-module_header__3EUC2 .style-module_center__3QrhN .portal-breadcrumb a,\n.style-module_header__3EUC2 .style-module_center__3QrhN .portal-breadcrumb .portal-breadcrumb-link,\n.style-module_header__3EUC2 .style-module_center__3QrhN .portal-breadcrumb .portal-breadcrumb-separator {\n  color: #fff;\n}\n.style-module_header__3EUC2 .style-module_right__3hS_5 {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0;\n      -ms-flex: 0;\n          flex: 0;\n  height: 100%;\n}\n.style-module_header__3EUC2[data-theme=dark] {\n  background: #001529;\n  box-shadow: 2px 0 6px #002f5c;\n}\n.style-module_header__3EUC2[data-theme=dark] .style-module_logo__1sUGs {\n  background: #001529;\n  box-shadow: none;\n}\n.style-module_header__3EUC2[data-theme=dark] .style-module_right__3hS_5 {\n  color: #fff;\n}\n";
var styles$4 = {"header":"style-module_header__3EUC2","logoContainer":"style-module_logoContainer__taerx","trigger":"style-module_trigger__2uZhH","center":"style-module_center__3QrhN","right":"style-module_right__3hS_5","logo":"style-module_logo__1sUGs"};
styleInject(css_248z$4);

var Header = /*#__PURE__*/function (_Component) {
  _inherits(Header, _Component);

  var _super = _createSuper(Header);

  function Header() {
    var _this;

    _classCallCheck(this, Header);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleToggle = function () {
      var sideCollapsed = _this.props.layoutState.sideCollapsed;

      _this.props.action.layout.setSideCollapsed(!sideCollapsed);
    };

    _this.renderToggle = function (showToggle, sideCollapsed, theme) {
      if (!showToggle) return null;
      var props = {
        onClick: _this.handleToggle,
        style: theme === 'dark' ? {
          color: '#fff',
          backgroundColor: '#222'
        } : null
      };
      return sideCollapsed ? /*#__PURE__*/React.createElement(MenuUnfoldOutlined, _extends({}, props, {
        className: styles$4.trigger
      })) : /*#__PURE__*/React.createElement(MenuFoldOutlined, _extends({}, props, {
        className: styles$4.trigger
      }));
    };

    return _this;
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          headerRight = _this$props.headerRight,
          layoutState = _this$props.layoutState,
          logo = _this$props.logo,
          layout = _this$props.layout;
      var menus = layoutState.menus,
          topMenu = layoutState.topMenu,
          selectedMenu = layoutState.selectedMenu,
          appName = layoutState.appName,
          sideWidth = layoutState.sideWidth,
          sideCollapsed = layoutState.sideCollapsed,
          sideCollapsedWidth = layoutState.sideCollapsedWidth,
          sideDragging = layoutState.sideDragging,
          primaryColor = layoutState.primaryColor,
          breadcrumbs = layoutState.breadcrumbs;
      sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;
      var isTopSideMenu = layout === PAGE_FRAME_LAYOUT.TOP_SIDE_MENU;
      var isTopMenu = layout === PAGE_FRAME_LAYOUT.TOP_MENU;
      var isSideMenu = layout === PAGE_FRAME_LAYOUT.SIDE_MENU;
      var showToggle = isTopSideMenu || isSideMenu;
      var showMenu = isTopSideMenu || isTopMenu;
      var topMenus = menus;

      if (isTopSideMenu) {
        topMenus = menus && menus.map(function (item) {
          return {
            key: item.key,
            text: item.text,
            path: item.path,
            icon: item.icon
          };
        });
      }

      if (isTopMenu) {
        topMenus = menus;
      }

      var transitionDuration = sideDragging ? '0ms' : '0.3s';
      var theme = this.props.theme || (isTopSideMenu || isSideMenu ? 'default' : 'dark');
      return /*#__PURE__*/React.createElement("div", {
        id: "header",
        className: styles$4.header,
        "data-theme": theme,
        style: {
          backgroundColor: primaryColor
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: styles$4.logoContainer,
        id: "logo-container",
        style: {
          flex: "0 0 ".concat(sideWidth, "px"),
          transitionDuration: transitionDuration,
          backgroundColor: primaryColor
        }
      }, /*#__PURE__*/React.createElement(Link, {
        to: `${preRouter}/`
      }, /*#__PURE__*/React.createElement(Logo, {
        min: sideCollapsed,
        title: appName,
        logo: logo
      }))), this.renderToggle(showToggle, sideCollapsed, theme), children ? /*#__PURE__*/React.createElement("div", {
        className: styles$4.center
      }, children) : /*#__PURE__*/React.createElement("div", {
        className: styles$4.center
      }, showMenu ? /*#__PURE__*/React.createElement(HeaderMenu, {
        theme: theme,
        dataSource: topMenus,
        selectedKeys: [topMenu === null || topMenu === void 0 ? void 0 : topMenu.key, selectedMenu === null || selectedMenu === void 0 ? void 0 : selectedMenu.key]
      }) : null, isSideMenu ? /*#__PURE__*/React.createElement("div", {
        style: {
          marginLeft: 16
        }
      }, /*#__PURE__*/React.createElement(BreadcrumbComponent, {
        theme: theme,
        dataSource: breadcrumbs
      })) : null), /*#__PURE__*/React.createElement("div", {
        className: styles$4.right
      }, headerRight));
    }
  }]);

  return Header;
}(Component);

Header.propTypes = {
  layout: PropTypes.string,
  theme: PropTypes.string,
  logo: PropTypes.any,
  action: PropTypes.object,
  layoutState: PropTypes.object
};
Header.defaultProps = {
  layout: PAGE_FRAME_LAYOUT.SIDE_MENU,
  // top-side-menu top-menu side-menu
  theme: 'default' // default dark

};

var css_248z$5 = ".ant-tooltip-inner .font-icon {\n  margin-right: 8px;\n}\n.portal-tooltip-inner .font-icon {\n  margin-right: 8px;\n}\n.style-module_sideMenu__1xVlq {\n  height: 100%;\n}\n.style-module_sideMenu__1xVlq > ul {\n  height: 100%;\n}\n.style-module_sideMenu__1xVlq .font-icon {\n  margin-right: 8px;\n}\n.style-module_sideMenu__1xVlq .ant-menu {\n  border-right: 0;\n}\n.style-module_sideMenu__1xVlq .ant-menu-item::after {\n  display: none;\n}\n.style-module_sideMenu__1xVlq .ant-menu-item.ant-menu-item-selected::after {\n  display: block;\n  left: 0;\n  right: auto;\n}\n.style-module_sideMenu__1xVlq .font-icon {\n  margin-right: 8px;\n}\n.style-module_sideMenu__1xVlq .portal-menu {\n  border-right: 0;\n}\n.style-module_sideMenu__1xVlq .portal-menu-item::after {\n  display: none;\n}\n.style-module_sideMenu__1xVlq .portal-menu-item.portal-menu-item-selected::after {\n  display: block;\n  left: 0;\n  right: auto;\n}\n.style-module_sideMenu__1xVlq .style-module_menuText__RECmi {\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n";
var styles$5 = {"sideMenu":"style-module_sideMenu__1xVlq","menuText":"style-module_menuText__RECmi"};
styleInject(css_248z$5);

var SubMenu$1 = Menu.SubMenu;

var SideMenu = /*#__PURE__*/function (_Component) {
  _inherits(SideMenu, _Component);

  var _super = _createSuper(SideMenu);

  function SideMenu() {
    var _this;

    _classCallCheck(this, SideMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleOpenChange = function (openKeys) {
      _this.props.onOpenChange(openKeys);
    };

    return _this;
  }

  _createClass(SideMenu, [{
    key: "renderMenus",
    value: function renderMenus() {
      var _this$props = this.props,
          dataSource = _this$props.dataSource,
          collapsed = _this$props.collapsed;

      if (dataSource && dataSource.length) {
        return renderNode(dataSource, function (item, children) {
          var key = item.key,
              path = item.path,
              text = item.text,
              icon = item.icon,
              target = item.target,
              url = item.url;
          var title = /*#__PURE__*/React.createElement("span", null, icon ? /*#__PURE__*/React.createElement(Icon, {
            type: icon
          }) : /*#__PURE__*/React.createElement("span", {
            className: "anticon"
          }, collapsed ? text[0] : ''), /*#__PURE__*/React.createElement("span", null, text));

          if (children) {
            return /*#__PURE__*/React.createElement(SubMenu$1, {
              key: key,
              title: title
            }, children);
          }

          return /*#__PURE__*/React.createElement(Menu.Item, {
            key: key
          }, target ? /*#__PURE__*/React.createElement("a", {
            href: url,
            target: target
          }, title) : /*#__PURE__*/React.createElement(Link, {
            to: {
              pathname: path,
              state: {
                from: 'menu'
              }
            }
          }, title));
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          collapsed = _this$props2.collapsed,
          openKeys = _this$props2.openKeys,
          selectedKeys = _this$props2.selectedKeys;
      var menuProps = collapsed ? {} : {
        openKeys: openKeys
      };
      return /*#__PURE__*/React.createElement("div", {
        className: styles$5.sideMenu
      }, /*#__PURE__*/React.createElement(Menu, _extends({}, menuProps, {
        selectedKeys: selectedKeys,
        mode: "inline",
        theme: theme,
        inlineCollapsed: collapsed,
        onOpenChange: this.handleOpenChange
      }), this.renderMenus()));
    }
  }]);

  return SideMenu;
}(Component);

SideMenu.propTypes = {
  dataSource: PropTypes.array,
  // ????????????
  theme: PropTypes.string,
  // ??????
  collapsed: PropTypes.bool,
  // ????????????
  openKeys: PropTypes.array,
  // ????????????keys
  selectedKeys: PropTypes.array,
  // ????????????keys
  onOpenChange: PropTypes.func // ???????????????????????????

};
SideMenu.defaultProps = {
  dataSource: [],
  theme: 'dark',
  collapsed: false,
  openKeys: [],
  selectedKeys: [],
  onOpenChange: function onOpenChange() {
    return true;
  }
};

var css_248z$6 = ".style-module_side__EBxZ_ {\n  position: fixed;\n  z-index: 998;\n  top: 50px;\n  left: 0;\n  bottom: 0;\n  width: 200px;\n  box-shadow: 0 4px 4px 2px #ddd;\n  background: #fff;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.style-module_side__EBxZ_ .style-module_outer__38rfn {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  bottom: 0;\n  overflow: hidden;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.style-module_side__EBxZ_ .style-module_inner__cJiWG {\n  position: relative;\n  height: 100%;\n  overflow-x: visible;\n  overflow-y: scroll;\n  padding-right: 1px;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  -webkit-overflow-scrolling: touch;\n}\n.style-module_side__EBxZ_ .style-module_dragBar__2eXPD {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 10px;\n  height: 100%;\n  cursor: col-resize;\n  z-index: 1;\n}\n.style-module_side__EBxZ_ .style-module_dragBarIcon__OlrxF {\n  position: absolute;\n  top: 50%;\n  margin-top: -50px;\n  right: -9px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n          justify-content: space-around;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  padding: 20px 0;\n  width: 6px;\n  height: 100px;\n  border-left: 0;\n  border-top-right-radius: 6px;\n  border-bottom-right-radius: 6px;\n  cursor: col-resize;\n}\n.style-module_side__EBxZ_ .style-module_dragBarIcon__OlrxF span {\n  display: block;\n  width: 2px;\n  height: 2px;\n  background: #bbb;\n  border-radius: 50%;\n}\n";
var styles$6 = {"side":"style-module_side__EBxZ_","outer":"style-module_outer__38rfn","inner":"style-module_inner__cJiWG","dragBar":"style-module_dragBar__2eXPD","dragBarIcon":"style-module_dragBarIcon__OlrxF"};
styleInject(css_248z$6);

var DragBar = /*#__PURE__*/function (_Component) {
  _inherits(DragBar, _Component);

  var _super = _createSuper(DragBar);

  function DragBar(props) {
    var _this;

    _classCallCheck(this, DragBar);

    _this = _super.call(this, props);
    _this.state = {
      isDragging: false,
      original: {
        x: 0,
        y: 0
      },
      moved: {
        x: 0,
        y: 0
      }
    };

    _this.handleDragStart = function (event) {
      var clientX = 0;
      var clientY = 0;

      if (event.nativeEvent instanceof MouseEvent) {
        clientX = event.nativeEvent.clientX;
        clientY = event.nativeEvent.clientY; // When user click with right button the resize is stuck in resizing mode
        // until users clicks again, dont continue if right click is used.

        if (event.nativeEvent.which === 3) {
          return;
        }
      } else if (event.nativeEvent instanceof TouchEvent) {
        clientX = event.nativeEvent.touches[0].clientX;
        clientY = event.nativeEvent.touches[0].clientY;
      }

      var original = {
        x: clientX,
        y: clientY
      };

      _this.setState({
        isDragging: true,
        original: original
      });

      if (_this.props.onDragStart) {
        _this.props.onDragStart();
      }
    };

    _this.handleDragging = function (event) {
      var _this$state = _this.state,
          isDragging = _this$state.isDragging,
          original = _this$state.original;

      if (isDragging) {
        event.preventDefault();
        var clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
        var clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
        var originalX = original.x,
            originalY = original.y;
        var moved = {
          x: clientX - originalX,
          y: clientY - originalY
        };

        _this.setState({
          moved: moved
        });

        if (_this.props.onDragging) {
          _this.props.onDragging(_objectSpread2(_objectSpread2({}, moved), {}, {
            clientX: clientX,
            clientY: clientY
          }));
        }
      }

      return false;
    };

    _this.handleDragEnd = function () {
      var _this$state2 = _this.state,
          isDragging = _this$state2.isDragging,
          moved = _this$state2.moved;

      if (isDragging) {
        _this.setState({
          isDragging: false
        });

        if (_this.props.onDragEnd) {
          _this.props.onDragEnd(moved);
        }
      }
    };

    window.addEventListener('mouseup', _this.handleDragEnd);
    window.addEventListener('touchend', _this.handleDragEnd);
    window.addEventListener('mousemove', _this.handleDragging);
    window.addEventListener('touchmove', _this.handleDragging);
    return _this;
  }

  _createClass(DragBar, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mouseup', this.handleDragEnd);
      window.removeEventListener('touchend', this.handleDragEnd);
      window.removeEventListener('mousemove', this.handleDragging);
      window.removeEventListener('touchmove', this.handleDragging);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onDragStart = _this$props.onDragStart,
          onDragging = _this$props.onDragging,
          onDragEnd = _this$props.onDragEnd,
          others = _objectWithoutProperties(_this$props, ["onDragStart", "onDragging", "onDragEnd"]);

      return /*#__PURE__*/React.createElement("div", _extends({}, others, {
        onMouseDown: this.handleDragStart,
        onTouchStart: this.handleDragStart
      }), /*#__PURE__*/React.createElement("div", {
        className: styles$6.dragBarIcon
      }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)));
    }
  }]);

  return DragBar;
}(Component);

DragBar.propTypes = {
  onDragStart: PropTypes.func,
  onDragging: PropTypes.func,
  onDragEnd: PropTypes.func
};

var scrollBarWidth = getScrollBarWidth();

var Side = /*#__PURE__*/function (_Component) {
  _inherits(Side, _Component);

  var _super = _createSuper(Side);

  function Side() {
    var _this;

    _classCallCheck(this, Side);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.scrollMenu = function () {
      var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var prefixCls = _this.context.getPrefixCls(); // ????????????????????????


      setTimeout(function () {
        var _this$inner;

        var selectedMenu = _this.props.layoutState.selectedMenu;
        var prevSelectedMenu = prevProps.selectedMenu;

        if (selectedMenu && prevSelectedMenu && selectedMenu.key === prevSelectedMenu.key) {
          return;
        }

        var selectedMenuNode = (_this$inner = _this.inner) === null || _this$inner === void 0 ? void 0 : _this$inner.querySelector(".".concat(prefixCls, "-menu-item-selected"));
        if (!selectedMenuNode) return;
        var innerHeight = _this.inner.clientHeight;
        var innerScrollTop = _this.inner.scrollTop;
        var selectedMenuTop = selectedMenuNode.offsetTop;
        var selectedMenuHeight = selectedMenuNode.offsetHeight; // ????????????????????????????????????????????????????????????

        if (selectedMenuTop < innerScrollTop || selectedMenuTop + selectedMenuHeight > innerScrollTop + innerHeight) {
          _this.inner.scrollTop = selectedMenuTop - selectedMenuHeight - (innerHeight - selectedMenuHeight) / 2;
        }
      }, 300);
    };

    _this.handleMenuOpenChange = function (openKeys) {
      var sideCollapsed = _this.props.layoutState.sideCollapsed;
      if (!sideCollapsed) _this.props.action.layout.setOpenKeys(openKeys);
    };

    _this.handleSideResizeStart = function () {
      _this.props.action.layout.setSideDragging(true);
    };

    _this.handleSideResize = function (_ref) {
      var clientX = _ref.clientX;

      _this.props.action.layout.setSideWidth(clientX + 5);
    };

    _this.handleSideResizeStop = function () {
      _this.props.action.layout.setSideDragging(false);
    };

    _this.handleMaskClick = function () {
      _this.props.action.layout.setSideCollapsed(true);
    };

    return _this;
  }

  _createClass(Side, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollMenu();
    } // componentDidUpdate(prevProps) {
    //     this.scrollMenu(prevProps);
    // }

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          theme = _this$props.theme,
          layout = _this$props.layout;
      var _this$props$layoutSta = this.props.layoutState,
          menus = _this$props$layoutSta.menus,
          openKeys = _this$props$layoutSta.openKeys,
          topMenu = _this$props$layoutSta.topMenu,
          selectedMenu = _this$props$layoutSta.selectedMenu,
          showSide = _this$props$layoutSta.showSide,
          sideCollapsed = _this$props$layoutSta.sideCollapsed,
          sideCollapsedWidth = _this$props$layoutSta.sideCollapsedWidth,
          sideWidth = _this$props$layoutSta.sideWidth,
          sideDragging = _this$props$layoutSta.sideDragging,
          style = _this$props$layoutSta.style;
      sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;
      var sideInnerWidth = sideWidth + scrollBarWidth;
      var outerOverFlow = sideCollapsed ? 'visible' : 'hidden';
      var innerOverFlow = sideCollapsed ? 'visible' : '';
      var transitionDuration = sideDragging ? '0ms' : "0.3s";
      var isTopSideMenu = layout === PAGE_FRAME_LAYOUT.TOP_SIDE_MENU;
      var isSideMenu = layout === PAGE_FRAME_LAYOUT.SIDE_MENU;
      var hasSide = isTopSideMenu || isSideMenu; // ???????????????????????????????????????????????????????????????????????????

      var sideMenus = menus;

      if (isTopSideMenu) {
        sideMenus = topMenu && topMenu.children;
      }

      if (isSideMenu) {
        sideMenus = menus;
      }

      if (hasSide) return /*#__PURE__*/React.createElement("div", {
        className: [sideCollapsed ? 'frame-side-collapsed' : 'frame-side-extended', styles$6.side].join(' '),
        style: _objectSpread2({
          width: sideWidth,
          display: showSide ? 'block' : 'none',
          transitionDuration: transitionDuration
        }, style)
      }, /*#__PURE__*/React.createElement("div", {
        className: "frame-side-mask",
        onClick: this.handleMaskClick
      }), sideCollapsed ? null : /*#__PURE__*/React.createElement(DragBar, {
        className: styles$6.dragBar,
        onDragStart: this.handleSideResizeStart,
        onDragging: this.handleSideResize,
        onDragEnd: this.handleSideResizeStop
      }), /*#__PURE__*/React.createElement("div", {
        className: "".concat(styles$6.outer, " sx-side-outer"),
        style: {
          overflow: outerOverFlow,
          transitionDuration: transitionDuration,
          background: theme === 'dark' ? '#001529' : '#fff'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(styles$6.inner, " sx-side-inner"),
        ref: function ref(node) {
          return _this2.inner = node;
        },
        style: {
          width: sideInnerWidth,
          overflow: innerOverFlow,
          transitionDuration: transitionDuration
        }
      }, /*#__PURE__*/React.createElement(SideMenu, {
        theme: theme,
        dataSource: sideMenus,
        collapsed: sideCollapsed,
        openKeys: openKeys,
        selectedKeys: [selectedMenu && selectedMenu.key],
        onOpenChange: this.handleMenuOpenChange
      }))));
      return null;
    }
  }]);

  return Side;
}(Component);

Side.contextType = ConfigProvider.ConfigContext;
Side.propTypes = {
  layoutState: PropTypes.object,
  action: PropTypes.object,
  layout: PropTypes.string,
  theme: PropTypes.string
};
Side.defaultProps = {
  layout: PAGE_FRAME_LAYOUT.SIDE_MENU // top-menu side-menu

};

var css_248z$7 = ".draggable-tabs-bar-root {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 100%;\n  height: 30px;\n  box-sizing: border-box;\n  overflow: hidden;\n  background: #fff;\n}\n.draggable-tabs-bar-root.sorting,\n.draggable-tabs-bar-root.sorting * {\n  cursor: move !important;\n}\nbody > .draggable-tabs-bar-horizontal-item {\n  z-index: 9999;\n  -webkit-transition: 0ms;\n  transition: 0ms;\n}\n.draggable-tabs-bar-horizontal-item {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-shrink: 1;\n      -ms-flex-negative: 1;\n          flex-shrink: 1;\n  -webkit-box-flex: 0;\n  -webkit-flex-grow: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  box-sizing: border-box;\n  height: 100%;\n  -webkit-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  font-weight: 400;\n}\n.draggable-tabs-bar-horizontal-item:hover,\n.draggable-tabs-bar-horizontal-item.active {\n  position: relative;\n}\n.draggable-tabs-bar-horizontal-item:hover .draggable-tabs-bar-wrapper,\n.draggable-tabs-bar-horizontal-item.active .draggable-tabs-bar-wrapper {\n  position: relative;\n  background: #f0f2f5;\n  color: #000;\n  font-weight: bolder;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n.draggable-tabs-bar-horizontal-item:hover .tabs-bar-left-corner,\n.draggable-tabs-bar-horizontal-item.active .tabs-bar-left-corner,\n.draggable-tabs-bar-horizontal-item:hover .tabs-bar-right-corner,\n.draggable-tabs-bar-horizontal-item.active .tabs-bar-right-corner {\n  position: absolute;\n  bottom: 0;\n  left: -9px;\n  width: 10px;\n  height: 10px;\n  z-index: 10;\n  overflow: hidden;\n}\n.draggable-tabs-bar-horizontal-item:hover .tabs-bar-left-corner:before,\n.draggable-tabs-bar-horizontal-item.active .tabs-bar-left-corner:before {\n  content: '';\n  display: block;\n  width: 100%;\n  height: 100%;\n  border-bottom-right-radius: 10px;\n  box-shadow: 10px 0 0 10px #f0f2f5;\n}\n.draggable-tabs-bar-horizontal-item:hover .tabs-bar-right-corner,\n.draggable-tabs-bar-horizontal-item.active .tabs-bar-right-corner {\n  left: auto;\n  right: -7px;\n}\n.draggable-tabs-bar-horizontal-item:hover .tabs-bar-right-corner:before,\n.draggable-tabs-bar-horizontal-item.active .tabs-bar-right-corner:before {\n  content: '';\n  display: block;\n  width: 100%;\n  height: 100%;\n  border-bottom-left-radius: 10px;\n  box-shadow: -10px 0 0 10px #f0f2f5;\n}\n.draggable-tabs-bar-horizontal-item:hover .draggable-tabs-bar-wrapper:before,\n.draggable-tabs-bar-horizontal-item.active .draggable-tabs-bar-wrapper:before {\n  display: none;\n}\n.draggable-tabs-bar-horizontal-item:hover .draggable-tabs-bar-wrapper:after,\n.draggable-tabs-bar-horizontal-item.active .draggable-tabs-bar-wrapper:after {\n  box-shadow: 0 0 10px 20px #f0f2f5;\n}\n.draggable-tabs-bar-horizontal-item:hover + .draggable-tabs-bar-horizontal-item .draggable-tabs-bar-wrapper:before,\n.draggable-tabs-bar-horizontal-item.active + .draggable-tabs-bar-horizontal-item .draggable-tabs-bar-wrapper:before {\n  display: none;\n}\n.draggable-tabs-bar-horizontal-item:hover .close-wrapper {\n  opacity: 1;\n}\n.draggable-tabs-bar-horizontal-item:first-child .draggable-tabs-bar-wrapper:before {\n  display: none;\n}\n.draggable-tabs-bar-horizontal-item .draggable-tabs-bar-horizontal-item-inner {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 100%;\n  -webkit-transition: width 300ms;\n  transition: width 300ms;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.draggable-tabs-bar-horizontal-item .draggable-tabs-bar-wrapper {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  overflow: hidden;\n  height: 100%;\n  width: 100%;\n  padding: 0 14px;\n  background-color: #fff;\n  color: #333;\n  -webkit-transition: 300ms;\n  transition: 300ms;\n}\n.draggable-tabs-bar-horizontal-item .draggable-tabs-bar-wrapper:before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 5px;\n  bottom: 5px;\n  left: 0;\n  width: 1px;\n  border-left: 1px solid #d9d9d9;\n  z-index: 10;\n}\n.draggable-tabs-bar-horizontal-item .draggable-tabs-bar-wrapper:after {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 0;\n  right: -2px;\n  width: 0;\n  box-shadow: 0 0 10px 20px #fff;\n}\n.draggable-tabs-bar-horizontal-item .item-inner {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-flex: 1;\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: relative;\n  height: 100%;\n  overflow: hidden;\n  white-space: nowrap;\n  cursor: pointer;\n  font-size: 12px;\n  border-bottom: 2px solid transparent;\n}\n.draggable-tabs-bar-horizontal-item .close-wrapper {\n  position: absolute;\n  right: 3px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  margin-top: -1px;\n  color: rgba(0, 0, 0, 0.45);\n  font-size: 12px;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  -webkit-transform: scale(0.8);\n      -ms-transform: scale(0.8);\n          transform: scale(0.8);\n  cursor: pointer;\n  opacity: 0;\n  z-index: 1;\n  -webkit-transition: 300ms;\n  transition: 300ms;\n}\n.draggable-tabs-bar-horizontal-item .close-wrapper:hover {\n  background: #d9d9d9;\n}\n";
styleInject(css_248z$7);

var SortableItem = SortableElement(function (props) {
  var children = props.children;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames('draggable-tabs-bar-horizontal-item', props.className),
    style: props.style
  }, children);
});
var SortableContainerList = SortableContainer(function (props) {
  var className = props.className,
      dataSource = props.dataSource,
      activeKey = props.activeKey,
      itemClass = props.itemClass,
      onClose = props.onClose,
      _onClick = props.onClick,
      itemWrapper = props.itemWrapper,
      isSorting = props.isSorting,
      others = _objectWithoutProperties(props, ["className", "dataSource", "activeKey", "itemClass", "onClose", "onClick", "itemWrapper", "isSorting"]);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames('draggable-tabs-bar-root', className, {
      sorting: isSorting
    })
  }, others), dataSource.map(function (item, index) {
    var key = item.key,
        title = item.title,
        closable = item.closable;
    var isActive = activeKey === key; // ???????????????????????????

    if (dataSource.length <= 1) closable = false;
    var itemJsx = [/*#__PURE__*/React.createElement("div", {
      key: "item",
      className: "item-inner",
      onClick: function onClick(e) {
        return _onClick && _onClick(item, e);
      }
    }, title), closable ? /*#__PURE__*/React.createElement("div", {
      key: "close",
      className: "close-wrapper",
      onClick: function onClick(e) {
        return onClose && onClose(item, e);
      }
    }, /*#__PURE__*/React.createElement(CloseOutlined, null)) : null];

    if (itemWrapper) {
      itemJsx = itemWrapper(itemJsx, item, 'draggable-tabs-bar-wrapper');
    } else {
      itemJsx = /*#__PURE__*/React.createElement("div", {
        className: "draggable-tabs-bar-wrapper"
      }, itemJsx);
    }

    return /*#__PURE__*/React.createElement(SortableItem, {
      key: key,
      className: classNames(itemClass, {
        'active': isActive
      }),
      index: index
    }, /*#__PURE__*/React.createElement("div", {
      className: "draggable-tabs-bar-horizontal-item-inner"
    }, itemJsx));
  }));
});

var DraggableTabsBar = /*#__PURE__*/function (_Component) {
  _inherits(DraggableTabsBar, _Component);

  var _super = _createSuper(DraggableTabsBar);

  function DraggableTabsBar() {
    var _this;

    _classCallCheck(this, DraggableTabsBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      itemLength: 0,
      isSorting: false,
      mouseIn: false
    };

    _this.setTabsWidth = function () {
      if (!_this.container) return;
      var mouseIn = _this.state.mouseIn;
      var maxWidth = 150;

      var items = _this.container.querySelectorAll('.draggable-tabs-bar-horizontal-item-inner');

      var rootContainer = _this.container.querySelector('.draggable-tabs-bar-root');

      var itemCount = items.length;
      var rootContainerWidth = rootContainer.clientWidth;
      var maxCount = Math.floor(rootContainerWidth / maxWidth);

      if (!mouseIn) {
        if (itemCount <= maxCount) {
          // ?????????????????????tab??????????????????????????????????????????
          items.forEach(function (itemNode) {
            itemNode.style.width = "".concat(maxWidth, "px");
          });
        } else {
          // ?????????????????????????????????????????????
          items.forEach(function (itemNode) {
            itemNode.style.width = "".concat(rootContainerWidth / itemCount, "px");
          });
        }
      }
    };

    _this.onSortStart = function (info, event) {
      _this.setState({
        isSorting: true
      });

      var onSortStart = _this.props.onSortStart;

      if (onSortStart) {
        onSortStart(info, event);
      }
    };

    _this.onSortEnd = function (info, event) {
      _this.setState({
        isSorting: false
      });

      var onSortEnd = _this.props.onSortEnd;

      if (onSortEnd) {
        onSortEnd(info, event);
      }
    };

    _this.handleMouseEnter = function () {
      _this.setState({
        mouseIn: true
      });
    };

    _this.handleMouseLeave = function () {
      _this.setState({
        mouseIn: false
      }, _this.setTabsWidth);
    };

    return _this;
  }

  _createClass(DraggableTabsBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setTabsWidth();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var dataSource = this.props.dataSource;
      var prevDataSource = prevProps.dataSource; // tabs ???????????????????????????

      if (prevDataSource.length !== dataSource.length) {
        this.setTabsWidth();
      } // ?????????????????????????????????


      if (prevProps.parentWidth !== this.props.parentWidth) {
        setTimeout(function () {
          return _this2.setTabsWidth();
        }, 500);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          dataSource = _this$props.dataSource,
          activeKey = _this$props.activeKey,
          onClose = _this$props.onClose,
          onClick = _this$props.onClick,
          itemWrapper = _this$props.itemWrapper;
      var isSorting = this.state.isSorting;
      var props = {
        isSorting: isSorting,
        dataSource: dataSource,
        activeKey: activeKey,
        onSortEnd: this.onSortEnd,
        onSortStart: this.onSortStart,
        axis: 'x',
        distance: 1,
        ref: 'component',
        onClose: onClose,
        onClick: onClick,
        itemWrapper: itemWrapper
      };
      return /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%'
        },
        ref: function ref(node) {
          return _this3.container = node;
        },
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }, /*#__PURE__*/React.createElement(SortableContainerList, props));
    }
  }]);

  return DraggableTabsBar;
}(Component);

DraggableTabsBar.propTypes = {
  dataSource: PropTypes.array,
  className: PropTypes.string,
  activeKey: PropTypes.any,
  onSortStart: PropTypes.func,
  onSortEnd: PropTypes.func,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  itemWrapper: PropTypes.func,
  parentWidth: PropTypes.number
};
DraggableTabsBar.defaultProps = {
  className: classNames('list', 'stylizedList')
};

var ContextMenu = /*#__PURE__*/function (_Component) {
  _inherits(ContextMenu, _Component);

  var _super = _createSuper(ContextMenu);

  function ContextMenu() {
    var _this;

    _classCallCheck(this, ContextMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      left: 0,
      top: 0,
      contentResult: ''
    };

    _this.hideRightContent = function () {
      var onChange = _this.props.onChange;
      if (onChange) onChange(false);
    };

    _this.setContentPosition = function () {
      if (!_this.container) return;
      var event = _this.props.event;
      if (!event) return;
      var winWidth = document.documentElement.clientWidth || document.body.clientWidth;
      var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
      var contentWidth = _this.container.offsetWidth;
      var contentHeight = _this.container.offsetHeight;
      var left = event.clientX;
      var top = event.clientY;

      if (left >= winWidth - contentWidth) {
        left = winWidth - contentWidth;
      }

      if (top > winHeight - contentHeight) {
        top = winHeight - contentHeight;
      }

      _this.container.style.left = "".concat(left, "px");
      _this.container.style.top = "".concat(top, "px");
    };

    return _this;
  }

  _createClass(ContextMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this.hideRightContent);
      document.addEventListener('scroll', this.hideRightContent);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.hideRightContent, false);
      document.removeEventListener('scroll', this.hideRightContent, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          content = _this$props.content,
          visible = _this$props.visible;
      var _this$state = this.state,
          left = _this$state.left,
          top = _this$state.top;

      if (visible) {
        // ??????????????????????????????????????????????????????
        this.setContentPosition(); // ?????????????????????????????????????????? contentWidth

        setTimeout(this.setContentPosition);
      }

      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: visible ? 'block' : 'none',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 99999,
          width: 0,
          height: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        ref: function ref(node) {
          return _this2.container = node;
        },
        style: {
          left: left,
          top: top,
          position: 'absolute',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)'
        }
      }, content));
    }
  }]);

  return ContextMenu;
}(Component);

ContextMenu.propTypes = {
  content: PropTypes.any,
  // ????????????
  event: PropTypes.object,
  // ????????????
  visible: PropTypes.bool // ??????????????????

};

var css_248z$8 = ".style-module_root__364y- {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: end;\n  -webkit-align-items: flex-end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n  height: 100%;\n  box-shadow: 0 8px 0 0 #f0f2f5;\n}\n";
var styles$7 = {"root":"style-module_root__364y-"};
styleInject(css_248z$8);

var _class, _temp;
var UN_LISTEN;

var PageTabs = withRouter(_class = (_temp = /*#__PURE__*/function (_Component) {
  _inherits(PageTabs, _Component);

  var _super = _createSuper(PageTabs);

  function PageTabs(props) {
    var _this;

    _classCallCheck(this, PageTabs);

    _this = _super.call(this, props); // ?????????????????????
    
    _this.state = {
      contextVisible: false,
      contextEvent: null,
      contextMenu: ''
    };

    _this.handleClose = function (targetPath) {
      var _this$props = _this.props,
          layout = _this$props.action.layout,
          tabs = _this$props.layoutState.tabs;
      var activeTabIndex = tabs.findIndex(function (item) {
        return item.active;
      });
      var activeTab = tabs[activeTabIndex]; // ??????????????????tab

      if (activeTab.path === targetPath) {
        var nextIndex = activeTabIndex === 0 ? activeTabIndex + 1 : activeTabIndex - 1;
        var nextTab = tabs[nextIndex];

        _this.props.history.push(nextTab.path);
      }

      var nextTabs = tabs.filter(function (item) {
        return item.path !== targetPath;
      });
      layout.setTabs(nextTabs);
    };

    _this.handleSortEnd = function (_ref) {
      var oldIndex = _ref.oldIndex,
          newIndex = _ref.newIndex;

      var dataSource = _toConsumableArray(_this.props.layoutState.tabs); // ????????????


      dataSource.splice(newIndex, 0, dataSource.splice(oldIndex, 1)[0]);

      _this.props.action.layout.setTabs(dataSource);
    };

    _this.handleClick = function (item) {
      var separator = '/iframe_page_/';
      var path = item.path;
      
      //?????????????????????path???tab??????????????????????????????????????????
      // if (path.indexOf(separator) !== -1) {
      //   var url = window.encodeURIComponent(path.split(separator)[1]);
      //   path = "".concat(separator).concat(url);
      // }
      _this.props.history.push(path);
    };

    _this.handleRightClick = function (e, tab) {
      e.preventDefault();

      var contextMenu = _this.renderContextMenu(tab);

      _this.setState({
        contextVisible: true,
        contextEvent: {
          clientX: e.clientX,
          clientY: e.clientY
        },
        contextMenu: contextMenu
      });
    };

    _this.renderContextMenu = function (tab) {
      var layoutState = _this.props.layoutState;
      var dataSource = layoutState.tabs;
      var disabledClose = dataSource.length === 1;
      var tabIndex = dataSource.findIndex(function (item) {
        return item.path === tab.path;
      });
      var disabledCloseLeft = tabIndex === 0;
      var disabledCloseRight = tabIndex === dataSource.length - 1;
      return /*#__PURE__*/React.createElement(Menu, {
        selectable: false,
        onClick: function onClick(_ref2) {
          var action = _ref2.key;
          return _this.handleMenuClick(action, tab.path);
        }
      }, /*#__PURE__*/React.createElement(Menu.Item, {
        key: "close",
        disabled: disabledClose
      }, /*#__PURE__*/React.createElement(CloseOutlined, null), " \u5173\u95ED"), /*#__PURE__*/React.createElement(Menu.Item, {
        key: "closeOthers",
        disabled: disabledClose
      }, /*#__PURE__*/React.createElement(CloseCircleOutlined, null), " \u5173\u95ED\u5176\u4ED6"), /*#__PURE__*/React.createElement(Menu.Item, {
        key: "closeAll",
        disabled: disabledClose
      }, /*#__PURE__*/React.createElement(CloseSquareOutlined, null), " \u5173\u95ED\u6240\u6709"), /*#__PURE__*/React.createElement(Menu.Item, {
        key: "closeLeft",
        disabled: disabledCloseLeft
      }, /*#__PURE__*/React.createElement(VerticalLeftOutlined, null), " \u5173\u95ED\u5DE6\u4FA7"), /*#__PURE__*/React.createElement(Menu.Item, {
        key: "closeRight",
        disabled: disabledCloseRight
      }, /*#__PURE__*/React.createElement(VerticalRightOutlined, null), " \u5173\u95ED\u53F3\u4FA7"));
    };

    _this.handleMenuClick = function (action, targetPath) {
      var _this$props2 = _this.props,
          layout = _this$props2.action.layout,
          tabs = _this$props2.layoutState.tabs;
      if (action === 'close') _this.handleClose(targetPath);

      if (action === 'closeOthers') {
        var tab = tabs.find(function (item) {
          return item.path === targetPath;
        });
        var prevActiveTab = tabs.find(function (item) {
          return item.active;
        });
        tab.active = true;

        if (targetPath !== prevActiveTab.path) {
          _this.props.history.push(targetPath);
        }

        layout.setTabs([tab]);
      }

      if (action === 'closeAll') {
        layout.setTabs([]);

        _this.props.history.push(`${preRouter}`);
      }

      if (action === 'closeLeft') {
        var targetIndex = tabs.findIndex(function (item) {
          return item.path === targetPath;
        });
        var targetTab = tabs[targetIndex];
        var nextTabs = tabs.filter(function (item, index) {
          return index >= targetIndex;
        });

        if (!nextTabs.some(function (item) {
          return item.active;
        })) {
          targetTab.active = true;

          _this.props.history.push(targetTab.path);
        }

        layout.setTabs(nextTabs);
      }

      if (action === 'closeRight') {
        var _targetIndex = tabs.findIndex(function (item) {
          return item.path === targetPath;
        });

        var _targetTab = tabs[_targetIndex];

        var _nextTabs = tabs.filter(function (item, index) {
          return index <= _targetIndex;
        });

        if (!_nextTabs.some(function (item) {
          return item.active;
        })) {
          _targetTab.active = true;

          _this.props.history.push(_targetTab.path);
        }

        layout.setTabs(_nextTabs);
      }
    };

    setTimeout(function () {
      return _this.setTabs();
    });
    if (UN_LISTEN) UN_LISTEN();
    UN_LISTEN = _this.props.history.listen(function (e) {
      setTimeout(function () {
        return _this.setTabs();
      });
    });
    return _this;
  }

  _createClass(PageTabs, [{
    key: "setTabs",
    value: function setTabs() {
      var action = this.props.action;
      var _this$props$layoutSta = this.props.layoutState,
          selectedMenu = _this$props$layoutSta.selectedMenu,
          tabs = _this$props$layoutSta.tabs;
      var _this$props$location = this.props.location,
          pathname = _this$props$location.pathname,
          search = _this$props$location.search;
      var query = queryString.parse(search, {
        ignoreQueryPrefix: true
      });
      
      var tabTitle = query === null || query === void 0 ? void 0 : query.tabTitle;
      var text = tabTitle || (selectedMenu === null || selectedMenu === void 0 ? void 0 : selectedMenu.text);
      var icon = selectedMenu === null || selectedMenu === void 0 ? void 0 : selectedMenu.icon;
      var path = pathname + search;
      var exitTab = tabs.find(function (item) {
        return item.path === path;
      });
      tabs.forEach(function (item) {
        return item.active = false;
      });

      if (exitTab) {
        exitTab.text = exitTab.text || text;
        exitTab.icon = exitTab.icon || icon;
        exitTab.active = true;
      } else {
        //??????????????????
        tabs.push({
          path: path,
          text: text,
          icon: icon,
          active: true
        });
      }

      action.layout.setTabs(_toConsumableArray(tabs));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          layoutState = _this$props3.layoutState,
          width = _this$props3.width;
      var dataSource = layoutState.tabs;
      var _this$state = this.state,
          contextVisible = _this$state.contextVisible,
          contextEvent = _this$state.contextEvent,
          contextMenu = _this$state.contextMenu;
      var currentTab = dataSource.find(function (item) {
        return item.active;
      });
      var tabsBarDataSource = dataSource.map(function (item) {
        var tabTitle = item.text,
            path = item.path,
            icon = item.icon;
        var title = tabTitle;
        if (_typeof(tabTitle) === 'object' && tabTitle.text) title = tabTitle.text;
        if (tabTitle === null || tabTitle === void 0 ? void 0 : tabTitle.icon) icon = tabTitle.icon;
        if (icon) title = /*#__PURE__*/React.createElement("div", {
          style: {
            flex: 1,
            textAlign: 'center'
          }
        }, /*#__PURE__*/React.createElement(Icon, {
          type: icon,
          style: {
            marginRight: 4
          }
        }), title);
        return _objectSpread2({
          key: path,
          title: title,
          closable: true
        }, item);
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(styles$7.root, " page-tabs-root")
      }, /*#__PURE__*/React.createElement(ContextMenu, {
        visible: contextVisible,
        onChange: function onChange(contextVisible) {
          return _this2.setState({
            contextVisible: contextVisible
          });
        },
        event: contextEvent,
        content: contextMenu
      }), /*#__PURE__*/React.createElement(DraggableTabsBar, {
        dataSource: tabsBarDataSource,
        itemWrapper: function itemWrapper(itemJsx, item, wrapperClassName) {
          return /*#__PURE__*/React.createElement("div", {
            className: wrapperClassName,
            onContextMenu: function onContextMenu(e) {
              return _this2.handleRightClick(e, item);
            }
          }, itemJsx);
        },
        onSortEnd: this.handleSortEnd,
        onClose: function onClose(_ref3) {
          var path = _ref3.path;
          return _this2.handleClose(path);
        },
        onClick: this.handleClick,
        activeKey: currentTab === null || currentTab === void 0 ? void 0 : currentTab.path,
        parentWidth: width
      }));
    }
  }]);

  return PageTabs;
}(Component), _temp)) || _class;

var css_248z$9 = "body {\n  -webkit-transition: padding-left 0.3s;\n  transition: padding-left 0.3s;\n}\n.style-module_baseFrame__iRSH0 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0;\n      -ms-flex: 0;\n          flex: 0;\n}\n.style-module_header__1bgfn {\n  position: fixed;\n  z-index: 999;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 50px;\n  line-height: 50px;\n  padding-right: 16px;\n  background: #fff;\n  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);\n}\n.style-module_header__1bgfn .style-module_right__34gJk {\n  float: right;\n  height: 100%;\n}\n.style-module_logo__2rpsT {\n  float: left;\n  display: inline-block;\n  height: 50px;\n  line-height: 50px;\n  position: relative;\n  background: #002140;\n  overflow: hidden;\n}\n.style-module_logo__2rpsT h1 {\n  color: #fff;\n}\n.style-module_trigger__2frp7 {\n  float: left;\n  font-size: 20px;\n  line-height: 50px;\n  cursor: pointer;\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  padding: 0 24px;\n}\n.style-module_trigger__2frp7:hover {\n  background: #e6f7ff;\n}\n.style-module_side__2n1Ph {\n  position: fixed;\n  z-index: 999;\n  top: 50px;\n  left: 0;\n  bottom: 0;\n  width: 200px;\n  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);\n  background: #001529;\n  -webkit-transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;\n  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;\n}\n.style-module_side__2n1Ph .style-module_outer__214yW {\n  position: absolute;\n  width: 100%;\n  top: 0;\n  bottom: 0;\n  overflow: hidden;\n}\n.style-module_side__2n1Ph .style-module_inner__7cN0X {\n  position: relative;\n  height: 100%;\n  overflow-x: visible;\n  overflow-y: scroll;\n}\n.style-module_side__2n1Ph .react-draggable {\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.style-module_contentTopSpace__1QR2h {\n  position: relative;\n  height: 50px;\n  background: #f0f2f5;\n}\n.style-module_contentTopSpace__1QR2h.style-module_withFixedPageHead__1AZfG {\n  height: 95px;\n}\n.style-module_contentTopSpace__1QR2h.style-module_withTabs__8FSkl {\n  height: 85px;\n}\n.style-module_contentTopSpace__1QR2h.style-module_withFixedPageHead__1AZfG.style-module_withTabs__8FSkl {\n  height: 130px;\n}\n.style-module_headFixed__2X8Rc {\n  position: fixed;\n  right: 0;\n  top: 50px;\n  background: #fff;\n  z-index: 998;\n}\n.style-module_headFixed__2X8Rc.style-module_withTabs__8FSkl {\n  top: 85px;\n}\n.style-module_pageTabs__2Wl5a {\n  position: fixed;\n  right: 0;\n  top: 50px;\n  height: 35px;\n  background: #fff;\n  z-index: 998;\n  padding-right: 16px;\n}\n.style-module_footer__3Lmgl {\n  position: absolute;\n  bottom: 10px;\n  left: 0;\n  right: 0;\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n}\n.style-module_globalLoading__2uEFI {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: rgba(255, 255, 255, 0.5);\n  z-index: 99999;\n  cursor: not-allowed;\n  text-align: center;\n}\n";
var styles$8 = {"baseFrame":"style-module_baseFrame__iRSH0","header":"style-module_header__1bgfn","right":"style-module_right__34gJk","logo":"style-module_logo__2rpsT","trigger":"style-module_trigger__2frp7","side":"style-module_side__2n1Ph","outer":"style-module_outer__214yW","inner":"style-module_inner__7cN0X","contentTopSpace":"style-module_contentTopSpace__1QR2h","withFixedPageHead":"style-module_withFixedPageHead__1AZfG","withTabs":"style-module_withTabs__8FSkl","headFixed":"style-module_headFixed__2X8Rc","pageTabs":"style-module_pageTabs__2Wl5a","footer":"style-module_footer__3Lmgl","globalLoading":"style-module_globalLoading__2uEFI"};
styleInject(css_248z$9);

var UN_LISTEN$1;

var FrameTopSideMenu = /*#__PURE__*/function (_Component) {
  _inherits(FrameTopSideMenu, _Component);

  var _super = _createSuper(FrameTopSideMenu);

  function FrameTopSideMenu() {
    var _this;

    _classCallCheck(this, FrameTopSideMenu);

    for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(props));
    _this.state = {};
    var layout = _this.props.action.layout;

    var setMenuStatus = function setMenuStatus() {
      layout.getMenuStatus();
      var isMobile = _this.props.layoutState.isMobile;

      _this.setTitleAndBreadcrumbs();

      if (isMobile) {
        layout.setSideCollapsed(true);
        layout.showSide();
      }
    };

    setMenuStatus();
    if (UN_LISTEN$1) UN_LISTEN$1(); // frame ???????????????????????????????????????

    UN_LISTEN$1 = _this.props.history.listen(function (e) {
      // ??????timeout?????????tab????????????????????????????????????render???????????????????????????
      setMenuStatus();
    });
    return _this;
  }

  _createClass(FrameTopSideMenu, [{
    key: "setTitleAndBreadcrumbs",
    value: function setTitleAndBreadcrumbs() {
      var layout = this.props.action.layout;
      var _this$props$layoutSta = this.props.layoutState,
          menus = _this$props$layoutSta.menus,
          prevTitle = _this$props$layoutSta.title,
          prevBreadcrumbs = _this$props$layoutSta.breadcrumbs;
      var selectedMenu = getSelectedMenuByPath(window.location.pathname, menus);
      var breadcrumbs = [];
      var title = '';
      if (selectedMenu) {
        title = {
          text: selectedMenu.text
        };

        if (selectedMenu.parentNodes) {
          
          breadcrumbs = selectedMenu.parentNodes.map(function (item) {
            return {
              key: item.key,
              icon: item.icon,
              text: item.text,
              path: item.path
            };
          });
        }

        if (selectedMenu.path !== `${preRouter}`) {
          breadcrumbs.unshift({
            key: 'index',
            icon: 'home',
            text: '??????',
            path: `${preRouter}`
          });
        }

        breadcrumbs.push({
          key: selectedMenu.key,
          icon: selectedMenu.icon,
          text: selectedMenu.text
        });
      } // ??????????????????????????????????????????????????????????????????????????????????????????


      if (!breadcrumbs.length && prevBreadcrumbs && prevBreadcrumbs.length) {
        layout.setBreadcrumbs(prevBreadcrumbs);
      } else {
        layout.setBreadcrumbs(breadcrumbs);
      } // ??????????????????????????????????????????????????????????????????????????????????????????


      if (!title && prevTitle) {
        layout.setTitle(prevTitle);
      } else {
        layout.setTitle(title);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          layoutState = _this$props.layoutState,
          action = _this$props.action,
          headerRight = _this$props.headerRight,
          logo = _this$props.logo;
      var theme = layoutState.theme,
          primaryColor = layoutState.primaryColor,
          showHead = layoutState.showHead,
          title = layoutState.title,
          breadcrumbs = layoutState.breadcrumbs,
          sideCurrentWidth = layoutState.sideCurrentWidth,
          sideDragging = layoutState.sideDragging,
          globalLoading = layoutState.loading,
          globalLoadingTip = layoutState.loadingTip,
          layout = layoutState.pageFrameLayout,
          headFixed = layoutState.headFixed,
          showTabs = layoutState.showTabs,
          isMobile = layoutState.isMobile;
      var transitionDuration = sideDragging ? '0ms' : "0.3s";
      if (isMobile) layout = PAGE_FRAME_LAYOUT.SIDE_MENU;
      window.document.body.style.paddingLeft = "".concat(sideCurrentWidth, "px");

      if (isMobile) {
        showHead = true;
        headFixed = true;
        showTabs = false;
      }

      var pageHead = null;

      if (showHead) {
        pageHead = /*#__PURE__*/React.createElement(PageHead, {
          title: title,
          breadcrumbs: breadcrumbs
        });

        if (headFixed) {
          pageHead = /*#__PURE__*/React.createElement("div", {
            style: {
              left: sideCurrentWidth ? sideCurrentWidth + 1 : 0,
              transitionDuration: transitionDuration
            },
            className: ['frame-page-head-fixed', styles$8.headFixed, showTabs ? styles$8.withTabs : ''].join(' ')
          }, pageHead);
        }
      }

      var titleText = _typeof(title) === 'object' ? title === null || title === void 0 ? void 0 : title.text : title;
      var titleIsString = typeof titleText === 'string';
      var topSpaceClass = [styles$8.contentTopSpace];
      if (showHead && pageHead && headFixed) topSpaceClass.push(styles$8.withFixedPageHead);
      if (showTabs) topSpaceClass.push(styles$8.withTabs);
      var windowWidth = window.innerWidth;
      return /*#__PURE__*/React.createElement("div", {
        className: [styles$8.baseFrame, 'no-print'].join(' ')
      }, /*#__PURE__*/React.createElement(Helmet, {
        title: titleIsString ? titleText : ''
      }), /*#__PURE__*/React.createElement(Header, {
        layout: layout,
        logo: logo,
        headerRight: headerRight,
        action: action,
        layoutState: layoutState
      }), /*#__PURE__*/React.createElement(Side, {
        layout: layout,
        theme: theme,
        action: action,
        layoutState: layoutState
      }), /*#__PURE__*/React.createElement("div", {
        className: topSpaceClass.join(' ')
      }), pageHead, showTabs ? /*#__PURE__*/React.createElement("div", {
        className: styles$8.pageTabs,
        id: "frame-page-tabs",
        style: {
          left: sideCurrentWidth + 1,
          width: windowWidth - sideCurrentWidth,
          transitionDuration: transitionDuration
        }
      }, /*#__PURE__*/React.createElement(PageTabs, {
        action: action,
        width: windowWidth - sideCurrentWidth,
        layoutState: layoutState
      })) : null, /*#__PURE__*/React.createElement("div", {
        className: styles$8.globalLoading,
        style: {
          display: globalLoading ? 'flex' : 'none'
        }
      }, /*#__PURE__*/React.createElement(Spin, {
        spinning: true,
        tip: globalLoadingTip
      })), /*#__PURE__*/React.createElement(BackTop, {
        style: {
          right: 40
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          lineHeight: '40px',
          right: 40,
          background: primaryColor,
          borderRadius: 4,
          color: '#fff',
          textAlign: 'center',
          fontSize: 18
        }
      }, /*#__PURE__*/React.createElement(VerticalAlignTopOutlined, null))));
    }
  }]);

  return FrameTopSideMenu;
}(Component);

FrameTopSideMenu.propTypes = {
  layout: PropTypes.string,
  headerRight: PropTypes.any,
  logo: PropTypes.any
};
FrameTopSideMenu.defaultProps = {
  layout: PAGE_FRAME_LAYOUT.SIDE_MENU // top-menu side-menu

};

function Footer (props) {
  var _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      others = _objectWithoutProperties(props, ["style"]);

  return /*#__PURE__*/React.createElement("div", _extends({
    style: _objectSpread2({
      textAlign: 'center'
    }, style)
  }, others), "Copyright ", /*#__PURE__*/React.createElement(CopyrightOutlined, null), " xxx 2019");
}

var css_248z$a = ".style-module_pageContentRoot__L2h99 {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.style-module_pageContentRoot__L2h99:focus {\n  outline: none;\n}\n.style-module_pageContent__1oMEF {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin: 8px;\n  padding: 8px;\n  background: #fff;\n}\n.style-module_footer__1-91L {\n  margin-bottom: 16px;\n}\n.style-module_pageLoading__36Ufr {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: rgba(255, 255, 255, 0.3);\n  z-index: 99999;\n  cursor: not-allowed;\n  text-align: center;\n}\n.style-module_pageLoading__36Ufr > div {\n  position: absolute;\n  top: 30%;\n}\n";
var styles$9 = {"pageContentRoot":"style-module_pageContentRoot__L2h99","pageContent":"style-module_pageContent__1oMEF","footer":"style-module_footer__1-91L","pageLoading":"style-module_pageLoading__36Ufr"};
styleInject(css_248z$a);

/**
 * ???????????? ??????
 * 1. ????????????padding???background?????????
 * 1. ????????????????????????FixBottom????????????????????????
 * 1. ??????????????????footer
 */

var PageContent = /*#__PURE__*/function (_Component) {
  _inherits(PageContent, _Component);

  var _super = _createSuper(PageContent);

  function PageContent() {
    var _this;

    _classCallCheck(this, PageContent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      height: 'auto'
    };

    _this.setHeight = function () {
      var _window$getComputedSt;

      if (!_this.contentDom) return;
      var otherHeight = _this.props.otherHeight;
      var offsetTop = getElementTop(_this.contentDom);
      var windowHeight = document.documentElement.clientHeight;
      var marginBottom = window.parseInt((_window$getComputedSt = window.getComputedStyle(_this.contentDom)) === null || _window$getComputedSt === void 0 ? void 0 : _window$getComputedSt.marginBottom, 10) || 0;
      var height = windowHeight - offsetTop - marginBottom - otherHeight;

      _this.setState({
        height: height
      });
    };

    return _this;
  }

  _createClass(PageContent, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.fitHeight && window.removeEventListener('resize', this.setHeight);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.fitHeight) {
        this.setHeight();
        window.addEventListener('resize', this.setHeight);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          footer = _this$props.footer,
          loading = _this$props.loading,
          loadingTip = _this$props.loadingTip,
          children = _this$props.children,
          action = _this$props.action,
          className = _this$props.className,
          fitHeight = _this$props.fitHeight,
          style = _this$props.style,
          otherHeight = _this$props.otherHeight,
          others = _objectWithoutProperties(_this$props, ["footer", "loading", "loadingTip", "children", "action", "className", "fitHeight", "style", "otherHeight"]);

      var height = this.state.height;
      var hasFixBottom = false;
      React.Children.map(children, function (item) {
        if (item && item.type && item.type.__FIX_BOTTOM) hasFixBottom = true;
      }, null);
      var rootStyle = {
        width: '100%'
      };

      if (hasFixBottom) {
        rootStyle.marginBottom = '66px';
      }

      var contentStyle = {};

      if (fitHeight) {
        contentStyle = {
          flex: "0 0 ".concat(height, "px"),
          height: height,
          overflowY: 'auto'
        };
      }

      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(node) {
          return _this2.root = node;
        },
        style: rootStyle,
        className: "".concat(styles$9.pageContentRoot, " sx-page-content-root")
      }, /*#__PURE__*/React.createElement("div", {
        className: "".concat(styles$9.pageLoading, " sx-page-content-loading"),
        style: {
          display: loading ? 'block' : 'none'
        }
      }, /*#__PURE__*/React.createElement(Spin, {
        spinning: true,
        tip: loadingTip
      })), /*#__PURE__*/React.createElement("div", _extends({
        ref: function ref(node) {
          return _this2.contentDom = node;
        },
        style: _objectSpread2(_objectSpread2({}, contentStyle), style),
        className: "".concat(className, " ").concat(styles$9.pageContent, " sx-page-content")
      }, others), children), footer ? /*#__PURE__*/React.createElement("div", {
        className: styles$9.footer
      }, /*#__PURE__*/React.createElement(Footer, null)) : null);
    }
  }]);

  return PageContent;
}(Component);

PageContent.propTypes = {
  loading: PropTypes.bool,
  loadingTip: PropTypes.any,
  footer: PropTypes.bool,
  fitHeight: PropTypes.bool,
  otherHeight: PropTypes.number
};
PageContent.defaultProps = {
  footer: false,
  otherHeight: 0
};

var Index = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index() {
    var _this;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(props));
    NProgress.start();
    return _this;
  }

  _createClass(Index, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      NProgress.done();
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
      return /*#__PURE__*/React.createElement("div", {
        style: style
      }, /*#__PURE__*/React.createElement(Spin, {
        spinning: true
      }));
    }
  }]);

  return Index;
}(Component);

/**
 * ??????????????????
 * @param count ???????????????????????????
 * @returns {Promise<unknown>}
 */

function batchDeleteConfirm(count) {
  var content = /*#__PURE__*/React.createElement("div", null, "\u60A8\u786E\u5B9A\u5220\u9664", /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '0 5px',
      color: 'red',
      fontSize: 18
    }
  }, count), "\u6761\u8BB0\u5F55\u5417\uFF1F");
  return new Promise(function (resolve, reject) {
    Modal.confirm({
      title: '????????????',
      content: content,
      icon: /*#__PURE__*/React.createElement(ExclamationCircleOutlined, null),
      okType: 'danger',
      okText: '??????',
      cancelText: '??????',
      onOk: function onOk() {
        return resolve(true);
      },
      onCancel: function onCancel() {
        return reject('user cancel confirm');
      }
    });
  });
}

/**
 * confirm ??????
 * @param title ??????
 * @param content ??????
 * @returns {Promise<unknown>}
 */

var index$1 = /*#__PURE__*/(function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var title, content;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            title = _ref.title, content = _ref.content;
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              Modal.confirm({
                icon: /*#__PURE__*/React.createElement(QuestionCircleOutlined, null),
                title: title,
                content: /*#__PURE__*/React.createElement("div", {
                  style: {
                    marginTop: 8,
                    fontSize: 14,
                    color: 'red'
                  }
                }, content),
                okText: '??????',
                cancelText: '??????',
                onOk: function onOk() {
                  return resolve();
                },
                onCancel: function onCancel() {
                  return reject('????????????');
                }
              });
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();

var ContextMenu$1 = /*#__PURE__*/function (_Component) {
  _inherits(ContextMenu, _Component);

  var _super = _createSuper(ContextMenu);

  function ContextMenu() {
    var _this;

    _classCallCheck(this, ContextMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      left: 0,
      top: 0,
      contentResult: '',
      visible: false,
      event: null
    };

    _this.hideRightContent = function () {
      _this.setState({
        visible: false
      });
    };

    _this.setContentPosition = function () {
      if (!_this.container) return;
      var event = _this.state.event;
      if (!event) return;
      var winWidth = document.documentElement.clientWidth || document.body.clientWidth;
      var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
      var contentWidth = _this.container.offsetWidth;
      var contentHeight = _this.container.offsetHeight;
      var left = event.clientX;
      var top = event.clientY;

      if (left >= winWidth - contentWidth) {
        left = winWidth - contentWidth;
      }

      if (top > winHeight - contentHeight) {
        top = winHeight - contentHeight;
      }

      _this.container.style.left = "".concat(left, "px");
      _this.container.style.top = "".concat(top, "px");
    };

    _this.handleContextMenu = function (e) {
      e.persist();
      e.preventDefault();

      _this.setState({
        visible: true,
        event: e
      });
    };

    return _this;
  }

  _createClass(ContextMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this.hideRightContent);
      document.addEventListener('scroll', this.hideRightContent);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.hideRightContent, false);
      document.removeEventListener('scroll', this.hideRightContent, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          content = _this$props.content,
          children = _this$props.children;
      var _this$state = this.state,
          left = _this$state.left,
          top = _this$state.top,
          visible = _this$state.visible;

      if (visible) {
        // ??????????????????????????????????????????????????????
        this.setContentPosition(); // ?????????????????????????????????????????? contentWidth

        setTimeout(this.setContentPosition);
      }

      children = children ? /*#__PURE__*/React.cloneElement(children, {
        onContextMenu: this.handleContextMenu
      }) : null;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: visible ? 'block' : 'none',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 99999,
          width: 0,
          height: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        ref: function ref(node) {
          return _this2.container = node;
        },
        style: {
          left: left,
          top: top,
          position: 'absolute',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)'
        }
      }, content)), children);
    }
  }]);

  return ContextMenu;
}(Component);

ContextMenu$1.propTypes = {
  content: PropTypes.any // ????????????

};

var css_248z$b = ".style-module_fixBottom__23E-i {\n  z-index: 998;\n  position: fixed;\n  left: 256px;\n  bottom: 0;\n  right: 0;\n  padding: 0 16px;\n  height: 50px;\n  line-height: 50px;\n  background: #fff;\n  box-shadow: 1px 0 4px rgba(0, 21, 41, 0.08);\n  -webkit-transition: left 300ms;\n  transition: left 300ms;\n}\n";
var styles$a = {"fixBottom":"style-module_fixBottom__23E-i"};
styleInject(css_248z$b);

var FixBottom = /*#__PURE__*/function (_Component) {
  _inherits(FixBottom, _Component);

  var _super = _createSuper(FixBottom);

  function FixBottom() {
    _classCallCheck(this, FixBottom);

    return _super.apply(this, arguments);
  }

  _createClass(FixBottom, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          right = _this$props.right,
          sideCurrentWidth = _this$props.sideCurrentWidth,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style,
          _this$props$styleName = _this$props.styleName,
          styleName = _this$props$styleName === void 0 ? '' : _this$props$styleName,
          _this$props$className = _this$props.className,
          className = _this$props$className === void 0 ? '' : _this$props$className,
          children = _this$props.children,
          action = _this$props.action,
          others = _objectWithoutProperties(_this$props, ["right", "sideCurrentWidth", "style", "styleName", "className", "children", "action"]);

      style = _objectSpread2({
        left: sideCurrentWidth,
        textAlign: right ? 'right' : 'left'
      }, style);
      return /*#__PURE__*/React.createElement("div", _extends({}, others, {
        className: [styles$a.fixBottom, styleName, className].join(' '),
        style: style
      }), React.Children.map(children, function (item) {
        // ??????????????????antd button ?????????????????????
        if (item && item.type.__ANT_BUTTON) {
          var _style = right ? {
            marginLeft: '8px'
          } : {
            marginRight: '8px'
          };

          _style = _objectSpread2(_objectSpread2({}, _style), item.props.style);
          return /*#__PURE__*/cloneElement(item, {
            style: _style
          });
        }

        return item;
      }));
    }
  }]);

  return FixBottom;
}(Component);

FixBottom.__FIX_BOTTOM = true;
FixBottom.propTypes = {
  /** ???????????????????????????????????????true */
  right: PropTypes.bool // ??????????????????????????????

};
FixBottom.defaultProps = {
  right: true
};

/**
 * ?????????????????????name src?????????????????????
 * ??????src???????????????img??????
 * ??????src??????????????????name[0] ??????????????????span???????????????????????????????????????
 */

var UserAvatar = /*#__PURE__*/function (_Component) {
  _inherits(UserAvatar, _Component);

  var _super = _createSuper(UserAvatar);

  function UserAvatar() {
    _classCallCheck(this, UserAvatar);

    return _super.apply(this, arguments);
  }

  _createClass(UserAvatar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$name = _this$props.name,
          name = _this$props$name === void 0 ? 'unknown' : _this$props$name,
          src = _this$props.src,
          icon = _this$props.icon,
          others = _objectWithoutProperties(_this$props, ["name", "src", "icon"]);

      if (icon === true) return /*#__PURE__*/React.createElement(UserOutlined, {
        style: {
          marginRight: 5
        }
      });
      if (src) return /*#__PURE__*/React.createElement(Avatar, _extends({}, others, {
        src: src
      }));
      var nameFirstChar = name[0];
      var colors = ['rgb(80, 193, 233)', 'rgb(255, 190, 26)', 'rgb(228, 38, 146)', 'rgb(169, 109, 243)', 'rgb(253, 117, 80)', 'rgb(103, 197, 12)', 'rgb(80, 193, 233)', 'rgb(103, 197, 12)'];
      var backgroundColor = colors[nameFirstChar.charCodeAt(0) % colors.length];
      if (!others.style) others.style = {};
      others.style.backgroundColor = backgroundColor;
      others.style.verticalAlign = 'middle';
      return /*#__PURE__*/React.createElement(Avatar, others, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14,
          fontWeight: 'bold'
        }
      }, nameFirstChar.toUpperCase()));
    }
  }]);

  return UserAvatar;
}(Component);

UserAvatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string
};

var UserLink = function UserLink(props) {
  var _user, _user2, _user3;

  var user = props.user,
      size = props.size,
      showAvatar = props.showAvatar,
      link = props.link,
      vertical = props.vertical,
      _props$nameStyle = props.nameStyle,
      nameStyle = _props$nameStyle === void 0 ? {} : _props$nameStyle;
  if (!user) user = {
    name: '????????????'
  };
  var children = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: vertical ? 'center' : 'flex-start'
    }
  }, showAvatar ? /*#__PURE__*/React.createElement(UserAvatar, {
    src: (_user = user) === null || _user === void 0 ? void 0 : _user.avatar,
    name: (_user2 = user) === null || _user2 === void 0 ? void 0 : _user2.name,
    size: size
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: _objectSpread2({
      marginLeft: vertical ? 0 : 8,
      marginTop: vertical ? 8 : 0
    }, nameStyle)
  }, (_user3 = user) === null || _user3 === void 0 ? void 0 : _user3.name));

  if (link) {
    var _user4;

    return /*#__PURE__*/React.createElement(Link, {
      to: "/users/".concat((_user4 = user) === null || _user4 === void 0 ? void 0 : _user4.id)
    }, children);
  }

  return children;
};

UserLink.propTypes = {
  user: PropTypes.object,
  size: PropTypes.any,
  showAvatar: PropTypes.bool,
  link: PropTypes.bool,
  vertical: PropTypes.bool
};
UserLink.defaultProps = {
  showAvatar: true,
  link: false,
  vertical: false
};

var css_248z$c = ".style-module_empty__kUPYP {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 100%;\n  height: 100%;\n}\n.style-module_expandAll__Hfmx7 {\n  margin-bottom: 8px;\n}\n.style-module_box__JlJjN {\n  position: relative;\n  height: 100%;\n  width: 100%;\n}\n.style-module_top__20-cN {\n  height: 40px;\n}\n.style-module_content__1RSm0 {\n  position: absolute;\n  top: 40px;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow: auto;\n}\n.style-module_treeNodeTitle__1NIxN .style-module_title__jjyNI {\n  display: inline-block;\n}\n.style-module_treeNodeTitle__1NIxN .style-module_icons__2UrLw {\n  display: inline-block;\n  opacity: 0;\n  margin-left: 8px;\n  -webkit-transition: opacity 300ms;\n  transition: opacity 300ms;\n}\n.style-module_treeNodeTitle__1NIxN:hover .style-module_icons__2UrLw {\n  opacity: 1;\n}\n.style-module_treeNodeTitle__1NIxN .anticon {\n  padding: 0 4px;\n}\n.style-module_treeNodeTitle__1NIxN .anticon:hover {\n  opacity: 0.5;\n}\n";
var styles$b = {"empty":"style-module_empty__kUPYP","expandAll":"style-module_expandAll__Hfmx7","box":"style-module_box__JlJjN","top":"style-module_top__20-cN","content":"style-module_content__1RSm0","treeNodeTitle":"style-module_treeNodeTitle__1NIxN","title":"style-module_title__jjyNI","icons":"style-module_icons__2UrLw"};
styleInject(css_248z$c);

var _dec, _class$1, _class2, _temp$1;
var TreeNode = Tree.TreeNode;
var TreeModal = (_dec = model$1({
  title: '??????',
  width: 500
}), _dec(_class$1 = (_temp$1 = _class2 = /*#__PURE__*/function (_React$Component) {
  _inherits(TreeModal, _React$Component);

  var _super = _createSuper(TreeModal);

  function TreeModal() {
    var _this;

    _classCallCheck(this, TreeModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      expandAll: false,
      expandedKeys: [],
      checkedKeysStr: '',
      editKey: null,
      editValue: ''
    };

    _this.handleOk = function () {
      var onOk = _this.props.onOk;
      var checkedKeys = _this.state.checkedKeys;
      onOk && onOk(checkedKeys);
    };

    _this.handleBlur = function () {
      setTimeout(function () {
        _this.setState({
          editKey: null,
          editValue: ''
        });
      }, 100);
    };

    _this.handleSave = function () {
      var _this$state = _this.state,
          editKey = _this$state.editKey,
          editValue = _this$state.editValue;
      var onSave = _this.props.onSave;
      onSave && onSave(editKey, editValue);
    };

    _this.handleDelete = function (key) {
      var onDelete = _this.props.onDelete;
      onDelete && onDelete(key);
    };

    _this.handleAdd = function (key) {
      var onAdd = _this.props.onAdd;
      onAdd && onAdd(key);
    };

    _this.handleExpandAll = function () {
      var options = _this.props.options;
      var expandAll = _this.state.expandAll;
      var nextExpandAll = !expandAll;
      var expandedKeys = nextExpandAll ? options.map(function (item) {
        return item.key;
      }) : [];

      _this.setState({
        expandAll: nextExpandAll,
        expandedKeys: expandedKeys
      });
    };

    _this.renderTreeNodes = function () {
      var options = _this.props.options;
      var editKey = _this.state.editKey;
      if (!(options === null || options === void 0 ? void 0 : options.length)) return null;

      var loop = function loop(nodes) {
        return nodes.map(function (node) {
          var key = node.key,
              title = node.title;
          var children = options.filter(function (item) {
            return item.parentKey === key;
          });
          var isEdit = editKey === key;
          var nodeTitle = isEdit ? /*#__PURE__*/React.createElement(Input, {
            id: "input_".concat(key),
            defaultValue: title,
            autoFocus: true,
            onBlur: _this.handleBlur,
            onChange: function onChange(e) {
              return _this.setState({
                editValue: e.target.value
              });
            },
            onClick: function onClick(e) {
              e.preventDefault();
              e.stopPropagation();
            }
          }) : title;
          nodeTitle = /*#__PURE__*/React.createElement("div", {
            className: styles$b.treeNodeTitle
          }, /*#__PURE__*/React.createElement("div", {
            className: styles$b.title
          }, nodeTitle), /*#__PURE__*/React.createElement("div", {
            className: styles$b.icons,
            onClick: function onClick(e) {
              e.preventDefault();
              e.stopPropagation();
            }
          }, isEdit ? /*#__PURE__*/React.createElement(SaveOutlined, {
            style: {
              color: 'green'
            },
            onClick: function onClick() {
              return _this.handleSave();
            }
          }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EditOutlined, {
            style: {
              color: '#f1882a'
            },
            onClick: function onClick() {
              return _this.setState({
                editKey: key,
                editValue: title
              });
            }
          }), /*#__PURE__*/React.createElement(Popconfirm, {
            title: "\u60A8\u786E\u5B9A\u5220\u9664\u6807\u7B7E\u300C".concat(title, "\u300D\u5417"),
            onConfirm: function onConfirm() {
              return _this.handleDelete(key);
            }
          }, /*#__PURE__*/React.createElement(DeleteOutlined, {
            style: {
              color: 'red'
            }
          })), /*#__PURE__*/React.createElement(PlusOutlined, {
            style: {
              color: 'green'
            },
            onClick: function onClick() {
              return _this.handleAdd(key);
            }
          }))));

          if (children === null || children === void 0 ? void 0 : children.length) {
            return /*#__PURE__*/React.createElement(TreeNode, {
              key: key,
              title: nodeTitle
            }, loop(children));
          }

          return /*#__PURE__*/React.createElement(TreeNode, {
            key: key,
            title: nodeTitle
          });
        });
      };

      return loop(options.filter(function (item) {
        return !item.parentKey;
      }));
    };

    return _this;
  }

  _createClass(TreeModal, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          onCancel = _this$props.onCancel,
          options = _this$props.options;
      var _this$state2 = this.state,
          expandedKeys = _this$state2.expandedKeys,
          checkedKeys = _this$state2.checkedKeys,
          expandAll = _this$state2.expandAll;
      return /*#__PURE__*/React.createElement(ModalContent, {
        surplusSpace: true,
        onOk: this.handleOk,
        onCancel: onCancel
      }, (options === null || options === void 0 ? void 0 : options.length) ? /*#__PURE__*/React.createElement("div", {
        className: styles$b.box
      }, /*#__PURE__*/React.createElement("div", {
        className: styles$b.top
      }, /*#__PURE__*/React.createElement(Button, {
        className: styles$b.expandAll,
        size: "small",
        type: "primary",
        onClick: function onClick() {
          return _this2.handleExpandAll();
        }
      }, expandAll ? '????????????' : '????????????')), /*#__PURE__*/React.createElement("div", {
        className: styles$b.content
      }, /*#__PURE__*/React.createElement(Tree, {
        selectable: false,
        defaultExpandAll: true,
        expandedKeys: expandedKeys,
        onExpand: function onExpand(expandedKeys) {
          return _this2.setState({
            expandedKeys: expandedKeys
          });
        },
        checkStrictly: true,
        checkable: true,
        checkedKeys: checkedKeys,
        onCheck: function onCheck(info) {
          var checkedKeys = info.checked;

          _this2.setState({
            checkedKeys: checkedKeys
          });
        }
      }, this.renderTreeNodes()))) : /*#__PURE__*/React.createElement("div", {
        className: styles$b.empty
      }, /*#__PURE__*/React.createElement(Empty, {
        description: "\u6682\u65E0\u4EFB\u4F55\u6807\u7B7E"
      }, /*#__PURE__*/React.createElement(Button, {
        type: "primary",
        onClick: function onClick() {
          return _this2.handleAdd();
        }
      }, /*#__PURE__*/React.createElement(PlusOutlined, null), " \u521B\u5EFA\u6807\u7B7E"))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var _nextProps$checkedKey = nextProps.checkedKeys,
          checkedKeys = _nextProps$checkedKey === void 0 ? [] : _nextProps$checkedKey,
          options = nextProps.options;
      var checkedKeysStr = checkedKeys.join(',');
      var nextState = null;

      if (checkedKeysStr !== prevState.checkedKeysStr) {
        nextState = {};
        nextState.checkedKeys = checkedKeys;
        nextState.expandedKeys = checkedKeys;
        nextState.checkedKeysStr = checkedKeysStr;
      }

      if (options === null || options === void 0 ? void 0 : options.length) {
        var _nextState;

        var expandedKeys = ((_nextState = nextState) === null || _nextState === void 0 ? void 0 : _nextState.expandedKeys) || [];
        options.forEach(function (item) {
          var isNew = item.isNew,
              parentKey = item.parentKey;

          if (isNew && !prevState.expandedKeys.includes(parentKey)) {
            expandedKeys.push(parentKey);
          }
        });
        if (!nextState) nextState = {};
        nextState.expandedKeys = [].concat(_toConsumableArray(expandedKeys), _toConsumableArray(prevState.expandedKeys));
      }

      return nextState;
    }
  }]);

  return TreeModal;
}(React.Component), _class2.propTypes = {
  checkedKeys: PropTypes.array,
  // ?????????????????????
  options: PropTypes.array,
  // ???????????????
  onOk: PropTypes.func,
  // ??????????????????
  onCancel: PropTypes.func,
  // ??????????????????
  onAdd: PropTypes.func,
  // ????????????????????????
  onDelete: PropTypes.func,
  // ????????????????????????
  onSave: PropTypes.func // ??????????????????

}, _class2.defaultProps = {
  options: [],
  checkedKeys: []
}, _temp$1)) || _class$1);

var TreeEditor = /*#__PURE__*/function (_React$Component) {
  _inherits(TreeEditor, _React$Component);

  var _super = _createSuper(TreeEditor);

  function TreeEditor() {
    var _this;

    _classCallCheck(this, TreeEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      visible: true
    };
    return _this;
  }

  _createClass(TreeEditor, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          style = _this$props.style,
          value = _this$props.value,
          options = _this$props.options,
          onChange = _this$props.onChange,
          onAdd = _this$props.onAdd,
          onDelete = _this$props.onDelete,
          onSave = _this$props.onSave;
      var visible = this.state.visible;
      var stl = {
        height: 28,
        border: '1px solid #e8e8e8',
        width: 200
      };
      var title = '';

      if (value && Array.isArray(value) && value.length) {
        title = options.filter(function (item) {
          return value.includes(item.key);
        }).map(function (item) {
          return item.title;
        }).join(',');
      }

      return /*#__PURE__*/React.createElement("div", {
        style: _objectSpread2(_objectSpread2({}, stl), style),
        title: title
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 8,
          width: '100%',
          height: '100%'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }, title), /*#__PURE__*/React.createElement(EditOutlined, {
        style: {
          flex: 0,
          padding: '0 8px',
          cursor: 'pointer'
        },
        onClick: function onClick() {
          return _this2.setState({
            visible: true
          });
        }
      })), /*#__PURE__*/React.createElement(TreeModal, {
        visible: visible,
        onOk: function onOk(value) {
          onChange(value);

          _this2.setState({
            visible: false
          });
        },
        onCancel: function onCancel() {
          return _this2.setState({
            visible: false
          });
        },
        checkedKeys: value,
        options: options,
        onAdd: onAdd,
        onDelete: onDelete,
        onSave: onSave
      }));
    }
  }]);

  return TreeEditor;
}(React.Component);

TreeEditor.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  options: TreeEditor.prototype.array,
  onAdd: PropTypes.func,
  // ????????????????????????
  onDelete: PropTypes.func,
  // ????????????????????????
  onSave: PropTypes.func // ??????????????????

};
TreeEditor.defaultProps = {
  options: []
};

var Option = Select.Option;

var AsyncSelect = /*#__PURE__*/function (_Component) {
  _inherits(AsyncSelect, _Component);

  var _super = _createSuper(AsyncSelect);

  function AsyncSelect() {
    var _this;

    _classCallCheck(this, AsyncSelect);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));
    _this.state = {
      loading: false,
      data: [],
      inputValue: void 0
    };
    _this.searchByUserInput = true;

    _this.handleSearchByUserInput = function (inputValue) {
      _this.setState({
        inputValue: inputValue
      });

      var _this$props = _this.props,
          loadDataByUserInput = _this$props.loadDataByUserInput,
          onSearch = _this$props.onSearch;
      if (onSearch) onSearch(inputValue);
      if (!loadDataByUserInput) return; // ??????

      clearTimeout(_this.st);
      _this.st = setTimeout(function () {
        _this.setState({
          loading: true
        }); // ??????????????????????????????????????????????????????????????????????????????????????????


        if (!_this.searchByUserInput) {
          _this.searchByUserInput = true;
          return;
        }

        loadDataByUserInput(inputValue).then(function (data) {
          return _this.setState({
            data: data
          });
        }).finally(function () {
          return _this.setState({
            loading: false
          });
        });
      }, 300);
    };

    _this.handleSearchByValue = function (value) {
      var loadDataByValue = _this.props.loadDataByValue;
      if (!loadDataByValue) return;
      setTimeout(function () {
        _this.setState({
          loading: true
        });

        loadDataByValue(value).then(function (data) {
          return _this.setState({
            data: data
          });
        }).finally(function () {
          return _this.setState({
            loading: false
          });
        });
      });
    };

    _this.handleSelect = function (value, option) {
      var onSelect = _this.props.onSelect;
      if (onSelect) onSelect(value, option);
      _this.searchByUserInput = false;
    };

    _this.handleBlur = function () {
      // ??????????????????????????????????????????????????????????????????value???????????????????????????????????????label????????????value???bug
      var _this$props2 = _this.props,
          onBlur = _this$props2.onBlur,
          value = _this$props2.value,
          onChange = _this$props2.onChange,
          inputAsValue = _this$props2.inputAsValue;
      var _this$state = _this.state,
          data = _this$state.data,
          inputValue = _this$state.inputValue;

      if (inputValue && inputAsValue) {
        _this.searchByUserInput = false;
        onChange && onChange(inputValue);

        _this.setState({
          data: [{
            value: inputValue,
            label: inputValue
          }]
        });

        return;
      }

      if (onBlur) onBlur.apply(void 0, arguments);
      _this.searchByUserInput = !value;

      if (value && !data.find(function (item) {
        return item.value === value;
      })) {
        _this.handleSearchByValue(value);
      }
    };

    return _this;
  }

  _createClass(AsyncSelect, [{
    key: "render",
    value: function render() {
      var options = this.state.data.map(function (item) {
        return /*#__PURE__*/React.createElement(Option, {
          value: item.value,
          key: item.value
        }, item.label);
      });
      var dataMeta = this.props['data-__meta']; // antd form

      var initialValue = dataMeta && dataMeta.initialValue || this.props.defaultValue;

      if (initialValue && this.initialValue !== initialValue) {
        this.initialValue = initialValue;
        this.handleSearchByValue(initialValue);
      }

      return /*#__PURE__*/React.createElement(Select, _extends({
        defaultActiveFirstOption: false,
        allowClear: true,
        showSearch: true,
        showArrow: false,
        optionFilterProp: "children"
      }, this.props, {
        onSearch: this.handleSearchByUserInput,
        onSelect: this.handleSelect,
        onBlur: this.handleBlur
      }), options);
    }
  }]);

  return AsyncSelect;
}(Component);

AsyncSelect.propTypes = {
  loadDataByUserInput: PropTypes.func.isRequired,
  loadDataByValue: PropTypes.func.isRequired,
  inputAsValue: PropTypes.bool
};
AsyncSelect.defaultProps = {
  inputAsValue: false
};

var icons = [{
  title: '???????????????',
  types: ['step-backward', 'step-forward', 'fast-backward', 'fast-forward', 'shrink', 'arrows-alt', 'down', 'up', 'left', 'right', 'caret-up', 'caret-down', 'caret-left', 'caret-right', 'up-circle', 'down-circle', 'left-circle', 'right-circle', 'double-right', 'double-left', 'vertical-left', 'vertical-right', 'forward', 'backward', 'rollback', 'enter', 'retweet', 'swap', 'swap-left', 'swap-right', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'play-circle', 'up-square', 'down-square', 'left-square', 'right-square', 'login', 'logout', 'menu-fold', 'menu-unfold', 'border-bottom', 'border-horizontal', 'border-inner', 'border-left', 'border-right', 'border-top', 'border-verticle', 'pic-center', 'pic-left', 'pic-right', 'radius-bottomleft', 'radius-bottomright', 'radius-upleft', 'fullscreen', 'fullscreen-exit']
}, {
  title: '?????????????????????',
  types: ['question', 'question-circle', 'plus', 'plus-circle', 'pause', 'pause-circle', 'minus', 'minus-circle', 'plus-square', 'minus-square', 'info', 'info-circle', 'exclamation', 'exclamation-circle', 'close', 'close-circle', 'close-square', 'check', 'check-circle', 'check-square', 'clock-circle', 'warning', 'issues-close', 'stop']
}, {
  title: '???????????????',
  types: ['edit', 'form', 'copy', 'scissor', 'delete', 'snippets', 'diff', 'highlight', 'align-center', 'align-left', 'align-right', 'bg-colors', 'bold', 'italic', 'underline', 'strikethrough', 'redo', 'undo', 'zoom-in', 'zoom-out', 'font-colors', 'font-size', 'line-height', 'column-height', 'dash', 'small-dash', 'sort-ascending', 'sort-descending', 'drag', 'ordered-list', 'radius-setting']
}, {
  title: '???????????????',
  types: ['area-chart', 'pie-chart', 'bar-chart', 'dot-chart', 'line-chart', 'radar-chart', 'heat-map', 'fall', 'rise', 'stock', 'box-plot', 'fund', 'sliders']
}, {
  title: '??????????????????',
  types: ['lock', 'unlock', 'bars', 'book', 'calendar', 'cloud', 'cloud-download', 'code', 'copy', 'credit-card', 'delete', 'desktop', 'download', 'ellipsis', 'file', 'file-text', 'file-unknown', 'file-pdf', 'file-word', 'file-excel', 'file-jpg', 'file-ppt', 'file-markdown', 'file-add', 'folder', 'folder-open', 'folder-add', 'hdd', 'frown', 'meh', 'smile', 'inbox', 'laptop', 'appstore', 'link', 'mail', 'mobile', 'notification', 'paper-clip', 'picture', 'poweroff', 'reload', 'search', 'setting', 'share-alt', 'shopping-cart', 'tablet', 'tag', 'tags', 'to-top', 'upload', 'user', 'video-camera', 'home', 'loading', 'loading-3-quarters', 'cloud-upload', 'star', 'heart', 'environment', 'eye', 'eye-invisible', 'camera', 'save', 'team', 'solution', 'phone', 'filter', 'exception', 'export', 'customer-service', 'qrcode', 'scan', 'like', 'dislike', 'message', 'pay-circle', 'calculator', 'pushpin', 'bulb', 'select', 'switcher', 'rocket', 'bell', 'disconnect', 'database', 'compass', 'barcode', 'hourglass', 'key', 'flag', 'layout', 'printer', 'sound', 'usb', 'skin', 'tool', 'sync', 'wifi', 'car', 'schedule', 'user-add', 'user-delete', 'usergroup-add', 'usergroup-delete', 'man', 'woman', 'shop', 'gift', 'idcard', 'medicine-box', 'red-envelope', 'coffee', 'copyright', 'trademark', 'safety', 'wallet', 'bank', 'trophy', 'contacts', 'global', 'shake', 'api', 'fork', 'dashboard', 'table', 'profile', 'alert', 'audit', 'branches', 'build', 'border', 'crown', 'experiment', 'fire', 'money-collect', 'property-safety', 'read', 'reconciliation', 'rest', 'security-scan', 'insurance', 'interaction', 'safety-certificate', 'project', 'thunderbolt', 'block', 'cluster', 'deployment-unit', 'dollar', 'euro', 'pound', 'file-done', 'file-exclamation', 'file-protect', 'file-search', 'file-sync', 'gateway', 'gold', 'robot', 'shopping']
}, {
  title: '???????????????',
  types: ['android', 'apple', 'windows', 'ie', 'chrome', 'github', 'aliwangwang', 'dingding', 'weibo-square', 'weibo-circle', 'taobao-circle', 'html5', 'weibo', 'twitter', 'wechat', 'youtube', 'alipay-circle', 'taobao', 'skype', 'qq', 'medium-workmark', 'gitlab', 'medium', 'linkedin', 'google-plus', 'dropbox', 'facebook', 'codepen', 'code-sandbox', 'amazon', 'google', 'codepen-circle', 'alipay', 'ant-design', 'aliyun', 'zhihu', 'slack', 'slack-square', 'behance', 'behance-square', 'dribbble', 'dribbble-square', 'instagram', 'yuque', 'alibaba', 'yahoo']
}];

var IconPicker = /*#__PURE__*/function (_Component) {
  _inherits(IconPicker, _Component);

  var _super = _createSuper(IconPicker);

  function IconPicker() {
    var _this;

    _classCallCheck(this, IconPicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      selectedIcon: '',
      dataSource: icons
    };

    _this.handleOk = function () {
      var onOk = _this.props.onOk;
      var selectedIcon = _this.state.selectedIcon;
      if (onOk) onOk(selectedIcon);
    };

    _this.handleCancel = function () {
      var onCancel = _this.props.onCancel;
      if (onCancel) onCancel();
    };

    _this.handleClick = function (selectedIcon) {
      _this.setState({
        selectedIcon: selectedIcon
      });
    };

    _this.handleInputChange = function (e) {
      var value = e.target.value;
      var dataSource = icons.map(function (item) {
        var types = item.types.filter(function (it) {
          return it.indexOf(value) !== -1;
        });
        return _objectSpread2(_objectSpread2({}, item), {}, {
          types: types
        });
      });

      _this.setState({
        dataSource: dataSource
      });
    };

    return _this;
  }

  _createClass(IconPicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          dataSource = _this$state.dataSource,
          selectedIcon = _this$state.selectedIcon;
      var windowHeight = document.documentElement.clientHeight;
      return /*#__PURE__*/React.createElement(ModalContent, {
        onOk: this.handleOk,
        onCancel: this.handleCancel
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement(Input.Search, {
        placeholder: "Search",
        onChange: this.handleInputChange
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          height: windowHeight - 400,
          overflowY: 'scroll'
        }
      }, dataSource.map(function (item) {
        var title = item.title,
            types = item.types;
        if (!(types === null || types === void 0 ? void 0 : types.length)) return null;
        return /*#__PURE__*/React.createElement("div", {
          key: title
        }, /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement(Row, null, types.map(function (type) {
          return /*#__PURE__*/React.createElement(Col, {
            style: {
              marginBottom: 16
            },
            key: type,
            span: 3
          }, /*#__PURE__*/React.createElement(Button, {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height: 50,
              cursor: 'pointer'
            },
            type: selectedIcon === type ? 'primary' : 'default',
            onClick: function onClick() {
              return _this2.handleClick(type);
            }
          }, /*#__PURE__*/React.createElement(Icon, {
            style: {
              fontSize: 20
            },
            type: type
          })));
        })));
      }))));
    }
  }]);

  return IconPicker;
}(Component);

IconPicker.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};
var IconModal = model$1('??????')(IconPicker);

var IconPicker$1 = /*#__PURE__*/function (_Component) {
  _inherits(IconPicker, _Component);

  var _super = _createSuper(IconPicker);

  function IconPicker() {
    var _this;

    _classCallCheck(this, IconPicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      visible: false,
      type: 'user'
    };

    _this.handleOk = function (type) {
      var onChange = _this.props.onChange;
      if (onChange) onChange(type);

      _this.setState({
        visible: false
      });
    };

    _this.handleClear = function (e) {
      e.preventDefault();
      e.stopPropagation();
      var onChange = _this.props.onChange;
      if (onChange) onChange();
    };

    return _this;
  }

  _createClass(IconPicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          type = _this$state.type,
          visible = _this$state.visible;
      var style = this.props.style;
      return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: _objectSpread2(_objectSpread2({}, style), {}, {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 28,
          padding: '0 10px',
          border: '1px solid #d9d9d9',
          borderRadius: 4,
          cursor: 'pointer'
        }),
        onClick: function onClick() {
          return _this2.setState({
            visible: true
          });
        }
      }, type ? /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Icon, {
        type: type
      }), /*#__PURE__*/React.createElement(CloseCircleOutlined, {
        onClick: this.handleClear
      })) : /*#__PURE__*/React.createElement("span", {
        style: {
          color: '#c7c7c7'
        }
      }, "\u8BF7\u9009\u62E9\u56FE\u6807")), /*#__PURE__*/React.createElement(IconModal, {
        visible: visible,
        onOk: this.handleOk,
        onCancel: function onCancel() {
          return _this2.setState({
            visible: false
          });
        }
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var value = nextProps.value;
      return {
        type: value
      };
    }
  }]);

  return IconPicker;
}(Component);

var css_248z$d = ".index-module_formElementFlexRoot__1-Gt1 {\n  box-sizing: border-box;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.index-module_formElementFlexRoot__1-Gt1 .index-module_fontElementTip__3ubDV {\n  -webkit-align-self: flex-start;\n      -ms-flex-item-align: start;\n          align-self: flex-start;\n  margin-top: 6px;\n  margin-left: 6px;\n  color: #888;\n}\n.index-module_formElementFlexRoot__1-Gt1 .ant-form-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-bottom: 18px;\n  font-size: 12px;\n}\n.index-module_formElementFlexRoot__1-Gt1 .ant-form-item .ant-form-item-label {\n  -webkit-box-flex: 0;\n  -webkit-flex-grow: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -webkit-flex-shrink: 0;\n      -ms-flex-negative: 0;\n          flex-shrink: 0;\n}\n.index-module_formElementFlexRoot__1-Gt1 .ant-form-item .ant-form-item-control {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.index-module_formElementFlexRoot__1-Gt1 .ant-form-item .ant-form-item-explain {\n  position: absolute;\n  bottom: -22px;\n}\n.index-module_formElementFlexRoot__1-Gt1 .ant-form-item .ant-form-item-required.ant-form-item-no-colon[title=\" \"]::after {\n  display: none;\n}\n.index-module_formElementFlexRoot__1-Gt1 .ant-form-item .ant-form-item-control-input-content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.index-module_formElementFlexRoot__1-Gt1 .ant-transfer {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.index-module_formElementFlexRoot__1-Gt1 .ant-transfer .ant-transfer-list {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.index-module_formElementFlexRoot__1-Gt1 .portal-form-item {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  margin-bottom: 18px;\n  font-size: 12px;\n}\n.index-module_formElementFlexRoot__1-Gt1 .portal-form-item .portal-form-item-label {\n  -webkit-box-flex: 0;\n  -webkit-flex-grow: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n  -webkit-flex-shrink: 0;\n      -ms-flex-negative: 0;\n          flex-shrink: 0;\n}\n.index-module_formElementFlexRoot__1-Gt1 .portal-form-item .portal-form-item-control {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.index-module_formElementFlexRoot__1-Gt1 .portal-form-item .portal-form-item-explain {\n  position: absolute;\n  bottom: -22px;\n}\n.index-module_formElementFlexRoot__1-Gt1 .portal-form-item .portal-form-item-required.portal-form-item-no-colon[title=\" \"]::after {\n  display: none;\n}\n.index-module_formElementFlexRoot__1-Gt1 .portal-form-item .portal-form-item-control-input-content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.index-module_formElementFlexRoot__1-Gt1 .portal-transfer {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.index-module_formElementFlexRoot__1-Gt1 .portal-transfer .portal-transfer-list {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n@media (max-width: 575px) {\n  .index-module_formElementFlexRoot__1-Gt1 {\n    -webkit-box-flex: 0 !important;\n    -webkit-flex: 0 0 100% !important;\n        -ms-flex: 0 0 100% !important;\n            flex: 0 0 100% !important;\n    padding-right: 10px;\n  }\n  .index-module_formElementFlexRoot__1-Gt1 .ant-form-item-label {\n    text-align: right;\n  }\n  .index-module_formElementFlexRoot__1-Gt1 .ant-form-item-label label:after {\n    display: block;\n    content: '\\FF1A';\n  }\n  .index-module_formElementFlexRoot__1-Gt1 .ant-form-item-label label.ant-form-item-no-colon:after {\n    display: none;\n  }\n  .index-module_formElementFlexRoot__1-Gt1 .frame-label-without-width .ant-form-item-label {\n    -webkit-flex-basis: auto !important;\n        -ms-flex-preferred-size: auto !important;\n            flex-basis: auto !important;\n  }\n  .index-module_formElementFlexRoot__1-Gt1 .portal-form-item-label {\n    text-align: right;\n  }\n  .index-module_formElementFlexRoot__1-Gt1 .portal-form-item-label label:after {\n    display: block;\n    content: '\\FF1A';\n  }\n  .index-module_formElementFlexRoot__1-Gt1 .portal-form-item-label label.portal-form-item-no-colon:after {\n    display: none;\n  }\n  .index-module_formElementFlexRoot__1-Gt1 .frame-label-without-width .portal-form-item-label {\n    -webkit-flex-basis: auto !important;\n        -ms-flex-preferred-size: auto !important;\n            flex-basis: auto !important;\n  }\n}\n";
var styles$c = {"formElementFlexRoot":"index-module_formElementFlexRoot__1-Gt1","fontElementTip":"index-module_fontElementTip__3ubDV"};
styleInject(css_248z$d);

var TextArea = Input.TextArea,
    Password = Input.Password;
var FormItem = Form.Item; // input hidden number textarea password mobile email select select-tree checkbox checkbox-group radio radio-button radio-group switch date time date-time date-range cascader

/**
 * ?????? input ??????
 * @param type
 * @returns {boolean}
 */

function isInputLikeElement(type) {
  return ['input', 'hidden', 'number', 'textarea', 'password', 'mobile', 'email'].includes(type);
}

function getElement(item) {
  var _item$type = item.type,
      type = _item$type === void 0 ? 'input' : _item$type,
      component = item.component,
      props = _objectWithoutProperties(item, ["type", "component"]);

  var commonProps = {
    size: 'default'
  }; // ??????
  // const width = props.width || '100%';
  // const elementCommonStyle = {width};
  // props.style = props.style ? {...elementCommonStyle, ...props.style} : elementCommonStyle;
  // ?????? component ?????????????????????????????????

  if (component) {
    if (typeof component === 'function') return component(_objectSpread2(_objectSpread2({}, commonProps), props));
    var Comp = component;
    return /*#__PURE__*/React.createElement(Comp, _extends({}, commonProps, props));
  }

  if (isInputLikeElement(type)) {
    if (type === 'number') return /*#__PURE__*/React.createElement(InputNumber, _extends({}, commonProps, props));
    if (type === 'textarea') return /*#__PURE__*/React.createElement(TextArea, _extends({}, commonProps, props));
    if (type === 'password') return /*#__PURE__*/React.createElement(Password, _extends({}, commonProps, props));
    return /*#__PURE__*/React.createElement(Input, _extends({}, commonProps, {
      type: type
    }, props));
  }

  if (type === 'select') {
    var _props$options = props.options,
        options = _props$options === void 0 ? [] : _props$options,
        others = _objectWithoutProperties(props, ["options"]);

    return /*#__PURE__*/React.createElement(Select, _extends({}, commonProps, others), options.map(function (opt) {
      return /*#__PURE__*/React.createElement(Select.Option, _extends({
        key: opt.value
      }, opt), opt.label);
    }));
  }

  if (type === 'select-tree') return /*#__PURE__*/React.createElement(TreeSelect, _extends({}, commonProps, props, {
    treeData: props.options
  }));
  if (type === 'checkbox') return /*#__PURE__*/React.createElement(Checkbox, _extends({}, commonProps, props), props.label);
  if (type === 'checkbox-group') return /*#__PURE__*/React.createElement(Checkbox.Group, _extends({}, commonProps, props));
  if (type === 'radio') return /*#__PURE__*/React.createElement(Radio, _extends({}, commonProps, props), props.label);
  if (type === 'radio-group') return /*#__PURE__*/React.createElement(Radio.Group, _extends({}, commonProps, props));

  if (type === 'radio-button') {
    var _props$options2 = props.options,
        _options = _props$options2 === void 0 ? [] : _props$options2,
        _others = _objectWithoutProperties(props, ["options"]);

    return /*#__PURE__*/React.createElement(Radio.Group, _extends({
      buttonStyle: "solid"
    }, commonProps, _others), _options.map(function (opt) {
      return /*#__PURE__*/React.createElement(Radio.Button, _extends({
        key: opt.value
      }, opt), opt.label);
    }));
  }

  if (type === 'cascader') return /*#__PURE__*/React.createElement(Cascader, _extends({}, commonProps, props));
  if (type === 'switch') return /*#__PURE__*/React.createElement(Switch, _extends({}, commonProps, props, {
    style: _objectSpread2(_objectSpread2({}, props.style), {}, {
      width: 'auto'
    })
  }));
  if (type === 'date') return /*#__PURE__*/React.createElement(DatePicker, _extends({}, commonProps, props));
  if (type === 'date-time') return /*#__PURE__*/React.createElement(DatePicker, _extends({}, commonProps, {
    showTime: true
  }, props));
  if (type === 'date-range') return /*#__PURE__*/React.createElement(DatePicker.RangePicker, _extends({}, commonProps, props));
  if (type === 'month') return /*#__PURE__*/React.createElement(DatePicker.MonthPicker, _extends({}, commonProps, props));
  if (type === 'time') return /*#__PURE__*/React.createElement(TimePicker, _extends({}, commonProps, props));
  if (type === 'transfer') return /*#__PURE__*/React.createElement(Transfer, _extends({}, commonProps, props));
  if (type === 'icon-picker') return /*#__PURE__*/React.createElement(IconPicker$1, _extends({}, commonProps, props));
  throw new Error("no such type: ".concat(type));
}

var FormElement = /*#__PURE__*/function (_Component) {
  _inherits(FormElement, _Component);

  var _super = _createSuper(FormElement);

  function FormElement() {
    var _this;

    _classCallCheck(this, FormElement);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.getRules = function () {
      var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var requireMessage = arguments.length > 1 ? arguments[1] : undefined;
      var _this$props = _this.props,
          required = _this$props.required,
          maxLength = _this$props.maxLength,
          minLength = _this$props.minLength; // ????????????required?????????????????????????????????

      if (required && !rules.find(function (item) {
        return 'required' in item;
      })) {
        rules.push({
          required: true,
          message: "".concat(requireMessage, "!")
        });
      }

      if (maxLength !== void 0 && !rules.find(function (item) {
        return 'max' in item;
      })) {
        rules.push({
          max: maxLength,
          message: "\u6700\u5927\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7 ".concat(maxLength, " \u4E2A\u5B57\u7B26\uFF01")
        });
      }

      if (minLength !== void 0 && !rules.find(function (item) {
        return 'min' in item;
      })) {
        rules.push({
          min: minLength,
          message: "\u6700\u5C0F\u957F\u5EA6\u4E0D\u80FD\u4F4E\u4E8E ".concat(minLength, " \u4E2A\u5B57\u7B26\uFF01")
        });
      }

      return rules;
    };

    return _this;
  }

  _createClass(FormElement, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          _this$props2$type = _this$props2.type,
          type = _this$props2$type === void 0 ? 'input' : _this$props2$type,
          labelWidth = _this$props2.labelWidth,
          showLabel = _this$props2.showLabel,
          width = _this$props2.width,
          labelTip = _this$props2.labelTip,
          tip = _this$props2.tip,
          decorator = _this$props2.decorator,
          style = _this$props2.style,
          elementStyle = _this$props2.elementStyle,
          layout = _this$props2.layout,
          forwardedRef = _this$props2.forwardedRef,
          noSpace = _this$props2.noSpace,
          trim = _this$props2.trim,
          maxLength = _this$props2.maxLength,
          minLength = _this$props2.minLength,
          colon = _this$props2.colon,
          dependencies = _this$props2.dependencies,
          extra = _this$props2.extra,
          getValueFromEvent = _this$props2.getValueFromEvent,
          getValueProps = _this$props2.getValueProps,
          hasFeedback = _this$props2.hasFeedback,
          help = _this$props2.help,
          htmlFor = _this$props2.htmlFor,
          initialValue = _this$props2.initialValue,
          noStyle = _this$props2.noStyle,
          label = _this$props2.label,
          labelAlign = _this$props2.labelAlign,
          labelCol = _this$props2.labelCol,
          name = _this$props2.name,
          preserve = _this$props2.preserve,
          normalize = _this$props2.normalize,
          required = _this$props2.required,
          rules = _this$props2.rules,
          shouldUpdate = _this$props2.shouldUpdate,
          trigger = _this$props2.trigger,
          validateFirst = _this$props2.validateFirst,
          validateStatus = _this$props2.validateStatus,
          validateTrigger = _this$props2.validateTrigger,
          valuePropName = _this$props2.valuePropName,
          wrapperCol = _this$props2.wrapperCol,
          hidden = _this$props2.hidden,
          children = _this$props2.children,
          others = _objectWithoutProperties(_this$props2, ["type", "labelWidth", "showLabel", "width", "labelTip", "tip", "decorator", "style", "elementStyle", "layout", "forwardedRef", "noSpace", "trim", "maxLength", "minLength", "colon", "dependencies", "extra", "getValueFromEvent", "getValueProps", "hasFeedback", "help", "htmlFor", "initialValue", "noStyle", "label", "labelAlign", "labelCol", "name", "preserve", "normalize", "required", "rules", "shouldUpdate", "trigger", "validateFirst", "validateStatus", "validateTrigger", "valuePropName", "wrapperCol", "hidden", "children"]);

      if (type === 'switch' || type === 'checkbox') {
        valuePropName = 'checked';
      }

      if (type === 'transfer') {
        valuePropName = 'targetKeys';
      }

      var labelWithoutWidth = true;

      if (!labelCol && labelWidth !== undefined) {
        labelCol = {
          flex: "0 0 ".concat(labelWidth, "px")
        };
        labelWithoutWidth = false;
      }

      if (type === 'select' && 'showSearch' in others && !('optionFilterProp' in others)) {
        others.optionFilterProp = 'children';
      } // ??????????????????


      var wrapperStyle = {};

      if (width !== void 0) {
        wrapperStyle.width = width;
        wrapperStyle.flexBasis = width;
        wrapperStyle.flexGrow = 0;
        wrapperStyle.flexShrink = 0;
      } else {
        wrapperStyle.flex = 1;
      } // ??????????????????


      var eleStyle = {
        width: '100%'
      };
      eleStyle = _objectSpread2(_objectSpread2({}, eleStyle), elementStyle); // ??????placeholder

      if (!('placeholder' in others)) {
        if (isInputLikeElement(type)) {
          others.placeholder = "\u8BF7\u8F93\u5165".concat(label);
        } else if (type === 'date-range') {
          others.placeholder = ['????????????', '????????????'];
        } else {
          others.placeholder = "\u8BF7\u9009\u62E9".concat(label);
        }
      }

      if (!('allowClear' in others) && !['switch', 'checkbox', 'checkbox-group'].includes(type)) {
        others.allowClear = true;
      }

      rules = this.getRules(rules, isInputLikeElement(type) ? "\u8BF7\u8F93\u5165".concat(label) : "\u8BF7\u9009\u62E9".concat(label));

      if (rules.find(function (item) {
        return 'required' in item && item.required;
      })) {
        required = true;
      }

      var formLabel = label;

      if (labelTip) {
        formLabel = /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Tooltip, {
          placement: "bottom",
          title: labelTip
        }, /*#__PURE__*/React.createElement(QuestionCircleOutlined, {
          style: {
            marginRight: '4px'
          }
        })), label);
      }

      var getValueFromEventNoSpace = noSpace ? function (e) {
        if (isInputLikeElement(type)) {
          var value = !e || !e.target ? e : e.target.value;
          if (value && typeof value === 'string') return value.replace(/\s/g, '');
          return value;
        } else {
          return getValueFromEvent(e);
        }
      } : getValueFromEvent;

      var elementProps = _objectSpread2(_objectSpread2({}, others), {}, {
        ref: forwardedRef,
        style: eleStyle
      });

      if (layout) {
        formLabel = formLabel || ' ';
        colon = colon === undefined ? false : colon;
        labelCol = {
          flex: '0 0 0'
        };
        wrapperStyle.flex = 0;
      } else {
        if (!children) {
          children = getElement(_objectSpread2({
            type: type
          }, elementProps));
        } else if (!shouldUpdate) {
          children = children ? /*#__PURE__*/React.cloneElement(children, elementProps) : null;
        }
      } // ??????????????????????????????


      if (!formLabel && required || !showLabel) formLabel = ' ';
      if (shouldUpdate && !('noStyle' in this.props)) noStyle = true;
      return /*#__PURE__*/React.createElement("div", {
        style: _objectSpread2(_objectSpread2({
          display: type === 'hidden' ? 'none' : 'flex'
        }, wrapperStyle), style),
        className: "".concat(styles$c.formElementFlexRoot, "  form-element-flex-root"),
        ref: function ref(node) {
          return _this2.container = node;
        }
      }, /*#__PURE__*/React.createElement(FormItem, {
        colon: colon,
        dependencies: dependencies,
        extra: extra,
        getValueFromEvent: getValueFromEventNoSpace,
        getValueProps: getValueProps,
        hasFeedback: hasFeedback,
        help: help,
        htmlFor: htmlFor,
        initialValue: initialValue,
        noStyle: noStyle,
        label: formLabel,
        labelAlign: labelAlign,
        labelCol: labelCol,
        name: name,
        preserve: preserve,
        normalize: normalize,
        required: required,
        rules: rules,
        shouldUpdate: shouldUpdate,
        trigger: trigger,
        validateFirst: validateFirst,
        validateStatus: validateStatus,
        validateTrigger: validateTrigger,
        valuePropName: valuePropName,
        wrapperCol: wrapperCol,
        hidden: hidden,
        className: labelWithoutWidth ? 'frame-label-without-width' : ''
      }, children), tip ? /*#__PURE__*/React.createElement("div", {
        className: "".concat(styles$c.fontElementTip, " font-element-tip")
      }, tip) : null);
    }
  }]);

  return FormElement;
}(Component);

FormElement.propTypes = {
  // ???????????????
  type: PropTypes.oneOf(['input', 'hidden', 'number', 'textarea', 'password', 'mobile', 'email', 'select', 'select-tree', 'checkbox', 'checkbox-group', 'radio', 'radio-button', 'radio-group', 'switch', 'date', 'time', 'date-time', 'date-range', 'cascader', 'transfer', 'icon-picker']).isRequired,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showLabel: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelTip: PropTypes.any,
  tip: PropTypes.any,
  decorator: PropTypes.object,
  style: PropTypes.object,
  // ?????????????????????
  elementStyle: PropTypes.object,
  // ??????????????????
  layout: PropTypes.bool,
  noSpace: PropTypes.bool,
  // ??????????????????????????????
  // ????????????
  maxLength: PropTypes.number,
  // ???????????????????????????
  minLength: PropTypes.number,
  // ???????????????????????????
  // Form.Item??????
  colon: PropTypes.any,
  dependencies: PropTypes.any,
  extra: PropTypes.any,
  getValueFromEvent: PropTypes.any,
  getValueProps: PropTypes.any,
  hasFeedback: PropTypes.any,
  help: PropTypes.any,
  htmlFor: PropTypes.any,
  initialValue: PropTypes.any,
  noStyle: PropTypes.any,
  label: PropTypes.any,
  labelAlign: PropTypes.any,
  labelCol: PropTypes.any,
  name: PropTypes.any,
  preserve: PropTypes.any,
  normalize: PropTypes.any,
  required: PropTypes.any,
  rules: PropTypes.any,
  shouldUpdate: PropTypes.any,
  trigger: PropTypes.any,
  validateFirst: PropTypes.any,
  validateStatus: PropTypes.any,
  validateTrigger: PropTypes.any,
  valuePropName: PropTypes.any,
  wrapperCol: PropTypes.any,
  hidden: PropTypes.any,
  // ??????
  className: PropTypes.any,
  onChange: PropTypes.any,
  onClick: PropTypes.any,
  onBlur: PropTypes.any,
  autoFocus: PropTypes.any,
  htmlType: PropTypes.any
};
FormElement.defaultProps = {
  type: 'input',
  style: {},
  elementStyle: {},
  layout: false,
  noSpace: false,
  trim: true,
  showLabel: true,
  getValueFromEvent: function getValueFromEvent(e) {
    if (!e || !e.target) {
      return e;
    }

    var target = e.target;
    return target.type === 'checkbox' ? target.checked : target.value;
  }
};
var FormElement$1 = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(FormElement, _extends({}, props, {
    forwardedRef: ref
  }));
});

var css_248z$e = ".style-module_buttonTextInput__2sZY8 {\n  padding-right: 111px;\n}\n.style-module_buttonText__ovI6B {\n  position: absolute;\n  top: 50%;\n  right: 0;\n  -webkit-transform: translateY(-50%);\n      -ms-transform: translateY(-50%);\n          transform: translateY(-50%);\n  font-weight: 400;\n  color: #979797;\n  z-index: 99;\n}\n.style-module_buttonText__ovI6B:hover {\n  background: none;\n}\n.style-module_buttonText__ovI6B > span:before {\n  position: absolute;\n  content: '';\n  border-left: 1px solid #d8d8d8;\n  top: 6px;\n  bottom: 6px;\n  left: 0;\n}\n";
var styles$d = {"buttonTextInput":"style-module_buttonTextInput__2sZY8","buttonText":"style-module_buttonText__ovI6B"};
styleInject(css_248z$e);

MessageCode.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  time: PropTypes.number,
  buttonType: PropTypes.string,
  onSend: PropTypes.func,
  // ??????true ??? promise.resolve(true) ??????????????????????????????????????? ??????????????????
  placeholder: PropTypes.string,
  wrapperProps: PropTypes.object,
  buttonProps: PropTypes.object
};
MessageCode.defaultProps = {
  time: 60,
  buttonType: 'default',
  wrapperProps: {},
  buttonProps: {},
  placeholder: '????????????????????????'
};

function MessageCode(props) {
  var time = props.time,
      buttonType = props.buttonType,
      onSend = props.onSend,
      wrapperProps = props.wrapperProps,
      buttonProps = props.buttonProps,
      placeholder = props.placeholder,
      others = _objectWithoutProperties(props, ["time", "buttonType", "onSend", "wrapperProps", "buttonProps", "placeholder"]);

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      count = _useState2[0],
      setCount = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  function handleClick() {
    return _handleClick.apply(this, arguments);
  } // ???????????????


  function _handleClick() {
    _handleClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var ok;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setLoading(true);
              _context.t0 = onSend;

              if (!_context.t0) {
                _context.next = 7;
                break;
              }

              _context.next = 6;
              return onSend();

            case 6:
              _context.t0 = _context.sent;

            case 7:
              ok = _context.t0;

              if (ok === true) {
                setCount(time);
              }

            case 9:
              _context.prev = 9;
              setLoading(false);
              return _context.finish(9);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0,, 9, 12]]);
    }));
    return _handleClick.apply(this, arguments);
  }

  useEffect(function () {
    var st = setTimeout(function () {
      var nextCount = count - 1;
      if (nextCount < 0) window.clearTimeout(st);
      setCount(nextCount);
    }, 1000);
    return function () {
      return clearInterval(st);
    };
  }, [count]); // ???????????? 0 ????????????????????????

  var disabled = count > 0;
  return /*#__PURE__*/React.createElement(Spin, {
    spinning: loading,
    size: "small"
  }, /*#__PURE__*/React.createElement("div", _extends({
    style: _objectSpread2({
      display: 'flex',
      position: 'relative'
    }, wrapperProps.style || {})
  }, wrapperProps), /*#__PURE__*/React.createElement(Input, _extends({
    className: buttonType === 'text' ? styles$d.buttonTextInput : '',
    placeholder: placeholder
  }, others)), /*#__PURE__*/React.createElement(Button, _extends({
    className: buttonType === 'text' ? styles$d.buttonText : '',
    type: buttonType,
    disabled: disabled,
    style: {
      flex: '0 0 111px',
      width: 111,
      marginLeft: 4
    },
    onClick: handleClick
  }, buttonProps), disabled ? "\u91CD\u65B0\u53D1\u9001(".concat(count, "s)") : '??????????????? ')));
}

var imageError = "data:image/jpeg;base64,";

var css_248z$f = ".style-module_img__2GlDo {\n  position: absolute;\n  height: -webkit-calc(100% - 2px);\n  height: calc(100% - 2px);\n  top: 1px;\n  right: 1px;\n  z-index: 99;\n  cursor: pointer;\n}\n";
var styles$e = {"img":"style-module_img__2GlDo"};
styleInject(css_248z$f);

ImageCode.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  // src: string?????????????????????????????????src input value ??? string
  //      func  ??????????????????????????????string?????????????????????src input value ??? string
  //                  ??????????????????[id, url]???????????????????????????????????????id??????????????????????????????src input value ??? [id, code]
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  placeholder: PropTypes.string,
  errorImage: PropTypes.string,
  refresh: PropTypes.any // ?????????????????????????????????????????????????????????

};
ImageCode.defaultProps = {
  placeholder: '????????????????????????'
};

function ImageCode(props) {
  var src = props.src,
      placeholder = props.placeholder,
      onChange = props.onChange,
      value = props.value,
      errorImage = props.errorImage,
      refresh = props.refresh,
      others = _objectWithoutProperties(props, ["src", "placeholder", "onChange", "value", "errorImage", "refresh"]);

  var imgRef = useRef(null);

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      url = _useState2[0],
      setUrl = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      id = _useState4[0],
      setId = _useState4[1];

  var _useState5 = useState(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      code = _useState6[0],
      setCode = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      loading = _useState8[0],
      setLoading = _useState8[1];

  function handleClick() {
    return _handleClick.apply(this, arguments);
  }

  function _handleClick() {
    _handleClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // ???????????????????????????src?????????
              if (typeof src === 'string') {
                setUrl("".concat(src, "?t=").concat(Date.now()));
              } // ajax????????????????????????????????? [id, url] ?????? url


              if (!(typeof src === 'function')) {
                _context2.next = 12;
                break;
              }

              setLoading(true);
              _context2.prev = 3;
              _context2.next = 6;
              return src();

            case 6:
              result = _context2.sent;
              if (typeof result === 'string') setUrl(result);

              if (Array.isArray(result)) {
                setId(result[0]);
                setUrl(result[1]);
              }

            case 9:
              _context2.prev = 9;
              setLoading(false);
              return _context2.finish(9);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3,, 9, 12]]);
    }));
    return _handleClick.apply(this, arguments);
  }

  function handleChange(e) {
    var code = e.target.value;

    if (id) {
      onChange([id, code]);
    } else {
      onChange(code);
    }
  }

  function handleError() {
    setUrl(errorImage || imageError);
  }

  useEffect(function () {
    if (typeof value === 'string') setCode(value);

    if (Array.isArray(value)) {
      setCode(value[1]);
    }
  }, [value]);
  useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return handleClick();

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, [refresh]);
  return /*#__PURE__*/React.createElement(Spin, {
    spinning: loading,
    size: "small"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Input, _extends({
    className: styles$e.input,
    placeholder: placeholder,
    value: code,
    onChange: handleChange
  }, others)), /*#__PURE__*/React.createElement("img", {
    ref: imgRef,
    className: styles$e.img,
    src: url,
    alt: "\u56FE\u7247\u9A8C\u8BC1\u7801",
    onClick: handleClick,
    onError: handleError
  })));
}

var formElementTypes = [{
  type: 'image-code',
  Component: ImageCode,
  isInputLike: true,
  componentName: 'ImageCode'
}, {
  type: 'message-code',
  Component: MessageCode,
  isInputLike: true,
  componentName: 'MessageCode'
}, {
  type: 'input',
  Component: Input,
  isInputLike: true,
  componentName: 'Input'
}, {
  type: 'hidden',
  Component: Input,
  isInputLike: true
}, {
  type: 'number',
  Component: InputNumber,
  isInputLike: true,
  componentName: 'InputNumber'
}, {
  type: 'textarea',
  Component: Input.TextArea,
  isInputLike: true,
  componentName: 'Input.TextArea'
}, {
  type: 'password',
  Component: Input.Password,
  isInputLike: true,
  componentName: 'Input.Password'
}, {
  type: 'mobile',
  Component: Input,
  isInputLike: true,
  componentName: 'Input'
}, {
  type: 'email',
  Component: Input,
  isInputLike: true,
  componentName: 'Input'
}, {
  type: 'select',
  Component: Select,
  componentName: 'Select'
}, {
  type: 'select-tree',
  getComponent: function getComponent(_ref) {
    var commonProps = _ref.commonProps,
        props = _ref.props;
    return /*#__PURE__*/React.createElement(TreeSelect, _extends({}, commonProps, props, {
      treeData: props.treeData || props.options
    }));
  },
  componentName: 'TreeSelect'
}, {
  type: 'checkbox',
  Component: Checkbox,
  componentName: 'Checkbox'
}, {
  type: 'checkbox-group',
  Component: Checkbox.Group,
  componentName: 'Checkbox.Group'
}, {
  type: 'radio',
  Component: Radio,
  componentName: 'Radio'
}, {
  type: 'radio-button',
  getComponent: function getComponent(_ref2) {
    var commonProps = _ref2.commonProps,
        props = _ref2.props;

    var _props$options = props.options,
        options = _props$options === void 0 ? [] : _props$options,
        others = _objectWithoutProperties(props, ["options"]);

    return /*#__PURE__*/React.createElement(Radio.Group, _extends({
      buttonStyle: "solid"
    }, commonProps, others), options.map(function (opt) {
      return /*#__PURE__*/React.createElement(Radio.Button, _extends({
        key: opt.value
      }, opt), opt.label);
    }));
  },
  componentName: 'Radio.Group'
}, {
  type: 'radio-group',
  Component: Radio.Group,
  componentName: 'Radio.Group'
}, {
  type: 'switch',
  Component: Switch,
  componentName: 'Switch'
}, {
  type: 'date',
  Component: DatePicker,
  componentName: 'DatePicker'
}, {
  type: 'time',
  Component: TimePicker,
  componentName: 'TimePicker'
}, {
  type: 'date-time',
  getComponent: function getComponent(_ref3) {
    var commonProps = _ref3.commonProps,
        props = _ref3.props;
    return /*#__PURE__*/React.createElement(DatePicker, _extends({}, commonProps, {
      showTime: true
    }, props));
  },
  componentName: 'DatePicker'
}, {
  type: 'date-range',
  Component: DatePicker.RangePicker,
  componentName: 'DatePicker.RangePicker'
}, {
  type: 'cascader',
  Component: Cascader,
  componentName: 'Cascader'
}, {
  type: 'transfer',
  Component: Transfer,
  componentName: 'Transfer'
}, {
  type: 'icon-picker',
  Component: IconPicker$1,
  componentName: 'IconPicker'
}];
/**
 * ?????? input ??????
 * @param type
 * @returns {boolean}
 */

function isInputLikeElement$1(type) {
  var types = formElementTypes.filter(function (item) {
    return item.isInputLike;
  }).map(function (item) {
    return item.type;
  });
  return types.includes(type);
}
function getPlaceholder(_ref4) {
  var type = _ref4.type,
      placeholder = _ref4.placeholder,
      label = _ref4.label;
  if (placeholder) return placeholder;
  if (isInputLikeElement$1(type)) return "\u8BF7\u8F93\u5165".concat(label);
  return "\u8BF7\u9009\u62E9".concat(label);
}
function getRules(options) {
  var noSpace = options.noSpace,
      rules = options.rules,
      required = options.required,
      placeholder = options.placeholder,
      maxLength = options.maxLength,
      minLength = options.minLength;
  if (!rules) rules = [];

  if (required && !rules.some(function (item) {
    return _typeof(item) === 'object' && 'required' in item;
  })) {
    rules.push({
      required: true,
      message: "".concat(placeholder, "\uFF01")
    });
  }

  if (noSpace) {
    rules.push({
      validator: function validator(rule, value) {
        if (value && value.includes(' ')) return Promise.reject('????????????????????????');
        return Promise.resolve();
      }
    });
  }

  if (maxLength !== void 0 && !rules.find(function (item) {
    return 'max' in item;
  })) {
    rules.push({
      max: maxLength,
      message: "\u6700\u5927\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7 ".concat(maxLength, " \u4E2A\u5B57\u7B26\uFF01")
    });
  }

  if (minLength !== void 0 && !rules.find(function (item) {
    return 'min' in item;
  })) {
    rules.push({
      min: minLength,
      message: "\u6700\u5C0F\u957F\u5EA6\u4E0D\u80FD\u4F4E\u4E8E ".concat(minLength, " \u4E2A\u5B57\u7B26\uFF01")
    });
  }

  return rules;
}
function getFormElement(options) {
  var _options$type = options.type,
      type = _options$type === void 0 ? 'input' : _options$type,
      component = options.component,
      children = options.children,
      props = _objectWithoutProperties(options, ["type", "component", "children"]);

  var commonProps = {
    size: 'default'
  }; // ?????? component ?????????????????????????????????

  if (component) {
    if (typeof component === 'function') return component(_objectSpread2(_objectSpread2({}, commonProps), props));
    var Comp = component;
    return /*#__PURE__*/React.createElement(Comp, _extends({}, commonProps, props));
  } // ?????? children ?????????????????????children


  if (children) return children;
  var typeItem = formElementTypes.find(function (item) {
    return item.type === type;
  });
  if (!typeItem) throw new Error("no such type: ".concat(type));
  var Component = typeItem.Component,
      getComponent = typeItem.getComponent;
  if (getComponent) return getComponent({
    commonProps: commonProps,
    props: props
  }); // ??????Input?????? ??????type

  if (isInputLikeElement$1(type)) {
    return /*#__PURE__*/React.createElement(Component, _extends({}, commonProps, {
      type: type
    }, props));
  }

  return /*#__PURE__*/React.createElement(Component, _extends({}, commonProps, props));
}

var Item$1 = Form.Item;
FormItem$1.propTypes = {
  maxLength: PropTypes.number,
  // ???????????????????????????
  minLength: PropTypes.number,
  // ???????????????????????????
  // ??????
  type: PropTypes.string,
  component: PropTypes.any,
  children: PropTypes.any,
  noSpace: PropTypes.bool,
  // Form.Item??????
  colon: PropTypes.any,
  dependencies: PropTypes.any,
  extra: PropTypes.any,
  getValueFromEvent: PropTypes.any,
  getValueProps: PropTypes.any,
  hasFeedback: PropTypes.any,
  help: PropTypes.any,
  hidden: PropTypes.any,
  htmlFor: PropTypes.any,
  initialValue: PropTypes.any,
  label: PropTypes.any,
  labelAlign: PropTypes.any,
  labelCol: PropTypes.any,
  messageVariables: PropTypes.any,
  name: PropTypes.any,
  normalize: PropTypes.any,
  noStyle: PropTypes.any,
  preserve: PropTypes.any,
  required: PropTypes.any,
  rules: PropTypes.any,
  shouldUpdate: PropTypes.any,
  tooltip: PropTypes.any,
  trigger: PropTypes.any,
  validateFirst: PropTypes.any,
  validateStatus: PropTypes.any,
  validateTrigger: PropTypes.any,
  valuePropName: PropTypes.any,
  wrapperCol: PropTypes.any,
  // ?????????Element ??????
  style: PropTypes.object,
  placeholder: PropTypes.any,
  options: PropTypes.array,
  treeData: PropTypes.array,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  autoFocus: PropTypes.bool
};
FormItem$1.defaultProps = {
  type: 'input',
  noSpace: false
};
function FormItem$1(props) {
  var type = props.type,
      component = props.component,
      children = props.children,
      noSpace = props.noSpace,
      colon = props.colon,
      dependencies = props.dependencies,
      extra = props.extra,
      getValueFromEvent = props.getValueFromEvent,
      getValueProps = props.getValueProps,
      hasFeedback = props.hasFeedback,
      help = props.help,
      hidden = props.hidden,
      htmlFor = props.htmlFor,
      initialValue = props.initialValue,
      label = props.label,
      labelAlign = props.labelAlign,
      labelCol = props.labelCol,
      messageVariables = props.messageVariables,
      name = props.name,
      normalize = props.normalize,
      noStyle = props.noStyle,
      preserve = props.preserve,
      required = props.required,
      shouldUpdate = props.shouldUpdate,
      tooltip = props.tooltip,
      trigger = props.trigger,
      validateFirst = props.validateFirst,
      validateStatus = props.validateStatus,
      validateTrigger = props.validateTrigger,
      valuePropName = props.valuePropName,
      wrapperCol = props.wrapperCol,
      style = props.style,
      others = _objectWithoutProperties(props, ["type", "component", "children", "noSpace", "colon", "dependencies", "extra", "getValueFromEvent", "getValueProps", "hasFeedback", "help", "hidden", "htmlFor", "initialValue", "label", "labelAlign", "labelCol", "messageVariables", "name", "normalize", "noStyle", "preserve", "required", "shouldUpdate", "tooltip", "trigger", "validateFirst", "validateStatus", "validateTrigger", "valuePropName", "wrapperCol", "style"]); // ??????????????????????????????options?????????type???select


  if (others.options && type === 'input') type = 'select'; // ????????????

  if (!style) style = {};
  if (!('width' in style)) style.width = '100%'; // ?????? placeholder

  var placeholder = getPlaceholder(props); // ??????????????????

  var rules = getRules(_objectSpread2(_objectSpread2({}, props), {}, {
    placeholder: placeholder
  }));
  var element = getFormElement(_objectSpread2({
    type: type,
    component: component,
    children: children,
    style: style,
    placeholder: placeholder
  }, others));
  return /*#__PURE__*/React.createElement(Item$1, {
    colon: colon,
    dependencies: dependencies,
    extra: extra,
    getValueFromEvent: getValueFromEvent,
    getValueProps: getValueProps,
    hasFeedback: hasFeedback,
    help: help,
    hidden: hidden,
    htmlFor: htmlFor,
    initialValue: initialValue,
    label: label,
    labelAlign: labelAlign,
    labelCol: labelCol,
    messageVariables: messageVariables,
    name: name,
    normalize: normalize,
    noStyle: noStyle,
    preserve: preserve,
    required: required,
    rules: rules,
    shouldUpdate: shouldUpdate,
    tooltip: tooltip,
    trigger: trigger,
    validateFirst: validateFirst,
    validateStatus: validateStatus,
    validateTrigger: validateTrigger,
    valuePropName: valuePropName,
    wrapperCol: wrapperCol
  }, element);
}

var css_248z$g = ".style-module_formRowRoot__19NGx {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n}\n.style-module_formRowRoot__19NGx .form-element-flex-root {\n  padding-left: 10px;\n}\n.style-module_formRowRoot__19NGx .ant-btn {\n  margin-right: 10px;\n}\n.style-module_formRowRoot__19NGx .form-element-flex-root {\n  padding-left: 10px;\n}\n.style-module_formRowRoot__19NGx .portal-btn {\n  margin-right: 10px;\n}\n";
var styles$f = {"formRowRoot":"style-module_formRowRoot__19NGx"};
styleInject(css_248z$g);

function index$2 (props) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: styles$f.formRowRoot
  }, props));
}

var css_248z$h = ".operator-label {\n    display: inline-block;\n    background-color: transparent;\n    text-decoration: none;\n    outline: none;\n    cursor: pointer;\n    -webkit-transition: color .3s;\n    transition: color .3s;\n}\n\n.operator-label:hover {\n    opacity: 0.6;\n}\n\n.operator-label-disabled {\n    cursor: not-allowed;\n\n}\n\n.operator-label-disabled:hover {\n    opacity: 1;\n}\n\n.operator-divider {\n    display: inline-block;\n    margin: 0 8px;\n    width: 1px;\n    height: 18px;\n    vertical-align: middle;\n    background: #d9d9d9;\n}\n";
styleInject(css_248z$h);

/**
 * ??????????????????????????????????????????????????????
 */

var Operator = /*#__PURE__*/function (_Component) {
  _inherits(Operator, _Component);

  var _super = _createSuper(Operator);

  function Operator() {
    var _this;

    _classCallCheck(this, Operator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.loadingIcon = /*#__PURE__*/React.createElement(LoadingOutlined, null);
    _this.label = {};

    _this.getLabel = function (options, i) {
      var label = options.label,
          icon = options.icon,
          loading = options.loading,
          color = options.color,
          disabled = options.disabled;

      if (loading) {
        var labelWidth = _this.label[i] ? _this.label[i].offsetWidth : 'auto';
        return /*#__PURE__*/React.createElement("a", {
          className: "operator-label",
          style: {
            display: 'inline-block',
            width: labelWidth,
            textAlign: 'center'
          }
        }, _this.loadingIcon);
      }

      var labelStyle = {
        transition: 'all 1ms' // ???????????????????????????????????????

      };
      if (color) labelStyle.color = color;

      if (icon) {
        label = /*#__PURE__*/React.createElement(Tooltip, {
          placement: "bottom",
          title: label
        }, /*#__PURE__*/React.createElement(Icon, {
          style: {
            fontSize: 16
          },
          type: icon
        }));
      }

      return /*#__PURE__*/React.createElement("a", {
        className: "operator-label ".concat(disabled ? 'operator-label-disabled' : ''),
        style: labelStyle,
        ref: function ref(v) {
          return _this.label[i] = v;
        }
      }, label);
    };

    _this.getConfirm = function (options, i) {
      var label = _this.getLabel(options, i);

      var confirm = options.confirm,
          _options$withKey = options.withKey,
          withKey = _options$withKey === void 0 ? true : _options$withKey; // ?????? alt command ctrl ???????????????????????????

      if (withKey) {
        label = /*#__PURE__*/React.createElement("span", {
          onClick: function onClick(e) {
            e && e.stopPropagation();

            if (e.altKey || e.metaKey || e.ctrlKey) {
              e.stopPropagation();
              e.preventDefault();

              if (confirm && confirm.onConfirm) {
                confirm.onConfirm(e);
              }
            }
          }
        }, label);
      }

      return /*#__PURE__*/React.createElement(Popconfirm, _extends({
        okType: "danger"
      }, confirm), label);
    };

    _this.getText = function (options, i) {
      var label = _this.getLabel(options, i);

      var onClick = options.onClick;
      if (options.label.type === 'a') return /*#__PURE__*/React.createElement("span", {
        onClick: onClick
      }, label);
      return /*#__PURE__*/React.createElement("span", {
        onClick: onClick
      }, label);
    };

    _this.getStatusSwitch = function (opt, i) {
      var statusSwitch = opt.statusSwitch,
          _opt$disabled = opt.disabled,
          disabled = _opt$disabled === void 0 ? false : _opt$disabled;
      var status = statusSwitch.status;

      var props = _objectSpread2({}, statusSwitch);

      var icon = status ? 'check-circle' : 'minus-circle-o';
      var color = status ? 'green' : 'red';
      var defaultLabel = /*#__PURE__*/React.createElement(Icon, {
        type: icon
      });

      var label = _this.getLabel(_objectSpread2(_objectSpread2({}, opt), {}, {
        label: defaultLabel,
        color: color
      }), i); // ?????????????????????????????????????????????????????????


      if (disabled) return label;
      Reflect.deleteProperty(props, 'status');
      return /*#__PURE__*/React.createElement(Popconfirm, props, label);
    };

    _this.getItem = function (opt, i) {
      var confirm = opt.confirm,
          statusSwitch = opt.statusSwitch,
          _opt$visible = opt.visible,
          visible = _opt$visible === void 0 ? true : _opt$visible,
          _opt$disabled2 = opt.disabled,
          disabled = _opt$disabled2 === void 0 ? false : _opt$disabled2;

      if (visible) {
        // ??????label?????????getStatusSwitch ?????????????????????????????????
        if (disabled && statusSwitch) return _this.getStatusSwitch(opt, i);

        if (disabled) {
          opt.color = '#ccc';
          return _this.getLabel(opt, i);
        }

        if (confirm) return _this.getConfirm(opt, i);
        if (statusSwitch) return _this.getStatusSwitch(opt, i);
        return _this.getText(opt, i);
      }

      return null;
    };

    return _this;
  }

  _createClass(Operator, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          items = _this$props.items,
          moreText = _this$props.moreText,
          moreContentWidth = _this$props.moreContentWidth,
          moreTrigger = _this$props.moreTrigger;
      var operators = [];
      var more = [];

      if (typeof moreTrigger === 'string') {
        moreTrigger = [moreTrigger];
      }

      items.forEach(function (opt, i) {
        var isMore = opt.isMore;

        var item = _this2.getItem(opt, i);

        if (item) {
          if (isMore) {
            more.push(item);
          } else {
            operators.push(item);
          }
        }
      });

      if (more && more.length) {
        // ??????
        var menu = /*#__PURE__*/React.createElement(Menu, {
          style: {
            width: moreContentWidth
          }
        }, more.map(function (item, index) {
          return /*#__PURE__*/React.createElement(Menu.Item, {
            key: item.label || index
          }, item);
        }));
        operators.push( /*#__PURE__*/React.createElement(Dropdown, {
          overlay: menu,
          trigger: moreTrigger
        }, /*#__PURE__*/React.createElement("a", {
          className: "operator-label"
        }, moreText)));
      }

      var operatorsLength = operators.length;

      if (!operatorsLength) {
        return null;
      }

      return /*#__PURE__*/React.createElement("span", null, operators.map(function (v, i) {
        return /*#__PURE__*/React.createElement("span", {
          key: v.label || "operator-".concat(i)
        }, v, operatorsLength === i + 1 ? '' : /*#__PURE__*/React.createElement("span", {
          className: "operator-divider"
        }));
      }));
    }
  }]);

  return Operator;
}(Component);

Operator.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.isRequired,
    icon: PropTypes.string,
    visible: PropTypes.bool,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    loading: PropTypes.bool,
    isMore: PropTypes.bool,
    onClick: PropTypes.func,
    confirm: PropTypes.object,
    statusSwitch: PropTypes.object
  })),
  moreText: PropTypes.any,
  moreContentWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  moreTrigger: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};
Operator.defaultProps = {
  items: [],
  moreText: /*#__PURE__*/React.createElement("span", null, "\u66F4\u591A", /*#__PURE__*/React.createElement(DownOutlined, null)),
  moreContentWidth: 'auto',
  moreTrigger: 'click'
};

var css_248z$i = ".pagination-wrap {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    padding-top: 8px;\n    border-top: 1px solid #f0f0f0;\n}\n\n.pagination-wrap .total-count {\n    margin-left: 10px;\n    padding: 5px 7px;\n    font-size: 12px;\n}\n\n";
styleInject(css_248z$i);

/**
 * ????????????
 */

var PaginationComponent = /*#__PURE__*/function (_Component) {
  _inherits(PaginationComponent, _Component);

  var _super = _createSuper(PaginationComponent);

  function PaginationComponent() {
    _classCallCheck(this, PaginationComponent);

    return _super.apply(this, arguments);
  }

  _createClass(PaginationComponent, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          size = _this$props.size,
          showSizeChanger = _this$props.showSizeChanger,
          showQuickJumper = _this$props.showQuickJumper,
          showMessage = _this$props.showMessage,
          pageSize = _this$props.pageSize,
          pageNum = _this$props.pageNum,
          total = _this$props.total,
          onPageNumChange = _this$props.onPageNumChange,
          onPageSizeChange = _this$props.onPageSizeChange,
          _onChange = _this$props.onChange;
      var props = {};

      if (showSizeChanger) {
        props.showSizeChanger = true;
      }

      if (showQuickJumper) {
        props.showQuickJumper = true;
      }

      var totalPage = Math.ceil(total / pageSize);
      var style = this.props.style;

      if (total <= 0) {
        style = _objectSpread2({}, style);
      }

      return /*#__PURE__*/React.createElement("div", {
        className: "pagination-wrap",
        style: style
      }, /*#__PURE__*/React.createElement(Pagination, _extends({}, props, {
        size: size,
        pageSizeOptions: ['10', '15', '20', '30', '50', '100'],
        onShowSizeChange: function onShowSizeChange(num, size) {
          return onPageSizeChange(size);
        },
        onChange: function onChange(num, size) {
          // onShowSizeChange ????????????????????? onPageNumChange
          if (size === _this.props.pageSize) {
            onPageNumChange(num, size);
          }

          _onChange(num, size);
        },
        defaultCurrent: 1,
        pageSize: pageSize,
        current: pageNum,
        total: total
      })), showMessage ? /*#__PURE__*/React.createElement("div", {
        className: "total-count"
      }, "\u5171", totalPage, "\u9875 ", total, "\u6761\u6570\u636E") : null);
    }
  }]);

  return PaginationComponent;
}(Component);

PaginationComponent.propTypes = {
  size: PropTypes.string,
  showSizeChanger: PropTypes.bool,
  showQuickJumper: PropTypes.bool,
  showMessage: PropTypes.bool,
  pageSize: PropTypes.number,
  pageNum: PropTypes.number,
  total: PropTypes.number,
  onPageNumChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  onChange: PropTypes.func
};
PaginationComponent.defaultProps = {
  size: 'small',
  showSizeChanger: true,
  showQuickJumper: true,
  showMessage: true,
  pageSize: 15,
  pageNum: 1,
  total: 0,
  onPageNumChange: function onPageNumChange() {
    return void 0;
  },
  onPageSizeChange: function onPageSizeChange() {
    return void 0;
  },
  onChange: function onChange() {
    return void 0;
  }
};

var css_248z$j = "/* ???????????? */\n.index-module_sxQueryBar__3vxF7 {\n  position: relative;\n  margin-bottom: 8px;\n  margin-left: -8px;\n  margin-right: -8px;\n  border-bottom: 8px solid #f0f2f5;\n  padding: 0 8px;\n}\n.index-module_sxQueryBar__3vxF7.index-module_withCollapse__3EMbW {\n  padding-right: 55px;\n}\n.index-module_sxQueryBar__3vxF7 .index-module_sxQueryBarCollapsed__3IEoi {\n  position: absolute;\n  right: 0;\n  top: 0;\n  padding: 3px 8px 0 0;\n  font-size: 14px;\n}\n.index-module_sxQueryBar__3vxF7 .index-module_sxQueryBarCollapsed__3IEoi i {\n  margin-left: 3px;\n}\n.index-module_sxQueryBar__3vxF7 .ant-form-item {\n  margin-bottom: 8px;\n}\n.index-module_sxQueryBar__3vxF7 .portal-form-item {\n  margin-bottom: 8px;\n}\n";
var styles$g = {"sxQueryBar":"index-module_sxQueryBar__3vxF7","withCollapse":"index-module_withCollapse__3EMbW","sxQueryBarCollapsed":"index-module_sxQueryBarCollapsed__3IEoi"};
styleInject(css_248z$j);

var QueryBar = /*#__PURE__*/function (_React$Component) {
  _inherits(QueryBar, _React$Component);

  var _super = _createSuper(QueryBar);

  function QueryBar() {
    var _this;

    _classCallCheck(this, QueryBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      showCollapsed: false
    };

    _this.handleCollapsedChange = function (e) {
      e.preventDefault();
      var _this$props = _this.props,
          onCollapsedChange = _this$props.onCollapsedChange,
          collapsed = _this$props.collapsed;

      if (onCollapsedChange) {
        onCollapsedChange(!collapsed);
      } // ?????????????????????????????????????????????????????????????????????????????????
      // ????????????????????????????????????????????????body???overflow


      var oldOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
        document.body.style.overflow = oldOverflow;
      });
    };

    return _this;
  }

  _createClass(QueryBar, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          collapsed = _this$props2.collapsed,
          className = _this$props2.className,
          onCollapsedChange = _this$props2.onCollapsedChange,
          others = _objectWithoutProperties(_this$props2, ["collapsed", "className", "onCollapsedChange"]);

      var showCollapsed = this.state.showCollapsed;
      return /*#__PURE__*/React.createElement("div", _extends({
        className: classNames(className, styles$g.sxQueryBar, 'sx-query-bar', showCollapsed ? styles$g.withCollapse : '')
      }, others), showCollapsed ? /*#__PURE__*/React.createElement("a", {
        className: styles$g.sxQueryBarCollapsed,
        onClick: this.handleCollapsedChange
      }, collapsed ? /*#__PURE__*/React.createElement(DownCircleOutlined, null) : /*#__PURE__*/React.createElement(UpCircleOutlined, null)) : null, this.props.children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      var showCollapsed = ('collapsed' in nextProps);
      return {
        showCollapsed: showCollapsed
      };
    }
  }]);

  return QueryBar;
}(React.Component);

QueryBar.propTypes = {
  collapsed: PropTypes.bool,
  // ??????/?????? ??????
  onCollapsedChange: PropTypes.func // ??????/?????? ????????????

};
QueryBar.defaultProps = {
  onCollapsedChange: function onCollapsedChange(collapsed) {
    return collapsed;
  }
};

var TableComponent = /*#__PURE__*/function (_Component) {
  _inherits(TableComponent, _Component);

  var _super = _createSuper(TableComponent);

  function TableComponent() {
    var _this;

    _classCallCheck(this, TableComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      tableBodyHeight: 300
    };

    _this.setTableBodyHeight = function () {
      var prefixCls = _this.context.getPrefixCls();

      _this.tableBody = _this.wrapper.querySelector(".".concat(prefixCls, "-table-body")); // this.tableTBody = this.wrapper.querySelector(`.${prefixCls}-table-tbody`);

      _this.tablePlaceholder = _this.wrapper.querySelector(".".concat(prefixCls, "-table-placeholder"));
      _this.tableHead = _this.wrapper.querySelector(".".concat(prefixCls, "-table-header"));
      var _window$location = window.location,
          pathname = _window$location.pathname,
          search = _window$location.search;
      var currentPath = window.decodeURIComponent("".concat(pathname).concat(search));
      var activeTab = document.getElementById(currentPath);
      _this.pagination = (activeTab ? activeTab : document).querySelector('.pagination-wrap');
      var tableBodyHeight;
      var dataSource = _this.props.dataSource;
      var windowHeight = document.documentElement.clientHeight; // ?????????????????????????????????????????????

      if ('otherHeight' in _this.props) {
        var otherHeight = _this.props.otherHeight;
        tableBodyHeight = windowHeight - otherHeight;
      } else {
        var _this$tableHead;

        var tableHeadHeight = ((_this$tableHead = _this.tableHead) === null || _this$tableHead === void 0 ? void 0 : _this$tableHead.offsetHeight) + 1 || 0;
        var paginationHeight = _this.pagination ? _this.pagination.offsetHeight : 0;
        var bottomHeight = paginationHeight + 10 + 10;
        var tableOffsetTop = getElementTop(_this.wrapper);

        var _otherHeight = tableOffsetTop + tableHeadHeight + bottomHeight;

        tableBodyHeight = windowHeight - _otherHeight + 4;
        if ('offsetHeight' in _this.props) tableBodyHeight = tableBodyHeight - _this.props.offsetHeight;
      }

      if (dataSource === null || dataSource === void 0 ? void 0 : dataSource.length) {
        _this.tableBody.style.height = "".concat(tableBodyHeight, "px"); // this.tableTBody.style.height = `${tableBodyHeight}px`;
      } else {
        _this.tablePlaceholder.style.height = "".concat(tableBodyHeight, "px");
      }

      _this.setState({
        tableBodyHeight: tableBodyHeight
      });
    };

    return _this;
  }

  _createClass(TableComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.surplusSpace) {
        this.setTableBodyHeight();
        window.addEventListener('resize', this.setTableBodyHeight);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.surplusSpace) {
        var prevDataSource = prevProps.dataSource;
        var dataSource = this.props.dataSource;

        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.length) !== (prevDataSource === null || prevDataSource === void 0 ? void 0 : prevDataSource.length)) {
          this.setTableBodyHeight();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.surplusSpace) {
        window.removeEventListener('resize', this.setTableBodyHeight);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$scroll = _this$props.scroll,
          scroll = _this$props$scroll === void 0 ? {} : _this$props$scroll,
          pagination = _this$props.pagination,
          surplusSpace = _this$props.surplusSpace,
          serialNumber = _this$props.serialNumber,
          serialText = _this$props.serialText,
          pageSize = _this$props.pageSize,
          pageNum = _this$props.pageNum,
          rowSelection = _this$props.rowSelection,
          columns = _this$props.columns,
          others = _objectWithoutProperties(_this$props, ["scroll", "pagination", "surplusSpace", "serialNumber", "serialText", "pageSize", "pageNum", "rowSelection", "columns"]);

      var tableBodyHeight = this.state.tableBodyHeight;
      var tableScroll = surplusSpace ? _objectSpread2({
        y: tableBodyHeight
      }, scroll) : scroll;
      if (rowSelection === true) rowSelection = {};
      if (!rowSelection) rowSelection = void 0;

      if (serialNumber) {
        if (this.pagination) {
          if (!('pageNum' in this.props)) console.error('?????????????????????????????????????????????pageNum??????');
          if (!('pageSize' in this.props)) console.error('?????????????????????????????????????????????pageSize??????');
        }

        columns = [{
          title: serialText,
          width: 70,
          dataIndex: '__num',
          key: '__num',
          render: function render(value, record, index) {
            if (_this2.pagination) {
              return index + 1 + pageSize * (pageNum - 1);
            } else {
              return index + 1;
            }
          }
        }].concat(_toConsumableArray(columns));
      }

      return /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%'
        },
        ref: function ref(node) {
          return _this2.wrapper = node;
        }
      }, /*#__PURE__*/React.createElement(Table, _extends({
        scroll: tableScroll,
        pagination: false,
        rowSelection: rowSelection
      }, others, {
        columns: columns
      })));
    }
  }]);

  return TableComponent;
}(Component);

TableComponent.contextType = ConfigProvider.ConfigContext;
TableComponent.propTypes = {
  surplusSpace: PropTypes.bool,
  // ????????????????????????????????? true ?????????????????????
  serialNumber: PropTypes.bool,
  // ??????????????????
  serialText: PropTypes.string,
  // ?????????????????????
  pageSize: PropTypes.number,
  pageNum: PropTypes.number,
  otherHeight: PropTypes.number,
  offsetHeight: PropTypes.number,
  // ??????antd??????????????????IDE??????
  tableLayout: PropTypes.any,
  bordered: PropTypes.any,
  columns: PropTypes.any,
  components: PropTypes.any,
  dataSource: PropTypes.any,
  expandable: PropTypes.any,
  footer: PropTypes.any,
  loading: PropTypes.any,
  locale: PropTypes.any,
  pagination: PropTypes.any,
  rowClassName: PropTypes.any,
  rowKey: PropTypes.any,
  rowSelection: PropTypes.any,
  scroll: PropTypes.any,
  showHeader: PropTypes.any,
  size: PropTypes.any,
  summary: PropTypes.any,
  title: PropTypes.any,
  onChange: PropTypes.any,
  onHeaderRow: PropTypes.any,
  onRow: PropTypes.any,
  getPopupContainer: PropTypes.any,
  sortDirections: PropTypes.any,
  showSorterTooltip: PropTypes.any
};
TableComponent.defaultProps = {
  surplusSpace: true,
  pagination: false,
  serialText: '#'
};

var css_248z$k = ".style-module_tableEditableRoot__ak-iu .ant-form-item {\n  margin-bottom: 0;\n}\n.style-module_tableEditableRoot__ak-iu .ant-form-item-explain {\n  z-index: 99;\n}\n.style-module_tableEditableRoot__ak-iu .portal-form-item {\n  margin-bottom: 0;\n}\n.style-module_tableEditableRoot__ak-iu .portal-form-item-explain {\n  z-index: 99;\n}\n";
var styles$h = {"tableEditableRoot":"style-module_tableEditableRoot__ak-iu"};
styleInject(css_248z$k);

var EditableContext = /*#__PURE__*/React.createContext();

var EditableRow = function EditableRow(_ref) {
  var initialValues = _ref.initialValues,
      props = _objectWithoutProperties(_ref, ["initialValues"]);

  var _Form$useForm = Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  return /*#__PURE__*/React.createElement(Form, {
    name: v4(),
    form: form,
    component: false,
    initialValues: initialValues
  }, /*#__PURE__*/React.createElement(EditableContext.Provider, {
    value: form
  }, /*#__PURE__*/React.createElement("tr", props)));
};

var EditableCell = function EditableCell(options) {
  var children = options.children,
      _options$record = options.record,
      record = _options$record === void 0 ? {} : _options$record,
      rowIndex = options.rowIndex,
      _options$col = options.col,
      col = _options$col === void 0 ? {} : _options$col,
      restProps = _objectWithoutProperties(options, ["children", "record", "rowIndex", "col"]);

  record._form = useContext(EditableContext);
  var title = col.title,
      dataIndex = col.dataIndex,
      formProps = col.formProps;
  var childNode = children;
  var eleProps = formProps;

  if (typeof formProps === 'function') {
    eleProps = formProps(record, rowIndex);
  } // eleProps ???????????????????????????


  if (eleProps) {
    childNode = /*#__PURE__*/React.createElement(FormElement$1, _extends({
      label: title,
      showLabel: false,
      colon: false,
      name: dataIndex
    }, eleProps));
  }

  return /*#__PURE__*/React.createElement("td", restProps, childNode);
};

function editTable(OriTable) {
  return /*#__PURE__*/function (_Component) {
    _inherits(EditTable, _Component);

    var _super = _createSuper(EditTable);

    function EditTable() {
      _classCallCheck(this, EditTable);

      return _super.apply(this, arguments);
    }

    _createClass(EditTable, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            columns = _this$props.columns,
            _this$props$className = _this$props.className,
            className = _this$props$className === void 0 ? '' : _this$props$className,
            _onRow = _this$props.onRow,
            components = _this$props.components,
            others = _objectWithoutProperties(_this$props, ["columns", "className", "onRow", "components"]);

        var body = (components === null || components === void 0 ? void 0 : components.body) || {};
        var nextComponents = {
          body: _objectSpread2(_objectSpread2({}, body), {}, {
            row: EditableRow,
            cell: EditableCell
          })
        };
        var newColumns = columns.map(function (col) {
          if (!col.formProps) {
            return col;
          }

          return _objectSpread2(_objectSpread2({}, col), {}, {
            onCell: function onCell(record, rowIndex) {
              return {
                record: record,
                rowIndex: rowIndex,
                col: col
              };
            }
          });
        });
        return /*#__PURE__*/React.createElement(OriTable, _extends({
          onRow: function onRow(record, index) {
            var result = {};
            if (_onRow) result = _onRow(record, index);

            var initialValues = _objectSpread2({}, record);

            return _objectSpread2(_objectSpread2({}, result), {}, {
              initialValues: initialValues
            });
          },
          className: "".concat(styles$h.tableEditableRoot, " ").concat(className),
          components: nextComponents,
          columns: newColumns
        }, others));
      }
    }]);

    return EditTable;
  }(Component);
}

var css_248z$l = ".index-module_sxTableRowDraggable__2B28r tbody > tr {\n  cursor: move;\n}\n.helper-element {\n  display: table-row;\n}\n.helper-element td {\n  border-bottom: 1px solid #f0f0f0;\n  border-top: 1px solid #f0f0f0;\n  padding: 8px;\n  display: table-cell;\n  vertical-align: center;\n  background: #fff;\n  width: 10000px;\n  border-collapse: collapse;\n}\n.helper-element .ant-form-item {\n  margin-bottom: 0;\n}\n.helper-element {\n  display: table-row;\n}\n.helper-element td {\n  border-bottom: 1px solid #f0f0f0;\n  border-top: 1px solid #f0f0f0;\n  padding: 8px;\n  display: table-cell;\n  vertical-align: center;\n  background: #fff;\n  width: 10000px;\n  border-collapse: collapse;\n}\n.helper-element .portal-form-item {\n  margin-bottom: 0;\n}\n";
var styles$i = {"sxTableRowDraggable":"index-module_sxTableRowDraggable__2B28r"};
styleInject(css_248z$l);

var RowElement = SortableElement(function (props) {
  return props.children;
});
var BodyContainer = SortableContainer(function (props) {
  var children = props.children,
      others = _objectWithoutProperties(props, ["children"]);

  var children2 = props.children.flat(4).filter(function (item) {
    return !!item;
  });
  return /*#__PURE__*/React.createElement("tbody", others, children2.map(function (item, index) {
    var key = item.key;
    return /*#__PURE__*/React.createElement(RowElement, {
      key: key,
      index: index
    }, item);
  }));
});

function getCss(element, attr) {
  if (element.currentStyle) {
    return element.currentStyle[attr];
  } else {
    return window.getComputedStyle(element)[attr];
  }
}

function DragRow(OriTable) {
  var DragRowTable = /*#__PURE__*/function (_Component) {
    _inherits(DragRowTable, _Component);

    var _super = _createSuper(DragRowTable);

    function DragRowTable(props) {
      var _this;

      _classCallCheck(this, DragRowTable);

      _this = _super.call(this, props);
      var _this$props = _this.props,
          helperClass = _this$props.helperClass,
          onSortStart = _this$props.onSortStart,
          onSortEnd = _this$props.onSortEnd,
          components = _this$props.components;

      var handleSortStart = function handleSortStart() {
        onSortStart && onSortStart.apply(void 0, arguments); // ??????tr??????

        var helperTds = document.querySelectorAll('.helper-element > td');

        var tr = _this.body.container.querySelector('tr');

        var tds = tr.querySelectorAll('td');
        tds.forEach(function (item, index) {
          if (!helperTds[index]) return;
          helperTds[index].style.width = getCss(item, 'width');
          helperTds[index].style.height = getCss(item, 'height');
        });
      };

      var handleSortEnd = function handleSortEnd(props) {
        var oldIndex = props.oldIndex,
            newIndex = props.newIndex;

        var prefixCls = _this.context.getPrefixCls();

        if (_this.body.container.querySelector(".".concat(prefixCls, "-table-measure-row"))) {
          newIndex = newIndex - 1 < 0 ? 0 : newIndex - 1;
          oldIndex = oldIndex - 1;
        }

        onSortEnd(_objectSpread2(_objectSpread2({}, props), {}, {
          oldIndex: oldIndex,
          newIndex: newIndex
        }));
      };

      var BodyWrapper = function BodyWrapper(props) {
        var injectProps = {
          onSortEnd: handleSortEnd,
          onSortStart: handleSortStart,
          helperClass: classNames(helperClass, 'helper-element')
        };
        return /*#__PURE__*/React.createElement(BodyContainer, _extends({
          ref: function ref(node) {
            return _this.body = node;
          }
        }, injectProps, props));
      };

      var body = (components === null || components === void 0 ? void 0 : components.body) || {};
      _this.components = {
        body: _objectSpread2(_objectSpread2({}, body), {}, {
          wrapper: BodyWrapper
        })
      };
      return _this;
    }

    _createClass(DragRowTable, [{
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            className = _this$props2.className,
            onSortStart = _this$props2.onSortStart,
            onSortEnd = _this$props2.onSortEnd,
            helperClass = _this$props2.helperClass,
            others = _objectWithoutProperties(_this$props2, ["className", "onSortStart", "onSortEnd", "helperClass"]);

        var classNames$1 = classNames(className, styles$i.sxTableRowDraggable);
        return /*#__PURE__*/React.createElement(OriTable, _extends({}, others, {
          className: classNames$1,
          components: this.components
        }));
      }
    }]);

    return DragRowTable;
  }(Component);

  DragRowTable.contextType = ConfigProvider.ConfigContext;
  DragRowTable.propTypes = {
    onSortEnd: PropTypes.func.isRequired,
    helperClass: PropTypes.string
  };
  return DragRowTable;
}

var css_248z$m = ".tool-bar-root {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-bottom: 8px;\n}\n\n.tool-bar-root > * {\n    margin-right: 8px;\n}\n\n.tool-bar-root > *:last-child {\n    margin-right: 0;\n}\n";
styleInject(css_248z$m);

var ToolBar = /*#__PURE__*/function (_Component) {
  _inherits(ToolBar, _Component);

  var _super = _createSuper(ToolBar);

  function ToolBar() {
    _classCallCheck(this, ToolBar);

    return _super.apply(this, arguments);
  }

  _createClass(ToolBar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style,
          right = _this$props.right,
          children = _this$props.children,
          className = _this$props.className,
          others = _objectWithoutProperties(_this$props, ["style", "right", "children", "className"]);

      if (right && !style.justifyContent) {
        style.justifyContent = 'flex-end';
      }

      var cls = classNames('tool-bar-root', className);
      return /*#__PURE__*/React.createElement("div", _extends({
        className: cls,
        style: style
      }, others), children);
    }
  }]);

  return ToolBar;
}(Component);

ToolBar.propTypes = {
  right: PropTypes.bool
};
ToolBar.defaultProps = {
  right: false
};

var css_248z$n = ".style-module_sys__sKDmL {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  height: 100%;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 0 24px;\n  color: #fff;\n}\n.style-module_sys__sKDmL .style-module_searchIcon__1VC4Q {\n  font-size: 20px;\n  margin-right: 8px;\n}\n.style-module_sys__sKDmL .style-module_menuPane__2Z5lJ {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-flex-flow: wrap;\n      -ms-flex-flow: wrap;\n          flex-flow: wrap;\n  position: fixed;\n  top: 50px;\n  right: 0;\n  left: 0;\n  max-height: -webkit-calc(100vh - 50px);\n  max-height: calc(100vh - 50px);\n  min-height: 300px;\n  background: rgba(0, 0, 0, 0.7);\n  -webkit-transform: scaleY(0);\n      -ms-transform: scaleY(0);\n          transform: scaleY(0);\n  -webkit-transform-origin: top;\n      -ms-transform-origin: top;\n          transform-origin: top;\n  -webkit-transition: -webkit-transform 300ms;\n  transition: -webkit-transform 300ms;\n  transition: transform 300ms;\n  transition: transform 300ms, -webkit-transform 300ms;\n  color: #fff;\n  padding: 16px;\n  -webkit-transition-delay: 200ms;\n          transition-delay: 200ms;\n  overflow-y: auto;\n}\n.style-module_sys__sKDmL .style-module_menuItem__21FWQ {\n  padding: 4px 8px;\n  margin-right: 8px;\n  -webkit-transition: background-color 300ms;\n  transition: background-color 300ms;\n}\n.style-module_sys__sKDmL .style-module_menuItem__21FWQ a {\n  color: #fff;\n  font-weight: bold;\n}\n.style-module_sys__sKDmL .style-module_menuItem__21FWQ .anticon {\n  margin-right: 4px;\n}\n.style-module_sys__sKDmL .style-module_menuItem__21FWQ:hover,\n.style-module_sys__sKDmL .style-module_menuItem__21FWQ.style-module_active__a-Vjf {\n  background: rgba(255, 255, 255, 0.3);\n}\n.style-module_sys__sKDmL .style-module_close__1z3gC {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  padding: 4px 8px;\n  font-size: 18px;\n  cursor: pointer;\n}\n";
var styles$j = {"sys":"style-module_sys__sKDmL","searchIcon":"style-module_searchIcon__1VC4Q","menuPane":"style-module_menuPane__2Z5lJ","menuItem":"style-module_menuItem__21FWQ","active":"style-module_active__a-Vjf","close":"style-module_close__1z3gC"};
styleInject(css_248z$n);

var HeaderSys = /*#__PURE__*/function (_Component) {
  _inherits(HeaderSys, _Component);

  var _super = _createSuper(HeaderSys);

  function HeaderSys() {
    var _this;

    _classCallCheck(this, HeaderSys);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      visible: false,
      oriDataSource: [],
      dataSource: []
    };

    _this.handleMouseEnter = function () {
      _this.setState({
        visible: true
      });
    };

    _this.handleMouseLeave = function () {
      _this.setState({
        visible: false
      });
    };

    _this.handleSearchChange = debounce(function (e) {
      var value = e.target.value;
      var oriDataSource = _this.state.oriDataSource;
      if (!value) return _this.setState({
        dataSource: oriDataSource
      });
      var nextDataSource = oriDataSource.filter(function (item) {
        var _item$text;

        return item === null || item === void 0 ? void 0 : (_item$text = item.text) === null || _item$text === void 0 ? void 0 : _item$text.includes(value);
      });

      _this.setState({
        dataSource: nextDataSource
      });
    }, 200);
    return _this;
  }

  _createClass(HeaderSys, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          sideWidth = _this$props.sideWidth,
          selectedKeys = _this$props.selectedKeys;
      var _this$state = this.state,
          visible = _this$state.visible,
          dataSource = _this$state.dataSource;
      return /*#__PURE__*/React.createElement("div", {
        className: styles$j.sys,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }, /*#__PURE__*/React.createElement(Input, {
        style: {
          width: 200
        },
        prefix: /*#__PURE__*/React.createElement(AppstoreOutlined, {
          className: styles$j.searchIcon
        }),
        placeholder: "\u641C\u7D22\u7CFB\u7EDF",
        allowClear: true,
        onChange: function onChange(e) {
          e.persist();

          _this2.handleSearchChange(e);
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: styles$j.menuPane,
        style: {
          left: sideWidth - 1,
          transform: visible ? 'scaleY(1)' : 'scaleY(0)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: styles$j.close,
        onClick: function onClick() {
          return _this2.setState({
            visible: false
          });
        }
      }, /*#__PURE__*/React.createElement(CloseCircleOutlined, null)), dataSource.map(function (item) {
        var key = item.key,
            path = item.path,
            text = item.text,
            icon = item.icon;
        var isActive = selectedKeys === null || selectedKeys === void 0 ? void 0 : selectedKeys.includes(key);
        return /*#__PURE__*/React.createElement("div", {
          key: key,
          className: [styles$j.menuItem, isActive ? styles$j.active : ''].join(' ')
        }, /*#__PURE__*/React.createElement(Link, {
          key: key,
          to: path
        }, icon && /*#__PURE__*/React.createElement(Icon, {
          type: icon
        }), text));
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var dataSource = nextProps.dataSource;
      if (prevState.oriDataSource !== dataSource) return {
        oriDataSource: dataSource,
        dataSource: dataSource
      };
      return null;
    }
  }]);

  return HeaderSys;
}(Component);

HeaderSys.defaultProps = {
  dataSource: []
};

var css_248z$o = ".style-module_userMenu__Gfb2o {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-size: 12px;\n}\n.style-module_menu__1pYBR {\n  width: 160px;\n}\n.style-module_menu__1pYBR .anticon {\n  margin-right: 8px;\n}\n.style-module_account__3dlB2 {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #fff;\n  cursor: pointer;\n  height: 100%;\n}\n.style-module_account__3dlB2 .style-module_userName__1xjs_ {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-size: 14px;\n  margin-right: 4px;\n  word-break: keep-all;\n}\n.style-module_account__3dlB2 .style-module_avatar__3LqdE {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  margin-right: 8px;\n  background: rgba(255, 255, 255, 0.85);\n  vertical-align: middle;\n}\n.style-module_account__3dlB2 i {\n  margin-left: 4px;\n}\n";
var styles$k = {"userMenu":"style-module_userMenu__Gfb2o","menu":"style-module_menu__1pYBR","account":"style-module_account__3dlB2","userName":"style-module_userName__1xjs_","avatar":"style-module_avatar__3LqdE"};
styleInject(css_248z$o);

var Item$2 = Menu.Item;

var HeaderUser = /*#__PURE__*/function (_Component) {
  _inherits(HeaderUser, _Component);

  var _super = _createSuper(HeaderUser);

  function HeaderUser() {
    var _this;

    _classCallCheck(this, HeaderUser);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {};
    return _this;
  }

  _createClass(HeaderUser, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var user = this.props.loginUser || {};
      var _this$props = this.props,
          className = _this$props.className,
          menus = _this$props.menus,
          theme = _this$props.theme,
          showAvatar = _this$props.showAvatar;
      var menu = /*#__PURE__*/React.createElement(Menu, {
        className: styles$k.menu,
        theme: theme,
        selectedKeys: []
      }, menus.map(function (item, index) {
        var text = item.text,
            onClick = item.onClick;
        if (text === 'Divider') return /*#__PURE__*/React.createElement(Menu.Divider, null);
        return /*#__PURE__*/React.createElement(Item$2, {
          key: index,
          onClick: onClick
        }, text);
      }));
      return /*#__PURE__*/React.createElement("div", {
        className: styles$k.userMenu,
        ref: function ref(node) {
          return _this2.userMenu = node;
        }
      }, /*#__PURE__*/React.createElement(Dropdown, {
        trigger: "click",
        overlay: menu,
        getPopupContainer: function getPopupContainer() {
          return _this2.userMenu || document.body;
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: [styles$k.account, className].join(' ')
      }, /*#__PURE__*/React.createElement("span", {
        className: styles$k.userName
      }, /*#__PURE__*/React.createElement(UserLink, {
        user: user,
        showAvatar: showAvatar,
        link: false
      })), /*#__PURE__*/React.createElement(CaretDownOutlined, null))));
    }
  }]);

  return HeaderUser;
}(Component);

HeaderUser.propTypes = {
  theme: PropTypes.string,
  loginUser: PropTypes.object,
  showAvatar: PropTypes.bool,
  menus: PropTypes.array
};
HeaderUser.defaultProps = {
  theme: 'default',
  loginUser: {},
  showAvatar: true
};

var HeaderFullScreen = /*#__PURE__*/function (_Component) {
  _inherits(HeaderFullScreen, _Component);

  var _super = _createSuper(HeaderFullScreen);

  function HeaderFullScreen() {
    var _this;

    _classCallCheck(this, HeaderFullScreen);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      fullScreen: false,
      toolTipVisible: false,
      prevStyle: {}
    };

    _this.handleKeyDown = function (e) {
      var keyCode = e.keyCode;
      var _this$props = _this.props,
          element = _this$props.element,
          inFrame = _this$props.inFrame,
          onExit = _this$props.onExit;
      var _this$state = _this.state,
          fullScreen = _this$state.fullScreen,
          prevStyle = _this$state.prevStyle;

      if (keyCode === 27 && fullScreen && inFrame) {
        Object.entries(prevStyle).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          element.style[key] = value;
        });
        onExit && onExit();
      }
    };

    _this.handleFullScreenClick = function () {
      var _this$props2 = _this.props,
          element = _this$props2.element,
          inFrame = _this$props2.inFrame,
          onFull = _this$props2.onFull,
          onExit = _this$props2.onExit;
      var _this$state2 = _this.state,
          fullScreen = _this$state2.fullScreen,
          prevStyle = _this$state2.prevStyle;

      if (inFrame) {
        if (fullScreen) {
          Object.entries(prevStyle).forEach(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            element.style[key] = value;
          });
          onExit && onExit();

          _this.setState({
            fullScreen: false
          });
        } else {
          var _prevStyle = {};
          ['position', 'top', 'right', 'bottom', 'left'].forEach(function (key) {
            _prevStyle[key] = element.style[key];
          });

          _this.setState({
            prevStyle: _prevStyle
          });

          Object.entries({
            position: 'fixed',
            top: '50px',
            right: 0,
            bottom: 0,
            left: 0
          }).forEach(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                key = _ref6[0],
                value = _ref6[1];

            element.style[key] = value;
          });
          onFull && onFull();

          _this.setState({
            fullScreen: true
          });
        }

        return;
      }

      if (fullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullScreen();
        }
      }
    };

    _this.handleFullScreenChange = function () {
      var _this$props3 = _this.props,
          onFull = _this$props3.onFull,
          onExit = _this$props3.onExit;
      var fullScreen = _this.state.fullScreen;
      !fullScreen ? onFull() : onExit();

      _this.setState({
        fullScreen: !fullScreen
      });
    };

    _this.handleToolTipShow = function () {
      if (_this.ST) clearTimeout(_this.ST);

      _this.setState({
        toolTipVisible: true
      });
    };

    _this.handleToolTipHide = function () {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
      _this.ST = setTimeout(function () {
        _this.setState({
          toolTipVisible: false
        });
      }, time);
    };

    return _this;
  }

  _createClass(HeaderFullScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var fullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
      this.setState({
        fullScreen: !!fullScreen
      });
      window.document.addEventListener('fullscreenchange', this.handleFullScreenChange);
      window.document.addEventListener('mozfullscreenchange', this.handleFullScreenChange);
      window.document.addEventListener('webkitfullscreenchange', this.handleFullScreenChange);
      window.document.addEventListener('msfullscreenchange', this.handleFullScreenChange);
      window.document.addEventListener('click', function () {
        return _this2.handleToolTipHide(0);
      });
      window.document.addEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      window.document.removeEventListener('fullscreenchange', this.handleFullScreenChange);
      window.document.removeEventListener('mozfullscreenchange', this.handleFullScreenChange);
      window.document.removeEventListener('webkitfullscreenchange', this.handleFullScreenChange);
      window.document.removeEventListener('msfullscreenchange', this.handleFullScreenChange);
      window.document.removeEventListener('click', function () {
        return _this3.handleToolTipHide(0);
      });
      window.document.removeEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props4 = this.props,
          className = _this$props4.className,
          toFullTip = _this$props4.toFullTip,
          exitFullTip = _this$props4.exitFullTip,
          placement = _this$props4.placement;
      var _this$state3 = this.state,
          fullScreen = _this$state3.fullScreen,
          toolTipVisible = _this$state3.toolTipVisible;
      return /*#__PURE__*/React.createElement("div", {
        className: className,
        style: {
          fontSize: 14
        },
        onClick: this.handleFullScreenClick,
        onMouseEnter: this.handleToolTipShow,
        onMouseLeave: function onMouseLeave() {
          return _this4.handleToolTipHide();
        }
      }, /*#__PURE__*/React.createElement(Tooltip, {
        visible: toolTipVisible,
        placement: placement,
        title: fullScreen ? exitFullTip : toFullTip
      }, fullScreen ? /*#__PURE__*/React.createElement(FullscreenExitOutlined, null) : /*#__PURE__*/React.createElement(FullscreenOutlined, null)));
    }
  }]);

  return HeaderFullScreen;
}(Component);

HeaderFullScreen.propTypes = {
  /** Tooltip ???????????? */
  placement: PropTypes.any,

  /** ???????????????dom???????????????document.documentElement */
  element: PropTypes.any,

  /** ???????????? Tooltip ?????? */
  toFullTip: PropTypes.any,

  /** ???????????? Tooltip ?????? */
  exitFullTip: PropTypes.any,

  /** ????????????????????? */
  onFull: PropTypes.func,

  /** ???????????????????????? */
  onExit: PropTypes.func,

  /** ???????????????????????? */
  inFrame: PropTypes.bool
};
HeaderFullScreen.defaultProps = {
  element: document.documentElement,
  toFullTip: '??????',
  exitFullTip: '????????????',
  onFull: function onFull() {
    return void 0;
  },
  onExit: function onExit() {
    return void 0;
  },
  inFrame: false,
  placement: 'bottom'
};

var radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
};
var cardStyle = {
  margin: 16,
  flex: 1
};
var contentStyle = {
  display: 'flex'
};
var SettingModal = model$1({
  title: '????????????',
  width: 800
})(function SettingModal(props) {
  var onCancel = props.onCancel,
      _props$layoutState = props.layoutState,
      defaultShowHead = _props$layoutState.defaultShowHead,
      defaultHeadFixed = _props$layoutState.defaultHeadFixed,
      keepOtherMenuOpen = _props$layoutState.keepOtherMenuOpen,
      pageFrameLayout = _props$layoutState.pageFrameLayout,
      defaultShowTabs = _props$layoutState.defaultShowTabs,
      theme = _props$layoutState.theme,
      layout = props.action.layout;

  function handlePageFrameLayoutChange(e) {
    var value = e.target.value;

    if (value === PAGE_FRAME_LAYOUT.TOP_MENU) {
      layout.initSideWidth();
      layout.setSideCollapsed(false);
    }

    layout.setPageFrameLayout(value);
  }

  return /*#__PURE__*/React.createElement(ModalContent, {
    footer: /*#__PURE__*/React.createElement(Button, {
      onClick: onCancel
    }, "\u5173\u95ED")
  }, /*#__PURE__*/React.createElement("div", {
    style: contentStyle
  }, /*#__PURE__*/React.createElement(Card, {
    title: "\u9875\u5934\u8BBE\u7F6E",
    style: cardStyle
  }, /*#__PURE__*/React.createElement(Checkbox, {
    onChange: function onChange(e) {
      var checked = e.target.checked;
      layout.setDefaultShowHead(checked);
      checked ? layout.showHead() : layout.hideHead();
    },
    checked: defaultShowHead
  }, "\u663E\u793A\u5934\u90E8"), defaultShowHead ? /*#__PURE__*/React.createElement(Checkbox, {
    onChange: function onChange(e) {
      var checked = e.target.checked;
      layout.setDefaultHeadFixed(checked);
      layout.setHeadFixed(checked);
    },
    checked: defaultHeadFixed
  }, "\u5934\u90E8\u56FA\u5B9A") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    onChange: function onChange(e) {
      var checked = e.target.checked;
      layout.setDefaultShowTabs(checked);
      layout.showTabs(checked);
    },
    checked: defaultShowTabs
  }, "\u663E\u793ATab\u9875"))), /*#__PURE__*/React.createElement(Card, {
    title: "\u83DC\u5355\u8BBE\u7F6E",
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid ".concat(theme === 'dark' ? '#303030' : '#d9d9d9'),
      paddingBottom: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    onChange: function onChange(e) {
      return layout.setKeepOtherMenuOpen(e.target.checked);
    },
    checked: keepOtherMenuOpen
  }, "\u4FDD\u6301\u83DC\u5355\u5C55\u5F00")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Radio.Group, {
    onChange: handlePageFrameLayoutChange,
    value: pageFrameLayout
  }, /*#__PURE__*/React.createElement(Radio, {
    style: radioStyle,
    value: PAGE_FRAME_LAYOUT.TOP_SIDE_MENU
  }, "\u5934\u90E8+\u5DE6\u4FA7\u83DC\u5355"), /*#__PURE__*/React.createElement(Radio, {
    style: radioStyle,
    value: PAGE_FRAME_LAYOUT.TOP_MENU
  }, "\u5934\u90E8\u83DC\u5355"), /*#__PURE__*/React.createElement(Radio, {
    style: radioStyle,
    value: PAGE_FRAME_LAYOUT.SIDE_MENU
  }, "\u5DE6\u4FA7\u83DC\u5355"))))), /*#__PURE__*/React.createElement(Alert, {
    style: {
      margin: '0 16px'
    },
    type: "error",
    message: "\u5982\u679C\u8C03\u6574\u8BBE\u7F6E\u4E4B\u540E\uFF0C\u9875\u9762\u5E03\u5C40\u6709\u95EE\u9898\uFF0C\u8BF7\u5237\u65B0\u6D4F\u89C8\u5668~"
  }));
});

var css_248z$p = ".style-module_root__2O3lK {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  justify-items: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0 8px;\n  font-size: 14px;\n  color: #fff;\n  cursor: pointer;\n}\n.style-module_root__2O3lK:hover {\n  background: rgba(0, 0, 0, 0.1);\n}\n";
var styles$l = {"root":"style-module_root__2O3lK"};
styleInject(css_248z$p);

var HeaderSetting = function HeaderSetting(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles$l.root,
    onClick: function onClick() {
      return setVisible(true);
    }
  }, /*#__PURE__*/React.createElement(SettingOutlined, null)), /*#__PURE__*/React.createElement(SettingModal, _extends({}, props, {
    visible: visible,
    onOk: function onOk() {
      setVisible(false); // ????????????

      window.location.reload();
    },
    onCancel: function onCancel() {
      return setVisible(false);
    }
  })));
};

HeaderSetting.propTypes = {
  action: PropTypes.object,
  layoutState: PropTypes.object
};

var Copy = function Copy(props) {
  var _useState = useState('??????'),
      _useState2 = _slicedToArray(_useState, 2),
      copyTip = _useState2[0],
      setCopyTip = _useState2[1];

  var text = props.text,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      others = _objectWithoutProperties(props, ["text", "style"]);

  return /*#__PURE__*/React.createElement(CopyToClipboard, {
    text: text,
    onCopy: function onCopy() {
      setCopyTip('???????????????????');
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    title: copyTip
  }, /*#__PURE__*/React.createElement(CopyOutlined, _extends({
    style: _objectSpread2({
      margin: '0 8px'
    }, style),
    onBlur: function onBlur() {
      setCopyTip('??????');
    }
  }, others))));
};

Copy.propTypes = {
  /** ?????????????????? */
  text: PropTypes.string
};

/**
 * ????????????promise????????????????????? async await ??????
 * @param props
 * @returns {Promise<unknown>}
 * @constructor
 */

function modalConfirm(props) {
  var options = {};
  if (!props) options = {
    title: '???????????????'
  };
  if (typeof props === 'string') options = {
    content: props
  };
  if (_typeof(props) === 'object') options = props;
  return new Promise(function (resolve, reject) {
    Modal.confirm(_objectSpread2({
      title: '????????????',
      onOk: function onOk() {
        return resolve(true);
      },
      onCancel: function onCancel() {
        return reject('user cancel confirm');
      }
    }, options));
  });
}

function useHeight(domRef) {
  var otherHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  var deps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var _useState = useState(document.documentElement.clientHeight - otherHeight),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1]; // ????????????????????????


  var handleWindowResize = function handleWindowResize() {
    var eleTop = domRef.current ? getElementTop(domRef.current) : 0;
    var oHeight = otherHeight + eleTop;
    var windowHeight = document.documentElement.clientHeight;
    var height = windowHeight - oHeight;
    setHeight(height);
  };

  useEffect(function () {
    if (!domRef.current) return;
    handleWindowResize();
  }, [domRef.current].concat(_toConsumableArray(deps))); // ??????????????????

  useEffect(function () {
    window.addEventListener('resize', handleWindowResize);
    return function () {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return [height, setHeight];
}

export { AsyncSelect, ContextMenu$1 as ContextMenu, Copy, DraggableTabsBar, FixBottom, Footer, FormElement$1 as FormElement, FormItem$1 as FormItem, index$2 as FormRow, HeaderFullScreen as FullScreen, HeaderSetting, HeaderUser, Icon, IconPicker$1 as IconPicker, ImageCode, FrameTopSideMenu as Layout, MessageCode, ModalContent, Operator, PAGE_FRAME_LAYOUT, PageContent, Index as PageLoading, PaginationComponent as Pagination, QueryBar, HeaderSys as SearchSystem, TableComponent as Table, ToolBar, TreeEditor, UserAvatar, UserLink, SXAjax as ajax, batchDeleteConfirm, index$1 as confirm, createConfigHoc, createHoc, createHooks$1 as createHooks, formElementTypes, domEvent as hocEvent, model$1 as hocModal, event as hocPubSub, hocQuery, image, isInputLikeElement$1 as isInputLikeElement, isMobile, model$2 as layoutModel, modalConfirm, model, regexp, storage, editTable as tableEditable, DragRow as tableRowDraggable, tree, useHeight, index as util, validationRule };