import Display from './display';
import Client from './client';
import State from './state';

document.addEventListener('DOMContentLoaded', () => {
  const state = new State();
  const client = new Client(state);
  const display = new Display(state, client);

  const run = () => {
    window.requestAnimationFrame(run);

    const nParticles = state.particles.length;
    const nFields = state.fields.length;

    display.reset();
    display.render(nParticles, nFields);

    client.handleActions(nParticles, nFields);
    client.resetMouse();

    state.update(nParticles, nFields);
    state.cleanup();
  };

  // testing only
  // window.display = display;
  // window.client = client;
  // window.Vector = Vector;
  // window.state = state;

  run();
});
