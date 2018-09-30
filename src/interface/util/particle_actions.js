import Vector from '../../simulator/vector';
import Star from '../presets/star';
import Automaton from '../presets/automaton';
import Gas from '../presets/gas';
import Network from '../presets/network';
import Particle from '../../simulator/particle';

const spreadPosition = (mouse, spread) =>
  Vector.random(spread * Math.random()).add(mouse);

const paint = {
  stars: mouse =>
    new Star({
      mass: 5e-7,
      vel: Vector.random(0.00001),
      pos: spreadPosition(mouse, 0.03)
    }),
  gases: mouse =>
    new Gas({
      radius: 5e-3,
      vel: Vector.random(0.0001),
      pos: spreadPosition(mouse, 0.1)
    }),
  automata: mouse =>
    new Automaton({
      radius: 6e-3,
      vel: Vector.random(0.001),
      pos: spreadPosition(mouse, 0.01)
    }),
  networks: mouse =>
    new Network({
      radius: 1e-1,
      vel: Vector.random(0.0002),
      pos: spreadPosition(mouse, 0.15)
    }),
  dots: mouse =>
    new Particle({
      vel: Vector.random(0.00001),
      pos: spreadPosition(mouse, 0.03)
    })
};

const shoot = {
  stars: (mouse, pointer) =>
    new Star({
      mass: 3e-6,
      vel: pointer.scale(0.007),
      pos: spreadPosition(mouse, 1e-2)
    }),
  gases: (mouse, pointer) =>
    new Gas({
      radius: 5e-3,
      vel: pointer.scale(0.006),
      pos: spreadPosition(mouse, 1e-6)
    }),
  automata: (mouse, pointer) =>
    new Automaton({
      radius: 6e-3,
      vel: pointer.scale(0.003),
      pos: spreadPosition(mouse, 0.01)
    }),
  networks: (mouse, pointer) =>
    new Network({
      radius: 1e-1,
      vel: pointer.scale(0.003),
      pos: spreadPosition(mouse, 0.05)
    }),
  dots: (mouse, pointer) =>
    new Particle({
      vel: pointer.scale(0.003),
      pos: spreadPosition(mouse, 1e-2)
    })
};

const place = {
  stars: mouse =>
    new Star({
      mass: 5e-5,
      vel: new Vector(0, 0),
      pos: spreadPosition(mouse, 1e-3)
    }),
  gases: mouse =>
    new Gas({
      vel: new Vector(0, 0),
      pos: spreadPosition(mouse, 1e-3),
      radius: 5e-3
    }),
  automata: mouse =>
    new Automaton({
      radius: 6e-3,
      vel: new Vector(0, 0),
      pos: spreadPosition(mouse, 1e-3)
    }),
  networks: mouse =>
    new Network({
      radius: 1e-1,
      vel: new Vector(0, 0),
      pos: spreadPosition(mouse, 1e-3)
    }),
  dots: mouse =>
    new Particle({
      vel: new Vector(0, 0),
      pos: spreadPosition(mouse, 5e-3)
    })
};

const actions = {
  paint,
  shoot,
  place
};

export default actions;
