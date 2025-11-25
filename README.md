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
<img width="800" height="490" alt="image" src="https://github.com/user-attachments/assets/205db8fb-ac56-4631-848c-3b8f39ff0ce4" />
