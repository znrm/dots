import Particle from './particle';

const RADIAL_CONSTANT = 1e-3;
const GRAVITATIONAL_CONSTANT = -1e-8;

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
    const distance = this.pos.dist(pos);

    return distance && distance < this.radius;
  }

  noEffect() {
    return this.fieldType;
  }

  grab(particle) {
    if (this.pos.dist(particle.pos) < 0.03) {
      const { x, y } = this.pos;
      particle.pos.moveTo(x, y);
    }
  }

  radialPush(particle) {
    particle.moveAwayFrom(this.radius - this.pos.dist(particle.pos), this.pos);
  }

  constRadialAcc(particle) {
    particle.receiveFrom(RADIAL_CONSTANT, this.pos);
  }

  invSquare(particle) {
    const sqDistance = this.pos.sqDist(particle.pos);
    if (sqDistance > 0.00005) {
      particle.receiveFrom(GRAVITATIONAL_CONSTANT / sqDistance, this.pos);
    } else {
      particle.receiveFrom(GRAVITATIONAL_CONSTANT / this.pos.dist(particle.pos), this.pos);
    }
  }
}

export default Field;
