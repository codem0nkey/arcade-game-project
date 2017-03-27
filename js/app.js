var speed_start = function () {
	var spd = Math.random() * 200 + 50;
	return spd;
};


var row_move = 6;
var col_move = 2;


col = [1, 100, 200, 300, 400];
row = [-10, 70, 155, 235, 320, 400, 435];

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	if (this.x > 550) {
		this.x = -30;
		this.speed = speed_start();
		this.x += this.speed * dt;
	} else {
		this.x += this.speed * dt;
	}
	collide(this);
};

var collide = function(bug) {
	
	if (player.y === 235 && bug.y === 230) {
		check_x();
	} else if (player.y === 155 && bug.y === 145) {
		check_x();
	} else if (player.y === 70 && bug.y === 60) {
		check_x();
	} else {}
	
	function check_x() {
		if (player.x - bug.x < 75 && player.x - bug.x >= -75) {
		console.log('You Lost');
		row_move = 6;
		col_move = 2;
		player.x = col[col_move];
		player.y = row[row_move];
		}
	}
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var Player = function() {
	this.x = col[col_move];
	this.y = row[row_move];
	this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function() {
	if (this.y === -10) {
		console.log('You Won!!!');
		ctx.canvas.hidden="true";
	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
	if (keyPress === "up") {
		--row_move;
		this.y = row[row_move];
	} else if (keyPress === "down") {
		++row_move;
		this.y = row[row_move];
	} else if (keyPress === "left") {
		--col_move;
		this.x = col[col_move];
	} else if (keyPress === "right") {
		++col_move;
		this.x = col[col_move];
	} else {}
};


// Now instantiate your objects.

enemy_row = [60,145,230];

var enemy_1 = new Enemy(1, enemy_row[0], speed_start());
var enemy_2 = new Enemy(1, enemy_row[1], speed_start());
var enemy_3 = new Enemy(1, enemy_row[2], speed_start());
var enemy_4 = new Enemy(1, enemy_row[Math.floor(Math.random() * 2)], speed_start());
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy_1,enemy_2, enemy_3,enemy_4];
// Place the player object in a variable called player

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});