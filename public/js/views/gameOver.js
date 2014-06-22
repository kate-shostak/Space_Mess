define([
    'backbone',
    'tmpl/gameOver',
    'game/game',
    'models/score',
    'collections/scores',
    'temporarySave'
], function(
    Backbone,
    tmpl,
    game,
    Score,
    Scoreboard,
    Saver
){  
    var View = Backbone.View.extend({
        template: tmpl,
        _name: "gameOver",
        el: "#gameOver",
        
        initialize: function () {
            //wtf is bindall..
        },

        render: function (score) {
            this.$el.html(this.template({
                score: score
            }));
            var self = this;
            $('#gameOverForm').on("submit", posts);
        },

        show: function (score) {
            $.event.trigger({
                type: "show",
                _name: this._name
            });
            this.render(score);
            this.$el.show();
        },
        
        hide: function () {
            this.$el.hide();
        }
    });

    function posts (event) {// gosh i dont remember whu a needed this as a func :()
        event.preventDefault();
        var data = $(this).serialize();
        var name = $("#nameField").val();
        var score = $("#scoreField").val();
        if (name == '') {
            console.log("Name, mathafaka");
        } else {
            var player = new Score({
                name: name,
                score: score
            });
            Scoreboard.add(player);
            player = {
                'name': name,
                'score': score
            }
            $.ajax({
                url: '/scores',
                type: 'post',
                data: data,
                dataType: 'json',
                success: function(response) {
                    window.location = "/#scoreboard";
                },
                error: function(response) {
                    var scores = Saver.getJSON('scores');
                    scores.push(player);
                    Saver.setJSON('scores', scores);
                    window.location = "/#scoreboard";
                    $('.btn').prop("disabled", false);
                    $('#nameField').prop("disabled", false);
                    $('.overlay').hide();
                }
            });

        }
        score = 0
    }


    return new View();
    
});