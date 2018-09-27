import Vector from '../simulator/vector';
import { paint, shoot, place } from './actions';

class Client {
  constructor(state) {
    this.state = state;

    this.mouse = new Vector(0, 0);
    this.mouseHistory = Array.from({ length: 5 }, () => new Vector(0, 0));

    this.pressing = false;

    this.mode = 'stars';
    this.action = 'paint';

    this.paint = paint;
    this.shoot = shoot;
    this.place = place;

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
    this.resetMouse();
  }

  clickAction() {
    if (this.action === 'place') {
      this.state.addParticle(this.place[this.mode](this.mouse));
    }
  }

  continuousAction() {
    if (this.action !== 'place') {
      this.state.addParticle(
        this[this.action][this.mode](this.mouse, this.pointer)
      );
    }
  }

  addEvents() {
    const option = document.getElementById('option-buttons');
    const mode = document.getElementById('mode-buttons');
    const canvas = document.querySelector('canvas');

    option.onclick = this.selectAction();
    option.ontouchend = this.selectAction();

    mode.onclick = this.selectMode();
    mode.ontouchend = this.selectMode();

    canvas.onmousedown = this.mouseDown();
    canvas.ontouchstart = this.mouseDown();

    document.onmousemove = this.mouseMove();
    document.ontouchmove = this.mouseMove();

    canvas.onmouseup = this.mouseUp();
    canvas.ontouchend = this.mouseUp();
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
      if (this.mode !== e.target.id) {
        this.state.reset();
        this.mode = e.target.id;
      }
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
