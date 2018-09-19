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

const spreadPosition = mouse =>
  Vector.randomDir(0.02 * Math.random()).add(mouse);

export const airbrush = {
  stars: mouse =>
    new SpaceDebris({
      mass: 5e-7,
      vel: Vector.randomDir(0.00001),
      pos: spreadPosition(mouse)
    })
};

export const emit = {};

// class HardSphere extends Particle {
//   interact(particle) {
//     if (this.inRadius(particle.pos)) {
//       particle.move(
//         Vector.direction(particle.pos, this.pos).scale(
//           (this.radius + particle.radius) - this.pos.dist(particle.pos)
//         )
//       );
//     }
//   }
// }

// class Automata extends Particle {
//   get size() {
//     return this.radius;
//   }

//   isInRadius(particle, offset) {
//     const distance = this.pos.dist(particle.pos);

//     return distance < (this.radius + particle.radius);
//   }

//   interact(particle) {
//     if (this.inRadius(particle.pos)) {
//       particle.move(
//         Vector.direction(particle.pos, this.pos).scale(
//           (this.radius + particle.radius) - this.pos.dist(particle.pos)
//         )
//       );
//     }
//   }
//
