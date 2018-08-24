import Display from './display';
import Client from './client';
import Particle from './particle';
import Vector from './vector';
import walls from './environment';

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
      if (client.pressing) {
        client.mouseField.interact(particles[i]);
      }

      if (client.wall) {
        walls(particles[i]);
      }

      display.dot(particles[i].update());
    }

    for (let i = 0; i < nFields; i += 1) {
      display.circle(fields[i].update());
      if (client.pressing) {
        client.mouseField.interact(fields[i]);
      }
    }

    display.line(client.mouse, client.pointer);
    display.mouse(client.mouse);
    client.resetMouse();
    window.requestAnimationFrame(run);
  };

  // testing only
  window.display = display;
  window.fields = fields;
  window.client = client;
  window.Vector = Vector;

  run();
});
