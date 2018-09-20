/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interface_display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface/display */ "./src/interface/display.js");
/* harmony import */ var _interface_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interface/client */ "./src/interface/client.js");
/* harmony import */ var _interface_ui_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interface/ui_builder */ "./src/interface/ui_builder.js");
/* harmony import */ var _interface_intro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interface/intro */ "./src/interface/intro.js");
/* harmony import */ var _simulator_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./simulator/state */ "./src/simulator/state.js");
/* harmony import */ var _simulator_vector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./simulator/vector */ "./src/simulator/vector.js");







document.addEventListener('DOMContentLoaded', () => {
  Object(_interface_ui_builder__WEBPACK_IMPORTED_MODULE_2__["default"])();
  Object(_interface_intro__WEBPACK_IMPORTED_MODULE_3__["default"])();

  const state = new _simulator_state__WEBPACK_IMPORTED_MODULE_4__["default"]();
  const client = new _interface_client__WEBPACK_IMPORTED_MODULE_1__["default"](state);
  const display = new _interface_display__WEBPACK_IMPORTED_MODULE_0__["default"](state, client);

  const run = () => {
    window.requestAnimationFrame(run);

    display.reset();
    display.render();

    client.handleActions();
    client.resetMouse();

    state.update();
    state.cleanup();
  };
  window.Vector = _simulator_vector__WEBPACK_IMPORTED_MODULE_5__["default"];
  window.state = state;
  window.client = client;
  run();
});


/***/ }),

/***/ "./src/interface/client.js":
/*!*********************************!*\
  !*** ./src/interface/client.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simulator_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../simulator/vector */ "./src/simulator/vector.js");
/* harmony import */ var _presets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presets */ "./src/interface/presets.js");



class Client {
  constructor(state) {
    this.state = state;

    this.mouse = new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.mouseHistory = Array.from({ length: 5 }, () => new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0));

    this.pressing = false;

    this.mode = 'stars';
    this.action = 'paint';

    this.paint = _presets__WEBPACK_IMPORTED_MODULE_1__["paint"];
    this.shoot = _presets__WEBPACK_IMPORTED_MODULE_1__["shoot"];
    this.place = _presets__WEBPACK_IMPORTED_MODULE_1__["place"];

    this.addEvents();
  }

  get pointer() {
    return _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(this.mouse, this.mouseHistory[0]);
  }

  resetMouse() {
    this.pressed = false;
  }

  handleActions() {
    if (this.pressing) this.continuousAction();
  }

  clickAction() {
    if (this.action === 'place') {
      this.place[this.mode](this.mouse);
    }
  }

  continuousAction() {
    const { particles } = this.state;

    particles.push(this[this.action][this.mode](this.mouse));
  }

  toggleWalls() {
    this.state.wall = !this.state.wall;
    return this.state.wall;
  }

  addEvents() {
    const option = document.getElementById('option-buttons');
    const mode = document.getElementById('mode-buttons');
    const canvas = document.querySelector('canvas');

    option.onclick = this.selectAction();
    option.ontouchstart = this.selectAction();

    mode.onclick = this.selectMode();
    mode.ontouchstart = this.selectMode();

    canvas.onmousedown = this.mouseDown();
    canvas.ontouchstart = this.mouseDown();

    document.onmousemove = this.mouseMove();
    document.ontouchmove = this.mouseMove();

    document.onmouseup = this.mouseUp();
    document.ontouchend = this.mouseUp();
  }

  mouseDown() {
    return e => {
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight
      );
      this.pressing = true;
    };
  }

  mouseMove() {
    return e => {
      e.preventDefault();
      this.mouseHistory.shift();
      this.mouseHistory.push(_simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(this.mouse));
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight
      );
    };
  }

  mouseUp() {
    return () => {
      this.pressing = false;
      this.clickAction();
    };
  }

  selectMode() {
    return e => {
      this.mode = e.target.id;
    };
  }

  selectAction() {
    return e => {
      switch (e.target.id) {
        case 'reset':
          this.state.reset();
          break;
        default:
          this.action = e.target.id;
      }
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Client);


/***/ }),

