# Graphics-Programming

This repository contains the coding assignments for the module **Graphics Programming**. This module mostly uses p5.js library, a visual JavaScript library for creative coding.

## 1. Mouse Patterns

This project uses p5.js to generate 100 autonomous line-drawing agents that move toward the mouse cursor. Each agent draws semi-transparent colored lines, creating an evolving generative art pattern on the canvas.

### How It Works

#### 1. Pattern Objects
Each agent is an instance of the Pattern class, which contains:

- **location** (current position)

- **prevLocation** (previous position for drawing lines)

- **velocity** (movement per frame)

- **acceleration** (directional force toward the mouse)

These values are stored using p5.Vector, making position and movement calculations simple.

#### 2. Movement
Each object:

1. Calculates a direction vector toward the mouse

2. Normalizes that vector

3. Scales it to a small force (acceleration)

4. Adds acceleration to velocity

5. Limits velocity to avoid too-fast movement

6. Updates its position

This creates smooth, natural movement similar to steering behaviors.

#### 3. Drawing
Each agent draws a line from its previous location to its current one using randomized colors and low opacity, forming layered trails over time.

#### 4. Multiple Agents
A loop generates 100 Pattern instances and stores them in an array.

In the `draw()` loop, each one updates and draws independently, producing complex, organic visuals.

### Screenshot
![ezgif-6d9cef8ce1de0384](https://github.com/user-attachments/assets/5964e5c2-cdb1-43f4-a10d-22a183ca4c78)

## 2. Particles

This project is an interactive particle system built with p5.js. 
Particles spawn wherever the user drags the mouse, move with random velocities, bounce off canvas edges, fade out over time, and can be cleared with a button press.

### How It Works

#### 1. Particle Creation

Particles are added to an array whenever the mouse is dragged:
<pre> particle.push(new Particle(mouseX, mouseY)); </pre>

#### 2. Particle Motion

Each particle updates itself every frame using:
- `velocity.add(acceleration)`

- `velocity.mult(friction)`

- `location.add(velocity)`

#### 3. Fading

Every frame:
<pre>this.age -= 1;</pre>
The age value becomes the alpha (transparency) in the particle’s color.

#### 4. Reset Button
A p5.js button calls:
<pre>function buttonPressed() {
    particle = [];
}</pre>

## Screenshot
![Particles](https://github.com/user-attachments/assets/6d2da000-f4ad-43a3-a264-f8aeb7405e7a)
