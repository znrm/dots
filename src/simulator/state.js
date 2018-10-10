import Vector from './vector';
import Particle from './particle';

class State {
  constructor(particles = []) {
    this.particles = particles;
    this.wall = true;
    this.needsCleaning = false;
  }

  update() {
    const nParticles = this.particles.length;

    this.calculateInteractions(nParticles);
    this.updateParticles(nParticles);

    if (this.wall) this.walls(nParticles);
    if (this.needsCleaning) this.cleanup(nParticles);
  }

  addParticle(particle = new Particle()) {
    this.particles.push(particle);
  }

  toggleWalls() {
    this.wall = !this.wall;
    return this.wall;
  }

  cleanup(nParticles = this.particles.length) {
    let validParticles = 0;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = this.particles[i];

      if (particle.protected) {
        if (i !== validParticles) this.particles[validParticles] = particle;
        validParticles += 1;
      }
    }
    this.particles.length = validParticles;
  }

  updateParticles(nParticles = this.particles.length) {
    for (let i = 0; i < nParticles; i += 1) this.particles[i].update();
  }

  calculateInteractions(nParticles = this.particles.length) {
    for (let i = 0; i < nParticles; i += 1) {
      for (let j = 0; j < nParticles; j += 1) {
        if (i !== j) this.particles[i].interact(this.particles[j]);
      }
    }
  }

  walls(nParticles = this.particles.length) {
    for (let i = 0; i < nParticles; i += 1) {
      const { pos, vel } = this.particles[i];
      const size = this.particles[i].size();
      const rightDist = 1 - size - pos.x;
      const bottomDist = 1 - size - pos.y;
      const leftDist = pos.x - size;
      const topDist = pos.y - size;

      if (rightDist < 0) {
        vel.subtract(Vector.xAxis(2 * vel.x));
        pos.add(Vector.xAxis(rightDist));
      } else if (leftDist < 0) {
        vel.subtract(Vector.xAxis(2 * vel.x));
        pos.subtract(Vector.xAxis(leftDist));
      } else if (bottomDist < 0) {
        vel.subtract(Vector.yAxis(2 * vel.y));
        pos.add(Vector.yAxis(bottomDist));
      } else if (topDist < 0) {
        vel.subtract(Vector.yAxis(2 * vel.y));
        pos.subtract(Vector.yAxis(topDist));
      }
    }
  }

  reset() {
    this.particles.length = 0;
  }
}

export default State;
