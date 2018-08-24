import Vector from './vector';
import Particle from './particle';
import Field from './field';

class Client {
  constructor(particles, fields) {
    this.mouse = new Vector(0, 0);
    this.mouseDir = new Vector(0, 0);
    this.arrow = new Vector(0, 0);
    this.pressing = false;
    this.previousMouse = [];

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
      fieldType: 'radialPush',
      radius: 0.05,
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
      this.previousMouse.push(this.mouse);
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
      this.arrow = Vector.clone(this.mouse).add(
        Vector.clone(this.mouse)
          .subtract(this.previousMouse[this.previousMouse.length - 1])
          .normalize()
          .scale(0.05),
      );
    };

    document.onmouseup = () => {
      this.pressing = false;
    };
  }
}

export default Client;
