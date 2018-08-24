import Particle from './particle';

const RADIAL_CONSTANT = 1e-3;

class Field extends Particle {
  constructor({ pos, vel, acc, mass, charge, fieldType, radius }) {
    super({ pos, vel, acc, mass, charge });
    this.fieldType = fieldType || '';
    this.radius = radius;
  }

  interact(particle) {
    if (this.isInRadius(particle)) {
      this[this.fieldType](particle);
    }
  }

  isInRadius({ pos }) {
    return this.pos.dist(pos) < this.radius;
  }

  radialPush(particle) {
    particle.moveAwayFrom(this.radius - this.pos.dist(particle.pos), this.pos);
  }

  constRadialAcc(particle) {
    particle.receiveFrom(RADIAL_CONSTANT, this.pos);
  }
}

export default Field;
