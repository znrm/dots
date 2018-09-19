import Vector from './vector';

class Particle {
  constructor({
    pos = new Vector(0, 0),
    vel = new Vector(0, 0),
    mass = 0,
    charge = 0,
    radius = 0,
  }) {
    this.pos = pos;
    this.vel = vel;
    this.mass = mass;
    this.charge = charge;
    this.radius = radius;

    this.protected = true;
  }

  get momentum() {
    return new Vector(0, 0).add(this.vel).scale(this.mass);
  }

  get size() {
    return this.radius;
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

  grow(amount) {
    this.mass += amount;
  }

  delete() {
    this.protected = false;
  }

  isTouching(pos, offset) {
    const distance = this.pos.dist(pos);
    return distance < this.size + offset;
  }

  isContained(pos, offset) {
    const distance = this.pos.dist(pos);
    return distance < this.size - offset;
  }

  receiveFrom(amount, location) {
    this.vel.add(Vector.direction(this.pos, location).scale(amount));
  }

  moveAwayFrom(distance, location) {
    this.pos.add(Vector.direction(this.pos, location).scale(distance));
  }

  radialAccelerate(particle, amount) {
    particle.accelerate(
      new Vector(0, 0)
        .add(particle.pos)
        .subtract(this.pos)
        .scale(amount)
    );
  }
}

export default Particle;
