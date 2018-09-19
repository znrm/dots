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
    this.vel.add(Vector.direction(this.pos, location).scale(amount));
  }

  moveAwayFrom(distance, location) {
    this.pos.add(Vector.direction(this.pos, location).scale(distance));
  }

  absorb(particle) {
    this.mass += particle.mass;
    particle.delete();
  }

  inelasticCollide(particle) {
    this.vel = particle.momentum
      .add(this.momentum)
      .scale(1 / (this.mass + particle.mass));
  }

  radialAccelerate(particle, amount) {
    particle.accelerate(
      new Vector(0, 0)
        .add(particle.pos)
        .subtract(this.pos)
        .scale(amount)
    );
  }

  isInRadius(particle) {
    const distance = this.pos.sqDist(particle.pos);

    return distance && distance < this.radius;
  }

  static random(initial) {
    const pos = initial || Vector.random();
    const vel = Vector.randomDir(0.00005);

    return new Particle({ pos, vel });
  }
}

export default Particle;
