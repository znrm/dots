class State {
  constructor(particles, fields) {
    this.particles = particles;
    this.fields = fields;
  }

  cleanup() {
    this.particles = this.particles.filter(
      particle => particle.protected,
    );
    this.fields = this.fields.filter(field => field.protected);
  }
}

export default State;
