import Display from './display';
import Client from './client';
import Particle from './particle';
import Vector from './vector';
import walls from './environment';
import Field from './field';
import State from './state';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');
  const state = new State(Particle.randomStart(0), [
    new Field({ pos: new Vector() }),
  ]);

  const client = new Client(state);

  document
    .getElementById('wall')
    .addEventListener('click', function wallButton() {
      if (client.wall) {
        this.classList.remove('strike');
      } else {
        this.classList.add('strike');
      }
    });

  const display = new Display(canvas, state, client);

  const run = () => {
    state.cleanup();
    const { particles, fields } = state;
    const nParticles = particles.length;
    const nFields = fields.length;

    for (let i = 0; i < nParticles; i += 1) {
      if (client.pressing) client.mouseField.interact(particles[i]);
      if (client.wall) walls(particles[i]);

      for (let j = 0; j < nFields; j += 1) fields[j].interact(particles[i]);
    }

    for (let i = 0; i < nFields; i += 1) {
      if (client.pressing) client.mouseField.interact(fields[i]);
      if (client.wall) walls(fields[i]);

      for (let j = 0; j < nFields; j += 1) fields[j].interact(fields[i]);
    }

    for (let i = 0; i < nParticles; i += 1) particles[i].update();
    for (let i = 0; i < nFields; i += 1) fields[i].update();

    client.resetMouse();

    display.reset();

    display.render(nParticles, nFields);

    window.requestAnimationFrame(run);
  };

  // testing only
  window.display = display;
  window.fields = state.fields;
  window.client = client;
  window.Vector = Vector;
  window.state = state;

  run();
});
