let pattern = []; // an array that will store 100 Pattern Objects

function setup() {
    createCanvas(900, 600);
    background(0);

    // create 100 pattern objects and store them in a pattern[] array
    for (var i = 0; i < 100; i++) {
        pattern.push(new Pattern());
    }
}

function draw() {
    // loop through all Pattern objects and run each one every frame
    for (var i = 0; i < pattern.length; i++) {
        pattern[i].run();
    }

    // don't use background() here as it resets in every frame!
}

class Pattern {
    constructor() {
        // each pattern starts near the center, but offset randomly
        var randomX = width / 2 + random(-100, 100);
        var randomY = height / 2 + random(-100, 100);

        // store current and previous positions as vectors
        this.prevLocation = new createVector(randomX, randomY);
        this.location = new createVector(randomX, randomY);

        // movement related vectors
        this.velocity = new createVector(0, 0);
        this.acceleration = new createVector(0, 0);

        // cap on movement speed
        this.maxVelocity = 7;
    }

    run() {
        // organise behaviour: first draw, then update movement
        this.draw();
        this.move();
    }

    draw() {
        // randomised colour & transparency
        stroke(random(255), 188, random(255), 80);
        strokeWeight(0.5);
        
        // line(0, 0, this.location, this.prevLocation); <-- fails as ONLY numeric values are expected!
        
        // draw a line from the previous position to the current position
        line(this.prevLocation.x, this.prevLocation.y, this.location.x, this.location.y);
        
        // after drawing, update prevLocation to where we are now
        this.prevLocation = this.location.copy();
    }

    move() {
        // create a vector pointing to the mouse position
        var mouse = createVector(mouseX, mouseY);

        // direction vector = mouse - previous position
        var dir = p5.Vector.sub(mouse, this.prevLocation);

        // make direction length = 1 (unit vector)
        dir.normalize();

        // control how strongly the patterns follow the mouse
        dir.mult(0.3);

        // set the acceleration towards the mouse
        this.acceleration = dir;

        // add acceleration to velocity (classic physics)
        this.velocity.add(this.acceleration);

        // limit speed so it doesn't explode
        this.velocity.limit(this.maxVelocity);

        // move by velocity
        this.location.add(this.velocity);

    }

}

/*
⭐ One-Liner Explanations of Each Vector Operation

1. createVector(x, y)
Creates a 2D vector storing a position, direction, or velocity.

2. p5.Vector.sub(v1, v2)
Returns a new vector = v1 minus v2, often used to compute the direction from one point to another.

3. vec.normalize()
Makes the vector length = 1, keeping direction but removing magnitude.

4. vec.mult(n)
Multiplies the vector’s length by n (scales it up or down).

5. vec.add(otherVec)
Adds another vector to this one, used for adding velocity or acceleration.

6. vec.limit(max)
Caps the vector’s length so it never exceeds max (useful for speed limits).

7. vec.copy()
Creates a duplicate of the vector so modifying one does not affect the original.
*/
