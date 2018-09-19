import Display from './interface/display';
import Client from './interface/client';
import buildUI from './interface/ui_builder';
import startTutorial from './interface/intro';
import State from './simulator/state';
import Vector from './simulator/vector';

document.addEventListener('DOMContentLoaded', () => {
  buildUI();
  startTutorial();

  const state = new State();
  const client = new Client(state);
  const display = new Display(state, client);

  const run = () => {
    window.requestAnimationFrame(run);

    display.reset();
    display.render();

    client.handleActions();
    client.resetMouse();

    state.update();
    state.cleanup();
  };
  window.Vector = Vector;
  window.state = state;
  run();
});
