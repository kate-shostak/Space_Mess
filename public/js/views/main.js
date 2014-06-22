define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){
    var View = Backbone.View.extend({
        template: tmpl,
        _name: "main",
        el: "#main",
        
        initialize: function () {
            this.render();
            this.hide();
        },

        render: function () {
            this.$el.html(this.template);
            return this;
        },

        show: function () {
             $.event.trigger({
                type: "show",
                _name: this._name
            });
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        }

    });
    
    return new View();
});