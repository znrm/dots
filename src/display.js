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
    dots.forEach(dot => this.ctx.fillRect((dot.x), (dot.y), 1, 1));
  }

  randomDots(numDots) {
    const dots = [];
    for (let i = 0; i < numDots; i += 1) {
      dots.push([
        Math.round(Math.random() * this.width),
        Math.round(Math.random() * this.height),
      ]);
    }

    this.render(dots);
  }
}

export default Display;
