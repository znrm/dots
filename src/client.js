import Vector from './vector';
import Particle from './particle';
import Field from './field';

class Client {
  constructor(particles, fields) {
    this.mouse = new Vector(0, 0);
    this.pressing = false;

    this.particles = particles;
    this.fields = fields;

    this.addEvents();
    this.createMouseField();
  }

  newParticle() {
    this.particles.push(Particle.random(this.mouse));
  }

  newGravityField() {
    this.fields.push(
      new Field({
        fieldType: 'gravity',
        mass: 1 + 10 * Math.random(),
        pos: this.mouse,
      }),
    );
  }

  createMouseField() {
    this.mouseField = new Field({
      pos: this.mouse,
      fieldType: 'constRadialAcc',
      radius: 0.02,
    });
  }

  addEvents() {
    document.onmousedown = e => {
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
      this.pressing = true;
    };

    document.onmousemove = e => {
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
    };

    document.onmouseup = () => {
      this.pressing = false;
    };
  }
}

export default Client;
