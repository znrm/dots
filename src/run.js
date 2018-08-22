const run = function run(display, client, particles) {
  display.reset();

  particles.forEach(particle => {
    particles.forEach(otherParticle => particle.interact(otherParticle));
  });

  particles.forEach(particle => particle.update());

  display.render(particles);

  window.requestAnimationFrame(() => run(display, client, particles));
};
export default run;
