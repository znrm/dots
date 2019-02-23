import Vector from './vector';
import Particle from './particle';

export const absorb = (source = new Particle(), target = new Particle()) => {
  source.grow(target.mass);
  target.delete();
};

export const inelasticCollide = (
  source = new Particle(),
  target = new Particle()
) => {
  const newVelocity = source
    .momentum()
    .add(target.momentum())
    .scale(1 / (source.mass + target.mass));
  source.vel.scale(0);
  source.accelerate(newVelocity);
};

export const moveAway = (
  source = new Particle(),
  target = new Particle(),
  sizeMultiplier = 1
) => {
  target.move(
    Vector.direction(target.pos, source.pos).scale(
      sizeMultiplier * (source.size() + target.size()) -
        source.pos.dist(target.pos)
    )
  );
};

export const fakeGravity = (
  source = new Particle(),
  target = new Particle(),
  maxAcc = Infinity,
  G = 0.025
) => {
  const scalar = Math.min(
    (G * source.mass) / source.pos.distSq(target.pos),
    maxAcc
  );
  const direction = new Vector(0, 0).add(source.pos).subtract(target.pos);

  target.accelerate(direction.scale(scalar));
};

export const pushAway = (
  source = new Particle(),
  target = new Particle(),
  maxAcc = Infinity,
  pushConstant = 2e-11
) => {
  const distSq = source.pos.distSq(target.pos);
  const scalar = Math.min(pushConstant / (distSq * distSq), maxAcc);
  const direction = Vector.direction(target.pos, source.pos);
  target.accelerate(direction.scale(scalar));
};
