import Vector from './vector';
import Particle from './particle';
import Field from './field';

class Client {
  constructor(particles, fields) {
    this.mouse = new Vector(0, 0);
    this.mouseHistory = Array.from({ length: 2 }, () => new Vector(0, 0));

    this.wall = false;
    this.pressing = false;
    this.previousMouse = [];

    this.particles = particles;
    this.fields = fields;

    this.selectedAction = 1;
    this.actions = {
      1: 'mouseField',
      2: 'newGravityField',
      3: 'makeDots',
    };

    this.addEvents();
    this.integrateUI();
    this.createMouseField();
  }

  get pointer() {
    return Vector.clone(this.mouse)
      .scale(2)
      .subtract(this.mouseHistory[0]);
  }

  get mouseAction() {
    return this[this.actions[this.selectedAction]];
  }

  resetMouse() {
    this.pressed = false;
  }

  newParticle() {
    this.particles.push(Particle.random(this.mouse));
  }

  newGravityField() {
    this.fields.push(
      new Field({
        fieldType: 'gravity',
        mass: 1 + 10 * Math.random(),
        pos: Vector.clone(this.mouse),
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

      if (this.selectedAction !== 1) {
        this.mouseAction();
      }
    };

    document.onmousemove = e => {
      this.recordMouse(this.mouse);
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
    };

    document.onmouseup = () => {
      this.pressing = false;
    };
  }

  integrateUI() {
    document.getElementById('ui').onclick = e => {
      switch (e.target.id) {
        case 'push':
          this.mouseField.fieldType = 'radialPush';
          this.selectedAction = 1;
          break;
        case 'make':
          this.mouseField.fieldType = 'noEffect';
          this.selectedAction = 2;
          break;
        case 'grab':
          this.mouseField.fieldType = 'grab';
          this.selectedAction = 1;
          break;
        case 'wall':
          this.wall = !this.wall;
          break;
        default:
          break;
      }
    };
  }
}

export default Client;
