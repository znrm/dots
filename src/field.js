import Particle from './particle';

const RADIAL_CONSTANT = 1e-3;

class Field extends Particle {
  constructor({ pos, vel, acc, mass, charge, fieldType, radius }) {
    super({ pos, vel, acc, mass, charge });
    this.fieldType = fieldType || '';
    this.radius = radius;
  }

  interact(particle) {
    this[this.fieldType](particle);
  }

  constRadialAcc(particle) {
    if (this.pos.dist(particle.pos) < this.radius) {
      particle.receiveFrom(RADIAL_CONSTANT, this.pos);
    }
  }
}

export default Field;
