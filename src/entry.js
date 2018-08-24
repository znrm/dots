import Display from './display';
import Client from './client';
import Particle from './particle';

document.addEventListener('DOMContentLoaded', () => {
  const display = new Display(document.querySelector('canvas'));
  const particles = Particle.randomStart(1000);
  const fields = [];
  const client = new Client(particles, fields);

  const run = () => {
    display.reset();

    const nParticles = particles.length;
    const nFields = fields.length;

    for (let i = 0; i < nParticles; i += 1) {
      display.dot(particles[i].update());
    }

    for (let i = 0; i < nFields; i += 1) {
      display.circle(fields[i].update());
    }

    window.requestAnimationFrame(run);
  };

  window.display = display;
  window.fields = fields;
  window.client = client;
  run();
});
