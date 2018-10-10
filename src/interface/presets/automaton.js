import Particle from '../../simulator/particle';
import { moveAway } from '../../simulator/interactions';

class Automaton extends Particle {
  interact(particle) {
    if (this.isTouching(particle.pos, 1 * this.size() + particle.size())) {
      moveAway(this, particle, 1.1);
    }
  }
}

export default Automaton;
