var mainState = {
	preload: function(){
		game.load.image('player', '../assets/hero.png');
		game.load.image('monster', '../assets/monster.png');
	},

	create: function(){
		game.stage.backgroundColor = '#408A3D';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.player = game.add.sprite(game.world.randomX, game.world.randomY, 'player');
    	game.physics.arcade.enable(this.player);
    	this.cursor = game.input.keyboard.createCursorKeys();
    	this.monster = game.add.sprite(60, 140, 'monster');
    	game.physics.arcade.enable(this.monster);
    	this.monster.anchor.setTo(0.5, 0.5);

    	this.scoreLabel = game.add.text(30, 30, 'score: 0', {font: '18px Arial', fill: '#ffffff'});
    	this.score = 0;
    	this.createWorld();
	},

	update: function(){
		this.movePlayer();
		game.physics.arcade.overlap(this.player, this.monster, this.hitMonster, null, this);

		if (!this.player.inWorld){
			this.playerDie();
		}
	},

	movePlayer: function(){
    if(this.cursor.left.isDown){
      this.player.body.velocity.x = -200;
    } else if (this.cursor.right.isDown){
      this.player.body.velocity.x = 200;
    } else if (this.cursor.up.isDown){
      this.player.body.velocity.y = -500;
    } else if (this.cursor.down.isDown){
      this.player.body.velocity.y = 200;
    }
    else {
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
    }
    if (this.cursor.up.isDown && this.player.body.touching.down){
      this.player.body.velocity.y = -320;
    }
  },

  hitMonster: function(player, monster){
  	this.score += 5;
    this.scoreLabel.text = 'score: ' + this.score;
    this.updateMonsterPosition();
  },

  updateMonsterPosition: function(){
  	var monsterPosition = [
  	{x: 140, y: 60}, {x: 360, y: 60},
    {x: 60, y: 140}, {x: 440, y: 140},
    {x: 130, y: 300}, {x: 370, y: 300}
  	];

  	for(var i=0; i < monsterPosition.length;i++){
  		if(monsterPosition[i].x === this.monster.x){
  			monsterPosition.splice(i, 1);
  		}
  	}

  	var newPosition = monsterPosition[game.rnd.integerInRange(0, monsterPosition.length-1)];
  		this.monster.reset(newPosition.x, newPosition.y);
  },

  playerDie: function(){
    game.state.start('main');
  },
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);

game.state.start('main');