/***/ "./src/interface/display.js":
/*!**********************************!*\
  !*** ./src/interface/display.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Display {
  constructor(state, client) {
    this.canvas = document.querySelector('canvas');
    this.state = state;
    this.client = client;

    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.resize.bind(this)();

    this.ctx.fillStyle = 'rgba(255,255,255,1)';
    this.ctx.strokeStyle = 'rgba(255,255,255,1)';

    window.onresize = () => this.resize();
  }

  get scale() {
    return Math.min(this.width, this.height);
  }

  render() {
    this.mouse(this.client.mouse);
    this.renderParticles();
  }

  renderParticles() {
    switch (this.client.mode) {
      case 'stars':
        this.renderStars();
        break;
      case 'automata':
        this.renderAutomata();
        break;
      case 'networks':
        this.renderNetworks();
        break;
      case 'gases':
        this.renderGases();
        break;
      default:
        break;
    }
  }

  renderStars() {
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = particles[i];
      if (particle.visualSize(this.scale) < 1) {
        this.dot(particle);
      } else {
        this.circle(particle);
      }
    }
  }

  renderAutomata() {
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) this.circle(particles[i]);
  }

  renderNetworks() {
    this.ctx.lineWidth = 0.3;
    this.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = particles[i];
      const nAdjacentParticles = particle.nearby.length;
      for (let j = 0; j < nAdjacentParticles; j += 1) {
        this.line(particle.pos, particle.nearby[j]);
      }
      particle.nearby.length = 0;
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.client.displayWidth = this.width;
    this.client.displayHeight = this.height;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx.fillStyle = 'rgba(255,255,255,1)';
    this.ctx.strokeStyle = 'rgba(255,255,255,1)';
  }

  reset() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  mouse({ x, y }) {
    this.ctx.lineWidth = 1.5;
    this.strokeStyle = 'rgba(255,255,255,0.2)';
    this.ctx.beginPath();
    this.ctx.arc(
      x * this.width,
      y * this.height,
      0.008 * this.scale,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.stroke();
  }

  circle(particle) {
    const { pos } = particle;
    const size = particle.visualSize(this.scale);

    this.ctx.beginPath();
    this.ctx.arc(
      pos.x * this.width,
      pos.y * this.height,
      size,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fill();
  }

  dot({ pos }) {
    this.ctx.fillRect(pos.x * this.width, pos.y * this.height, 1, 1);
  }

  line(from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x * this.width, from.y * this.height);
    this.ctx.lineTo(to.x * this.width, to.y * this.height);
    this.ctx.stroke();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Display);


/***/ }),

/***/ "./src/interface/intro.js":
/*!********************************!*\
  !*** ./src/interface/intro.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const timesTutorialLeft = window.localStorage.getItem('dotsTutorial') || 2;

const addClass = (id, className) =>
  document.getElementById(id).classList.add(className);

const removeClass = (id, className) =>
  document.getElementById(id).classList.remove(className);

const sleep = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const startTutorial = async () => {
  await sleep(0);
  removeClass('title', 'hidden');
  await sleep(3);
  addClass('title', 'hidden');
  if (timesTutorialLeft !== '0') {
    removeClass('select-mode', 'hidden');
    addClass('mode', 'top-peek');
    document.querySelector('.mode').onclick = async () => {
      removeClass('mode', 'top-peek');
      addClass('select-mode', 'fade-out');
      await sleep(0.99);
      addClass('select-mode', 'hidden');
      removeClass('select-option', 'hidden');
      addClass('option', 'right-peek');
      document.querySelector('.option').onclick = async () => {
        removeClass('option', 'right-peek');
        addClass('select-option', 'fade-out');
        await sleep(1);
        addClass('select-option', 'hidden');
        removeClass('enjoy', 'hidden');
        await sleep(1);
        addClass('enjoy', 'fade-out');
        await sleep(0.49);
        addClass('enjoy', 'hidden');
        addClass('welcome', 'hidden');
      };
    };
    window.localStorage.setItem('dotsTutorial', timesTutorialLeft - 1);
  } else {
    addClass('welcome', 'hidden');
  }
};

/* harmony default export */ __webpack_exports__["default"] = (startTutorial);


/***/ }),

