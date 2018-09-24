const sizeToRGB = size => {
  const rC = -(18 ** 4);
  const gC = -(15 ** 4);
  const bC = -(11 ** 4);

  const rExp = (size - 0.045) ** 4;
  const gExp = (size - 0.07) ** 4;
  const bExp = (size - 0.11) ** 4;

  const red = 255 * (rC * rExp + 1);
  const green = 255 * (gC * gExp + 1);
  const blue = 255 * (bC * bExp + 1);

  return `${red},${green},${blue}`;
};

const speedToHSL = vel => {
  const speed = vel.magnitude();
  const hue = Math.min(120 * (speed / 0.01) + 240, 360);
  return `hsl(${hue},100%,50%)`;
};

const directionToColor = ({ x }) => {
  if (x > 0) return 'blue';
  if (x < 0) return 'green';
  return 'grey';
};

class Display {
  constructor(state, client) {
    this.state = state;
    this.client = client;

    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: false });

    this.resize()();
    this.reset();

    window.onresize = this.resize();
  }

  get scale() {
    return Math.min(this.width, this.height);
  }

  render() {
    this.mouse(this.client.mouse);
    this.renderParticles();
  }

  renderParticles() {
    switch (this.client.mode) {
      case 'stars':
        this.renderStars();
        break;
      case 'automata':
        this.renderAutomata();
        break;
      case 'networks':
        this.renderNetworks();
        break;
      case 'gases':
        this.renderGases();
        break;
      default:
        break;
    }
  }

  renderStars() {
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = particles[i];
      if (particle.visualSize(this.scale) < 1) {
        this.ctx.fillStyle = 'SandyBrown';
        this.dot(particle);
      } else {
        this.star(particle);
      }
    }
  }

  renderAutomata() {
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) this.automata(particles[i]);
  }

  renderGases() {
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) this.gas(particles[i]);
  }

  renderNetworks() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 0.3;
    this.ctx.strokeStyle = 'rgba(255,255,255,0.5)';

    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = particles[i];
      this.dot(particle);

      const nAdjacentParticles = particle.nearby.length;
      for (let j = 0; j < nAdjacentParticles; j += 1) {
        this.subLine(particle.pos, particle.nearby[j]);
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

      this.canvas.width = this.width;
      this.canvas.height = this.height;
    };
  }

  reset() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'rgba(255,255,255,1)';
    this.ctx.strokeStyle = 'rgba(255,255,255,1)';
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
    const color = sizeToRGB(particle.size);
    this.ctx.fillStyle = `rgba(${color},1)`;
    this.ctx.shadowBlur = 2 * size;
    this.ctx.shadowColor = `rgba(${color},1)`;

    this.ctx.beginPath();
    this.ctx.arc(
      pos.x * this.width,
      pos.y * this.height,
      size,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fill();
  }

  circle(particle) {
    const { pos } = particle;
    const size = particle.visualSize(this.scale);

    this.ctx.beginPath();
    this.ctx.arc(
      pos.x * this.width,
      pos.y * this.height,
      size,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fill();
  }

  automata(particle) {
    const { pos } = particle;
    const size = particle.visualSize(this.scale);

    this.ctx.beginPath();
    this.ctx.fillStyle = directionToColor(particle.vel);
    this.ctx.arc(
      pos.x * this.width,
      pos.y * this.height,
      size,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fill();
  }

  gas(particle) {
    const { pos } = particle;
    const size = particle.visualSize(this.scale);

    this.ctx.beginPath();
    this.ctx.fillStyle = speedToHSL(particle.vel);
    this.ctx.arc(
      pos.x * this.width,
      pos.y * this.height,
      size,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fill();
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
