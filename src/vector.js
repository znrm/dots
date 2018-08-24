class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(that) {
    this.x += that.x;
    this.y += that.y;
    return this;
  }

  subtract(that) {
    this.x -= that.x;
    this.y -= that.y;
    return this;
  }

  scale(that) {
    if (that instanceof Object) {
      this.x *= that.x;
      this.y *= that.y;
    } else {
      this.x *= that;
      this.y *= that;
    }
    return this;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  project(onto) {
    this.scale(Vector.clone(onto).normalize());
    return this;
  }

  normalize() {
    const magnitude = this.magnitude();
    if (magnitude === 0) {
      this.x = 0;
      this.y = 0;
    } else {
      this.scale({ x: 1 / magnitude, y: 1 / magnitude });
    }
    return this;
  }

  sqDist(that) {
    const dX = this.x - that.x;
    const dY = this.y - that.y;
    return dX * dX + dY * dY;
  }

  dist(that) {
    return Math.hypot(this.x - that.x, this.y - that.y);
  }

  dot(that) {
    return this.x * that.x + this.y * that.y;
  }

  magnitude() {
    return Math.hypot(this.x, this.y);
  }

  static direction(from, to) {
    return new Vector(0, 0)
      .add(from)
      .subtract(to)
      .normalize();
  }

  static randomDir(scale = 1) {
    return new Vector(
      Math.random() - Math.random(),
      Math.random() - Math.random(),
    )
      .normalize()
      .scale(scale);
  }

  static clone(vector) {
    return new Vector(vector.x, vector.y);
  }

  static random() {
    return new Vector(Math.random(), Math.random());
  }
}

export default Vector;
