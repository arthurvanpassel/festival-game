var bootcamp = {
	_WIDTH: 200,
	_HEIGHT: 200 * (window.innerHeight / window.innerWidth),
    _LEVEL: 0,
    _MUSIC: false,
    _BEKERS: 0
};
bootcamp.Boot = function(game) {};
bootcamp.Boot.prototype = {
	preload: function() {
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start('Preloader');
	}
};
