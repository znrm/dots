# Dots

An entertaining, surprisingly sophisticated particle playground.
[Try it live!](https://znrm.github.io/dots/)

Dots is written in **Vanilla JavaScript (ES6)**. It additionally utilizes the HTML5 Canvas API and is bundled with Webpack

![Image showing a variety of particle types](docs/dots-samples.gif?raw=true)

## Features & Code Overview

A defining feature of the Dots codebase is a very strong separation of concerns. The application consists of an independent simulator and a visual interface built to showcase some of what's possible with it.

This separation is characterized by the application loop that simply involves a rendering step for the display followed by an update of the simulation's state during each frame. Note that in this setup, user input is non-blocking and asynchronous, mediated exclusively by event handlers.

```js
const run = () => {
  requestAnimationFrame(run);

  display.render();
  simulation.update();
};
```

### Object-Orientation

Another feature of Dots is that it relies heavily on Object-Oriented patterns. Although this approach introduces challenges such as additional difficulties managing mutable state, a disciplined and appropriate use of JavaScript's prototypal inheritance can avoid such issues entirely. Compared to other approaches, the OO approach has the following advantages for Dots:

- A simulation based on abstract representations of physical entities and processes is uniquely suitable for class-like object abstraction.
- Retaining objects and simply mutating existing properties can have performance improvements that are nontrivial in applications with animation.
- Self-contained classes are more easily extended by other programmers that may want to add additional functionality.

### Interface

The interface files consist of:

- `ui_builder`: dynamically adds buttons corresponding to actions and particle-types.
- `intro`: a lightweight animated intro with Promise-facilitated, timed instructions and event handlers triggering CSS-defined animations.
- `Display` handles all visual, canvas-related, and window-specific functionality.
- `Client` handles pointer events and user actions.
- Several pre-made particles and other utility functions.

### Simulator

The simulator files consists of three classes (Vector, Particle, and State) that handle varying levels of the system complexity along with some pre-built interactions.

#### `Vector`

Simple and highly optimized, it represents a 2D vector and includes all of the necessary vector operations underlying 2D particle motion. Commonly used methods include adding, scaling, normalizing, and finding distances. Most vector operations are extremely simple, and adhere to patterns that are JIT optimization-friendly.

Vector operations can conveniently be chained:

```js
const unitDirectionalVector = (start, end) =>
  new Vector()
    .add(start)
    .subtract(end)
    .normalize();
```

#### `Particle`

Equally simple, the particle class contains properties and methods common to all particles. Where needed, properties that can be computed from existing properties are defined via getter methods.

```js
get momentum() {
    return Vector.clone(this.vel).scale(this.mass);
  }
```

#### `State`

The state concerns itself with managing a particle pool for which particle and environment interactions are calculated. The smallest single unit of time in the simulation is called with the `update` method, thereby deferring rate-dependent behavior to be solely determined by the result of interactions themselves.
This opens up the possibility to define relativistic behavior if desired.

### Adding Particle Interactions

Each update of the state calls the particle's `interact` method on every other particle. While different particles may have differing interactions, they are treated uniformly by the state and all expected to have this method.

Extending particle behavior is typically simply a matter of overriding the interact method to call any arbitrary function, a few of which are included in `interactions.js`.

By design, interactions are not symmetric:

```js
const absorb = (source = new Particle(), target = new Particle()) => {
  source.grow(target.mass);
  target.delete();
};

class Absorber extends Particle {
  interact(particle) {
    if this.isTouching(particle.pos) {
      absorb(this, particle);
    }
  }
}
```

## Performance

### Optimizations

Particular attention has been paid to ensuring acceptable performance on modest hardware. JavaScript interpreters attempt various JIT optimizations, so apart from typical optimizations that would be expected in any language (such as reduced memory load or need for garbage collection via pooling and recycling objects), the following three coding patterns are employed to uniquely improve JavaScript performance:

- Reliance on efficient operations that maximize JS interpreter's use of methods already implemented in native code.
- Maintaining consistent input and output types for all functions, maximizing interpreter speculative optimization.
- Maximizing interpreter inline caching by using modular functions that do the same thing repeatedly.

Nevertheless, Dots also attempts to balance efficiency with ease-of-use and flexibility. Most significantly, it maintains the object-oriented abstractions despite the fact that alternatives such as a single array to store particle properties could potentially prove more performant.

### Existing Bottlenecks

#### n-Body Interactions

The most significant bottleneck for Dots is simply one of computational complexity. Simulating arbitrary n-Body interactions where the nature of the interaction is not known in advance is a classic example of an algorithm with O(n<sup>2</sup>) time complexity.

```js
for (let i = 0; i < nParticles; i += 1) {
  for (let j = 0; j < nParticles; j += 1) {
    if (i !== j) this.particles[i].interact(this.particles[j]);
  }
}
```

#### Uniquely Expensive Computations

Application profiling has consistently shown that one of the most computationally expensive steps during each frame is calculating the square root, a uniquely expensive computation. Significant performance improvements were achieved simply by appropriately substituting the squared distance whenever possible.

```js
dist(that) {
  return Math.hypot(this.x - that.x, this.y - that.y);
}

distSq(that) {
  const dX = this.x - that.x;
  const dY = this.y - that.y;
  return dX * dX + dY * dY;
}
```

Unfortunately, vector normalization, primarily used for finding directional unit vectors, has no suitable alternative. Using the L<sup>1</sup> distance (taxicab distance) is a visibly poor substitute, and other, more suitable approximation such as Taylor polynomial expansions of the square root do not perform better in JavaScript than `Math.sqrt` or `Math.hypot`.

### Future Directions

Future updates will prioritize the following:

- Improve interface and event handlers for mobile compatibility.
- Rewriting certain portions in Web Assembly for potential performance improvements.
- An interface for non-interactive simulations to be calculated in advance.
- Flexibility for users to decide how and what particles to make.

**Feel free to reach out for any questions, requests, or contributions!**
