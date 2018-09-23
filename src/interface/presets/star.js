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

  get size() {
    return Math.sqrt(this.mass);
  }

  interact(particle) {
    const { pos, size } = particle;

    if (this.isTouching(pos, 0.1 * size) && this.protected) {
      inelasticCollide(this, particle);
      absorb(this, particle);
    } else {
      fakeGravity(this, particle);
    }
  }
}

export default Star;
