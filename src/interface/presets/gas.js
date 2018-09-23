import Particle from '../../simulator/particle';
import { pushAway } from '../../simulator/interactions';

class Gas extends Particle {
  get size() {
    return 0.001;
  }

  interact(particle) {
    pushAway(this, particle, 0.0001);
  }
}

export default Gas;
