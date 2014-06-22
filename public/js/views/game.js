define([
    'backbone',
    'tmpl/game',
    'game/game',
    'views/gameOver'

], function(
    Backbone,
    tmpl,
    game,
    gameover
){  
    gameIsOver = false;
    isRunning = false;
    score = 0;
    var View = Backbone.View.extend({
        template: tmpl,
        _name: "game",
        el: "#game",
        
        initialize: function () {
            this.render();
            this.hide();
            this.$startButton = $("#start_button");
            this.game = new game();  
            this.gameOver = gameover;

            var self = this;
            $("#start_button").on('click', function() {
                $("#start_button").hide();
                self.game.animate();
                isRunning = true;
            });

            $(document).on("stop", function() {
                if(gameIsOver) {
                    self.gameOver.show(score);
                }
            });
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
            $("#start_button").show();
            this.game.draw();
        },
        
        hide: function () {
            this.$el.hide();        // common screen, game's not running.just hide all the fuck away
            if(isRunning) {         //if we play but all of a sudden sweep to main 
                $.event.trigger({   //or whatever, we have to stop the animation and set all
                        type: "stop"//to default.
                });
            }
        }
    });

    return new View();
    
});