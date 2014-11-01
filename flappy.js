// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score=0;
var player;

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(700, 400, Phaser.AUTO, 'game', stateActions);



/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("PlayerImg", "assets/flappy_viking.png");
    game.load.image("Helmet", "assets/flappy-helmet.png");
    game.load.audio("score", "assets/point.ogg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // alert(score); // variable check
    var x = 20;
    var y = 250;
    player = game.add.sprite(x, y, "PlayerImg");

    game.stage.setBackgroundColor("#CDF3FF");
    game.add.text(20,20, "Welcome to my game", {font: "30px Arial", fill: "#FF8533"});
    // game.add.sprite(10, 270, "PlayerImg");

    game.input.onDown.add(clickHandler);
    game.add.audio("score"); // for the next event handler
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);


}


function clickHandler (event) {
    game.add.sprite(event.x, event.y, "PlayerImg");
    game.sound.play("score");
}

function spaceHandler() {
    //alert("You pressed the Spacebar!");
    game.sound.play("score");
    game.add.sprite(random()*600, random()*400, "Helmet");
    //score = score +1;
    // alert(score);
}

function random() {
    return Math.random();
}

function moveRight() {
    player.x += 20 //player.x = player.x + 20;
}

function moveLeft() {
    player.x -=  20;
}

function moveUp() {
    player.y -=  20;
}

function moveDown() {
    player.y +=  20;
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}

