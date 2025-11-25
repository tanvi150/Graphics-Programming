// array to store all particle objects
let particle = [];

// button to clear the particle array
var clearButton;

// box settings
var boxX, boxY, boxW, boxH;

// gravity force
var gravity;

function setup() {
    // set up canvas size
    createCanvas(900, 600);

    // middle of the screen
    boxW = 70;
    boxH = 70;
    boxX = width / 2 - boxW / 2;
    boxY = height / 2 - boxH / 2;

    // create a button and position it
    clearButton = createButton("Clear Particles");
    clearButton.position(20, 20);

    // make it call buttonPressed() when clicked 
    clearButton.mousePressed(buttonPressed);

    // small downward acceleration
    gravity = createVector(0, 0.005);
}

function draw() {
    // clear frame in each loop
    background(0);

    // draw the box at the center
    fill(143, 0, 0);
    noStroke();
    rect(boxX, boxY, boxW, boxH);

    // update and draw every particle in the array
    for (var i = 0; i < particle.length; i++) {
        particle[i].run()
    }
}

function mouseDragged() {
    // create a new particle at the mouse position
    particle.push(new Particle(mouseX, mouseY));
}

function buttonPressed(){
    particle = [];
}

class Particle {
    constructor(x, y) {
        // vector storing movement direction + speed
        this.velocity = new createVector(random(-3, 3), random(-3, 3));

        // vector storing the particle's current position
        this.location = new createVector(x, y);

        // vector that affects the velocity (0 = no acceleration)
        this.acceleration = new createVector(0, 0);

        // visual size of the particle
        this.size = random(5, 15);

        // 1 = no friction, smaller = more friction
        this.friction = 0.98;

        // colour before entering the box
        this.color = color(232, 224, 74);
    }

    run() {
        this.applyGravity();
        this.draw(); // draw the particle
        this.move(); // update position
        this.checkBoxCollision(); // particle changes colour after box collision 
        this.bounce(); // bounce off screen edges
    }

    applyGravity(){
        // always apply gravity
        this.acceleration.add(createVector(0, 0.005));
    }

    draw() {
        fill(this.color);
        noStroke();
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }

    move() {
        // velocity += acceleration
        this.velocity.add(this.acceleration);

        // apply friction to slow down movement
        this.velocity.mult(this.friction);

        // location += velocity (actually moves the particle)
        this.location.add(this.velocity);
    }

    checkBoxCollision(){
        // check if the center of the particle is inside the box
        if (this.location.x > boxX && this.location.x < boxX + boxW && this.location.y > boxY && this.location.y < boxY + boxH){
            this.color = color(143, 0, 0);
        }
    }

    bounce() {
        // stop at the bottom
        if (this.location.y > height - this.size / 2){
            this.location.y = height - this.size / 2;
            this.velocity.y = 0;
        }
    }
}

