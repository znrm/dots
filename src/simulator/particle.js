import Vector from './vector';

class Particle {
  constructor({
    pos = new Vector(),
    vel = new Vector(),
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
    return Vector.clone(this.vel).scale(this.mass);
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

  accelerate(amount = new Vector()) {
    this.vel.add(amount);
  }

  move(amount = new Vector()) {
    this.pos.add(amount);
  }

  grow(amount = 0) {
    this.mass += amount;
  }

  delete() {
    this.protected = false;
  }

  isTouching(pos = new Vector(), offset = 0) {
    return this.pos.distSq(pos) < (this.size + offset) ** 2;
  }

  interact() {
    return null;
  }
}

export default Particle;
