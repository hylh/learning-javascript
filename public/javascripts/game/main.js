/*global PIXI*/
/*global keyboard*/
/*global contain*/
/*global hitTestRectangle*/

//Aliases
const Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle,
    Graphics = PIXI.Graphics,
    Text = PIXI.Text;

const stage = new Container(),
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

class Npc {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.sprite.vx = 0;
        this.sprite.vy = 0;

        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }

    setVelocity(vx, vy){
        this.sprite.vx = vx;
        this.sprite.vy = vy;
    }

    setRotation(radians){
        this.rotation = radians;
    }

    animate(){
        this.sprite.x += this.sprite.vx;
        this.sprite.y += this.sprite.vy;

        this.sprite.rotation += this.rotation;
    }
}

function setup() {
    cat_sprite = new Sprite(resources["images/cat.png"].texture);
    cat = new Npc(
        cat_sprite,
        0,
        0
    );
    cat.setVelocity(2,1);

    stage.addChild(cat.sprite);

    bunny_sprite = new Sprite(resources["images/bunny.png"].texture);
    bunny = new Npc(
        bunny_sprite,
        200,
        200
    );
    bunny.sprite.scale.set(1.5, 1.5);
    //Set the anchor of the sprite, from 0 to 1
    //This will set it to the center of the sprite
    bunny.sprite.anchor.set(0.5, 0.5);
    //bunny.rotation = 0.5;
    bunny.setRotation(0.01);
    stage.addChild(bunny.sprite);


    let mySpriteSheetImage = PIXI.BaseTexture.fromImage("images/tileset.png");
    let rocketTexture = new PIXI.Texture(mySpriteSheetImage, new Rectangle(192,128,64,64));
    let faceTexture = new PIXI.Texture(mySpriteSheetImage, new Rectangle(192, 64, 64, 64));
    let tigerTexture = new PIXI.Texture(mySpriteSheetImage, new Rectangle(0,64,64,64));

    rocket = new Sprite(rocketTexture);
    rocket.position.set(32,132);

    face = new Sprite(faceTexture);
    face.position.set(200,300);

    tiger = new Sprite(tigerTexture);
    tiger.position.set(0,300);

    let animals = new Container();
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

    let circle = new Graphics();
    circle.beginFill(0x9966FF);
    circle.drawCircle(0,0,32);
    circle.endFill();
    circle.x = 64;
    circle.y = 130;
    stage.addChild(circle);

    let line = new Graphics();
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
    const left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    left.press = function() {
        bunny.sprite.vx = -5;
        bunny.sprite.vy = 0;
    };

    left.release = function() {
        if(!right.isDown && bunny.sprite.vy === 0){
            bunny.sprite.vx = 0;
        }
    };

    up.press = function() {
        bunny.sprite.vx = 0;
        bunny.sprite.vy = -5;
    };
    up.release = function(){
        if(!down.isDown && bunny.sprite.vx === 0) {
            bunny.sprite.vy = 0;
        }
    };

    right.press = function() {
        bunny.sprite.vx = 5;
        bunny.sprite.vy = 0;
    };
    right.release = function() {
        if (!left.isDown && bunny.sprite.vy === 0) {
            bunny.sprite.vx = 0;
        }
    };

    down.press = function() {
        bunny.sprite.vy = 5;
        bunny.sprite.vx = 0;
    };
    down.release = function() {
        if (!up.isDown && bunny.sprite.vx === 0) {
            bunny.sprite.vy = 0;
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
    cat.animate();
    bunny.animate();

    contain(bunny.sprite, {x: 0, y: 0, width: renderer.width, height: renderer.height});

    if(hitTestRectangle(bunny.sprite, tiger)){
        //If collison
        message.text = "hit!";
    } else {
        message.text = "waiting...";
    }
}
