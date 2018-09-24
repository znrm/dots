import Vector from './vector';

class Particle {
  constructor({
    pos = new Vector(0, 0),
    vel = new Vector(0, 0),
    mass = 0,
    charge = 0,
    radius = 0
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

  visualSize(scale) {
    return this.radius * scale;
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
    return this.pos.sqDist(pos) < (this.size + offset) ** 2;
  }
}

export default Particle;
