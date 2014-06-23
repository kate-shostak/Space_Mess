define([
    'backbone',
    'game/imageRepository',
    'game/background',
    'game/shipBulletPool',
    'game/ship',
    'game/enemyHolder'
], function(
    Backbone,
    Repository,
    Background,
    Pool,
    Ship,
    Enemies
){  
    KEY_CODES = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    KEY_STATUS = {};

    var request;

    function animframe() {
        request = requestAnimFrame(animframe);//wtf?
        $.event.trigger({
                type: "animate"
            });
    }

    window.onkeydown = function(e) {
        var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
        if(KEY_CODES[keyCode]) {
            e.preventDefault();
            KEY_STATUS[KEY_CODES[keyCode]] = true;
        }
    }

    window.onkeyup = function(e) {
        var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
        if(KEY_CODES[keyCode]) {
            e.preventDefault();
            KEY_STATUS[KEY_CODES[keyCode]] = false;
        }
    }

    window.requestAnimFrame = (function(){
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        window.oRequestAnimationFrame       ||
        window.msRequestAnimationFrame      ||
        function(callback, element) {
            window.setTimeout(callback, 1000/60);
        };
    }) ();

    window.cancelRequestAnimFrame = (function(){
        return window.cancelAnimationFrame        ||
        window.webkitCancelRequestAnimationFrame  ||
        window.mozCancelRequestAnimationFrame     ||
        window.oCancelRequestAnimationFrame       ||
        window.msCancelRequestAnimationFrame      ||
        clearTimeout;
    }) ();

    var Game = Backbone.View.extend ({
        initialize: function() {
            this.repository = Repository;
            this.isSet = false;// if the resources are ready or not 
            this.everyOneIsReady = false;
            for(code in KEY_CODES) {
                KEY_STATUS[ KEY_CODES[ code] ] = false;
            }
            
            $(document).on("stop", function() {
                isRunning = false;
                cancelRequestAnimFrame(request);
                if(!gameIsOver) {//were we playing or just switched to another tab.
                    score = 0    //if we were, so we dont want to miss the resuly, honey!
                }
            });
        },
           
        draw: function() {
            if(!this.isSet) {
                this.init(); 
            }
            this.repository.draw();
            if (!this.everyOneIsReady) {    //singletone(mine redaction) not to make
                this.everyOneIsReady = true;//so-much-ships and so on X)
                this.backg = new Background(this.repository, this.bgcanvas, this.bgcontext);
                this.ship =  new Ship(this.repository, this.shipcanvas, this.shipcontext);
                this.enemies = new Enemies(this.repository);
            }
        },

        init: function() {
            this.isSet = true;
            this.bgcanvas = document.getElementById("game_field_background");
            this.shipcanvas = document.getElementById("game_field_ship");
            this.bgcontext = this.bgcanvas.getContext("2d");
            this.shipcontext = this.shipcanvas.getContext("2d");
            this.bgcontext.fillStyle = "#ffffff";
            this.shipcontext.fillStyle = "#ffffff";//what is it?
        },

        animate: function() {
            animframe();//why this works but just calling drowns in the recurtion...            
        },

    });

    return  Game;// so i can transfer somthing in the constructor.

    });