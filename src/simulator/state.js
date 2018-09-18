class State {
  constructor(particles = []) {
    this.particles = particles;
  }

  cleanup() {
    this.particles = this.particles.filter(particle => particle.protected);
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
        this.particles[j].interact(this.particles[i]);
      }
    }
  }

  reset() {
    this.particles = [];
  }
}

export default State;
