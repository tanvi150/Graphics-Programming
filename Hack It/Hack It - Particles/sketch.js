// array to store all particle objects
let particle = [];

// button to clear the particle array
var clearButton;

function setup() {
    // set up canvas size
    createCanvas(900, 600);

    // create a button and position it
    clearButton = createButton("Clear Particles");
    clearButton.position(20, 20);

    // make it call buttonPressed() when clicked 
    clearButton.mousePressed(buttonPressed);
}

function draw() {
    // clear frame in each loop
    background(0);

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

        // starts fully opaque
        this.age = 255;

        // 1 = no friction, smaller = more friction
        this.friction = 0.98;
    }

    run() {
        this.updateAge(); // reduce transparency
        this.draw(); // draw the particle
        this.move(); // update position
        this.bounce(); // bounce off screen edges
    }

    updateAge() {
        // fade out over time
        this.age -= 1;

        //prevent going negative
        this.age = max(this.age, 0);
    }

    draw() {
        // colour uses age as alpha --> fades out
        fill(random(252), random(144), random(3), this.age);
        noStroke();
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }

    move() {
        // velocity += acceleration
        this.velocity.add(this.acceleration);

        // apply friction
        this.velocity.mult(this.friction);

        // location += velocity (actually moves the particle)
        this.location.add(this.velocity);
    }

    bounce() {
        // bounce horizontally
        if (this.location.x > width - this.size / 2) {
            this.location.x = width - this.size / 2;
            this.velocity.x *= -1;
        } else if (this.location.x < this.size / 2) {
            this.velocity.x *= -1;
            this.location.x = this.size / 2;
        }

        // bounce vertically
        if (this.location.y > height - this.size / 2) {
            this.velocity.y *= -1;
            this.location.y = height - this.size / 2;
        }
    }
}

/*
One-Line Explanations for All New p5 Vectors

1. createVector(x, y)
Creates a vector storing a position, direction, or movement in 2D space.

2. vector.add(otherVector)
Adds another vector to this one (e.g., velocity + acceleration).

3. random(min, max)
Generates a random number between min and max (used to vary movement).

4. max(a, b)
Returns the larger of two values — here used to keep age ≥ 0.
*/
