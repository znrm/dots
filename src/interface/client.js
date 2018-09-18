import Vector from '../simulator/vector';
import Particle from '../simulator/particle';
import Field from '../simulator/field';


class Client {
  constructor(state) {
    this.state = state;

    this.mouse = new Vector(0, 0);
    this.mouseHistory = Array.from({ length: 5 }, () => new Vector(0, 0));
    this.displayWidth = window.innerWidth;
    this.displayHeight = window.innerHeight;

    this.wall = true;
    this.pressing = false;
    this.selectedAction = 0;

    this.actions = {
      0: 'noEffect',
      1: 'mouseField',
      2: 'newGravityField',
      3: 'newParticle',
    };

    this.addEvents();
    this.createMouseField();
  }

  get pointer() {
    return Vector.direction(this.mouse, this.mouseHistory[0]);
  }

  resetMouse() {
    this.pressed = false;
  }

  newGravityField() {
    const { fields } = this.state;
    fields.push(
      new Field({
        fieldType: 'funCombinationField',
        mass: 1 + 20 * Math.random(),
        pos: Vector.clone(this.mouse),
        vel: this.pointer.scale(0.002),
        radius: 100,
      })
    );
  }

  newParticle() {
    const { fields } = this.state;

    fields.push(
      new Field({
        fieldType: 'funCombinationField',
        vel: Vector.randomDir(0.000005),
        pos: Vector.randomDir(0.02 * Math.random()).add(this.mouse),
        radius: 100
      })
    );
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

  handleActions() {
    const { particles, fields } = this.state;
    const nParticles = particles.length;
    const nFields = fields.length;
    if (this.pressing && this.selectedAction === 3) {
      for (let i = 0; i < 5; i += 1) this.newParticle();
    }

    for (let i = 0; i < nParticles; i += 1) {
      if (this.pressing) this.mouseField.interact(particles[i]);
      if (this.wall) this.walls(particles[i]);
    }
    for (let i = 0; i < nFields; i += 1) {
      if (this.pressing) this.mouseField.interact(fields[i]);
      if (this.wall) this.walls(fields[i]);
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
    const ui = document.getElementById('ui');
    const canvas = document.querySelector('canvas');

    ui.onclick = this.integrateUI();
    ui.ontouchstart = this.integrateUI();

    canvas.onmousedown = this.mouseDown();
    canvas.ontouchstart = this.mouseDown();

    document.onmousemove = this.mouseMove();
    document.ontouchmove = this.mouseMove();

    document.onmouseup = this.mouseUp();
    document.ontouchend = this.mouseUp();

    const toggleWalls = () => {
      this.wall = !this.wall;
      return this.wall;
    };

    document
      .getElementById('walls')
      .addEventListener('click', function wallButton() {
        if (toggleWalls()) {
          this.classList.remove('strike');
        } else {
          this.classList.add('strike');
        }
      });
  }

  mouseDown() {
    return e => {
      this.mouse.moveTo(
        e.clientX / this.displayWidth,
        e.clientY / this.displayHeight
      );
      this.pressing = true;

      if (this.selectedAction > 1) {
        this[this.actions[this.selectedAction]]();
      }
    };
  }

  mouseMove() {
    return e => {
      this.recordMouse(this.mouse);
      this.mouse.moveTo(
        e.clientX / this.displayWidth,
        e.clientY / this.displayHeight
      );
    };
  }

  mouseUp() {
    return () => {
      this.pressing = false;
    };
  }

  integrateUI() {
    return e => {
      switch (e.target.id) {
        case 'push':
          this.mouseField.fieldType = 'radialPush';
          this.selectedAction = 1;
          break;
        case 'paint':
          this.mouseField.fieldType = 'noEffect';
          this.selectedAction = 3;
          break;
        case 'make one':
          this.mouseField.fieldType = 'noEffect';
          this.selectedAction = 2;
          break;
        case 'reset':
          this.state.reset();
          break;
        default:
          break;
      }
    };
  }
}

export default Client;
