import Particle from '../../simulator/particle';
import {
  absorb,
  inelasticCollide,
  fakeGravity
} from '../../simulator/interactions';

class Star extends Particle {
  visualSize(scale) {
    return Math.sqrt(this.mass) * scale;
  }

  size() {
    return Math.sqrt(this.mass);
  }

  interact(particle) {
    const { pos } = particle;
    const size = particle.size();

    if (this.isTouching(pos, 0.1 * size) && this.protected) {
      inelasticCollide(this, particle);
      absorb(this, particle);
    } else {
      fakeGravity(this, particle);
    }
  }
}

export default Star;
