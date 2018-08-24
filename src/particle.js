import Vector from './vector';

class Particle {
  constructor({ pos, vel, acc, mass, charge }) {
    this.pos = pos || new Vector(0, 0);
    this.vel = vel || new Vector(0, 0);
    this.acc = acc || new Vector(0, 0);
    this.mass = mass || 1;
    this.charge = charge || 0;
  }

  update() {
    this.pos.add(this.vel.add(this.acc));
    this.acc.moveTo(0, 0);
    return this.pos;
  }

  momentum() {
    return Vector.clone(this.vel).scale(this.mass);
  }

  receiveFrom(amount, location) {
    this.acc.add(Vector.direction(this.pos, location).normalize().scale(amount));
  }

  moveAwayFrom(distance, location) {
    this.pos.add(Vector.direction(this.pos, location).normalize().scale(distance));
  }

  static random(initial) {
    const pos = initial || Vector.random();
    const vel = Vector.randomDir(0.0001);

    return new Particle({ pos, vel });
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
