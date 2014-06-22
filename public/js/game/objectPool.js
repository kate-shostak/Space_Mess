define([
    'backbone',
    'game/bullet'
], function(
    Backbone,
    Bullet
){  
    pool = [];
	var Pool = Backbone.View.extend ({
        
		initialize: function (repository) {
            this.maxPoolSize = 30; 
            this.reposit = repository;
            this.init();
            var self  = this;
            for (var i = 0; i < this.maxPoolSize; i++) {
                this.bullet = new Bullet(this.reposit, this.enemiescanvas, this.enemiesbgcontext);
                pool[i] = this.bullet;
            }
        },

        init: function() {
            this.enemiescanvas = document.getElementById("game_field_enemies");
            this.enemiesbgcontext = this.enemiescanvas.getContext("2d");
        },

        getOneBullet: function(x, y, speed) {
            if(!pool[this.maxPoolSize - 1].alive) {
                pool[this.maxPoolSize - 1].setBullet(x, y, speed);
                pool.unshift(pool.pop());
            }
        },

        getSecondBullet: function(x1, y1, speed1, x2, y2, speed2) {
            if( (!pool[this.maxPoolSize-1].alive) && (!pool[this.maxPoolSize - 2].alive) )  {
                this.getOneBullet(x1, y1, speed1);
                this.getOneBullet(x2, y2, speed2);
            }
        },

        animate: function() {
            for(var i = 0; i < this.maxPoolSize; i++) {
                if(pool[i].alive) {
                    if(pool[i].draw()) {
                        pool[i].clear();
                        pool.push((pool.splice(i,1))[0]);
                    }
                }
             else
                break;
            }
        }

	});

	return  Pool;// so i can transfer somthing in the constructor.

	});