import Vector from './vector';
import Particle from './particle';
import Gravity from './field';

class Client {
  constructor(particles, fields) {
    this.pressing = false;
    this.mouse = new Vector(0, 0);
    this.particles = particles;
    this.fields = fields;
    this.addEvents();
  }

  newParticle() {
    this.particles.push(Particle.random(this.mouse));
  }

  newGravityField() {
    this.fields.push(new Gravity('', this.mouse));
  }

  addEvents() {
    document.onmousedown = e => {
      this.mouse = new Vector(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
      this.pressing = true;
      this.newGravityField();
    };

    document.onmousemove = e => {
      this.mouse = new Vector(e.clientX, e.clientY);
    };

    document.onmouseup = () => {
      this.pressing = false;
    };
  }
}

export default Client;
