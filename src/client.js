import Vector from './vector';
import Particle from './particle';

class Client {
  constructor(particles) {
    this.pressing = false;
    this.mouse = new Vector(0, 0);
    this.particles = particles;
    this.addEvents();
  }

  addEvents() {
    document.onmousedown = e => {
      this.mouse = new Vector(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
      this.pressing = true;
      this.particles.push(Particle.random(this.mouse));
    };

    document.onmousemove = e => {
      this.mouse = new Vector(e.clientX, e.clientY);
    };

    document.onmouseup = () => {
      this.pressing = false;
    };
  }
}

export default Client;
