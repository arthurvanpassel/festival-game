bootcamp.Game = function(game) {};
bootcamp.Game.prototype = {
    
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
        this.levelCompleteVar = 0;
        
        // BACKGROUND
        this.background = this.add.tileSprite(0,0,1000, 500, 'background');
        this.barLoaded = 0;
        if (bootcamp._LEVEL > 1) {
            this.scroll = 2 + 0.5 * (bootcamp._LEVEL -1);
        } 
        else {
            this.scroll = 2;
        }
        
        // ROB
        this.player = this.add.sprite(100, bootcamp._HEIGHT + 60, 'player');
        this.player.frame = 1;
        this.player.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = false;
        this.player.animations.add('running', [1, 2, 1, 0], 8, true);
        this.player.animations.play('running');
        
        this.player.body.velocity.y = -200;

        // ROB CONTROLS
        this.cursors = this.input.keyboard.createCursorKeys();
        
        
        // CUPS        
        this.cups = this.add.group();
        this.cups.enableBody = true;
        this.cups.physicsBodyType = Phaser.Physics.ARCADE;
        this.cups.createMultiple(10, 'items', [0]);
        this.cups.setAll('anchor.x', 0.5);
        this.cups.setAll('anchor.y', 0.5);
        this.cups.setAll('checkWorldBounds', true);
        this.cups.setAll('outOfBoundsKill', true);
        
        // GIRLS
        this.girls = this.add.group();
        this.girls.enableBody = true;
        this.girls.physicsBodyType = Phaser.Physics.ARCADE;
        this.girls.createMultiple(10, 'girls', [0]);
        this.girls.setAll('anchor.x', 0.5);
        this.girls.setAll('anchor.y', 0.5);
        this.girls.setAll('checkWorldBounds', true);
        this.girls.setAll('outOfBoundsKill', true);
        
        
        // TRASHS        
        this.trashs = this.add.group();
        this.trashs.enableBody = true;
        this.trashs.physicsBodyType = Phaser.Physics.ARCADE;
        this.trashs.createMultiple(10, 'trash', [0]);
        this.trashs.setAll('anchor.x', 0.5);
        this.trashs.setAll('anchor.y', 0.5);
        this.trashs.setAll('checkWorldBounds', true);
        this.trashs.setAll('outOfBoundsKill', true);
        
        //BAR
        this.bar = this.add.sprite(bootcamp._WIDTH/2, -71, 'bar');
        this.bar.frame = 0;
        this.bar.anchor.setTo(0.5, 0);
        this.physics.enable(this.bar, Phaser.Physics.ARCADE);
        this.bar.body.collideWorldBounds = false;
        
        //SOUNDS
        // Initialize sounds
        this.wowSound = this.add.audio('wow', 1, false);
        this.niceSound = this.add.audio('nice', 1, false);
        this.zaligSound = this.add.audio('zalig', 1, false);
        this.fuckSound = this.add.audio('fuck', 1, false);
        this.putainSound = this.add.audio('putain', 1, false);
        this.muilenSound = this.add.audio('muilen', 2, false);
        
        this.music = this.add.audio('flume');
        this.music.volume = 0.5;
        
        
        // EXPLOSIONS
        this.explosions = this.add.group();
        this.explosions.createMultiple(10, 'explosion');
        this.explosions.setAll('anchor.x', 0.5);
        this.explosions.setAll('anchor.y', 0.5);
        this.explosions.forEach(this.setupExplosion, this);
        
        // SCORES + LIVES
        this.cupScore = this.add.group();
        this.cupScore.enableBody = true;
        this.cupScore.physicsBodyType = Phaser.Physics.ARCADE;
        this.livesInt = 5;
        this.updateLives();
        this.score = 0;
        this.scoreSetup = false;
        
        this.style = { font: "9px silkscreen", fill: "#fff ", align: "center" };
        
        // ACCELEROMETER
        bootcamp._player = this.player;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

	},
	update: function() {
        // MUSIC
        if (!bootcamp._MUSIC) {
            this.music.play()
            bootcamp._MUSIC = true;
            setTimeout(function () {
                bootcamp._MUSIC = false;
            }, 116000);
        }
        
        // MOVEMENT
        this.playerMovement();
        
        // TRASH
        if (bootcamp._LEVEL >= 1) {
            this.handleTrash();
        }

        // CUPS
        this.handleItems();
        
        // GIRLS
        this.handleGirls();
        
        // HIT & EXPLODE
        this.physics.arcade.overlap(this.cups, this.player, this.cupHitsPlayer, null, this);

        //OUTRO
        if (this.levelCompleteVar >= 1) {
            this.levelComplete();
        }
        else {
            //INTRO
            if(this.player.body.position.y < bootcamp._HEIGHT - 60) {
                this.player.body.position.y = bootcamp._HEIGHT - 60;
                this.player.body.collideWorldBounds = true;
                this.player.body.velocity.y = 0;
            }
            if(this.player.body.position.y > bootcamp._HEIGHT - 60) {
                this.player.body.velocity.y += 3;
                console.log(this.player.body.velocity.y);
                console.log(this.player.body.position.y);
            }

            //SCROLL BACKGROUND
            
            this.background.tilePosition.y += this.scroll;
            
            // HIT & EXPLODE (WHEN NOT FINISHED)
            this.physics.arcade.overlap(this.girls, this.player, this.girlHitsPlayer, null, this);
            this.physics.arcade.overlap(this.trashs, this.player, this.trashHitsPlayer, null, this);
            
            // POINTS PREVIOUS LEVELS
            if (bootcamp._BEKERS > 0) {
                this.score++;
                this.updateScore();
                bootcamp._BEKERS--;
            }
        }
	},
    
    playerMovement: function() {
        var maxVelocity = 1000;
        
        if (this.cursors.left.isDown && this.player.body.velocity.x > -maxVelocity) {
            // Move to the left
            this.player.body.velocity.x -= 20;
        }
        else if (this.cursors.right.isDown && this.player.body.velocity.x < maxVelocity) {
            // Move to the right
            this.player.body.velocity.x += 20;
        }
        else {
            // Stop
            this.player.body.velocity.x = 0 ;
        }
    },
    
    handleGirls: function() {
        chanceOfDroppingGirl = this.rnd.integerInRange(0, 80);
        if (chanceOfDroppingGirl == 0) {
            girl = this.girls.getFirstExists(false);
            if (this.player.alive && !this.levelCompleteVar) {
                // And drop it
                x = this.rnd.integerInRange(12, bootcamp._WIDTH-12);
                girl.reset(x, 0);
                girl.body.gravity.y = 200;

                // WHICH GIRL?
                g = this.rnd.integerInRange(0, 2);
                if (g == 0) {
                    girl.animations.add('girl1', [0, 1, 0, 2], 10, true);
                    girl.animations.play('girl1');
                    girl.body.velocity.y = 100 + 50*bootcamp._LEVEL ;
                }
                if (g == 1) {
                    girl.animations.add('girl2', [3, 4, 3, 5], 10, true);
                    girl.animations.play('girl2');
                    girl.body.velocity.y = 100 + 80*bootcamp._LEVEL ;
                }
                if (g == 2) {
                    girl.animations.add('girl3', [6, 7, 6, 8], 10, true);
                    girl.animations.play('girl3');
                    girl.body.velocity.y = 100 + 30*bootcamp._LEVEL;
                }
            }
        }
    },
    
    girlHitsPlayer: function(girl, player) {
        girl.kill();
        this.explode(player);
        r = this.rnd.integerInRange(0,1);
        if (r) {
            this.putainSound.play();
        } else {
            this.fuckSound.play();
        }
        this.livesInt -= 1;
        this.updateLives();
        if (this.livesInt > 0) {
             this.respawnPlayer(this.player);
         }
        else {
            this.muilenSound.play();
            game = this.game;
            setTimeout(function () {
                console.log("GAMEOVER");
                game.state.start('GameOver')
            }, 2000);
        }
    },
    
    handleItems: function() {
        chanceOfDroppingItem = this.rnd.integerInRange(0, 100 - 10 * bootcamp._LEVEL - 1);
        if (chanceOfDroppingItem == 0) {
            if (this.player.alive && !this.levelCompleteVar) {
                console.log("DROP CUP");
                x = this.rnd.integerInRange(0, bootcamp._WIDTH);
                cup = this.cups.getFirstExists(false);
                cup.reset(x, 0);
                cup.body.velocity.y = this.scroll * 60;
                r = this.rnd.integerInRange(-180, 180);
                cup.angle = r;
            }
        }
    },
    
    cupHitsPlayer: function(player, cup) {
        cup.kill();
        r = this.rnd.integerInRange(0,2);
        if (r == 0) {
            this.wowSound.play();
        }
        if (r == 1) {
            this.zaligSound.play();
        }
        if (r == 2) {
            this.niceSound.play();
        }
        player.animations.add('cup', [4], 10, true);
        player.animations.play('cup');
        setTimeout(function () {
            player.animations.play('running');
        }, 300);
        this.score += 1;
        levelObjective = bootcamp._LEVEL*20 + 20;
        console.log(levelObjective);
        this.updateScore();
        if (this.score == levelObjective) {
            this.levelCompleteVar = 1;
        }
    },
    
    handleTrash: function() {
        chanceOfDroppingItem = this.rnd.integerInRange(0, 400 - 50 * bootcamp._LEVEL - 1);
        if (chanceOfDroppingItem == 0) {
            if (this.player.alive && !this.levelCompleteVar) {
                console.log("DROP TRASH");
                x = this.rnd.integerInRange(0, bootcamp._WIDTH);
                trash = this.trashs.getFirstExists(false);
                trash.reset(x, 0);
                trash.body.velocity.y = this.scroll * 60;
            }
        }
    },
    
    trashHitsPlayer: function(player, trash) {
        r = this.rnd.integerInRange(0,1);
        if (r) {
            this.putainSound.play();
        } else {
            this.fuckSound.play();
        }
        trash.kill();
        console.log("HIT TRASH");
        if(this.score > 10) {
        this.score -= 10;
        }
        else {
            this.score = 0;
        }
        this.removeCups();
    },
    
    levelComplete: function() {
        if (this.levelCompleteVar != 2) {
            this.player.body.velocity.y = -60;
            console.log(this.player.body.position.y);
            if (this.player.body.position.y < 100) {
                console.log("test");
                this.player.body.velocity.y = 0;
                this.background.tilePosition.y = 0;
                this.cups.setAll("body.velocity.y",0);
                this.trashs.setAll("body.velocity.y",0);
                this.bar.body.velocity.y = 0;
                this.player.animations.add('standing', [4], 8, true);
                this.player.animations.play('standing');
                game = this.game;
                this.player.frame = 4;
                setTimeout(function () {
                    game.state.start('LevelComplete')
                }, 2000);
                this.levelCompleteVar = 2;
                console.log("LEVEL COMPLETE");
                console.log(this.score);
                if (this.score > (20 + 20 * bootcamp._LEVEL)) {
                    bootcamp._BEKERS = this.score - 20 * (bootcamp._LEVEL + 1);
                    console.log(bootcamp._BEKERS);
                }
                bootcamp._LEVEL ++;
            }
            else {
                this.cups.setAll("body.velocity.y",30);
                this.trashs.setAll("body.velocity.y",30);
                this.background.tilePosition.y += 0.5;
                if (!this.barLoaded) {
                    this.bar.body.velocity.y = 30;
                    this.barLoaded = true;
                }
            }
        }      
    },
    
    respawnPlayer: function(player) {
        this.player.body.x = this.game.world.centerX;
        setTimeout(function () {
            console.log("DOOD")
            player.revive();
        }, 500);
    },
    
    setupExplosion: function(explosion) {
           explosion.animations.add('explode');
    },
    
    explode: function(entity) {
        entity.kill();

        // And create an explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(entity.body.x + (entity.width / 2), entity.body.y + (entity.height / 2));
        explosion.play('explode', 30, false, true);
    },
    
    updateLives: function() {
        if (this.livesInt == 5) {
            lives = this.add.sprite(bootcamp._WIDTH - 10, 50, 'lives');
            console.log("updatelives");
            lives.frame = 0;
            lives.anchor.setTo(0.5, 0.5);
            this.physics.enable(lives, Phaser.Physics.ARCADE);
            lives.body.collideWorldBounds = false;
        }
        else {
            lives.frame = 5-this.livesInt;
        }
    },
    
    updateScore: function() {
        cupY = 76 + bootcamp._LEVEL * 57; 
        if (!this.scoreSetup) {
            this.scoreText = this.add.text(10, cupY + 10, '', this.style);
            this.scoreText.anchor.set(0.5, 0);
            this.scoreSetup = true
        }
        if (this.score == 1) {
            cup = this.cupScore.create(10, cupY, 'items', [0]);
            cup.anchor.x = 0.5;
            cup.frame = 0;
            cup.anchor.y = 0.5;
            cup.checkWorldBounds = true;
            cup.outOfBoundsKill = true;
        }
        else {
            cup = this.cupScore.create(10, cupY - 3*(this.score-1) , 'items', [0]);
            cup.anchor.x = 0.5;
            cup.frame = 1;
            cup.anchor.y = 0.5;
            cup.checkWorldBounds = true;
            cup.outOfBoundsKill = true;
        }
        this.scoreText.text = this.pad(this.score, 1);
    },
    
    removeCups: function() {
        for (var i = 0; i < 10; i++) {
            cup = this.cupScore.children[this.cupScore.length-1];
            this.cupScore.remove(cup);
        }
        if (this.scoreSetup) {
            this.scoreText.text = this.pad(this.score, 1);
        }
    },
    
    pad: function(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
     },
    
	handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
		bootcamp._player.body.velocity.x += 10*x;
        
        // PLAYER MOVEMENT
        var maxVelocity = 200;
        
        if (x<0 && this.player.body.velocity.x > -maxVelocity) {
            // Move to the left
            this.player.body.velocity.x -= 5;
        }
        else if (x>=0 && this.player.body.velocity.x < maxVelocity) {
            // Move to the right
            this.player.body.velocity.x += 5;
        }
        else {
            // Stop
            this.player.body.velocity.x = 0 ;
        }
	}
};
