import Vector from './vector';

class Particle {
  constructor(pos, vel, acc, mass) {
    this.pos = pos || new Vector(0, 0);
    this.vel = vel || new Vector(0, 0);
    this.acc = acc || new Vector(0, 0);
    this.mass = mass || 1;
  }

  update() {
    this.pos.add(this.vel.add(this.acc));
    this.acc.moveTo(0, 0);
    return this.pos;
  }

  momentum() {
    return Vector.clone(this.vel).scale(this.mass);
  }

  applyForce(amount) {
    this.acc.add(amount / this.mass);
  }

  static random(initial) {
    const pos = initial || Vector.random();
    const vel = Vector.random();

    vel.scale(
      new Vector(
        Math.random() > 0.5 ? -0.0005 : 0.0005,
        Math.random() > 0.5 ? -0.0005 : 0.0005,
      ),
    );

    return new Particle(pos, vel, new Vector(0, 0));
  }

  static randomStart(nParticles) {
    const particles = [];
    for (let i = 0; i < nParticles; i += 1) {
      particles.push(Particle.random());
    }
    return particles;
  }
}

export default Particle;
