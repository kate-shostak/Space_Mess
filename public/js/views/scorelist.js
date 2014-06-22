define([
    'backbone',
    'tmpl/scorelist',
    'collections/scores',
    'temporarySave'
], function(
    Backbone,
    tmpl,
    Scores,
    Saver
) {

    var View = Backbone.View.extend({
        template: tmpl,
        el: "#scorelist",

        initialize: function() {
            $("#loading").hide();
            var self = this;
            $('#reload').on("click", function() {
                window.location.reload();
            });    
        },

        render: function() {
            Saver.update();
            Scores.url = "/scores";//why do we need..
            Scores.fetch();
            $("#loading").show();
            $("#scoreError").html("");
            this.$el.hide();
            var self = this;
            setTimeout(function() {
                $.ajax({
                    url: '/scores?limit=10',
                    type: 'get',
                    dataType: 'JSON',
                    success: function(response) {
                        console.log("sec");
                        self.$el.html(self.template({
                            Scores: response
                        }));
                        $("#scoreError").html("");
                        self.$el.show();
                        $("#loading").hide();
                    },

                    error: function(response) {
                        $("#scoreError").html("Server unavailable");
                        $('#reload').show();
                        $("#loading").hide();
                    }
                })
            }, 1000)

        },

        show: function() {
            this.render();
        },

        hide: function() {
            this.$el.hide();
        }
    });

    return View;

});