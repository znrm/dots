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
    this.clearRect(0, 0, this.width, this.height);
  }

  render(dots) {
    dots.forEach(dot => this.fillRect(dot.x, dot.y, 1, 1));
  }

  randomDots(numDots) {
    this.ctx.fillStyle = 'rgba(255,255,255,.25)';
    for (let i = 0; i < numDots; i += 1) {
      const x = Math.round(Math.random() * this.width);
      const y = Math.round(Math.random() * this.height);
      this.ctx.fillRect(x, y, 1, 1);
    }
  }
}

export default Display;
