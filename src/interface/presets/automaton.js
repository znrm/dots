import Particle from '../../simulator/particle';
import { moveAway } from '../../simulator/interactions';

class Automaton extends Particle {
  inReach(pos, size) {
    return this.pos.sqDist(pos) < (2 * this.size + size) ** 2;
  }

  interact(particle) {
    if (this.inReach(particle.pos, particle.size)) {
      moveAway(this, particle, 1.1);
    }
  }
}

export default Automaton;
