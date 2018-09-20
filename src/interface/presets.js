import Particle from '../simulator/particle';
import Vector from '../simulator/vector';

const GRAVITATIONAL_CONSTANT = 0.05;

const absorb = (thisParticle, thatParticle) => {
  thisParticle.grow(thatParticle.mass);
  thatParticle.delete();
};

const inelasticCollide = (thisParticle, thatParticle) => {
  thisParticle.accelerate(
    thatParticle.momentum.scale(
      thisParticle.mass / (thisParticle.mass + thatParticle.mass)
    )
  );
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
    return this.pos.dist(pos) < 1.4 * this.size + size;
  }

  interact(particle) {
    if (this.inReach(particle.pos, particle.size)) {
      moveAway(this, particle, 0.9);
    }
  }
}

class Fluid extends Particle {
  update() {
    this.pos.add(this.vel.add(new Vector(0, 1e-5)));
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
      radius: 1e-2,
      vel: Vector.randomDir(0.001),
      pos: spreadPosition(mouse, 0.01)
    }),
  fluids: mouse =>
    new Fluid({
      radius: 3e-2,
      vel: Vector.randomDir(0.001),
      pos: spreadPosition(mouse, 0.001)
    })
};

export const emit = {};

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
