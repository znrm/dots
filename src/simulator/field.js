import Particle from './particle';
import Vector from './vector';

const FUN_CONSTANT = -3e-9;

export class Attractor extends Particle {
  interact(particle) {
    const sqDistance = this.pos.sqDist(particle.pos);
    if (sqDistance > 5e-7 * this.mass) {
      this.radialAccelerate(particle, (this.mass * FUN_CONSTANT) / sqDistance);
    } else if (this.protected && particle.protected) {
      this.inelasticCollide(particle);
      this.absorb(particle);
    }
  }
}

export class HardSphere extends Particle {
  interact(particle) {
    if (this.isInRadius(particle.pos)) {
      particle.move(
        Vector.direction(particle.pos, this.pos).scale(
          this.radius - this.pos.sqDist(particle.pos)
        )
      );
    }
  }
}
