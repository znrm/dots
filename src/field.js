import Particle from './particle';

class Field extends Particle {
  constructor(fieldType, ...particleProps) {
    super(...particleProps);
    this.fieldType = fieldType;
  }

  interact(particle) {
    this[this.fieldType](particle);
  }
}

export default Field;
