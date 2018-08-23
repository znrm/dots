const run = function run(display, client, particles) {
  display.reset();

  const { length } = particles;
  for (let i = 0; i < length; i += 1) {
    display.render(particles[i].update());
  }

  window.requestAnimationFrame(() => run(display, client, particles));
};
export default run;
