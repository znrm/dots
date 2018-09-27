import Display from './interface/display';
import Client from './interface/client';
import buildUI from './interface/ui_builder';
import welcome from './interface/intro';
import State from './simulator/state';

document.addEventListener('DOMContentLoaded', () => {
  buildUI();
  welcome();

  const state = new State();
  const client = new Client(state);
  const display = new Display(state, client);

  const run = () => {
    window.requestAnimationFrame(run);

    display.render();
    client.handleActions();
    state.update();
    if (client.mode === 'stars') state.cleanup();
  };

  run();
});
