// event.js
// Backbone model for events

(function(){

  App.Models.Event = Backbone.Model.extend({
    defaults: {

    }
  });

  App.Collections.EventCollection = Backbone.Collection.extend({
    model: App.Models.Event
  });

}());