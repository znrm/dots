class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  add(that) {
    this.x += that.x;
    this.y += that.y;
    return this;
  }

  scale(that) {
    this.x *= that.x;
    this.y *= that.y;
    return this;
  }

  static random() {
    return new Vector(Math.random(), Math.random());
  }
}

export default Vector;
