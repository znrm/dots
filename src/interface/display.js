import {
  directionToColor,
  speedToHSL,
  sizeToRGBA
} from './util/color_generators';

class Display {
  constructor(state, client) {
    this.particles = state.particles;
    this.client = client;

    this.ctx = document.querySelector('canvas').getContext('2d');

    this.resize()();
    this.reset();

    window.onresize = this.resize();
  }

  get scale() {
    return Math.min(this.width, this.height);
  }

  render() {
    this.reset();
    this.mouse(this.client.mouse);
    this.renderParticles();
  }

  renderParticles() {
    this[this.client.particleType]();
  }

  stars() {
    const nParticles = this.particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = this.particles[i];
      if (particle.visualSize(this.scale) < 1) {
        this.ctx.fillStyle = 'SandyBrown';
        this.dot(particle);
      } else {
        this.star(particle);
      }
    }
  }

  dots() {
    this.ctx.fillStyle = 'white';

    const nParticles = this.particles.length;
    for (let i = 0; i < nParticles; i += 1) this.dot(this.particles[i]);
  }

  automata() {
    const nParticles = this.particles.length;
    for (let i = 0; i < nParticles; i += 1) this.automaton(this.particles[i]);
  }

  gases() {
    const nParticles = this.particles.length;
    for (let i = 0; i < nParticles; i += 1) this.gas(this.particles[i]);
  }

  networks() {
    this.ctx.beginPath();

    this.ctx.lineWidth = 0.3;
    this.ctx.strokeStyle = 'rgba(255,255,255,0.5)';

    const nParticles = this.particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = this.particles[i];
      const fromX = particle.pos.x * this.width;
      const fromY = particle.pos.y * this.height;
      this.ctx.fillRect(fromX, fromY, 1, 1);

      const nAdjacentParticles = particle.nearby.length;
      for (let j = 0; j < nAdjacentParticles; j += 1) {
        const toX = particle.nearby[j].x * this.width;
        const toY = particle.nearby[j].y * this.height;

        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
      }
      particle.nearby.length = 0;
    }
    this.ctx.stroke();

    this.ctx.closePath();
  }

  resize() {
    return () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.client.displayWidth = this.width;
      this.client.displayHeight = this.height;

      this.ctx.canvas.width = this.width;
      this.ctx.canvas.height = this.height;
    };
  }

  reset() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'white';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    this.ctx.globalCompositeOperation = 'screen';
  }

  mouse({ x, y }) {
    this.ctx.beginPath();

    this.ctx.lineWidth = 1.5;
    this.strokeStyle = 'rgba(255,255,255,0.2)';
    this.ctx.arc(
      x * this.width,
      y * this.height,
      0.008 * this.scale,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.stroke();

    this.ctx.closePath();
  }

  star(particle) {
    const { pos } = particle;
    const size = particle.visualSize(this.scale);
    const color = sizeToRGBA(particle.size);

    this.ctx.fillStyle = color;
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 2 * size;

    this.circle(pos.x * this.width, pos.y * this.height, size);
  }

  circle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  automaton(particle) {
    const { pos, vel } = particle;
    const size = particle.visualSize(this.scale);
    this.ctx.fillStyle = directionToColor(vel);

    this.circle(pos.x * this.width, pos.y * this.height, size);
  }

  gas(particle) {
    const { pos, vel } = particle;
    const size = particle.visualSize(this.scale);
    this.ctx.fillStyle = speedToHSL(vel);

    this.circle(pos.x * this.width, pos.y * this.height, size);
  }

  dot({ pos }) {
    this.ctx.fillRect(pos.x * this.width, pos.y * this.height, 1, 1);
  }

  line(from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x * this.width, from.y * this.height);
    this.ctx.lineTo(to.x * this.width, to.y * this.height);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  subLine(from, to) {
    this.ctx.moveTo(from.x * this.width, from.y * this.height);
    this.ctx.lineTo(to.x * this.width, to.y * this.height);
  }
}

export default Display;
