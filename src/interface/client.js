import Vector from '../simulator/vector';
import { paint } from './presets';

class Client {
  constructor(state) {
    this.state = state;

    this.mouse = new Vector(0, 0);
    this.mouseHistory = Array.from({ length: 5 }, () => new Vector(0, 0));

    this.pressing = false;

    this.mode = 'stars';
    this.action = 'paint';

    this.paint = paint;

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
    const option = document.getElementById('option-buttons');
    const mode = document.getElementById('mode-buttons');
    const canvas = document.querySelector('canvas');

    option.onclick = this.selectAction();
    option.ontouchstart = this.selectAction();

    mode.onclick = this.selectMode();
    mode.ontouchstart = this.selectMode();

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

  selectMode() {
    return e => {
      this.mode = e.target.id;
    };
  }

  selectAction() {
    return e => {
      switch (e.target.id) {
        case 'reset':
          this.state.reset();
          break;
        default:
          this.action = e.target.id;
      }
    };
  }
}

export default Client;
