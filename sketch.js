var rect, rectImage, rectPos, pos;
var database;

function preload() {
    rectImage = loadImage("square.png");
}

function setup() {
    database = firebase.database();
    createCanvas(500, 500);
    rect = createSprite(250, 250);
    rect.addImage(rectImage);
    rect.scale = 0.1;

    rectPos = database.ref("Rect/Position").on("value", readPosition, err1);
}

function draw() {
    background("kyan");

    if(keyDown("right")) {
        writePos(3, 0);
    }
    if(keyDown("left")) {
        writePos(-3, 0);
    }
    if(keyDown("up")) {
        writePos(0, -3);
    }
    if(keyDown("down")) {
        writePos(0, 3);
    }
    drawSprites();
}
function readPosition(data) {
    pos = data.val();
    rect.x = pos.x;
    rect.y = pos.y;
}
function writePos(x, y) {
    database.ref("Rect/Position").update({
        'x': rect.x + x,
        'y': rect.y + y
    })
}
function err1(){
    console.log("there's an error connecting to google's firebase console's realtime database");
}