define([
    'backbone',
    'classy'
], function(
    Backbone,
    Class
){
	var imageRepository = Backbone.View.extend ({
		images: {},
		
		initialize: function() {
			this.numLoad = 0;
			this.numImages = 3;
			this.isloaded = false;
			this.images["background"] = new Image();
			this.images["ship"] = new Image();
			this.images["bullet"] = new Image();	
			this.addOnload();
		},

		addOnload: function() {
			var self = this;// i loose context on a callback
			_.each(self.images, function(value, key) { // the iterator is ajs object - so we are to pass value and key (underscore)
                self.images[key].onload = function() {
                   	self.imageLoader();
                }
            });
		},

		imageLoader: function() {
			this.numLoad++;
			if(this.numLoad === this.numImages) {
				this.isloaded = true;
				$.event.trigger({
                	type: "drawme"
            	});
			}
		},

		draw: function() {
			if(this.isloaded) {
				$.event.trigger({
                	type: "drawme"
            	});
			} else {
				this.images["background"].src = "images/bg.png";
				this.images["ship"].src = "images/ship.png";
				this.images["bullet"].src = "images/bullet.png";
			}
		}  

	});

	return  new imageRepository;

	});