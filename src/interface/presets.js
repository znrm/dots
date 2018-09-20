import Particle from '../simulator/particle';
import Vector from '../simulator/vector';

const GRAVITATIONAL_CONSTANT = 0.05;

const absorb = (thisParticle, thatParticle) => {
  thisParticle.grow(thatParticle.mass);
  thatParticle.delete();
};

const inelasticCollide = (thisParticle, thatParticle) => {
  const newVelocity = thisParticle.momentum
    .add(thatParticle.momentum)
    .scale(1 / (thisParticle.mass + thatParticle.mass));
  thisParticle.vel.scale(0);
  thisParticle.accelerate(newVelocity);
};

const moveAway = (thisParticle, thatParticle, a) => {
  thatParticle.move(
    Vector.direction(thatParticle.pos, thisParticle.pos).scale(
      a * (thisParticle.size + thatParticle.size) -
        thisParticle.pos.dist(thatParticle.pos)
    )
  );
};

const fakeGravity = (thisParticle, thatParticle) => {
  const scalar = thisParticle.mass / thisParticle.pos.dist(thatParticle.pos);
  const direction = Vector.direction(thisParticle.pos, thatParticle.pos);
  thatParticle.accelerate(direction.scale(GRAVITATIONAL_CONSTANT * scalar));
};

class SpaceDebris extends Particle {
  visualSize(scale) {
    return Math.sqrt(this.mass) * scale;
  }

  get size() {
    return Math.sqrt(this.mass);
  }

  interact(particle) {
    const { pos, size } = particle;

    if (this.isContained(pos, size / 4) && this.protected) {
      inelasticCollide(this, particle);
      absorb(this, particle);
    } else {
      fakeGravity(this, particle);
    }
  }
}

class Automata extends Particle {
  inReach(pos, size) {
    return this.pos.dist(pos) < Math.SQRT2 * this.size + size;
  }

  interact(particle) {
    if (this.inReach(particle.pos, particle.size)) {
      moveAway(this, particle, Math.SQRT1_2);
    }
  }
}

class Network extends Particle {
  constructor(particleParams) {
    super(particleParams);
    this.nearby = [];
  }

  interact({ pos }) {
    if (this.isTouching(pos, 0)) this.nearby.push(pos);
  }
}

const spreadPosition = (mouse, spread) =>
  Vector.randomDir(spread * Math.random()).add(mouse);

export const paint = {
  stars: mouse =>
    new SpaceDebris({
      mass: 5e-7,
      vel: Vector.randomDir(0.00001),
      pos: spreadPosition(mouse, 0.03)
    }),
  automata: mouse =>
    new Automata({
      radius: 5e-3,
      vel: Vector.randomDir(0.001),
      pos: spreadPosition(mouse, 0.01)
    }),
  networks: mouse =>
    new Network({
      radius: 1e-1,
      vel: Vector.randomDir(0.0002),
      pos: spreadPosition(mouse, 0.15)
    })
};

export const shoot = {
  stars: (mouse, pointer) =>
    new SpaceDebris({
      mass: 3e-6,
      vel: pointer.scale(0.007),
      pos: Vector.clone(mouse)
    }),
  automata: (mouse, pointer) =>
    new Automata({
      radius: 5e-3,
      vel: pointer.scale(0.007),
      pos: spreadPosition(mouse, 0.01)
    }),
  networks: (mouse, pointer) =>
    new Network({
      radius: 1e-1,
      vel: pointer.scale(0.01),
      pos: spreadPosition(mouse, 0.05)
    })
};

export const place = {
  stars: mouse =>
    new SpaceDebris({
      mass: 5e-5,
      vel: new Vector(0, 0),
      pos: spreadPosition(mouse, 1e-3)
    }),
  automata: mouse =>
    new Automata({
      radius: 5e-3,
      vel: new Vector(0, 0),
      pos: spreadPosition(mouse, 1e-3)
    }),
  networks: mouse =>
    new Network({
      radius: 1e-1,
      vel: new Vector(0, 0),
      pos: spreadPosition(mouse, 1e-3)
    })
};

class HardSphere extends Particle {
  interact(particle) {
    if (this.isTouching(particle.pos, particle.size)) {
      particle.move(
        Vector.direction(particle.pos, this.pos).scale(
          this.radius + particle.radius - this.pos.dist(particle.pos)
        )
      );
    }
  }
}
