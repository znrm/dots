import Vector from './vector';

const walls = particle => {
  if (particle.pos.x > 1 || particle.pos.x < 0) {
    particle.vel.scale(new Vector(-1, 1));
  }

  if (particle.pos.y > 1 || particle.pos.y < 0) {
    particle.vel.scale(new Vector(1, -1));
  }
};

export default walls;
