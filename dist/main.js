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

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/vector.js");
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./particle */ "./src/particle.js");
/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./field */ "./src/field.js");




class Client {
  constructor(state) {
    this.state = state;

    this.mouse = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.mouseHistory = Array.from({ length: 3 }, () => new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0));
    this.displayWidth = window.innerWidth;
    this.displayHeight = window.innerHeight;

    this.wall = true;
    this.pressing = false;
    this.selectedAction = 2;

    this.actions = {
      1: 'mouseField',
      2: 'newGravityField',
      3: 'makeDots',
    };

    this.addEvents();
    this.integrateUI();
    this.createMouseField();
  }

  get pointer() {
    return _vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(this.mouse)
      .scale(2)
      .subtract(this.mouseHistory[0]);
  }

  resetMouse() {
    this.pressed = false;
  }

  newParticle() {
    const { particles } = this.state;
    particles.push(_particle__WEBPACK_IMPORTED_MODULE_1__["default"].random(this.mouse));
  }

  newGravityField() {
    const { fields } = this.state;
    fields.push(
      new _field__WEBPACK_IMPORTED_MODULE_2__["default"]({
        fieldType: 'funCombinationField',
        mass: 1 + 20 * Math.random(),
        pos: _vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(this.mouse),
        vel: this.pointer.subtract(this.mouse).scale(0.03),
        radius: 100,
      }),
    );
  }

  makeDots() {
    const { particles } = this.state;
    for (let i = 0; i < 100; i += 1) {
      particles.push(
        new _particle__WEBPACK_IMPORTED_MODULE_1__["default"]({
          vel: _vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(0.00005),
          pos: _vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(0.01).add(this.mouse),
        }),
      );
    }
  }

  walls(particle) {
    if (this.walls) {
      if (particle.pos.x > 1 || particle.pos.x < 0) {
        particle.vel.subtract(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](particle.vel.x, 0).scale(2));
      }

      if (particle.pos.y > 1 || particle.pos.y < 0) {
        particle.vel.subtract(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, particle.vel.y).scale(2));
      }
    }
  }

  handleActions(nParticles, nFields) {
    const { particles, fields } = this.state;

    for (let i = 0; i < nParticles; i += 1) {
      if (this.pressing) this.mouseField.interact(particles[i]);
      if (this.wall) this.walls(particles[i]);
    }
    for (let i = 0; i < nFields; i += 1) {
      if (this.pressing) this.mouseField.interact(fields[i]);
      if (this.wall) this.walls(fields[i]);
    }
  }

  recordMouse(prevMouse) {
    this.mouseHistory.shift();
    this.mouseHistory.push(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(prevMouse));
  }

  createMouseField() {
    this.mouseField = new _field__WEBPACK_IMPORTED_MODULE_2__["default"]({
      pos: this.mouse,
      fieldType: 'noEffect',
      radius: 0.01,
    });
  }

  addEvents() {
    document.querySelector('canvas').onmousedown = e => {
      this.mouse.moveTo(
        e.clientX / this.displayWidth,
        e.clientY / this.displayHeight,
      );
      this.pressing = true;

      if (this.selectedAction !== 1) {
        this[this.actions[this.selectedAction]]();
      }
    };

    document.onmousemove = e => {
      this.recordMouse(this.mouse);
      this.mouse.moveTo(
        e.clientX / this.displayWidth,
        e.clientY / this.displayHeight,
      );
    };

    document.onmouseup = () => {
      this.pressing = false;
    };

    const toggleWalls = () => {
      this.wall = !this.wall;
      return this.wall;
    };

    document
      .getElementById('wall')
      .addEventListener('click', function wallButton() {
        if (toggleWalls()) {
          this.classList.remove('strike');
        } else {
          this.classList.add('strike');
        }
      });
  }

  integrateUI() {
    document.getElementById('ui').onclick = e => {
      switch (e.target.id) {
        case 'push':
          this.mouseField.fieldType = 'radialPush';
          this.selectedAction = 1;
          break;
        case 'make':
          this.mouseField.fieldType = 'noEffect';
          this.selectedAction = 3;
          break;
        case 'pull':
          this.mouseField.fieldType = 'pull';
          this.selectedAction = 1;
          break;
        case 'shoot':
          this.mouseField.fieldType = 'noEffect';
          this.selectedAction = 2;
          break;
        default:
          break;
      }
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Client);


/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
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

  render(nParticles, nFields) {
    const { particles, fields } = this.state;
    for (let i = 0; i < nParticles; i += 1) this.dot(particles[i]);
    for (let i = 0; i < nFields; i += 1) this.circle(fields[i]);
    this.mouse(this.client.mouse);
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
    this.strokeStyle = 'rgba(255,255,255,0.2)';
    this.ctx.beginPath();
    this.ctx.arc(x * this.width, y * this.height, 5, 0, 2 * Math.PI, false);
    this.ctx.stroke();
  }

  line(from, to) {
    this.ctx.beginPath();
    this.ctx.moveTo(from.x * this.width, from.y * this.height);
    this.ctx.lineTo(to.x * this.width, to.y * this.height);
    this.ctx.stroke();
  }

  circle({ pos, mass }) {
    this.ctx.beginPath();
    this.ctx.arc(
      pos.x * this.width,
      pos.y * this.height,
      Math.sqrt(mass),
      0,
      2 * Math.PI,
      false,
    );
    this.ctx.fill();
  }

  dot({ pos }) {
    this.ctx.fillRect(pos.x * this.width, pos.y * this.height, 1, 1);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Display);


/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client */ "./src/client.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vector */ "./src/vector.js");





document.addEventListener('DOMContentLoaded', () => {
  const state = new _state__WEBPACK_IMPORTED_MODULE_2__["default"]();
  const client = new _client__WEBPACK_IMPORTED_MODULE_1__["default"](state);
  const display = new _display__WEBPACK_IMPORTED_MODULE_0__["default"](state, client);

  const run = () => {
    window.requestAnimationFrame(run);

    const nParticles = state.particles.length;
    const nFields = state.fields.length;

    display.reset();
    display.render(nParticles, nFields);

    client.handleActions(nParticles, nFields);
    client.resetMouse();

    state.update(nParticles, nFields);
    state.cleanup();
  };
  window.Vector = _vector__WEBPACK_IMPORTED_MODULE_3__["default"];
  run();
});


/***/ }),

