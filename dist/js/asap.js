/*! formstone v1.4.10 [asap.js] 2019-02-01 | GPL-3.0 License | formstone.it */
!function(e){"function"==typeof define&&define.amd?define(["jquery","./core","./analytics"],e):e(jQuery,Formstone)}(function(e,t){"use strict";function r(){f&&!f.hasClass(O.base)&&f.on(m.click,p.selector,n).addClass(O.base)}function n(e){var t=e.currentTarget;e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||window.location.protocol!==t.protocol||window.location.host!==t.host||"_blank"===t.target||(!t.hash||t.href.replace(t.hash,"")!==window.location.href.replace(location.hash,"")&&t.href!==window.location.href+"#")&&(t.href.match(p.ignoreTypes)||(w.killEvent(e),e.stopImmediatePropagation(),t.href!==x&&a(t.href,!0)))}function o(e){u&&u.abort();var t=e.originalEvent.state;t&&(b=t.id,t.url!==x&&a(t.url,!1))}function a(t,r){u&&u.abort(),y.trigger(m.requested,[r]),p.transitionOutDeferred=p.transitionOut.apply(v,[!1]);var n=d(t),o=n.params,a=n.hash,s=n.clean,l="User error",c=null,f=e.Deferred();o[p.requestKey]=!0,u=e.ajax({url:s,data:o,dataType:"json",cache:p.cache,xhr:function(){var e=new v.XMLHttpRequest;return e.addEventListener("progress",function(e){if(e.lengthComputable){var t=e.loaded/e.total;y.trigger(m.progress,[t])}},!1),e},success:function(r,o,i){c="string"===e.type(r)?e.parseJSON(r):r,r.location&&(t=r.location,n=d(t),a=n.hash),f.resolve()},error:function(e,t,r){l=r,f.reject()}}),e.when(f,p.transitionOutDeferred).done(function(){i(n,c,r)}).fail(function(){y.trigger(m.failed,[l])})}function i(t,r,n){y.trigger(m.loaded,[r]),void 0!==e.fsAnalytics&&e.fsAnalytics("pageview"),p.render.call(this,r,t.hash),x=t.url,n&&l(++b,x),y.trigger(m.rendered,[r]);var o=!1;if(""!==t.hash){var a=e(t.hash);a.length&&(o=a.offset().top)}!1!==o&&y.scrollTop(o)}function s(t,r){if("undefined"!==e.type(t)){var n;for(var o in t)t.hasOwnProperty(o)&&(n=e(o)).length&&n.html(t[o])}}function l(e,t){history.pushState({id:e,url:t},j+e,t)}function c(e,t){history.replaceState({id:e,url:t},j+e,t)}function d(e){var t=e.indexOf("?"),r=e.indexOf("#"),n={},o="",a=e;return r>-1&&(o=e.slice(r),a=e.slice(0,r)),t>-1&&(n=w.parseQueryString(e.slice(t+1,r>-1?r:e.length)),a=e.slice(0,t)),{hash:o,params:n,url:e,clean:a}}var f,u,p,h=t.Plugin("asap",{utilities:{_initialize:function(n){!p&&t.support.history&&(f=t.$body,(p=e.extend(g,n)).render===e.noop&&(p.render=s),p.transitionOut===e.noop&&(p.transitionOut=function(){return e.Deferred().resolve()}),history.state?(b=history.state.id,x=history.state.url):(x=window.location.href,c(b,x)),y.on(m.popState,o),r())},load:function(e){p&&t.support.history?e&&a(e,!0):window.location.href=e},replace:function(e){var t=history.state;x=e,c(t.id,e)}},events:{failed:"failed",loaded:"loaded",popState:"popstate",progress:"progress",requested:"requested",rendered:"rendered"}}),g={cache:!0,ignoreTypes:/\.(jpg|sjpg|jpeg|png|gif|zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i,render:e.noop,requestKey:"fs-asap",selector:"a",transitionOut:e.noop},y=t.$window,v=y[0],w=h.functions,m=h.events,O=h.classes.raw,j="asap-",x="",b=1});