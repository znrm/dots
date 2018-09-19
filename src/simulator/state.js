class State {
  constructor(particles = []) {
    this.particles = particles;
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
  }

  updateParticles(nParticles) {
    for (let i = 0; i < nParticles; i += 1) this.particles[i].update();
  }

  calculateInteractions(nParticles) {
    for (let i = 0; i < nParticles; i += 1) {
      for (let j = 0; j < nParticles; j += 1) {
        if (i !== j) {
          this.particles[i].interact(this.particles[j]);
        }
      }
    }
  }

  reset() {
    this.particles.length = 0;
  }
}

export default State;
