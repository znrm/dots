# Dots

An entertaining, surprisingly sophisticated particle playground.
[Try it live!](https://znrm.github.io/dots/)

Dots is written in **Vanilla JavaScript (ES6)**. It additionally utilizes the HTML5 Canvas API and is bundled with Webpack

![Image showing a variety of particle types](docs/dots-samples.gif?raw=true)


## Features & Code Overview

### Simulator

The simulator is written to work well with the existing interface, but

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

### Particle Motion is Highly Extensible

```js
update() {
  this.pos.add(this.vel.add(this.acc));
  this.acc.moveTo(0, 0);
  return this.pos;
}
```

### n-Body Interactions

```js
for (let i = 0; i < nFields; i += 1) {
  for (let j = 0; j < nFields; j += 1) {
    fields[j].interact(fields[i]);
  }
}
```

### User Interface

## Performance

### Optimizations

#### Reducing Uniquely Expensive Computations

```js
dist(that) {
  return Math.hypot(this.x - that.x, this.y - that.y);
}

sqDist(that) {
  const dX = this.x - that.x;
  const dY = this.y - that.y;
  return dX * dX + dY * dY;
}
```

### Existing Bottlenecks

### Potential Solutions

## Future Directions

### Improving User Interface

### Collisions
