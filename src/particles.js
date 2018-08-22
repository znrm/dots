import Vector from './vector';

class Particles {
  constructor(dots) {
    this.dots = {
      positions: dots.positions,
      velocities: dots.velocities,
    };
  }

  static randomStart(numDots, width, height) {
    const dots = {
      positions: [],
      velocities: [],
    };

    const displayDim = new Vector(width, height);
    for (let i = 0; i < numDots; i += 1) {
      dots.positions.push(Vector.random().scale(displayDim));
      dots.velocities.push(
        Vector.random().scale(
          new Vector(Math.random() > 0.5 ? -0.1 : 0.1, Math.random() > 0.5 ? -0.1 : 0.1),
        ),
      );
    }
    return new Particles(dots);
  }

  update() {
    const { positions, velocities } = this.dots;
    const numDots = positions.length;
    for (let i = 0; i < numDots; i += 1) {
      positions[i].add(velocities[i]);
    }
  }
}

export default Particles;
