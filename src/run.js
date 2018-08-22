const run = function run(display, client, particles) {
  display.reset();
  particles.update();
  display.render(particles.dots.positions);
  window.requestAnimationFrame(() => run(display, client, particles));
};
export default run;
