define([
    'backbone',
    'game/shipBulletPool'
], function(
    Backbone,
    Pool
){  
    var Ship = Backbone.View.extend ({
        
        initialize: function(repository, canvas, context) {
            this.repository = repository;
            this.trew = "bullet";
            
            //ALL ABOUT SETTING UP SHIP
            this.speed = 3;
            this.shipCanvas = canvas;
            this.shipContext = context;
            this.shipWidth = this.repository.images["ship"].width;
            this.shipHeight = this.repository.images["ship"].height;
            this.x = this.shipCanvas.width/2 - this.shipWidth/2;
            this.y = this.shipCanvas.height - this.shipHeight;
            this.fireRate = 15;
            this.counter = 0;

            //POOLS
            this.bulletPool = new Pool(this.repository, 30, "bullet");


            //TRIGGERS
            var self = this;
            $(document).on("drawme", function() {
                self.draw();
            });

           $(document).on("animate", function() {
                self.move();
                self.bulletPool.animate();
            });

           $(document).on("stop", function() {
                self.shipContext.clearRect(self.x, self.y, self.width, self.shipHeight);
                self.x = self.shipCanvas.width/2 - self.shipWidth/2;
                self.y = self.shipCanvas.height - self.shipHeight;
                self.bulletPool = new Pool (self.repository,30, "bullet");
            });
        },

        move: function() {
            this.counter++;
            if(KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up) {
                this.shipContext.clearRect(this.x, this.y, this.shipWidth, this.shipHeight);
                if(KEY_STATUS.left) {//switch-case
                    this.x -= this.speed;
                    if (this.x <= 0)
                        this.x = 0;
                } else if(KEY_STATUS.right) {
                    this.x += this.speed;
                    if (this.x >= this.shipCanvas.width - this.shipWidth)
                        this.x = this.shipCanvas.width - this.shipWidth;
                } else if (KEY_STATUS.up) {
                    this.y -= this.speed;
                    if (this.y <= this.shipCanvas.height/4*3)
                        this.y = this.shipCanvas.height/4*3;
                } else if (KEY_STATUS.down){
                    this.y += this.speed;
                    if (this.y >= this.shipCanvas.height - this.shipHeight)
                        this.y = this.shipCanvas.height - this.shipHeight;
                }
                this.draw();
            }

            if(KEY_STATUS.space && this.counter >= this.fireRate) {
                this.fire();
                this.counter = 0;
            }
        },

        draw: function() {
            this.shipContext.drawImage(this.repository.images["ship"], this.x, this.y);
        },

        fire: function() {
            score += 10;
            this.bulletPool.getSecondBullet(this.x+6, this.y, 3, this.x+30, this.y, 3);
        }

    });

    return  Ship;// so i can transfer somthing in the constructor.

    });