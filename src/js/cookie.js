/**
 * @function
 * @name Cookie
 * @description A javascript plugin for simple access to browser cookies.
 * @param {String} [options.domain=null] -
 * @param {Number} [options.expires=604800000] -
 * @param {String} [options.path=null] -
 * @param {Boolean} [options.secure=null] -
 * @example Formstone.cookie({ ... });
 */

(function(window, Formstone) {

  'use strict';

  var Namespace = 'cookie';

  var Options = {
    domain: null,
    expires: 604800000, // 7 days
    path: null,
    secure: null,
  };

  // Private

  /**
   * @private
   * @description Delegates plugin methods.
   * @param {String} key - Cookie key
   * @param {String} value - Cookie value
   * @param {Object} [options=null] - Options object
   * @return {String} - Cookie value, if 'read'
   */

  function delegate(key, value, options) {
    if (typeof key === 'object') {

      // Set defaults

      Options = Formstone.extend(Options, key);
    } else {

      // Delegate intent

      options = Formstone.extend({}, Options, options || {});

      if (typeof key !== 'undefined') {
        if (typeof value !== 'undefined') {
          if (value === null) {
            eraseCookie(key, options);
          } else {
            createCookie(key, value, options);
          }
        } else {
          return readCookie(key);
        }
      }
    }

    return null;
  }

  // Public

  /**
   * @name create
   * @description Creates a cookie.
   * @param {String} key - Cookie key
   * @param {String} value - Cookie value
   * @param {Object} [options=null] - Options object
   * @example Formstone.cookie('foo', 'bar', { ... });
   */

  function createCookie(key, value, options) {
    var expiration = false,
      date = new Date();

    // Check Expiration Date

    if (options.expires && typeof options.expires === 'number') {
      date.setTime(date.getTime() + options.expires);
      expiration = date.toGMTString();
    }

    var domain = (options.domain) ? '; domain=' + options.domain : '',
      expires = (expiration) ? '; expires=' + expiration : '',
      maxAge = (expiration) ? '; max-age=' + (options.expires / 1000) : '', // to seconds
      path = (options.path) ? '; path=' + options.path : '',
      secure = (options.secure) ? '; secure' : '';

    // Set Cookie

    document.cookie = key + '=' + value + expires + maxAge + domain + path + secure;
  }

  /**
   * @name read
   * @description Returns a cookie's value, or null.
   * @param {String} key - Cookie key
   * @return {String} - Cookie value, or null
   * @example var value = Formstone.cookie('foo');
   */

  function readCookie(key) {
    var keyString = key + '=',
      cookies = document.cookie.split(';');

    // Loop Cookies

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];

      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }

      // Return Match

      if (cookie.indexOf(keyString) === 0) {
        return cookie.substring(keyString.length, cookie.length);
      }
    }

    return null;
  }

  /**
   * @name erase
   * @description Deletes a cookie.
   * @param {String} key - Cookie key
   * @example Formstone.cookie('foo', null);
   */

  function eraseCookie(key, options) {
    createCookie(key, '', Formstone.extend({}, options, {
      expires: -604800000 // -7 days
    }));
  }

  // Utility

  Formstone.Utility(Namespace, {
    _delegate: delegate,
  });

})(window, Formstone);