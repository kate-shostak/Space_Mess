define([
    'backbone',
    'game/bullet',
    'game/enemy'
], function(
    Backbone,
    Bullet,
    Enemy
){  
    
    var Pool = Backbone.View.extend ({
        pool: [],
        initialize: function (repository, size) {
            this.reposit = repository;
            this.maxPoolSize = size; 
            this.init();
            
            for (var i = 0; i < this.maxPoolSize; i++) {
                this.enemy = new Enemy(this.reposit, this.encan, this.encon);
                this.pool[i] = this.enemy;
                }
        },

        init: function() {
            this.encan = document.getElementById("game_field_enemies");
            this.encon = this.encan.getContext("2d");
        },

        getOneBullet: function(x, y, speed) {
            if(!this.pool[this.maxPoolSize - 1].alive) {
                this.pool[this.maxPoolSize - 1].setBullet(x, y, speed);
                this.pool.unshift(this.pool.pop());
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