class Display {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.resize.bind(this)();
    this.ctx.fillStyle = 'rgba(255,255,255,1)';

    window.onresize = () => this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx.fillStyle = 'rgba(255,255,255,1)';
  }

  reset() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  circle({ x, y }) {
    this.ctx.beginPath();
    this.ctx.arc(x * this.width, y * this.height, 5, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  dot({ x, y }) {
    this.ctx.fillRect(x * this.width, y * this.height, 1, 1);
  }
}

export default Display;
