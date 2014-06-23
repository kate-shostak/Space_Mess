define([
    'backbone'
], function(
    Backbone
){  
	var Background = Backbone.View.extend ({
		initialize: function(repository, canvas, context) {
            this.repository = repository;
            this.canvas = canvas;
            this.context = context;
            this.width = this.repository.images["background"].width;
            this.height = this.repository.images["background"].height;
            this.speed = 1;
            this.x = 0;
            this.y = 0;
            var self = this;
            $(document).on("drawme", function() {
                self.drawme();
            });

            $(document).on("animate", function() {
                self.animate();
            });
        },

        drawme: function() {
            this.context.drawImage(this.repository.images["background"], this.x, this.y );
        },

        animate: function() {
            this.y += this.speed;
            if(this.y >= this.canvas.height) 
                this.y  = 0;
            this.context.drawImage(this.repository.images["background"], this.x, this.y ); 
            this.context.drawImage(this.repository.images["background"], this.x, this.y - this.canvas.height);  
        }
	});

	return  Background;// so i can transfer somthing in the constructor.

	});