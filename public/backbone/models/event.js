// event.js
// Backbone model for events

(function(){

  App.Models.Event = Backbone.Model.extend({
    defaults: {
      link: '',
      date: '',
      time: '',
      artist: '',
      promoter: '',
      genres: '',
      min_age: '',
      location: '',
      city_state: '',
      event_id: '',
      event_type: '',
      autopopulated: false,
      status: 'submitted',
      slug: '',
      price: '',
      notes: '',
      ad: 'false',
      last_updated: ''
    }
  });

  App.Collections.EventCollection = Backbone.Collection.extend({
    model: App.Models.Event
  });

}());