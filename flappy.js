// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score=0;
var player;
var gap_start;
var pipes;
var pipe_offset = 900;
var pipe_interval = 1.5;

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
    game.load.image("Pipe", "assets/pipe.png");
    game.load.audio("score", "assets/point.ogg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // need to generate pipe first to get them in background
    pipes = game.add.group();
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipes);


    game.physics.startSystem(Phaser.Physics.ARCADE);

    // alert(score); // variable check
    var x = 80;
    var y = 200;
    player = game.add.sprite(x, y, "PlayerImg");
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.checkWorldBounds = true;
    // PHYSICAL PROPERTIES //
    player.body.velocity.y = -150;
    // player.body.velocity.x = 100;
    player.body.gravity.y = 400;

    game.stage.setBackgroundColor("#CDF3FF");
    // game.add.text(20,20, "Welcome to my game", {font: "30px Arial", fill: "#FF8533"});
    // game.add.sprite(10, 270, "PlayerImg");

    // game.input.onDown.add(clickHandler);
    game.add.audio("score"); // for the next event handler

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);
    // game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    /* game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown); */




    ///////////// AFTERNOON //////////////////
    /* for(var count = 1; count <= 5; count++) {
        game.add.text(20,20*count, "Clap", {fill: "#FF8533"});
    } */



}

function game_over() {
    // alert("GAME OVER");
    location.reload(); // refreshes tab 
}

function add_pipe_part(x, y, pipe_part) {
    var pipe = pipes.create(x, y, pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -400;
}

function player_jump() {
    player.body.velocity.y = -200;
}

function generate_pipes() {
    var gap_start = Math.floor(Math.random()*5)+1; // this is the location of the gap (from top)

    for(var count = 0; count < gap_start; count += 1) {
        add_pipe_part(pipe_offset, 50*count, "Pipe");
    }
    for(var count=gap_start+3.5; count < 8; count += 1) {
        add_pipe_part(pipe_offset, 50*count, "Pipe");
    }
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
    game.physics.arcade.overlap(player, pipes, game_over);
}

