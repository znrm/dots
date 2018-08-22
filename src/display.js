class Display {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.resize.bind(this)();

    window.onresize = () => this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  reset() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  render(dots) {
    this.ctx.fillStyle = 'rgba(255,255,255,1)';
    dots.forEach(dot =>
      this.ctx.fillRect(dot.pos.x * this.width, dot.pos.y * this.height, 1, 1));
  }
}

export default Display;
