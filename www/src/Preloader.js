bootcamp.Preloader = function(game) {};
bootcamp.Preloader.prototype = {
	preload: function() {
        //MAIN MENU
        this.load.spritesheet('mainmenu', 'img/mainmenu.png', 200, 400);
        this.load.image('button', 'img/button.png');
        
        //GAME OVER
        this.load.spritesheet('gameover', 'img/gameover.png', 200, 400);
        
        //LEVEL COMPLETE
        this.load.spritesheet('levelcomplete', 'img/levelcomplete.png', 200, 400);
        
        //BACKGROUND
        this.load.image('background', 'img/grass.png');
        
        //SPRITES
        this.load.spritesheet('player', 'img/rob.png', 20, 25 );
        this.load.spritesheet('girls', 'img/girls.png', 25, 26);
        this.load.spritesheet('explosion', 'img/explosion.png', 80, 80);
        this.load.spritesheet('items', 'img/items.png', 14, 19);
        this.load.spritesheet('lives', 'img/levens.png', 17, 84);
        this.load.image('bar', 'img/bar.png');
        this.load.spritesheet('trash', 'img/trash.png', 86, 84);
        
        //SOUNDS
        this.load.audio('wow', 'aud/wow2.wav');
        this.load.audio('nice', 'aud/nice2.wav');
        this.load.audio('zalig', 'aud/zalig3.wav');
        this.load.audio('putain', 'aud/putain.wav');
        this.load.audio('fuck', 'aud/fuck.wav');
        this.load.audio('flume', 'aud/flume.wav');
        this.load.audio('bekersRapen', 'aud/bekers-rapen.wav');
        this.load.audio('camping', 'aud/camping.wav');
        this.load.audio('muilen', 'aud/muilen.wav');
        this.load.audio('pintje', 'aud/pintje-aub.wav');
        
    },
    
	create: function() {
		this.game.state.start('MainMenu');
	}
};
