bootcamp.LevelComplete = function(game) {};
bootcamp.LevelComplete.prototype = {
	create: function() {
		this.home = this.add.sprite(0, 0, 'levelcomplete');
        this.home.animations.add('levelcompleteGif', Phaser.ArrayUtils.numberArray(0, 19), 13, true);
		this.home.animations.play('levelcompleteGif');
        this.music = this.add.audio('pintje');
        this.music.play();
        
        beginKader = 15;
        i = 0;
        this.style = { font: "13px silkscreen", fill: "#fff " , align: 'center'};
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader, 'Het is je gelukt!', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader + 13*i, "Je hebt op tijd genoeg bekers", this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader + 13*i, 'gevonden, en kan nu genieten van', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader + 13*i, 'Charlotte De Witte in de boiler.', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        
        eindKader = 170;
        i = 0;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,eindKader + 13*i, 'Maar dan bedenk je je plots dat ', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,eindKader + 13*i, 'Charlotte ook op de Mainstage ', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,eindKader + 13*i, 'optreedt vanavond... ', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,eindKader + 13*i, 'Verzamel dus nu een extra pint!', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,eindKader + 13*i, "En 'poulékes' blijven ontwijken he!", this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        

		this.startButton = this.add.button(bootcamp._WIDTH/2 - 50, bootcamp._HEIGHT - 105, 'button', this.startGame, this, 2, 0, 1);

	},
	startGame: function() {
        this.game.state.start('Game');
	}
};