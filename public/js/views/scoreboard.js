define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores',
    'views/scorelist'
], function(
    Backbone,
    tmpl,
    ScoreCollection,
    Scorelist
){
    var View = Backbone.View.extend({

        template: tmpl,
        Scores : ScoreCollection,
        el: "#scoreboard",
        _name: "scoreboard",

        initialize: function () {
            this.render();
            this.scorelist = new Scorelist();
            this.hide();
        },

        render: function () {
            this.$el.html(this.template);
        },

        show: function () {//triggering custom events
            $.event.trigger({
                type: "show",
                _name: this._name
            });
            $('#reload').hide();
            this.$el.show();
            this.scorelist.show();
        },

        hide: function () {
            this.$el.hide();
        }

    })

    return new View();
});