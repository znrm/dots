import Vector from '../simulator/vector';
import { airbrush } from './presets';

class Client {
  constructor(state) {
    this.state = state;

    this.mouse = new Vector(0, 0);
    this.mouseHistory = Array.from({ length: 5 }, () => new Vector(0, 0));

    this.pressing = false;

    this.mode = 'stars';
    this.action = 'airbrush';

    this.airbrush = airbrush;

    this.addEvents();
  }

  get pointer() {
    return Vector.direction(this.mouse, this.mouseHistory[0]);
  }

  resetMouse() {
    this.pressed = false;
  }

  handleActions() {
    if (this.pressing) this.continuousAction();
  }

  clickAction() {
    if (this.selectedAction === 'make one') {
      this.newLargeAttractor();
    }
  }

  continuousAction() {
    const { particles } = this.state;

    particles.push(this[this.action][this.mode](this.mouse));
  }

  toggleWalls() {
    this.state.wall = !this.state.wall;
    return this.state.wall;
  }

  addEvents() {
    const ui = document.getElementById('options-buttons');
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
      this.clickAction();
    };
  }

  integrateUI() {
    return e => {
      switch (e.target.id) {
        case 'reset':
          this.state.reset();
          break;
        case 'stars':
          this.mode = 'stars';
          break;
        case 'airbrush':
          this.selectedAction = 'airbrush';
          break;
        default:
          break;
      }
    };
  }
}

export default Client;
