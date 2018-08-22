import Vector from './vector';

const walls = function walls(particle) {
  if (particle.pos.x > 0.99 || particle.pos.x < 0.01) {
    particle.vel.scale(new Vector(-1, 1));
  }

  if (particle.pos.y > 0.99 || particle.pos.y < 0.01) {
    particle.vel.scale(new Vector(1, -1));
  }
};
