define([
    'backbone',
    'game/objectPool'
], function(
    Backbone,
    Pool
){  
	var Ship = Backbone.View.extend ({
        
		initialize: function(repository, canvas, context) {
            this.speed = 3;
            this.repository = repository;
            this.bulletPool = new Pool (this.repository);
           	this.canvas = canvas;
            this.context = context;
          	this.width = this.repository.images["ship"].width;
          	this.height = this.repository.images["ship"].height;
          	this.x = this.canvas.width/2 - this.width/2;
            this.y = this.canvas.height - this.height;
            this.fireRate = 15;
            this.counter = 0;

            var self = this;
            $(document).on("drawme", function() {
                self.draw();
            });

           $(document).on("animate", function() {
                self.move();
                self.bulletPool.animate();
            });

           $(document).on("stop", function() {
                self.context.clearRect(self.x, self.y, self.width, self.height);
                self.x = self.canvas.width/2 - self.width/2;
                self.y = self.canvas.height - self.height;
                self.bulletPool = new Pool (self.repository);
            });
        },

        move: function() {
            this.counter++;
            if(KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up) {
            	this.context.clearRect(this.x, this.y, this.width, this.height);
            	if(KEY_STATUS.left) {//switch-case
            		this.x -= this.speed;
            		if (this.x <= 0)
            			this.x = 0;
            	} else if(KEY_STATUS.right) {
            		this.x += this.speed;
            		if (this.x >= this.canvas.width - this.width)
            			this.x = this.canvas.width - this.width;
            	} else if (KEY_STATUS.up) {
            		this.y -= this.speed;
            		if (this.y <= this.canvas.height/4*3)
            			this.y = this.canvas.height/4*3;
            	} else if (KEY_STATUS.down){
            		this.y += this.speed;
            		if (this.y >= this.canvas.height - this.height)
            			this.y = this.canvas.height - this.height;
            	}
            	this.draw();
            }

            if(KEY_STATUS.space && this.counter >= this.fireRate) {
                console.log("spacebar");
                this.fire();
                this.counter = 0;
            }
        },

        draw: function() {
            this.context.drawImage(this.repository.images["ship"], this.x, this.y);
        },

        fire: function() {
            score += 10;
        	this.bulletPool.getSecondBullet(this.x+6, this.y, 3, this.x+30, this.y, 3);
        }

	});

	return  Ship;// so i can transfer somthing in the constructor.

	});