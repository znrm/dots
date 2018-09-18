import Vector from '../simulator/vector';
import { HardSphere, Attractor } from '../simulator/field';

const PAINT_RATE = 10;
const PAINT_SPREAD = 0.02;

class Client {
  constructor(state) {
    this.state = state;

    this.mouse = new Vector(0, 0);
    this.mouseHistory = Array.from({ length: 5 }, () => new Vector(0, 0));

    this.wall = true;
    this.pressing = false;
    this.selectedAction = 'none';

    this.addEvents();
    this.createMouseField();
  }

  get pointer() {
    return Vector.direction(this.mouse, this.mouseHistory[0]);
  }

  resetMouse() {
    this.pressed = false;
  }

  newLargeAttractor() {
    const { particles } = this.state;

    particles.push(
      new Attractor({
        mass: 1 + 20 * Math.random(),
        pos: Vector.clone(this.mouse),
        vel: this.pointer.scale(0.002),
      })
    );
  }

  newAttractor() {
    const { particles } = this.state;

    particles.push(
      new Attractor({
        mass: 0.05,
        vel: Vector.randomDir(0.00005),
        pos: Vector.randomDir(PAINT_SPREAD * Math.random()).add(this.mouse),
      })
    );
  }

  newHardSphere() {
    const { particles } = this.state;

    particles.push(
      new Attractor({
        mass: 0.05,
        vel: Vector.randomDir(0.00005),
        pos: Vector.randomDir(0.01 * Math.random()).add(this.mouse),
        radius: 100,
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
    const { particles } = this.state;
    const nParticles = particles.length;
    if (this.pressing) this.continuousAction();

    for (let i = 0; i < nParticles; i += 1) {
      if (this.wall) this.walls(particles[i]);
    }
  }

  clickAction() {
    if (this.selectedAction === 'make one') {
      this.newLargeAttractor();
    }
  }

  continuousAction() {
    const { particles } = this.state;
    const nParticles = particles.length;

    switch (this.selectedAction) {
      case 'push':
        for (let i = 0; i < nParticles; i += 1) {
          this.mouseField.interact(particles[i]);
        }
        break;
      case 'paint':
        for (let i = 0; i <= PAINT_RATE; i += 1) this.newAttractor();
        break;
      default:
        break;
    }
  }

  createMouseField() {
    this.mouseField = new HardSphere({
      pos: this.mouse,
      radius: 0.01,
    });
  }

  toggleWalls() {
    this.wall = !this.wall;
    return this.wall;
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
  }

  mouseDown() {
    return e => {
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight
      );
      this.pressing = true;

      this.clickAction();
    };
  }

  mouseMove() {
    return e => {
      e.preventDefault();
      this.mouseHistory.shift();
      this.mouseHistory.push(Vector.clone(this.mouse));
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight
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
          this.selectedAction = 'push';
          break;
        case 'paint':
          this.selectedAction = 'paint';
          break;
        case 'make one':
          this.selectedAction = 'make one';
          break;
        case 'reset':
          this.state.reset();
          break;
        case 'walls': {
          if (this.toggleWalls()) {
            e.target.classList.remove('strike');
          } else {
            e.target.classList.add('strike');
          }
          break;
        }
        default:
          break;
      }
    };
  }
}

export default Client;
