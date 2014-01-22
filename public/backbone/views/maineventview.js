// maineventview.js
// Backbone view

(function(){
  
  App.Views.MainEventView = Backbone.View.extend({
    
    initialize: function(params) {
      var self = this;
      this.model = params.model;
      this.$el = params.el;
      console.log("INITIALIZE: MainEventView");
    },

    events: {
      'click button.get-genres': 'getGenres',
      'click button.save': 'saveChanges',
      'click button.delete': 'deleteEvent',
      'click ul.min-age-menu li a': 'setMinAge',
      'click ul.status-menu li a': 'setStatus',
      'click ul.ad-menu li a': 'setAd',
      'click div.filter-by-status label': 'filterByStatus',
      'click div.show-hide-columns label': 'showHideColumns'
    },

    showHideColumns: function(e) {
      var column = $(e.currentTarget).find('input').data('column');
      var active = !$(e.currentTarget).hasClass('active');
      if (active) {
        $("th[data-column=" + column + "]").hide();
        $("td[data-column=" + column + "]").hide();
      } else {
        $("th[data-column=" + column + "]").show();
        $("td[data-column=" + column + "]").show();
      }
    },

    filterByStatus: function(e) {
      var status = $(e.currentTarget).find('input').data('status');
      var active = !$(e.currentTarget).hasClass('active');
      var trClass = {
        'submitted': 'warning',
        'pending': 'success',
        'expired': 'active',
        'deleted': 'danger'
      }

      if (active) {
        $("tr." + trClass[status]).hide();
      } else {
        $("tr." + trClass[status]).show();
      }
    },

    deleteEvent: function(e) {
      var eventId = $(e.currentTarget).data("event-id");
      var json = JSON.stringify(this.toJSON(eventId));
      var self = this;

      $.ajax({
        url: '/event/' + eventId + '/delete',
        type: 'DELETE',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(json),
        success: function(doc) {
          self.updateRow(eventId);
        }
      })
    },

    getGenres: function(e) {
      var eventId = $(e.currentTarget).data("event-id");
      var artists = $("tr[data-event-id=" + eventId + "]").find("td[data-type=artist]").html()
      var genreSpan = $("tr[data-event-id=" + eventId + "]").find("span[data-type=genres]");
      var self = this;

      $.ajax({
        url: '/genres/',
        data: {
          artists: artists
        },
        type: 'GET',
        success: function(doc) {
          genreSpan.html(doc.genres);
        }
      })
    },

    setAd: function(e) {
      var ad = $(e.currentTarget).data("ad");
      $(e.currentTarget).closest(".btn-group").find("span[data-type=ad]").html(ad + "");
    },

    setMinAge: function(e) {
      var minAge = $(e.currentTarget).data("min-age");
      $(e.currentTarget).closest(".btn-group").find("span[data-type=min_age]").html(minAge);
    },

    setStatus: function(e) {
      var status = $(e.currentTarget).data("status");
      $(e.currentTarget).closest(".btn-group").find("span[data-type=status]").html(status);
    },

    saveChanges: function(e) {
      var eventId = $(e.currentTarget).data("event-id");
      var json = JSON.stringify(this.toJSON(eventId));
      var self = this;

      $.ajax({
        url: '/event/' + eventId,
        type: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(json),
        success: function(doc) {
          self.updateRow(eventId);
        }
      })
    },

    // not sure if necessary?
    updateRow: function(id) {
      $.ajax({
        url: '/event/' + id,
        type: 'GET',
        contentType: 'application/json; charset=UTF-8',
        success: function(doc) {
          // fuck handlebars
          var row = $("td[data-event-id=" + id + "]")
          row.find("[data-type=link]").html(doc.link),
          row.find("[data-type=date]").html(doc.date),
          row.find("[data-type=time]").html(doc.time),
          row.find("[data-type=artist]").html(doc.artist),
          row.find("[data-type=promoter]").html(doc.promoter),
          row.find("[data-type=genres]").html(doc.genres),
          row.find("span[data-type=min_age]").html(doc.min_age),
          row.find("[data-type=location]").html(doc.location),
          row.find("[data-type=city_state]").html(doc.city_state),
          row.find("[data-type=event_type]").html(doc.event_type),
          row.find("[data-type=autopopulated]").html(doc.autopopulated),
          row.find("span[data-type=status]").html(doc.status),
          row.find("[data-type=slug]").html(doc.slug),
          row.find("[data-type=price]").html(doc.price),
          row.find("[data-type=notes]").html(doc.notes),
          row.find("span[data-type=ad]").html(doc.ads),
          row.find("[data-type=last_updated]").html(doc.last_updated)
        }
      })
    },

    // UTILITY FUNCTIONS
    
    toJSON: function(id) {
      var row = $("tr[data-event-id=" + id + "]");

      if (row.length === 0) return null;

      return {
        link: row.find("[data-type=link]").text().trim(),
        date: row.find("[data-type=date]").text().trim(),
        time: row.find("[data-type=time]").text().trim(),
        artist: row.find("[data-type=artist]").text().trim(),
        promoter: row.find("[data-type=promoter]").text().trim(),
        genres: row.find("[data-type=genres]").text().trim(),
        min_age: row.find("span[data-type=min_age]").text().trim(),
        location: row.find("[data-type=location]").text().trim(),
        city_state: row.find("[data-type=city_state]").text().trim(),
        //event_id: id,
        event_type: row.find("[data-type=event_type]").text().trim(),
        autopopulated: row.find("[data-type=autopopulated]").text().trim(),
        status: row.find("span[data-type=status]").text().trim(),
        slug: row.find("[data-type=slug]").text().trim(),
        price: row.find("[data-type=price]").text().trim(),
        notes: row.find("[data-type=notes]").text().trim(),
        ad: row.find("span[data-type=ad]").text().trim(),
        last_updated: row.find("[data-type=last_updated]").text().trim()
      }
    }
  })

}());