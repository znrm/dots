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
/* harmony import */ var _interface_ui_elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interface/ui_elements */ "./src/interface/ui_elements.js");
/* harmony import */ var _simulator_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./simulator/state */ "./src/simulator/state.js");
/* harmony import */ var _simulator_vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./simulator/vector */ "./src/simulator/vector.js");






document.addEventListener('DOMContentLoaded', () => {
  Object(_interface_ui_elements__WEBPACK_IMPORTED_MODULE_2__["buildUI"])();
  Object(_interface_ui_elements__WEBPACK_IMPORTED_MODULE_2__["startTutorial"])();

  const state = new _simulator_state__WEBPACK_IMPORTED_MODULE_3__["default"]();
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
  window.Vector = _simulator_vector__WEBPACK_IMPORTED_MODULE_4__["default"];
  window.state = state;
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



const PAINT_RATE = 10;
const PAINT_SPREAD = 0.02;
const PAINT_VELOCITY = 0.0001;

class Client {
  constructor(state) {
    this.state = state;

    this.mouse = new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.mouseHistory = Array.from({ length: 5 }, () => new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0));

    this.wall = true;
    this.pressing = false;
    this.selectedAction = 'none';

    this.addEvents();
    this.createMouseField();
  }

  get pointer() {
    return _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(this.mouse, this.mouseHistory[0]);
  }

  spreadPosition() {
    return _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(PAINT_SPREAD * Math.random()).add(this.mouse);
  }

  resetMouse() {
    this.pressed = false;
  }

  newLargeAttractor() {
    const { particles } = this.state;

    particles.push(
      new _presets__WEBPACK_IMPORTED_MODULE_1__["Attractor"]({
        mass: 1 + 20 * Math.random(),
        pos: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(this.mouse),
        vel: this.pointer.scale(0.002),
      })
    );
  }

  newAttractor() {
    const { particles } = this.state;

    particles.push(
      new _presets__WEBPACK_IMPORTED_MODULE_1__["Attractor"]({
        mass: 0.05,
        vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(PAINT_VELOCITY),
        pos: this.spreadPosition(),
      })
    );
  }

  newHardSphere() {
    const { particles } = this.state;

    particles.push(
      new _presets__WEBPACK_IMPORTED_MODULE_1__["HardSphere"]({
        pos: this.spreadPosition(),
        radius: 0.01,
        vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(5 * PAINT_VELOCITY),
      })
    );
  }

  walls(particle) {
    if (this.walls) {
      if ((particle.pos.x + particle.radius) > 1 || (particle.pos.x - particle.radius) < 0) {
        particle.vel.subtract(new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](particle.vel.x, 0).scale(2));
      }

      if (particle.pos.y > 1 || particle.pos.y < 0) {
        particle.vel.subtract(new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, particle.vel.y).scale(2));
      }
    }
  }

  handleActions() {
    const { particles } = this.state;
    const nParticles = particles.length;
    if (this.pressing) this.continuousAction();

    for (let i = 0; i < nParticles; i += 1) {
      if (this.wall) this.walls(particles[i]);
    }
  }

  clickAction() {
    if (this.selectedAction === 'make one') {
      this.newLargeAttractor();
    }
  }

  continuousAction() {
    const { particles } = this.state;
    const nParticles = particles.length;

    switch (this.selectedAction) {
      case 'push':
        for (let i = 0; i < nParticles; i += 1) {
          this.mouseField.interact(particles[i]);
        }
        break;
      case 'paint':
        for (let i = 0; i <= PAINT_RATE; i += 1) this.newAttractor();
        break;
      case 'gas':
        for (let i = 0; i <= PAINT_RATE; i += 1) this.newHardSphere();
        break;
      default:
        break;
    }
  }

  createMouseField() {
    this.mouseField = new _presets__WEBPACK_IMPORTED_MODULE_1__["HardSphere"]({
      pos: this.mouse,
      radius: 0.01,
    });
  }

  toggleWalls() {
    this.wall = !this.wall;
    return this.wall;
  }

  addEvents() {
    const ui = document.getElementById('options-buttons');
    const canvas = document.querySelector('canvas');

    ui.onclick = this.integrateUI();
    ui.ontouchstart = this.integrateUI();

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

      this.clickAction();
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
    };
  }

  integrateUI() {
    return e => {
      switch (e.target.id) {
        case 'reset':
          this.state.reset();
          break;
        case 'walls': {
          if (this.toggleWalls()) {
            e.target.classList.remove('strike');
          } else {
            e.target.classList.add('strike');
          }
          break;
        }
        default:
          this.selectedAction = e.target.id;
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

  render() {
    this.mouse(this.client.mouse);
    this.renderParticles();
  }

  renderParticles() {
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = particles[i];
      if (particle.size <= 1) {
        this.dot(particle);
      } else {
        this.circle(particle);
      }
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
    this.strokeStyle = 'rgba(255,255,255,0.2)';
    this.ctx.beginPath();
    this.ctx.arc(x * this.width, y * this.height, 5, 0, 2 * Math.PI, false);
    this.ctx.stroke();
  }

  circle({ pos, size }) {
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
}

/* harmony default export */ __webpack_exports__["default"] = (Display);


/***/ }),

/***/ "./src/interface/presets.js":
/*!**********************************!*\
  !*** ./src/interface/presets.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (6:44)\nYou may need an appropriate loader to handle this file type.\n| const FUN_CONSTANT = -8e-9;\n| \n> const absorb = (thisParticle, thatParticle) {\n|   thisParticle.mass += thatParticle.mass;\n|   thatParticle.delete();");

/***/ }),

/***/ "./src/interface/ui_elements.js":
/*!**************************************!*\
  !*** ./src/interface/ui_elements.js ***!
  \**************************************/
/*! exports provided: buildUI, startTutorial */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/media/Cloud/OneDrive/Active/dots/src/interface/ui_elements.js'");

/***/ }),

/***/ "./src/simulator/state.js":
/*!********************************!*\
  !*** ./src/simulator/state.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class State {
  constructor(particles = []) {
    this.particles = particles;
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