import Particle from '../../simulator/particle';
import { pushAway } from '../../simulator/interactions';

class Gas extends Particle {
  size() {
    return 0.001;
  }

  interact(particle) {
    pushAway(this, particle, 0.00025);
  }
}

export default Gas;
