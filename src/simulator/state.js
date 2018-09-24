import Vector from './vector';

class State {
  constructor(particles = []) {
    this.particles = particles;
    this.wall = true;
  }

  cleanup() {
    const nParticles = this.particles.length;
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

  update() {
    const nParticles = this.particles.length;

    this.calculateInteractions(nParticles);
    this.updateParticles(nParticles);
    if (this.wall) this.walls(nParticles);
  }

  updateParticles(nParticles) {
    for (let i = 0; i < nParticles; i += 1) this.particles[i].update();
  }

  calculateInteractions(nParticles) {
    for (let i = 0; i < nParticles; i += 1) {
      for (let j = 0; j < nParticles; j += 1) {
        if (i !== j && this.particles[i].protected) {
          this.particles[i].interact(this.particles[j]);
        }
      }
    }
  }

  walls(nParticles) {
    for (let i = 0; i < nParticles; i += 1) {
      const { pos, vel, size } = this.particles[i];
      const rightDist = 1 - size - pos.x;
      const bottomDist = 1 - size - pos.y;
      const leftDist = pos.x - size;
      const topDist = pos.y - size;

      if (rightDist < 0) {
        vel.subtract(new Vector(vel.x, 0).scale(2));
        pos.add(new Vector(rightDist, 0));
      } else if (leftDist < 0) {
        vel.subtract(new Vector(vel.x, 0).scale(2));
        pos.subtract(new Vector(leftDist, 0));
      } else if (bottomDist < 0) {
        vel.subtract(new Vector(0, vel.y).scale(2));
        pos.add(new Vector(0, bottomDist));
      } else if (topDist < 0) {
        vel.subtract(new Vector(0, vel.y).scale(2));
        pos.subtract(new Vector(0, topDist));
      }
    }
  }

  reset() {
    this.particles.length = 0;
  }
}

export default State;
