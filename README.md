# Dots

An entertaining, surprisingly sophisticated particle playground.
[Try it live!](https://znrm.github.io/dots/)

Dots is written in **Vanilla JavaScript (ES6)**. It additionally utilizes the HTML5 Canvas API and is bundled with Webpack

![Image showing a variety of particle types](docs/dots-samples.gif?raw=true)

## Features & Code Overview

### Object-Orientation

A defining feature of the Dots codebase is a very strong separation of concerns. This makes the code partiu

Although the highly object-oriented approach introduces challenges such as additional difficulties managing mutable state, a disciplined and appropriate use of JavaScript's prototypal inheritance can avoid such issues entirely

- A simulation based on already abstract representations of physical entities and processes is uniquely suitable for class-like object abstraction.

-
- Retaining objects and simply mutating existing properties can have performance improvements that are nontrivial in applications with animation.
  -Javascript classes are optimizer-friendly

### Interface

The interface

- Lightweight intro and interface facilitated by timing with Promises and event handlers
- Proper rendering rate
-

### Simulator

The simulator consists of three classes (Vector, Particle, and State) that handle varying levels of the system complexity.

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

The state concerns itself with managing a particle pool for which particle and environment interactions are calculated. The smallest single unit of time in the simulation is called with the `update` method, thereby deferring rate-dependent behavior to be solely determined by the result of interactions themselves. This opens up the possibility to define relativistic behavior if desired.

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

Particular attention has been paid to ensuring acceptable performance on modest hardware.

- Reduced memory load and

Nevertheless, Dots attempts to balance efficiency with ease-of-use and flexibility. Most significantly, it maintains the object-oriented abstractions despite the fact that alternatives such as a single array to store particle properties could potentially prove more performant.

### Existing Bottlenecks

#### n-Body Interactions

The most significant bottleneck for Dots is simply one of computational complexity. Simulating arbitrary n-Body interactions where the nature of the interaction is not known in advance has a classic example of an algorithm with O(n<sup>2</sup>) time complexity. If one is only concerned with

```js
for (let i = 0; i < nParticles; i += 1) {
  for (let j = 0; j < nParticles; j += 1) {
    if (i !== j) this.particles[i].interact(this.particles[j]);
  }
}
```

#### Reducing Uniquely Expensive Computations

Application profiling has consistently shown that one of the most computationally expensive Finding the magnitude of a Calculating the square root is a uniquely expensive computation.

- Approximations for
- Suitable approximations for the square root do not perform better than `Math.sqrt` or `Math.hypot`

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

### Future Directions

- Rewriting certain portions in Web Assembly for potential performance improvements.
- An interface for non-interactive simulations to be calculated in advance.
- Flexibility for users to decide how and what particles to make.
