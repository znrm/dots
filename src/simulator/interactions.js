import Vector from './vector';

const PULL_CONSTANT = 0.025;
const PUSH_CONSTANT = 5e-12;

export const absorb = (thisParticle, thatParticle) => {
  thisParticle.grow(thatParticle.mass);
  thatParticle.delete();
};

export const inelasticCollide = (thisParticle, thatParticle) => {
  const newVelocity = thisParticle.momentum
    .add(thatParticle.momentum)
    .scale(1 / (thisParticle.mass + thatParticle.mass));
  thisParticle.vel.scale(0);
  thisParticle.accelerate(newVelocity);
};

export const moveAway = (thisParticle, thatParticle, a) => {
  thatParticle.move(
    Vector.direction(thatParticle.pos, thisParticle.pos).scale(
      a * (thisParticle.size + thatParticle.size)
        - thisParticle.pos.dist(thatParticle.pos)
    )
  );
};

export const fakeGravity = (thisParticle, thatParticle) => {
  const scalar = thisParticle.mass / thisParticle.pos.dist(thatParticle.pos);
  const direction = Vector.direction(thisParticle.pos, thatParticle.pos);
  thatParticle.accelerate(direction.scale(PULL_CONSTANT * scalar));
};

export const pushAway = (thisParticle, thatParticle) => {
  const sqDist = thisParticle.pos.sqDist(thatParticle.pos);
  const scalar = PUSH_CONSTANT / (sqDist * sqDist);
  const direction = Vector.direction(thatParticle.pos, thisParticle.pos);
  thatParticle.accelerate(direction.scale(scalar));
};
