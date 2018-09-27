import Vector from '../simulator/vector';
import actions from './actions';

class Client {
  constructor(state) {
    this.state = state;
    this.state.needsCleaning = true;

    this.mouse = new Vector(0, 0);
    this.mouseHistory = Array.from({ length: 4 }, () => new Vector(0, 0));

    this.pressing = false;

    this.particleType = 'stars';
    this.selectedAction = 'paint';
    this.msPerAction = 21;

    this.actions = actions;

    this.addEvents();
  }

  get pointer() {
    return Vector.direction(this.mouse, this.mouseHistory[0]);
  }

  handleActions() {
    return () => {
      if (this.selectedAction !== 'place') this.continuousAction();
    };
  }

  clickAction() {
    if (this.selectedAction === 'place') {
      this.state.addParticle(this.actions.place[this.particleType](this.mouse));
    }
  }

  continuousAction() {
    this.state.addParticle(
      this.actions[this.selectedAction][this.particleType](this.mouse, this.pointer)
    );
  }

  addEvents() {
    const option = document.getElementById('option-buttons');
    const particleType = document.getElementById('particle-type-buttons');
    const canvas = document.querySelector('canvas');

    option.onclick = this.selectAction();
    option.ontouchend = this.selectAction();

    particleType.onclick = this.selectMode();
    particleType.ontouchend = this.selectMode();

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

      // clear previous interval in case mouseup occurred off of window
      window.clearInterval(this.asyncActions);
      this.asyncActions = window.setInterval(this.handleActions(), this.msPerAction);
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
      this.clickAction();
      window.clearInterval(this.asyncActions);
    };
  }

  selectMode() {
    return e => {
      if (this.particleType !== e.target.id) {
        this.state.reset();
        this.particleType = e.target.id;
      }
      this.state.needsCleaning = this.particleType === 'stars';
    };
  }

  selectAction() {
    return e => {
      switch (e.target.id) {
        case 'reset':
          this.state.reset();
          break;
        default:
          this.selectedAction = e.target.id;
      }
    };
  }
}

export default Client;
