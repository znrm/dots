import Vector from './vector';
import Particle from './particle';
import Field from './field';

class Client {
  constructor(particles, fields) {
    this.mouse = new Vector(0, 0);
    this.mouseHistory = Array.from({ length: 2 }, () => new Vector(0, 0));

    this.pressing = false;
    this.previousMouse = [];

    this.particles = particles;
    this.fields = fields;

    this.addEvents();
    this.createMouseField();
  }

  get pointer() {
    return Vector.clone(this.mouse)
      .scale(2)
      .subtract(this.mouseHistory[0]);
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

  recordMouse(prevMouse) {
    this.mouseHistory.shift();
    this.mouseHistory.push(Vector.clone(prevMouse));
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
      this.recordMouse(this.mouse);
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
      this.display.mouse(this.mouse);
    };

    document.onmouseup = () => {
      this.pressing = false;
    };
  }
}

export default Client;
