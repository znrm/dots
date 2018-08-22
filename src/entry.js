import Display from './display';
import User from './client';
// import run from './run';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');
  const display = new Display(canvas);

  const user = new User();

  // testing
  window.display = display;
  window.user = user;
});
