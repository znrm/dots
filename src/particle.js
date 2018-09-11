import Vector from './vector';

class Particle {
  constructor({
    pos = Vector.origin(),
    vel = Vector.origin(),
    mass = 0.05,
    charge = 0,
    action = null,
  }) {
    this.pos = pos;
    this.vel = vel;
    this.mass = mass;
    this.charge = charge;
    this.action = action;

    this.protected = true;
  }

  get momentum() {
    return Vector.clone(this.vel).scale(this.mass);
  }

  update() {
    this.pos.add(this.vel);
  }

  accelerate(amount) {
    this.vel.add(amount);
  }

  move(amount) {
    this.pos.add(amount);
  }

  delete() {
    this.protected = false;
  }

  receiveFrom(amount, location) {
    this.vel.add(
      Vector.direction(this.pos, location)
        .scale(amount),
    );
  }

  moveAwayFrom(distance, location) {
    this.pos.add(
      Vector.direction(this.pos, location)
        .scale(distance),
    );
  }

  interact(particle) {
    this.action(particle);
  }

  static random(initial) {
    const pos = initial || Vector.random();
    const vel = Vector.randomDir(0.00005);

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
