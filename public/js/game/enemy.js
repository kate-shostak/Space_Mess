define([
    'backbone'
], function(
    Backbone
){
var Enemy = Backbone.View.extend ({

initialize: function(repository, canvas, context) {
        this.name = "Evil";
        this.repository = repository;
        this.canvas = canvas;
        this.context = context;
        this.width = this.repository.images["enemy"].width;
        this.height = this.repository.images["enemy"].height;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.speedY = 0;
        this.speedX = 0;
        this.leftEdge = this.x - 90;
        this.rightEdge = this.x + 90;
        this.bottomEdge = this.y + 140;
        this.percentFire = 0.1;
        this.chance = 0;
        this.alive = false;
        var self = this;
            $(document).on("stop", function() {
                self.speed = 0;
                self.speedY = 0;
                self.speedX = 0;
                self.context.clearRect(self.x, self.y, self.width, self.height);
            });
        
        },

        setBullet: function(x, y, speed) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.speedY = speed;
            this.speedX = 0;
            this.alive = true;
            this.leftEdge = this.x - 90;
            this.rightEdge = this.x + 90;
            this.bottomEdge = this.y + 140;
        },

        draw: function() {
            console.log(this.speed);
            this.context.clearRect(this.x - 1, this.y, this.width + 1, this.height);
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x <= this.leftEdge) {
                this.speedX = this.speed;
            }
            else if (this.x > this.rightEdge + this.width) {
                this.speedX = -this.speed;
            }
            else if (this.y >= this.bottomEdge) {
                this.speed = 1.5;
                this.speedY = 0;
                this.y -= 5;
                this.speedX = -this.speed;
            }

            this.context.drawImage(this.repository.images["enemy"], this.x, this.y);
            chance = Math.floor(Math.random()*101);
            if(chance/100 < this.percentFire) {
                this.fire();
            }
        },

        fire: function() {
            //game.enemyBulletPool.get(this.x + this.width/2, this.y + this.height, - 2.5);
        },

        clear: function() {
            this.x = 0;
            this.y =0;
            this.speed = 0;
            this.speedX = 0;
            this.speedY = 0;
            this.alive = false;
        }
});

return Enemy;// so i can transfer somthing in the constructor.

});