class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(that = new Vector()) {
    this.x += that.x;
    this.y += that.y;
    return this;
  }

  subtract(that = new Vector()) {
    this.x -= that.x;
    this.y -= that.y;
    return this;
  }

  scale(that = 1) {
    this.x *= that;
    this.y *= that;
    return this;
  }

  moveTo(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    return this;
  }

  normalize() {
    if (this.x || this.y) {
      this.scale(1 / this.magnitude());
    }
    return this;
  }

  normalizeL2() {
    if (this.x || this.y) {
      this.scale(1 / this.magnitudeL1());
    }
    return this;
  }

  distSq(that = new Vector()) {
    const dX = this.x - that.x;
    const dY = this.y - that.y;
    return dX * dX + dY * dY;
  }

  dist(that = new Vector()) {
    const dX = this.x - that.x;
    const dY = this.y - that.y;
    return Math.hypot(dX, dY);
  }

  dot(that = new Vector()) {
    return this.x * that.x + this.y * that.y;
  }

  magnitude() {
    return Math.hypot(this.x, this.y);
  }

  magnitudeL1() {
    return Math.abs(this.x) + Math.abs(this.y);
  }

  static xAxis(length = 1) {
    return new Vector(length, 0);
  }

  static yAxis(length = 1) {
    return new Vector(0, length);
  }

  static direction(start = new Vector(), end = new Vector()) {
    return new Vector(0, 0)
      .add(start)
      .subtract(end)
      .normalize();
  }

  static random(length = 1) {
    return new Vector(Math.random() - 0.5, Math.random() - 0.5)
      .normalize()
      .scale(length);
  }

  static clone(that = new Vector()) {
    return new Vector(that.x, that.y);
  }
}

export default Vector;
