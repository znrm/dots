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
  constructor(particles, fields) {
    this.mouse = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.mouseHistory = Array.from({ length: 2 }, () => new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0));

    this.wall = true;
    this.pressing = false;
    this.previousMouse = [];

    this.particles = particles;
    this.fields = fields;

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

  get mouseAction() {
    return this[this.actions[this.selectedAction]];
  }

  resetMouse() {
    this.pressed = false;
  }

  newParticle() {
    this.particles.push(_particle__WEBPACK_IMPORTED_MODULE_1__["default"].random(this.mouse));
  }

  newGravityField() {
    this.fields.push(
      new _field__WEBPACK_IMPORTED_MODULE_2__["default"]({
        fieldType: 'invSquare',
        mass: 1 + 10 * Math.random(),
        pos: _vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(this.mouse),
        vel: this.pointer.subtract(this.mouse).scale(0.05),
        radius: 5,
      }),
    );
  }

  recordMouse(prevMouse) {
    this.mouseHistory.shift();
    this.mouseHistory.push(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(prevMouse));
  }

  createMouseField() {
    this.mouseField = new _field__WEBPACK_IMPORTED_MODULE_2__["default"]({
      pos: this.mouse,
      fieldType: 'noEffect',
      radius: 0.04,
    });
  }

  addEvents() {
    document.onmousedown = e => {
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
      this.pressing = true;

      if (this.selectedAction !== 1) {
        this.mouseAction();
      }
    };

    document.onmousemove = e => {
      this.recordMouse(this.mouse);
      this.mouse.moveTo(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
    };

    document.onmouseup = () => {
      this.pressing = false;
    };
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
          this.selectedAction = 2;
          break;
        case 'grab':
          this.mouseField.fieldType = 'grab';
          this.selectedAction = 1;
          break;
        case 'wall':
          this.wall = !this.wall;
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
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.resize.bind(this)();
    this.ctx.fillStyle = 'rgba(255,255,255,1)';
    this.ctx.strokeStyle = 'rgba(255,255,255,1)';

    window.onresize = () => this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
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

  circle({ x, y }) {
    this.ctx.beginPath();
    this.ctx.arc(x * this.width, y * this.height, 2, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  dot({ x, y }) {
    this.ctx.fillRect(x * this.width, y * this.height, 1, 1);
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
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./particle */ "./src/particle.js");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vector */ "./src/vector.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environment */ "./src/environment.js");






document.addEventListener('DOMContentLoaded', () => {
  const display = new _display__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector('canvas'));
  const particles = _particle__WEBPACK_IMPORTED_MODULE_2__["default"].randomStart(100);
  const fields = [];
  const client = new _client__WEBPACK_IMPORTED_MODULE_1__["default"](particles, fields);

  const run = () => {
    display.reset();


    const nParticles = particles.length;
    const nFields = fields.length;

    for (let i = 0; i < nParticles; i += 1) {
      if (client.pressing) {
        client.mouseField.interact(particles[i]);
      }

      if (client.wall) {
        Object(_environment__WEBPACK_IMPORTED_MODULE_4__["default"])(particles[i]);
      }

      for (let j = 0; j < nFields; j += 1) {
        fields[j].interact(particles[i]);
      }

      display.dot(particles[i].update());
    }

    for (let i = 0; i < nFields; i += 1) {
      if (client.pressing) {
        client.mouseField.interact(fields[i]);
      }
      if (client.wall) {
        Object(_environment__WEBPACK_IMPORTED_MODULE_4__["default"])(fields[i]);
      }

      for (let j = 0; j < nFields; j += 1) {
        fields[j].interact(fields[i]);
      }
    }
    for (let i = 0; i < nFields; i += 1) {
      display.circle(fields[i].update());
    }

    display.mouse(client.mouse);

    client.resetMouse();
    window.requestAnimationFrame(run);
  };

  // testing only
  window.display = display;
  window.fields = fields;
  window.client = client;
  window.Vector = _vector__WEBPACK_IMPORTED_MODULE_3__["default"];

  run();
});


/***/ }),

/***/ "./src/environment.js":
/*!****************************!*\
  !*** ./src/environment.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/vector.js");


const walls = particle => {
  if (particle.pos.x > 1 || particle.pos.x < 0) {
    particle.vel.scale(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](-1, 1));
  }

  if (particle.pos.y > 1 || particle.pos.y < 0) {
    particle.vel.scale(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, -1));
  }
};

/* harmony default export */ __webpack_exports__["default"] = (walls);


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


const RADIAL_CONSTANT = 1e-3;
const GRAVITATIONAL_CONSTANT = -1e-8;

class Field extends _particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ pos, vel, acc, mass, charge, fieldType, radius }) {
    super({ pos, vel, acc, mass, charge });
    this.fieldType = fieldType || '';
    this.radius = radius;
  }

  interact(particle) {
    if (this.isInRadius(particle)) {
      this[this.fieldType](particle);
    }
  }

  isInRadius({ pos }) {
    const distance = this.pos.dist(pos);

    return distance && distance < this.radius;
  }

  noEffect() {
    return this.fieldType;
  }

  grab(particle) {
    if (this.pos.dist(particle.pos) < 0.03) {
      const { x, y } = this.pos;
      particle.pos.moveTo(x, y);
    }
  }

  radialPush(particle) {
    particle.moveAwayFrom(this.radius - this.pos.dist(particle.pos), this.pos);
  }

  constRadialAcc(particle) {
    particle.receiveFrom(RADIAL_CONSTANT, this.pos);
  }

  invSquare(particle) {
    const sqDistance = this.pos.sqDist(particle.pos);
    if (sqDistance > 0.00005) {
      particle.receiveFrom(GRAVITATIONAL_CONSTANT / sqDistance, this.pos);
    } else {
      particle.receiveFrom(GRAVITATIONAL_CONSTANT / this.pos.dist(particle.pos), this.pos);
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
  constructor({ pos, vel, acc, mass, charge }) {
    this.pos = pos || new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.vel = vel || new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.acc = acc || new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.mass = mass || 1;
    this.charge = charge || 0;
  }

  update() {
    this.pos.add(this.vel.add(this.acc));
    this.acc.moveTo(0, 0);
    return this.pos;
  }

  momentum() {
    return _vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(this.vel).scale(this.mass);
  }

  receiveFrom(amount, location) {
    this.acc.add(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(this.pos, location).normalize().scale(amount));
  }

  moveAwayFrom(distance, location) {
    this.pos.add(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(this.pos, location).normalize().scale(distance));
  }

  static random(initial) {
    const pos = initial || _vector__WEBPACK_IMPORTED_MODULE_0__["default"].random();
    const vel = _vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(0.0001);

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
    if (that instanceof Object) {
      this.x *= that.x;
      this.y *= that.y;
    } else {
      this.x *= that;
      this.y *= that;
    }
    return this;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  project(onto) {
    this.scale(Vector.clone(onto).normalize());
    return this;
  }

  normalize() {
    const magnitude = this.magnitude();
    if (magnitude === 0) {
      this.x = 0;
      this.y = 0;
    } else {
      this.scale({ x: 1 / magnitude, y: 1 / magnitude });
    }
    return this;
  }

  sqDist(that) {
    const dX = this.x - that.x;
    const dY = this.y - that.y;
    return dX * dX + dY * dY;
  }

  dist(that) {
    return Math.hypot(this.x - that.x, this.y - that.y);
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

  static clone(vector) {
    return new Vector(vector.x, vector.y);
  }

  static random() {
    return new Vector(Math.random(), Math.random());
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Vector);


/***/ })

/******/ });
//# sourceMappingURL=main.js.map