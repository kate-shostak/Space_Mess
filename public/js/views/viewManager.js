define([
    'backbone',
], function(
    Backbone
) {
    var View = Backbone.View.extend({
        views: {},

        initialize: function() {
            var self = this;//didn't get how to implement listenTo - so fuck it.
            $(document).on("show", function(event) {
                
                _.each(self.views, function(value, key) { // the iterator is ajs object - so we are to pass value and key (underscore)
                    if (event._name !== key) {
                        value.hide();
                    }
                });
            });
        },

        addView: function(name, view) {
            this.views[name] = view;
        }

    });

    return new View();
});