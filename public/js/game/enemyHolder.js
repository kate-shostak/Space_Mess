define([
    'backbone',
    'game/enemyPool',
    'game/enemyBulletPool'
], function(
    Backbone,
    EnemyPool,
    EnemyBulletPool
){
    var Ene = Backbone.View.extend ({
        
        initialize: function(repository) {
            this.enemyRepository = repository;
            
            //ALL ABOUT SETTING UP ENEMY
            this.speed = 2;
            this.encan = document.getElementById("game_field_enemies");
            this.encon = this.encan.getContext("2d");
            this.enemyWidth = this.enemyRepository.images["enemy"].width;
            this.enemyHeight = this.enemyRepository.images["enemy"].height;
            this.x = 0;
            this.y = 0;

            //POOLS
            this.enemyPool = new EnemyPool(repository, 30);
            this.bullPool = new EnemyBulletPool(repository, 30, "enemyBullet");
            this.enX = 100;
            this.enY = this.enemyHeight;
            this.spacer = this.enY * 1.5;
            for (var i = 1; i <= 18; i++) {
                console.log(this.speed);
                this.enemyPool.getOneBullet(this.enX, this.enY, this.speed);
                this.enX += this.enemyWidth + 25;
                if (i%6 == 0) {
                    this.enX = 100;
                    this.enY += this.spacer;
                }
            }
            
            var self = this;
           $(document).on("animate", function() {
                self.enemyPool.animate();
            });

           $(document).on("drawme", function() {
                self.encon.clearRect(0, 0,self.encan.width,self.encan.height);
            });

           $(document).on("stop", function() {
                self.speed = 0;
                self.encon.clearRect(0, 0,self.encan.width,self.encan.height);
            });
        },

    });

    return Ene;// so i can transfer somthing in the constructor.

    });