/**
 * @function
 * @name Swap
 * @description A javascript plugin for toggling element states.
 * @param {Object} options - Instance options
 * @param {Boolean} [options.collapse=true] - Allow grouped instances to be deactivated
 * @param {String} [options.maxWidth=Infinity] - Width to disable instance
 * @example Formstone('.target').swap({ ... });
 */

(function(window, Formstone) {

  'use strict';

  var Namespace = 'swap';
  var GUID = 0;

  var Options = {
    collapse: true,
    maxWidth: Infinity,
  };

  // Private

  /**
   * @private
   * @description Builds instance.
   */

  function construct() {
    var data = Formstone.getData(this, Namespace);

    if (data) {
      return;
    }

    data = Formstone.extend({
      guid: namespace(String(GUID++).padStart(3, '0')),
      enabled: false,
      active: false,
    }, Options, (Formstone.getData(this, 'swapOptions') || {}));

    data.$el = Formstone(this);
    data.target = data.$el.data(namespace('target', false));
    data.$target = Formstone(data.target);

    data.$el.addClass([namespace('element'), data.guid]);
    data.$target.addClass(namespace('target'));

    // Media Query support
    data.mq = '(max-width:' + (data.maxWidth === Infinity ? '100000px' : data.maxWidth) + ')';

    // Live query for linked to avoid missing new elements
    var linked = data.$el.data(namespace('linked', false));
    data.linked = linked ? '[data-' + Namespace + '-linked="' + linked + '"]' : false;

    // Live query for the group to avoid missing new elements
    var group = data.$el.data(namespace('group', false));
    data.group = group ? '[data-' + Namespace + '-group="' + group + '"]' : false;

    data.$swaps = Formstone([data.$el.first(), data.$target.first()]);

    data.$el.on('click', onClick);

    Formstone.setData(this, Namespace, data);
  }

  /**
   * @private
   * @description Runs post build.
   */

  function postConstruct() {
    var data = Formstone.getData(this, Namespace);

    if (data) {
      if (!data.collapse && data.group && !Formstone(data.group).filter('[data-' + Namespace + '-active]').length) {
        Formstone(data.group).eq(0).attr(namespace('active', false), 'true');
      }

      // Should be activate when enabled
      data.onEnable = data.$el.data(namespace('active', false)) || false;

      if (Formstone.mediaquery) {
        // Media Query support
        Formstone.mediaquery('bind', data.guid, data.mq, {
          enter: function() {
            enable.call(data.$el.first(), true);
          },
          leave: function() {
            disable.call(data.$el.first(), true);
          }
        });
      } else {
        enable.call(this);
      }
    }
  }

  /**
   * @private
   * @description Builds namespace.
   * @param {String} string - String to namespace
   * @param {Boolean} prefix - Inlcude library prefix
   */

   function namespace(string, prefix) {
    return (prefix === false ? '' : 'fs-') + Namespace + '-' + string;
  }

  /**
   * @private
   * @description Handles click.
   * @param {Object} e - Event data
   */

  function onClick(e) {
    Formstone.killEvent(e);

    var data = Formstone.getData(this, Namespace);

    if (data) {
      if (data.active && data.collapse) {
        deactivate.call(this);
      } else {
        activate.call(this);
      }
    }
  }

  // Public

  /**
   * @description Sets default options; applies to future instances.
   * @param {Object} options - Default options
   * @example Formstone.swap('defaults', { ... });
   */

  function defaults(options) {
    Options = Formstone.extend({}, Options, options);
  }

  /**
   * @description Tears down instance.
   * @example Formstone('.target').swap('destroy');
   */

   function destroy() {
    var data = Formstone.getData(this, Namespace);

    console.log(data);

    if (data) {
      if (Formstone.mediaquery) {
        // Media Query support
        Formstone.mediaquery('unbind', data.guid);
      }

      data.$swaps.removeClass([namespace('element'), namespace('target'), namespace('enabled'), namespace('active'), data.guid]).off('click', onClick);

      Formstone.deleteData(this, Namespace);
    }
  }

  /**
   * @description Activates instance.
   * @example Formstone('.target').swap('activate');
   */

  function activate() {
    var data = Formstone.getData(this, Namespace);
    var fromLinked = arguments[0];

    if (data && data.enabled && !data.active) {
      if (data.group && !fromLinked) {
        // Deactivates grouped instances
        Formstone(data.group).not(data.$el).not(data.linked).swap('deactivate', true);
      }

      // index in group
      var index = (data.group) ? Formstone(data.group).nodes.indexOf(data.$el.first()) : null;

      data.$swaps.addClass(namespace('active'));

      if (!fromLinked) {
        if (data.linked) {
          // Linked handles
          Formstone(data.linked).not(data.$el).swap('activate', true);
        }
      }

      data.$el.trigger('activate', [index]);

      data.active = true;
    }
  }

  /**
   * @description Deactivates instance.
   * @example Formstone('.target').swap('deactivate');
   */

  function deactivate() {
    var data = Formstone.getData(this, Namespace);
    var fromLinked = arguments[0];

    if (data && data.enabled && data.active) {
      data.$swaps.removeClass(namespace('active'));

      if (!fromLinked) {
        if (data.linked) {
          // Linked handles
          Formstone(data.linked).not(data.$el).swap('deactivate', true);
        }
      }

      data.$el.trigger('deactivate');

      data.active = false;
    }
  }

  /**
   * @description Enables instance.
   * @example Formstone('.target').swap('enable');
   */

  function enable() {
    var data = Formstone.getData(this, Namespace);
    var fromLinked = arguments[0];

    if (data && !data.enabled) {
      data.enabled = true;

      data.$swaps.addClass(namespace('enabled'));

      if (!fromLinked) {
        // Linked handles
        Formstone(data.linked).not(data.$el).swap('enable');
      }

      data.$el.trigger('enable');

      if (data.onEnable) {
        data.active = false;
        activate.call(this);
      } else {
        data.active = true;
        deactivate.call(this);
      }
    }
  }

  /**
   * @description Disables instance.
   * @example Formstone('.target').swap('disable');
   */

  function disable() {
    var data = Formstone.getData(this, Namespace);
    var fromLinked = arguments[0];

    if (data && data.enabled) {
      data.enabled = false;

      data.$swaps.removeClass([namespace('enabled'), namespace('active')]);

      if (!fromLinked) {
        // Linked handles
        Formstone(data.linked).not(data.$el).swap('disable');
      }

      data.$el.trigger('disable');
    }
  }

  // Component

  Formstone.Component(Namespace, {
    _construct: construct,
    _postConstruct: postConstruct,
    destroy: destroy,
    defaults: defaults,
    activate: activate,
    deactivate: deactivate,
    enable: enable,
    disable: disable,
  });

})(window, Formstone);