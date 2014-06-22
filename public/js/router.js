define(['backbone','views/game', 'views/scoreboard', 'views/main', 'views/viewManager', 'views/gameOver'], function(Backbone, game, scoreboard, main, viewManager, gameOver){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            '*default': 'defaultActions'
        },

        initialize: function() {
            this.viewManager = viewManager;
            viewManager.addView(main._name , main );
            viewManager.addView(scoreboard._name , scoreboard );
            viewManager.addView(game._name , game );
            viewManager.addView(gameOver._name , gameOver );
            },

        defaultActions: function () {
            main.show();
        },

        scoreboardAction: function () {
            scoreboard.show();
        },

        gameAction: function () {
            game.show();
        }
    });

    return new Router();
});