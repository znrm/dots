import Particle from './particle';

const RADIAL_CONSTANT = 1e-3;
const FUN_CONSTANT = -15e-9;

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
    const distance = this.pos.sqDist(pos);

    return distance && distance < this.radius;
  }

  noEffect() {
    return this.fieldType;
  }

  grab(particle) {
    if (this.pos.sqDist(particle.pos) < 0.03) {
      const { x, y } = this.pos;
      particle.pos.moveTo(x, y);
    }
  }

  radialPush(particle) {
    particle.moveAwayFrom(
      this.radius - this.pos.sqDist(particle.pos),
      this.pos,
    );
  }

  constRadialAcc(particle) {
    particle.receiveFrom(RADIAL_CONSTANT, this.pos);
  }

  funCombinationField(particle) {
    const sqDistance = this.pos.sqDist(particle.pos);
    if (sqDistance > 5e-3) {
      particle.receiveFrom((this.mass * FUN_CONSTANT) / sqDistance, this.pos);
    } else if (sqDistance > 5e-7 * this.mass) {
      particle.receiveFrom((this.mass * FUN_CONSTANT) / 5e-3, this.pos);
    } else if (this.protected && particle.protected) {
      this.mass += particle.mass;
      this.vel = particle.momentum.add(this.momentum).scale(1 / (this.mass + particle.mass));
      particle.delete();
    }
  }
}

export default Field;
