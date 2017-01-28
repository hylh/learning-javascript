/*global PIXI*/
/*global keyboard*/
/*global contain*/
/*global hitTestRectangle*/

//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text;

var stage = new Container(),
    renderer = autoDetectRenderer(
    600, 600, 
    {transparent: false, antialias: false, resolution: 1}
);

renderer.backgroundColor = 0x061639;
document.body.appendChild(renderer.view);

loader
    .add([
        "images/bunny.png",
        "images/cat.png"
    ])
    .load(setup);

let cat, bunny, rocket, face, tiger;
let message;
let state;

function setup() {
    cat = new Sprite(resources["images/cat.png"].texture);
    stage.addChild(cat);
    cat.vx = 0;
    cat.vy = 0;

    bunny = new Sprite(resources["images/bunny.png"].texture);
    bunny.position.set(200,200);
    bunny.scale.set(1.5, 1.5);
    bunny.vx = 0;
    bunny.vy = 0;
    //Set the anchor of the sprite, from 0 to 1
    //This will set it to the center of the sprite
    bunny.anchor.set(0.5, 0.5);
    bunny.rotation = 0.5;
    stage.addChild(bunny);


    var mySpriteSheetImage = PIXI.BaseTexture.fromImage("images/tileset.png");
    var rocketTexture = new PIXI.Texture(mySpriteSheetImage, new Rectangle(192,128,64,64));
    var faceTexture = new PIXI.Texture(mySpriteSheetImage, new Rectangle(192, 64, 64, 64));
    var tigerTexture = new PIXI.Texture(mySpriteSheetImage, new Rectangle(0,64,64,64));

    rocket = new Sprite(rocketTexture);
    rocket.position.set(32,132);

    face = new Sprite(faceTexture);
    face.position.set(200,300);

    tiger = new Sprite(tigerTexture);
    tiger.position.set(0,300);

    var animals = new Container();
    animals.addChild(rocket);
    animals.addChild(face);
    animals.addChild(tiger);
    stage.addChild(animals);

    //change position of whole container
    //animals.position.set(64,-64);
    
    //This changes the relative coordinates of the sprites
    //Use this command to find the global positions
    //animals.toGlobal(rocket.position)
    //ALT: rocket.parent.toGlobal(rocket.position)
    //BEST WAY:
    //tiger.getGlobalPosition().x
    //tiger.getGlobalPosition().y

    var circle = new Graphics();
    circle.beginFill(0x9966FF);
    circle.drawCircle(0,0,32);
    circle.endFill();
    circle.x = 64;
    circle.y = 130;
    stage.addChild(circle);

    var line = new Graphics();
    line.lineStyle(4, 0xFFFFFF, 1);
    line.moveTo(0,0);
    line.lineTo(80,50);
    line.x = 264;
    line.y = 32;
    stage.addChild(line);

    message = new Text(
        "Hello Pixi",
        {
            fontFamily: "Arial",
            fontSize: 32,
            fill: "white"
        }
    );
    message.position.set(100, 350);
    stage.addChild(message);
    message.text = "Hello Change!";

    //Keyboard
    var left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    left.press = function() {
        bunny.vx = -5;
        bunny.vy = 0;
    };

    left.release = function() {
        if(!right.isDown && bunny.vy === 0){
            bunny.vx = 0;
        }
    };

    up.press = function() {
        bunny.vx = 0;
        bunny.vy = -5;
    };
    up.release = function(){
        if(!down.isDown && bunny.vx === 0) {
            bunny.vy = 0;
        }
    };

    right.press = function() {
        bunny.vx = 5;
        bunny.vy = 0;
    };
    right.release = function() {
        if (!left.isDown && bunny.vy === 0) {
            bunny.vx = 0;
        }
    };

    down.press = function() {
        bunny.vy = 5;
        bunny.vx = 0;
    };
    down.release = function() {
        if (!up.isDown && bunny.vx === 0) {
            bunny.vy = 0;
        }
    };

    state = play;
    gameLoop();
}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    state();

    renderer.render(stage);
}

function play() {
    //Update the cat's velocity
    cat.vx = 2;
    cat.vy = 1;
    cat.x += cat.vx;
    cat.y += cat.vy;

    bunny.x += bunny.vx;
    bunny.y += bunny.vy;

    contain(bunny, {x: 0, y: 0, width: renderer.width, height: renderer.height});

    if(hitTestRectangle(bunny, tiger)){
        //If collison
        message.text = "hit!";
    } else {
        message.text = "waiting...";
    }
}
