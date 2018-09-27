# Dots

An entertaining, surprisingly sophisticated particle playground.
[Try it live!](https://znrm.github.io/dots/)

Dots is written in **Vanilla JavaScript (ES6)**. It additionally utilizes the HTML5 Canvas API and is bundled with Webpack

![Image showing a variety of particle types](docs/dots-samples.gif?raw=true)

## Features & Code Overview

### Interface

### Simulator

The simulator consists of three classes (Vector, Particle, and State) that handle varying levels of the system complexity.

`Vector`: simple and highly optimized, it represents a 2D vector and includes all of the necessary vector operations underlying 2D particle motion. Commonly used methods include adding, scaling, normalizing, and finding distances. Most vector operations are extremely simple, and adhere to patterns that are JIT optimization-friendly.

Vector operations can be chained

```js
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(that) {
    this.x += that.x;
    this.y += that.y;
    return this;
  }
```

`Particle`

`State`

### Particles Class is Highly Extensible

```js
class Gas extends Particle {
  get size() {
    return 0.001;
  }

  interact(particle) {
    pushAway(this, particle, 0.0001);
  }
}
```

### User Interface

## Performance

On modest hardware, users can observe interactions between
Dots attempts to balance efficiency with ease-of-use and flexibility and at times avoids optimizations that

### Optimizations

#### Reducing Uniquely Expensive Computations

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

### Existing Bottlenecks

#### n-Body Interactions

```js
for (let i = 0; i < nParticles; i += 1) {
  for (let j = 0; j < nParticles; j += 1) {
    if (i !== j) this.particles[i].interact(this.particles[j]);
  }
}
```

### Potential Solutions

## Future Directions
