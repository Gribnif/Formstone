/*! formstone v1.4.5 [checkpoint.js] 2018-04-30 | GPL-3.0 License | formstone.it */
!function(e){"function"==typeof define&&define.amd?define(["jquery","./core"],e):e(jQuery,Formstone)}(function(e,t){"use strict";function a(){v=p.height(),h.iterate.call($,o)}function i(){$=e(l.base),a()}function n(){h.iterate.call($,r)}function c(e){if(e.hasParent){var t=e.$parent.scrollTop();t!==e.parentScroll&&(r(e),e.parentScroll=t)}}function o(e){if(e.initialized){switch(e.parentHeight=e.hasParent?e.$parent.outerHeight(!1):v,e.windowIntersect){case"top":e.windowCheck=0-e.offset;break;case"middle":case"center":e.windowCheck=e.parentHeight/2-e.offset;break;case"bottom":e.windowCheck=e.parentHeight-e.offset}switch(e.elOffset=e.hasParent?e.$target.position():e.$target.offset(),e.elIntersect){case"top":e.elCheck=e.elOffset.top;break;case"middle":e.elCheck=e.elOffset.top+e.$target.outerHeight()/2;break;case"bottom":e.elCheck=e.elOffset.top+e.$target.outerHeight()}r(e)}}function r(e){if(e.initialized){var t=e.windowCheck+(e.hasParent?e.parentScroll:u);console.log(t,e.elCheck,e),t>=e.elCheck?(e.active||e.$el.trigger(d.activate),e.active=!0,e.$el.addClass(f.active)):e.reverse&&(e.active&&e.$el.trigger(d.deactivate),e.active=!1,e.$el.removeClass(f.active))}}var s=t.Plugin("checkpoint",{widget:!0,defaults:{intersect:"bottom-top",offset:0,reverse:!1},classes:["active"],events:{activate:"activate",deactivate:"deactivate"},methods:{_construct:function(t){t.initialized=!1;var a=e(t.$el.data("checkpoint-parent")),i=e(t.$el.data("checkpoint-container")),n=t.$el.data("checkpoint-intersect"),c=t.$el.data("checkpoint-offset");n&&(t.intersect=n),c&&(t.offset=c);var r=t.intersect.split("-");t.windowIntersect=r[0],t.elIntersect=r[1],t.visible=!1,t.$target=i.length?i:t.$el,t.hasParent=a.length>0,t.$parent=a;var s=t.$target.find("img");s.length&&s.on(d.load,t,o),t.$el.addClass(f.base),t.initialized=!0},_postConstruct:function(e){i(),a()},_destruct:function(e){e.$el.removeClass(f.base),i()},_resize:a,_raf:function(){(u=p.scrollTop())<0&&(u=0),u!==g&&(n(),g=u),h.iterate.call($,c)},resize:o}}),l=(s.namespace,s.classes),f=l.raw,d=s.events,h=s.functions,p=(t.window,t.$window),v=0,u=0,g=0,$=[]});