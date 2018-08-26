import Particle from './particle';
import Vector from './vector';

const FUN_CONSTANT = -15e-9;

class Field extends Particle {
  constructor({ pos, vel, acc, mass, charge, fieldType, radius }) {
    super({ pos, vel, acc, mass, charge });
    this.fieldType = fieldType || '';
    this.radius = radius;
  }

  interact(particle) {
    if (this.isInRadius(particle.pos)) {
      this[this.fieldType](particle);
    }
  }

  isInRadius(pos) {
    const distance = this.pos.sqDist(pos);

    return distance && distance < this.radius;
  }

  radialAccelerate(particle, amount) {
    particle.accelerate(
      Vector.clone(particle.pos)
        .subtract(this.pos)
        .scale(amount),
    );
  }

  noEffect() {
    return this.fieldType;
  }

  grab(particle) {
    if (this.pos.sqDist(particle.pos) < 0.03) {
      const { x, y } = this.pos;
      const difference = new Vector(x, y).subtract(particle.pos);
      particle.pos.moveTo(x, y).add(difference);
    }
  }

  radialPush(particle) {
    particle.moveAwayFrom(
      this.radius - this.pos.sqDist(particle.pos),
      this.pos,
    );
  }

  funCombinationField(particle) {
    const sqDistance = this.pos.sqDist(particle.pos);
    if (sqDistance > 5e-3) {
      this.radialAccelerate(
        particle,
        this.mass * FUN_CONSTANT / (this.pos.dist(particle.pos) * sqDistance),
      );
    } else if (sqDistance > 5e-7 * this.mass) {
      this.radialAccelerate(
        particle,
        this.mass * FUN_CONSTANT / sqDistance,
      );
    } else if (this.protected && particle.protected) {
      this.mass += particle.mass;
      this.vel = particle.momentum
        .add(this.momentum)
        .scale(1 / (this.mass + particle.mass));
      particle.delete();
    }
  }
}

export default Field;
