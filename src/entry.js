import Display from './display';
import Client from './client';
import Particle from './particle';
import run from './run';

document.addEventListener('DOMContentLoaded', () => {
  const display = new Display(document.querySelector('canvas'));
  const particles = Particle.randomStart(10000);

  const client = new Client(particles);
  window.disp = display;

  run(display, client, particles);
});
