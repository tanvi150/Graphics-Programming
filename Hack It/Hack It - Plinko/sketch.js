// Example is based on examples from:
// http://brm.io/matter-js/
// https://github.com/shiffman/p5-matter
// https://github.com/b-g/p5-matter-examples

// module aliases
var Engine = Matter.Engine; // physics engine controller
var Render = Matter.Render; // not used BUT for optional debugging visualisation
var World = Matter.World;   // the physical world containing all bodies
var Bodies = Matter.Bodies; // factory to create rigid bodies like circles & rectangles

var engine;              // the matter.js engine
var balls = [];          // array to store falling balls 
var ground;              // ground body for physical collisions
var plinkos = [];        // array of "static" pins in the plinko board
var groundVertices = []; // vertices used for drawing the ground

function setup() {
  createCanvas(900, 600);

  engine = Engine.create(); // create an engine

  setupGround();
  setupPins();
  generateNewBall();
}
///////////////////////////////////////////////////////////
function draw() {
  background(0);
  Engine.update(engine); // update physics engine each frame

  drawPins();
  drawBalls();
  drawGround();
}
///////////////////////////////////////////////////////////
function keyPressed(){
  generateNewBall();
}
///////////////////////////////////////////////////////////
function setupGround(){
  //define a simple rectangle at the bottom 
  let y = height - 30;    // y-position for top of the ground
  groundVertices = [
    {x: 0, y: y},
    {x: width, y: y},
    {x: width, y: height - 20},
    {x: 0, y: height - 20}
  ];

  // CREATE A STATIC PHYSICS BODY FOR THE GROUND
  // Bodies.rectangle(x, y, w, h, options) --> creates a rectangle body
  ground = Bodies.rectangle(
    width/2,              // center x of the rectangle
    y + (height - y)/2,   // center y of the rectangle
    width,                // width of the rectangle
    height - y,           // height of the rectangle
    {
      isStatic: true,     // Matter.js: body does not move
      restitution: 1      // Matter.js: bounciness
    }
  );

  World.add(engine.world, ground);  // add the ground body to the physics world
}
///////////////////////////////////////////////////////////
function drawGround(){
  fill(125);
  drawVertices(groundVertices); // draw visual ground using vertices
}
///////////////////////////////////////////////////////////
function setupPins(){
  //plinko wall
  var options = {isStatic: true, restitution: 1}; // pins don't move, balls bounce off fully
  var cols = 15;  // number of columns of pins
  var rows = 9;   // number of rows of pins
  var spacing = width / cols; // spacing between pins
  
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;       // stagger even rows
      }
      var y = spacing + j * spacing;

      // Bodies.circle(x, y, radius, options) --> creates a circular body
      var p = Bodies.circle(x, y, 10, options);
      World.add(engine.world, [p]);  // add pin to physics world
      plinkos.push(p);               // save pin in array for drawing
    }
  }
}
///////////////////////////////////////////////////////////
function drawPins(){
  fill(255,200,0);
  for (var i=0; i<plinkos.length; i++){
    drawVertices(plinkos[i].vertices);   // draw each pin using its matter.js vertices
  }
}
///////////////////////////////////////////////////////////
function generateNewBall(){
  let x = random(50, width - 50);  // p5.js: random x spawn position
  let y = 50;                      // spawn near the top

  let options = {
    restitution: 1,     // bouncy ball
    friction: 0.5,      // friction with other bodies
    frictionAir: 0.005  // air resistance
  };

  // Bodies.circle(x, y, radius, options) --> creates a circular body
  let ball = Bodies.circle(x, y, 15, options);

  World.add(engine.world, [ball]); // add the ball to the physics world
  balls.push(ball);                // store the ball in the balls array
}
///////////////////////////////////////////////////////////
function drawBalls(){
  fill(0, 200, 255);
  for (var i=0; i < balls.length; i++){
    drawVertices(balls[i].vertices);  // draw each ball using Matter.js vertices
  }
}

///////////////////////////////////////////////////////////
// **** HELPER FUNCTIONS ****
// DO NOT WRITE BELOW THIS LINE
///////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape(); // start drawing a custom shape
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);  // define each vertex
  }
  endShape(CLOSE);  // finish the shape and close it
}

/* COMMANDS & ITS MEANINGS

MATTER.JS

1. Engine.create()
- creates a new physics engine

2. Engine.update(engine)
- steps the physics simulation forward in each frame

3. World.add(world, body)
- adds a body to the physics world

4. Bodies.rectangle(x, y, w, h, options)
- creates a rectangular body

5. Bodies.circle(x, y, r, options)
- creates a circular body
*/
