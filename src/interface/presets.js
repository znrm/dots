import Particle from '../simulator/particle';
import Vector from '../simulator/vector';

const FUN_CONSTANT = -8e-9;

const absorb = (thisParticle, thatParticle) {
  thisParticle.mass += thatParticle.mass;
  thatParticle.delete();
}

const inelasticCollide = (thisParticle, thatParticle) {

}

inelasticCollide(particle) {
  this.vel = particle.momentum
    .add(this.momentum)
    .scale(1 / (this.mass + particle.mass));
}

class Attractor extends Particle {

  get size() {
    return Math.sqrt(this.mass);
  }

  interact(particle) {
    const sqDistance = this.pos.sqDist(particle.pos);
    if (sqDistance > 5e-7 * this.mass) {
      this.radialAccelerate(particle, (this.mass * FUN_CONSTANT) / sqDistance);
    } else if (this.protected && particle.protected) {
      inelasticCollide(this, particle);
      absorb(this, particle);
    }
  }
}

class HardSphere extends Particle {
  interact(particle) {
    if (this.inRadius(particle.pos)) {
      particle.move(
        Vector.direction(particle.pos, this.pos).scale(
          (this.radius + particle.radius) - this.pos.dist(particle.pos)
        )
      );
    }
  }
}

class Automata extends Particle {
  get size() {
    return this.radius;
  }

  isInRadius(particle, offset) {
    const distance = this.pos.dist(particle.pos);

    return distance < (this.radius + particle.radius);
  }

  interact(particle) {
    if (this.inRadius(particle.pos)) {
      particle.move(
        Vector.direction(particle.pos, this.pos).scale(
          (this.radius + particle.radius) - this.pos.dist(particle.pos)
        )
      );
    }
  }
}
