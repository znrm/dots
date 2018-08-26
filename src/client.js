import Vector from './vector';
import Particle from './particle';
import Field from './field';

class Client {
  constructor(state) {
    this.state = state;

    this.mouse = new Vector(0, 0);
    this.mouseHistory = Array.from({ length: 3 }, () => new Vector(0, 0));
    this.displayWidth = window.innerWidth;
    this.displayHeight = window.innerHeight;

    this.wall = true;
    this.pressing = false;
    this.selectedAction = 2;

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
        vel: this.pointer.subtract(this.mouse).scale(0.04),
        radius: 100,
      }),
    );
  }

  makeDots() {
    const { particles } = this.state;
    for (let i = 0; i < 100; i += 1) {
      particles.push(
        new Particle({
          vel: Vector.randomDir(0.00005),
          pos: Vector.randomDir(0.01).add(this.mouse),
        }),
      );
    }
  }

  walls(particle) {
    if (this.walls) {
      if (particle.pos.x > 1 || particle.pos.x < 0) {
        particle.vel.subtract(new Vector(particle.vel.x, 0).scale(2));
      }

      if (particle.pos.y > 1 || particle.pos.y < 0) {
        particle.vel.subtract(new Vector(0, particle.vel.y).scale(2));
      }
    }
  }

  handleActions(nParticles, nFields) {
    const { particles, fields } = this.state;

    for (let i = 0; i < nParticles; i += 1) {
      if (this.pressing) this.mouseField.interact(particles[i]);
      this.walls(particles[i]);
    }
    for (let i = 0; i < nFields; i += 1) {
      if (this.pressing) this.mouseField.interact(fields[i]);
      this.walls(fields[i]);
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
        e.clientX / this.displayWidth,
        e.clientY / this.displayHeight,
      );
      this.pressing = true;

      if (this.selectedAction !== 1) {
        this[this.actions[this.selectedAction]]();
      }
    };

    document.onmousemove = e => {
      this.recordMouse(this.mouse);
      this.mouse.moveTo(
        e.clientX / this.displayWidth,
        e.clientY / this.displayHeight,
      );
    };

    document.onmouseup = () => {
      this.pressing = false;
    };

    const { wall } = this;

    document
      .getElementById('wall')
      .addEventListener('click', function wallButton() {
        if (wall) {
          this.classList.add('strike');
        } else {
          this.classList.remove('strike');
        }
      });
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