/***/ "./src/interface/presets.js":
/*!**********************************!*\
  !*** ./src/interface/presets.js ***!
  \**********************************/
/*! exports provided: paint, shoot, place */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paint", function() { return paint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shoot", function() { return shoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "place", function() { return place; });
/* harmony import */ var _simulator_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../simulator/particle */ "./src/simulator/particle.js");
/* harmony import */ var _simulator_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../simulator/vector */ "./src/simulator/vector.js");



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
    _simulator_vector__WEBPACK_IMPORTED_MODULE_1__["default"].direction(thatParticle.pos, thisParticle.pos).scale(
      a * (thisParticle.size + thatParticle.size) -
        thisParticle.pos.dist(thatParticle.pos)
    )
  );
};

const fakeGravity = (thisParticle, thatParticle) => {
  const scalar = thisParticle.mass / thisParticle.pos.dist(thatParticle.pos);
  const direction = _simulator_vector__WEBPACK_IMPORTED_MODULE_1__["default"].direction(thisParticle.pos, thatParticle.pos);
  thatParticle.accelerate(direction.scale(GRAVITATIONAL_CONSTANT * scalar));
};

class SpaceDebris extends _simulator_particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  visualSize(scale) {
    return Math.sqrt(this.mass) * scale;
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

class Automata extends _simulator_particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  inReach(pos, size) {
    return this.pos.dist(pos) < Math.SQRT2 * this.size + size;
  }

  interact(particle) {
    if (this.inReach(particle.pos, particle.size)) {
      moveAway(this, particle, Math.SQRT1_2);
    }
  }
}

class Network extends _simulator_particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(particleParams) {
    super(particleParams);
    this.nearby = [];
  }

  interact({ pos }) {
    if (this.isTouching(pos, 0)) this.nearby.push(pos);
  }
}

const spreadPosition = (mouse, spread) =>
  _simulator_vector__WEBPACK_IMPORTED_MODULE_1__["default"].randomDir(spread * Math.random()).add(mouse);

const paint = {
  stars: mouse =>
    new SpaceDebris({
      mass: 5e-7,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_1__["default"].randomDir(0.00001),
      pos: spreadPosition(mouse, 0.03)
    }),
  automata: mouse =>
    new Automata({
      radius: 5e-3,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_1__["default"].randomDir(0.001),
      pos: spreadPosition(mouse, 0.01)
    }),
  networks: mouse =>
    new Network({
      radius: 1e-1,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_1__["default"].randomDir(0.0002),
      pos: spreadPosition(mouse, 0.15)
    })
};

const shoot = {};

const place = {};

class HardSphere extends _simulator_particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  interact(particle) {
    if (this.isTouching(particle.pos, particle.size)) {
      particle.move(
        _simulator_vector__WEBPACK_IMPORTED_MODULE_1__["default"].direction(particle.pos, this.pos).scale(
          this.radius + particle.radius - this.pos.dist(particle.pos)
        )
      );
    }
  }
}


/***/ }),

/***/ "./src/interface/ui_builder.js":
/*!*************************************!*\
  !*** ./src/interface/ui_builder.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const BUTTONS_RIGHT = ['paint', 'shoot', 'place', 'reset'];
const BUTTONS_TOP = ['stars', 'gases', 'networks', 'automata'];

const buildUI = () => {
  for (let i = 0; i < BUTTONS_RIGHT.length; i += 1) {
    const uiElement = document.createElement('button');
    uiElement.className = 'btn';
    uiElement.id = BUTTONS_RIGHT[i];
    uiElement.innerText = BUTTONS_RIGHT[i];
    document.getElementById('option-buttons').appendChild(uiElement);
  }

  for (let i = 0; i < BUTTONS_TOP.length; i += 1) {
    const uiElement = document.createElement('button');
    uiElement.className = 'btn';
    uiElement.id = BUTTONS_TOP[i];
    uiElement.innerText = BUTTONS_TOP[i];
    document.getElementById('mode-buttons').appendChild(uiElement);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (buildUI);


/***/ }),

