bootcamp.MainMenu = function(game) {};
bootcamp.MainMenu.prototype = {
	create: function() {
		this.home = this.add.sprite(0, 0, 'mainmenu');
        this.home.animations.add('homeGif', Phaser.ArrayUtils.numberArray(0, 9), 12, true);
		this.home.animations.play('homeGif');
        this.music = this.add.audio('bekersRapen');
        this.music.play();
        
        this.style = { font: "13px silkscreen", fill: "#fff " , align: 'center'};
        this.scoreText = this.add.text(bootcamp._WIDTH/2, 10, 'Average Rob is wederom', this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText = this.add.text(bootcamp._WIDTH/2, 22, 'aanwezig op Pukkelpop!', this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText = this.add.text(bootcamp._WIDTH/2, 34, 'Hij wilt graag naar Charlotte De', this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText = this.add.text(bootcamp._WIDTH/2, 46, 'Witte in de Boiler Room, maar hij', this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText = this.add.text(bootcamp._WIDTH/2, 58, 'moet eerst een pintje fixen,', this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText = this.add.text(bootcamp._WIDTH/2, 70, 'door bekers te rapen...', this.style);
        this.scoreText.anchor.set(0.5, 0);
        
        
        this.scoreText = this.add.text(bootcamp._WIDTH/2, 200, 'Met 20 lege bekers krijgt hij een', this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText = this.add.text(bootcamp._WIDTH/2, 212, "pintje. Maar hij moet opleten", this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText = this.add.text(bootcamp._WIDTH/2, 224, "voor 'poulékes', die hem mee", this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText = this.add.text(bootcamp._WIDTH/2, 236, "naar de camping sleuren om Cara", this.style);
        this.scoreText.anchor.set(0.5, 0);
        this.scoreText = this.add.text(bootcamp._WIDTH/2 - 50, 248, "te drinken", this.style);
        this.scoreText.anchor.set(0.5, 0);

		this.startButton = this.add.button(bootcamp._WIDTH/2 - 50, bootcamp._HEIGHT - 105, 'button', this.startGame, this, 2, 0, 1);

	},
	startGame: function() {
        this.game.state.start("Game");
	}
};