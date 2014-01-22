// router.js
// Backbone router

(function() {
  
  window.App = window.App || {Routers: {}, Collections: {}, Models: {}, Views: {}};
  
  App.Router = Backbone.Router.extend({
    routes: {
      '': 'admin'
    },

    initialize: function() {
      console.log("INITIALIZE: Router");
    },

    admin: function() {
      this.EventCollection = new App.Collections.EventCollection();
      this.MainEventView = new App.Views.MainEventView({
        model: this.EventCollection,
        el: $("body")
      });
    }
  });

}());