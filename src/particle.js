import Vector from './vector';

const inverseSquare = (sourcePos, targetPos, magnitude) => {
  const distanceSqr = sourcePos.distanceSqr(targetPos);

  if (distanceSqr < 0.00001) {
    return new Vector(0, 0);
  }

  return Vector.clone(sourcePos)
    .subtract(targetPos)
    .scale(magnitude / distanceSqr);
};

class Particle {
  constructor(pos, vel, acc, id) {
    this.id = id;
    this.pos = pos || new Vector(0, 0);
    this.vel = vel || new Vector(0, 0);
    this.acc = acc || new Vector(0, 0);
  }

  interact(particle) {
    this.acc.add(particle.field(this));
  }

  accelerate(amount) {
    this.acc.add(amount);
  }

  field(target) {
    return inverseSquare(this.pos, target.pos, 0.00000001);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc = new Vector(0, 0);
  }

  static randomStart() {
    const particles = [];
    for (let i = 0; i < 500; i += 1) {
      const pos = Vector.random().scale(0.5).add(new Vector(0.25, 0.25));
      const vel = Vector.random();

      vel.scale(
        new Vector(
          Math.random() > 0.5 ? -0.001 : 0.001,
          Math.random() > 0.5 ? -0.001 : 0.001,
        ),
      );

      const particle = new Particle(pos, vel, new Vector(0, 0), i);
      particles.push(particle);
    }
    return particles;
  }
}

export default Particle;
