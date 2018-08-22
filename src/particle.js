import Vector from './vector';

const inverseSquare = (source, target, magnitude) => {
  const distanceSqr = source.pos.distanceSqr(target.pos);

  if (distanceSqr < 0.00001) {
    return new Vector(0, 0);
  }

  return Vector.clone(source.pos)
    .subtract(target.pos)
    .scale((target.mass * magnitude) / distanceSqr);
};

class Particle {
  constructor(pos, vel, acc, id, mass) {
    this.id = id;
    this.pos = pos || new Vector();
    this.vel = vel || new Vector();
    this.acc = acc || new Vector();
    this.mass = mass || 1;
    this.keep = true;
  }

  interact(particle) {
    this.acc.add(this.field(particle));
  }

  accelerate(amount) {
    this.acc.add(amount);
  }

  momentum() {
    return Vector.clone(this.vel).scale(this.mass);
  }

  field(target) {
    return inverseSquare(this, target, -0.00000001);
  }

  update() {
    if (this.keep) {
      this.vel.add(this.acc);
    }
    this.pos.add(this.vel);
    this.acc = new Vector(0, 0);
  }

  static randomStart(nParticles) {
    const particles = [];
    for (let i = 0; i < nParticles; i += 1) {
      const pos = Vector.random();
      const vel = Vector.random();

      vel.scale(
        new Vector(
          Math.random() > 0.5 ? -0.0001 : 0.0001,
          Math.random() > 0.5 ? -0.0001 : 0.0001,
        ),
      );

      const particle = new Particle(pos, vel, new Vector(0, 0), i);
      particles.push(particle);
    }
    return particles;
  }
}

export default Particle;
