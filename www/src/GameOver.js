bootcamp.GameOver = function(game) {};
bootcamp.GameOver.prototype = {
	create: function() {
		this.home = this.add.sprite(0, 0, 'gameover');
        this.home.animations.add('gameoverGif', Phaser.ArrayUtils.numberArray(0, 20), 13, true);
		this.home.animations.play('gameoverGif');
        this.music = this.add.audio('camping');
        this.music.play();
        
        beginKader = 118;
        i = 0;
        this.style = { font: "13px silkscreen", fill: "#fff " , align: 'center'};
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader, 'Rob is bezweken onder de druk', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader + 13*i, "van de 'poulékes', en is terug", this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader + 13*i, 'naar de camping vertrokken.', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader + 13*i, 'Hij zal waarsschijnlijk niet meer', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader + 13*i, 'terugkomen naar de wei en', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader + 13*i, 'daardoor Charlotte De Witte', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader + 13*i, 'missen in de boiler...', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        i++;
        this.scoreText = this.add.text(bootcamp._WIDTH/2,beginKader + 13*i, 'Probeer het opnieuw!', this.style);
        this.scoreText.anchor.set(0.5, 0);
        i++;
        

		this.startButton = this.add.button(bootcamp._WIDTH/2 - 50, bootcamp._HEIGHT - 105, 'button', this.startGame, this, 2, 0, 1);

	},
	startGame: function() {
        bootcamp._LEVEL = 0;
        this.game.state.start('Game');
	}
};