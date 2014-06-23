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
		initialize: function (repository, poolType, size) {
            var Type = poolType;
            this.meme = poolType;
            this.reposit = repository;
            this.maxPoolSize = size; 
            this.init();
            
            if (Type === "bullet") {
                //console.log("good_one");
                for (var i = 0; i < this.maxPoolSize; i++) {
                    this.bullet = new Bullet(this.reposit, this.enemiescanvas, this.enemiesbgcontext, Type);
                    this.pool[i] = this.bullet;
                }
            }
            else if (Type === "enemy") {
                for (var i = 0; i < this.maxPoolSize; i++) {
                    this.encan = document.getElementById("game_field_enemies");
                    this.encon = this.encan.getContext("2d");
                    this.enemy = new Enemy(this.reposit, this.encan, this.encon);
                    this.pool[i] = this.enemy;
                }
            }
            else if (Type === "enemyBullet") {
                for (var i = 0; i < this.maxPoolSize; i++) {
                    this.enemyBullet = new Bullet(this.reposit, this.enemiescanvas, this.enemiesbgcontext,Type);
                    this.pool[i] = this.enemyBullet;
                }
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
            console.log(this.pool[0].name);
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