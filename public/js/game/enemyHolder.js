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
            this.speed = 0.5;
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
                this.enemyPool.getOneBullet(this.enX, this.enY, 2);
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
        },

        
    });

    return Ene;// so i can transfer somthing in the constructor.

    });