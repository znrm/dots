import Display from './interface/display';
import Client from './interface/client';
import State from './simulator/state';
import Vector from './simulator/vector';

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
  window.Vector = Vector;
  run();
});