/***/ "./src/simulator/particle.js":
/*!***********************************!*\
  !*** ./src/simulator/particle.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/simulator/vector.js");


class Particle {
  constructor({
    pos = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0),
    vel = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0),
    mass = 0,
    charge = 0,
    radius = 0
  }) {
    this.pos = pos;
    this.vel = vel;
    this.mass = mass;
    this.charge = charge;
    this.radius = radius;

    this.protected = true;
  }

  get momentum() {
    return new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0).add(this.vel).scale(this.mass);
  }

  get size() {
    return this.radius;
  }

  visualSize(scale) {
    return this.radius * scale;
  }

  update() {
    this.pos.add(this.vel);
  }

  accelerate(amount) {
    this.vel.add(amount);
  }

  move(amount) {
    this.pos.add(amount);
  }

  grow(amount) {
    this.mass += amount;
  }

  delete() {
    this.protected = false;
  }

  isTouching(pos, offset) {
    return this.pos.dist(pos) < this.size + offset;
  }

  isContained(pos, offset) {
    return this.pos.dist(pos) < this.size - offset;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Particle);


/***/ }),

/***/ "./src/simulator/state.js":
/*!********************************!*\
  !*** ./src/simulator/state.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/simulator/vector.js");


class State {
  constructor(particles = []) {
    this.particles = particles;
    this.wall = true;
  }

  cleanup() {
    const nParticles = this.particles.length;
    let validParticles = 0;
    for (let i = 0; i < nParticles; i += 1) {
      const particle = this.particles[i];

      if (particle.protected) {
        if (i !== validParticles) this.particles[validParticles] = particle;
        validParticles += 1;
      }
    }
    this.particles.length = validParticles;
  }

  update() {
    const nParticles = this.particles.length;

    this.calculateInteractions(nParticles);
    this.updateParticles(nParticles);
    if (this.wall) this.walls(nParticles);
  }

  updateParticles(nParticles) {
    for (let i = 0; i < nParticles; i += 1) this.particles[i].update();
  }

  calculateInteractions(nParticles) {
    for (let i = 0; i < nParticles; i += 1) {
      for (let j = 0; j < nParticles; j += 1) {
        if (i !== j) {
          this.particles[i].interact(this.particles[j]);
        }
      }
    }
  }

  walls(nParticles) {
    for (let i = 0; i < nParticles; i += 1) {
      const { pos, vel, size } = this.particles[i];
      if (pos.x + size > 1 || pos.x - size < 0) {
        vel.subtract(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](vel.x, 0).scale(2));
      }

      if (pos.y + size > 1 || pos.y + size < 0) {
        vel.subtract(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, vel.y).scale(2));
      }
    }
  }

  reset() {
    this.particles.length = 0;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (State);


/***/ }),

/***/ "./src/simulator/vector.js":
/*!*********************************!*\
  !*** ./src/simulator/vector.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(that) {
    this.x += that.x;
    this.y += that.y;
    return this;
  }

  subtract(that) {
    this.x -= that.x;
    this.y -= that.y;
    return this;
  }

  scale(that) {
    this.x *= that;
    this.y *= that;
    return this;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  normalize() {
    if (!this.x && !this.y) return this;
    this.scale(1 / this.magnitude());
    return this;
  }

  sqDist(that) {
    const dX = (this.x - that.x) ** 2;
    const dY = (this.y - that.y) ** 2;
    return dX + dY;
  }

  dist(that) {
    const dX = this.x - that.x;
    const dY = this.y - that.y;
    return Math.hypot(dX, dY);
  }

  dot(that) {
    return this.x * that.x + this.y * that.y;
  }

  magnitude() {
    return Math.hypot(this.x, this.y);
  }

  static direction(from, to) {
    return new Vector(0, 0)
      .add(from)
      .subtract(to)
      .normalize();
  }

  static randomDir(scale = 1) {
    return new Vector(
      Math.random() - Math.random(),
      Math.random() - Math.random()
    )
      .normalize()
      .scale(scale);
  }

  static origin() {
    return new Vector(0, 0);
  }

  static clone(that) {
    return new Vector(that.x, that.y);
  }

  static random() {
    return new Vector(Math.random(), Math.random());
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Vector);


/***/ })

/******/ });
//# sourceMappingURL=main.js.map