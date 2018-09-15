class State {
  constructor(particles = [], fields = []) {
    this.particles = particles;
    this.fields = fields;
  }

  cleanup() {
    this.particles = this.particles.filter(particle => particle.protected);
    this.fields = this.fields.filter(field => field.protected);
  }

  update() {
    const nParticles = this.particles.length;
    const nFields = this.fields.length;

    for (let i = 0; i < nParticles; i += 1) {
      for (let j = 0; j < nFields; j += 1) {
        this.fields[j].interact(this.particles[i]);
      }
    }

    for (let i = 0; i < nFields; i += 1) {
      for (let j = 0; j < nFields; j += 1) {
        this.fields[j].interact(this.fields[i]);
      }
    }

    for (let i = 0; i < nParticles; i += 1) this.particles[i].update();
    for (let i = 0; i < nFields; i += 1) this.fields[i].update();
  }

  reset() {
    this.particles = [];
    this.fields = [];
  }
}

export default State;
