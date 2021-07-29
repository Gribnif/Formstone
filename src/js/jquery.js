// (function(window, Formstone) {

//   // jQuery Wrapper

//   if (window.jQuery) {

//     console.log(Formstone.Components);

//     if (Formstone.Components.length) {
//       for (var i in Formstone.Components) {
//         var key = Formstone.Components[i];
//         console.log(key, Formstone.prototype[key]);

//         window.jQuery.fn[key] = window.jQuery[key] = function() {
//           Formstone.prototype[key].apply(Formstone(this.toArray()), arguments);

//           return this;
//         };
//       }
//     }

//     if (Formstone.Utilities.length) {
//       for (var i in Formstone.Utilities) {
//         var key = Formstone.Components[i];

//         window.jQuery[key] = function() {
//           return Formstone[key].apply(this, arguments);
//         };
//       }
//     }

//   }

// })(window, Formstone);