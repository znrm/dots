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
    return Math.sqrt(this.mass);
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

  inRadius(pos, radius) {
    const distance = this.pos.dist(pos);
    return distance < this.radius + radius;
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
