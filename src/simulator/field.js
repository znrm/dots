import Particle from './particle';
import Vector from './vector';

const FUN_CONSTANT = -3e-9;

class Field extends Particle {
  constructor({ pos, vel, acc, mass, charge, fieldType, radius }) {
    super({ pos, vel, acc, mass, charge });
    this.fieldType = fieldType || '';
    this.radius = radius;
  }

  interact(particle) {
    if (this !== particle) {
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
        .scale(amount)
    );
  }

  noEffect() {
    return this.fieldType;
  }

  radialPush(particle) {
    if (this.isInRadius(particle.pos)) {
      particle.move(
        Vector.direction(particle.pos, this.pos).scale(
          this.radius - this.pos.sqDist(particle.pos)
        )
      );
    }
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

  funCombinationField(particle) {
    const sqDistance = this.pos.sqDist(particle.pos);
    if (sqDistance > 5e-7 * this.mass) {
      this.radialAccelerate(particle, (this.mass * FUN_CONSTANT) / sqDistance);
    } else if (this.protected && particle.protected) {
      this.inelasticCollide(particle);
      this.absorb(particle);
    }
  }
}

export default Field;