/***/ "./src/field.js":
/*!**********************!*\
  !*** ./src/field.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./src/particle.js");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector */ "./src/vector.js");



const FUN_CONSTANT = -3e-9;

class Field extends _particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ pos, vel, acc, mass, charge, fieldType, radius }) {
    super({ pos, vel, acc, mass, charge });
    this.fieldType = fieldType || '';
    this.radius = radius;
  }

  interact(particle) {
    if (this.isInRadius(particle.pos)) {
      this[this.fieldType](particle);
    }
  }

  isInRadius(pos) {
    const distance = this.pos.sqDist(pos);

    return distance && distance < this.radius;
  }

  radialAccelerate(particle, amount) {
    particle.accelerate(
      _vector__WEBPACK_IMPORTED_MODULE_1__["default"].clone(particle.pos)
        .subtract(this.pos)
        .scale(amount),
    );
  }

  noEffect() {
    return this.fieldType;
  }

  grab(particle) {
    if (this.pos.sqDist(particle.pos) < 0.03) {
      const { x, y } = this.pos;
      const difference = new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](x, y).subtract(particle.pos);
      particle.pos.moveTo(x, y).add(difference);
    }
  }

  radialPush(particle) {
    particle.moveAwayFrom(
      this.radius - this.pos.sqDist(particle.pos),
      this.pos,
    );
  }

  funCombinationField(particle) {
    const sqDistance = this.pos.sqDist(particle.pos);
    if (sqDistance > 5e-3) {
      this.radialAccelerate(
        particle,
        this.mass * FUN_CONSTANT / (this.pos.dist(particle.pos) * sqDistance),
      );
    } else if (sqDistance > 5e-7 * this.mass) {
      this.radialAccelerate(
        particle,
        this.mass * FUN_CONSTANT / sqDistance,
      );
    } else if (this.protected && particle.protected) {
      this.mass += particle.mass;
      this.vel = particle.momentum
        .add(this.momentum)
        .scale(1 / (this.mass + particle.mass));
      particle.delete();
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Field);


/***/ }),

/***/ "./src/particle.js":
/*!*************************!*\
  !*** ./src/particle.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/vector.js");


class Particle {
  constructor({
    pos = _vector__WEBPACK_IMPORTED_MODULE_0__["default"].origin(),
    vel = _vector__WEBPACK_IMPORTED_MODULE_0__["default"].origin(),
    mass = 0.05,
    charge = 0,
    action = null,
  }) {
    this.pos = pos;
    this.vel = vel;
    this.mass = mass;
    this.charge = charge;
    this.action = action;

    this.protected = true;
  }

  get momentum() {
    return _vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(this.vel).scale(this.mass);
  }

  update() {
    this.pos.add(this.vel);
  }

  delete() {
    this.protected = false;
  }

  accelerate(amount) {
    this.vel.add(amount);
  }

  receiveFrom(amount, location) {
    this.vel.add(
      _vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(this.pos, location)
        .scale(amount),
    );
  }

  moveAwayFrom(distance, location) {
    this.pos.add(
      _vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(this.pos, location)
        .scale(distance),
    );
  }

  static random(initial) {
    const pos = initial || _vector__WEBPACK_IMPORTED_MODULE_0__["default"].random();
    const vel = _vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(0.00005);

    return new Particle({ pos, vel });
  }

  static randomStart(nParticles) {
    const particles = [];
    for (let i = 0; i < nParticles; i += 1) {
      particles.push(Particle.random());
    }
    return particles;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Particle);


/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class State {
  constructor(particles = [], fields = []) {
    this.particles = particles;
    this.fields = fields;
  }

  cleanup() {
    this.particles = this.particles.filter(
      particle => particle.protected,
    );
    this.fields = this.fields.filter(field => field.protected);
  }

  update(nParticles, nFields) {
    for (let i = 0; i < nParticles; i += 1) {
      for (let j = 0; j < nFields; j += 1) this.fields[j].interact(this.particles[i]);
    }

    for (let i = 0; i < nFields; i += 1) {
      for (let j = 0; j < nFields; j += 1) this.fields[j].interact(this.fields[i]);
    }

    for (let i = 0; i < nParticles; i += 1) this.particles[i].update();
    for (let i = 0; i < nFields; i += 1) this.fields[i].update();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (State);


/***/ }),

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
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
    const dX = this.x - that.x;
    const dY = this.y - that.y;
    return dX * dX + dY * dY;
  }

  invCubedDist(that) {
    return (1 / (this.dist(that) ** 3));
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
      Math.random() - Math.random(),
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