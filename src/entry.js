import Display from './interface/display';
import Client from './interface/client';
import State from './simulator/state';
import buildInterface from './interface/ui_builder';
import welcomeUser from './interface/intro';

buildInterface();

const simulation = new State();
const client = new Client(simulation);
const display = new Display(simulation, client);

function run() {
  display.render();
  simulation.update();
  requestAnimationFrame(run);
}

requestAnimationFrame(() => {
  welcomeUser();
  run();
});
