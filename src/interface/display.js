class Display {
  constructor(state, client) {
    this.canvas = document.querySelector('canvas');
    this.state = state;
    this.client = client;

    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.resize.bind(this)();

    this.ctx.fillStyle = 'rgba(255,255,255,1)';
    this.ctx.strokeStyle = 'rgba(255,255,255,1)';

    window.onresize = () => this.resize();
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
        this.dot(particle);
      } else {
        this.circle(particle);
      }
    }
  }

  renderAutomata() {
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) this.circle(particles[i]);
  }

  renderNetworks() {
    this.ctx.lineWidth = 0.3;
    this.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = particles[i];
      const nAdjacentParticles = particle.nearby.length;
      for (let j = 0; j < nAdjacentParticles; j += 1) {
        this.line(particle.pos, particle.nearby[j]);
      }
      particle.nearby.length = 0;
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.client.displayWidth = this.width;
    this.client.displayHeight = this.height;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx.fillStyle = 'rgba(255,255,255,1)';
    this.ctx.strokeStyle = 'rgba(255,255,255,1)';
  }

  reset() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  mouse({ x, y }) {
    this.ctx.lineWidth = 1.5;
    this.strokeStyle = 'rgba(255,255,255,0.2)';
    this.ctx.beginPath();
    this.ctx.arc(
      x * this.width,
      y * this.height,
      0.008 * this.scale,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.stroke();
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

  dot({ pos }) {
    this.ctx.fillRect(pos.x * this.width, pos.y * this.height, 1, 1);
  }

  line(from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x * this.width, from.y * this.height);
    this.ctx.lineTo(to.x * this.width, to.y * this.height);
    this.ctx.stroke();
  }
}

export default Display;
