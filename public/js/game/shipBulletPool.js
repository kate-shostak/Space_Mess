define([
    'backbone',
    'game/bullet',
    'game/enemy'
], function(
    Backbone,
    Bullet,
    Enemy
){  
    
    var Pool = Backbone.Model.extend ({
        pool: [],
        initialize: function (repository, size, bulletType) {
            this.Type = bulletType;
            this.reposit = repository;
            this.maxPoolSize = size; 
            this.init();
            
            for (var i = 0; i < this.maxPoolSize; i++) {
                this.bullet = new Bullet(this.reposit, this.enemiescanvas, this.enemiesbgcontext, this.Type);
                this.pool[i] = this.bullet;
            }
            
        },

        init: function() {
            this.enemiescanvas = document.getElementById("game_field_enemies");
            this.enemiesbgcontext = this.enemiescanvas.getContext("2d");
        },

        getOneBullet: function(x, y, speed) {
            if(!this.pool[this.maxPoolSize - 1].alive) {
                this.pool[this.maxPoolSize - 1].setBullet(x, y, speed);
                this.pool.unshift(this.pool.pop());
            }
        },

        getSecondBullet: function(x1, y1, speed1, x2, y2, speed2) {
            if( (!this.pool[this.maxPoolSize-1].alive) && (!this.pool[this.maxPoolSize - 2].alive) )  {
                this.getOneBullet(x1, y1, speed1);
                this.getOneBullet(x2, y2, speed2);
            }
        },

        animate: function() {
            for(var i = 0; i < this.maxPoolSize; i++) {
                if(this.pool[i].alive) {
                    if(this.pool[i].draw()) {
                        this.pool[i].clear();
                        this.pool.push((this.pool.splice(i,1))[0]);
                    }
                }
             else
                break;
            }
        }

    });

    return  Pool;// so i can transfer somthing in the constructor.

    });