import Display from './display';
import Client from './client';
import Particle from './particle';
import run from './run';

document.addEventListener('DOMContentLoaded', () => {
  const display = new Display(document.querySelector('canvas'));
  const particles = Particle.randomStart(1000, display.width, display.height);

  const client = new Client();

  run(display, client, particles);
});
