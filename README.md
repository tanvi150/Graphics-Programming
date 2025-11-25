# Graphics-Programming

This repository contains the coding assignments for the module **Graphics Programming**. This module mostly uses p5.js library, a visual JavaScript library for creative coding.

## 1. Mouse Patterns

This project uses p5.js to generate 100 autonomous line-drawing agents that move toward the mouse cursor. Each agent draws semi-transparent colored lines, creating an evolving generative art pattern on the canvas.

### How It Works

#### 1. Pattern Objects
Each agent is an instance of the Pattern class, which contains:

location (current position)

prevLocation (previous position for drawing lines)

velocity (movement per frame)

acceleration (directional force toward the mouse)

These values are stored using p5.Vector, making position and movement calculations simple.
