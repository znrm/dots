import Display from './interface/display';
import Client from './interface/client';
import buildInterface from './interface/ui_builder';
import welcomeUser from './interface/intro';
import State from './simulator/state';

window.onload = () => {
  buildInterface();
  welcomeUser();

  const simulation = new State();
  const client = new Client(simulation);
  const display = new Display(simulation, client);

  const run = () => {
    requestAnimationFrame(run);

    display.render();
    simulation.update();
  };

  run();
};
