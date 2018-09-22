import Particle from '../../simulator/particle';
import { moveAway, pushAway } from '../../simulator/interactions';

class Gas extends Particle {
  interact(particle) {
    if (this.isTouching(particle.pos, 0.7 * particle.size)) {
      moveAway(this, particle, 1);
    } else {
      pushAway(this, particle);
    }
  }
}

export default Gas;
