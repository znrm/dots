import Vector from './vector';
import Particle from './particle';
import Field from './field';

class Client {
  constructor(state) {
    this.mouse = new Vector(0, 0);
    this.mouseHistory = Array.from({ length: 2 }, () => new Vector(0, 0));

    this.wall = true;
    this.pressing = false;
    this.previousMouse = [];

    this.state = state;

    this.selectedAction = 2;
    this.actions = {
      1: 'mouseField',
      2: 'newGravityField',
      3: 'shootDots',
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
    const { particles } = this.state;
    particles.push(Particle.random(this.mouse));
  }

  newGravityField() {
    const { fields } = this.state;
    fields.push(
      new Field({
        fieldType: 'funCombinationField',
        mass: 1 + 10 * Math.random(),
        pos: Vector.clone(this.mouse),
        vel: this.pointer.subtract(this.mouse).scale(0.08),
        radius: 100,
      }),
    );
  }

  shootDots() {
    const { particles } = this.state;
    for (let i = 0; i < 100; i += 1) {
      particles.push(
        new Particle({
          vel: Vector.randomDir(0.00005),
          pos: Vector.clone(this.mouse),
        }),
      );
    }
  }

  recordMouse(prevMouse) {
    this.mouseHistory.shift();
    this.mouseHistory.push(Vector.clone(prevMouse));
  }

  createMouseField() {
    this.mouseField = new Field({
      pos: this.mouse,
      fieldType: 'noEffect',
      radius: 0.01,
    });
  }

  addEvents() {
    document.querySelector('canvas').onmousedown = e => {
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
          this.selectedAction = 3;
          break;
        case 'grab':
          this.mouseField.fieldType = 'grab';
          this.selectedAction = 1;
          break;
        case 'shoot':
          this.mouseField.fieldType = 'noEffect';
          this.selectedAction = 2;
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
