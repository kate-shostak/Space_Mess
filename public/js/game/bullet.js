define([
    'backbone'
], function(
    Backbone
){  
	var Bullet = Backbone.View.extend ({
		initialize: function(repository, canvas, context) {
            this.repository = repository;
            this.canvas = canvas;
            this.context = context;
            this.width = this.repository.images["bullet"].width;
            this.height = this.repository.images["bullet"].height;
            this.x = 0;
            this.y = 0;
            this.alive = false;
        },

        setBullet: function(x, y, speed) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.alive = true;
        },

        draw: function() {
            this.context.clearRect(this.x, this.y, this.width, this.height);
            this.y -= this.speed;
            if(this.y <= 0 - this.height) {
                gameIsOver = true;
                $.event.trigger({
                    type: "stop"
                });
                return true;
            } else {
                this.context.drawImage(this.repository.images["bullet"], this.x, this.y);
            }
        },

        clear: function() {
            this.x = 0;
            this.y  =0;
            this.speed = 0;
            this.alive = false;
        }
	});

	return  Bullet;// so i can transfer somthing in the constructor.

	});