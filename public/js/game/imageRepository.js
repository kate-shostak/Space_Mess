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
			this.images["enemy"] = new Image();
			this.images["enemyBullet"] = new Image();
			/*images.fetch({context:images}).done(function() {
				console.log(this.length)
			});*/
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
			console.log(this.numLoad)
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
				this.images["enemy"].src = "images/enemy.png"
				this.images["enemyBullet"].src = "images/bullet_enemy.png"
			}
		}  

	});

	return  new imageRepository;

	});