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
    if (client.mode === 'stars') state.cleanup();
  };
  window.Vector = _simulator_vector__WEBPACK_IMPORTED_MODULE_5__["default"];
  window.state = state;
  window.client = client;
  run();
});


/***/ }),

/***/ "./src/interface/actions.js":
/*!**********************************!*\
  !*** ./src/interface/actions.js ***!
  \**********************************/
/*! exports provided: paint, shoot, place */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paint", function() { return paint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shoot", function() { return shoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "place", function() { return place; });
/* harmony import */ var _simulator_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../simulator/vector */ "./src/simulator/vector.js");
/* harmony import */ var _presets_star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presets/star */ "./src/interface/presets/star.js");
/* harmony import */ var _presets_automaton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./presets/automaton */ "./src/interface/presets/automaton.js");
/* harmony import */ var _presets_gas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./presets/gas */ "./src/interface/presets/gas.js");
/* harmony import */ var _presets_network__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presets/network */ "./src/interface/presets/network.js");






const spreadPosition = (mouse, spread) =>
  _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(spread * Math.random()).add(mouse);

const paint = {
  stars: mouse =>
    new _presets_star__WEBPACK_IMPORTED_MODULE_1__["default"]({
      mass: 5e-7,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(0.00001),
      pos: spreadPosition(mouse, 0.03)
    }),
  gases: mouse =>
    new _presets_gas__WEBPACK_IMPORTED_MODULE_3__["default"]({
      radius: 5e-3,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(0.0001),
      pos: spreadPosition(mouse, 0.1)
    }),
  automata: mouse =>
    new _presets_automaton__WEBPACK_IMPORTED_MODULE_2__["default"]({
      radius: 6e-3,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(0.001),
      pos: spreadPosition(mouse, 0.01)
    }),
  networks: mouse =>
    new _presets_network__WEBPACK_IMPORTED_MODULE_4__["default"]({
      radius: 1e-1,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].randomDir(0.0002),
      pos: spreadPosition(mouse, 0.15)
    })
};

const shoot = {
  stars: (mouse, pointer) =>
    new _presets_star__WEBPACK_IMPORTED_MODULE_1__["default"]({
      mass: 3e-6,
      vel: pointer.scale(0.007),
      pos: spreadPosition(mouse, 1e-2)
    }),
  gases: (mouse, pointer) =>
    new _presets_gas__WEBPACK_IMPORTED_MODULE_3__["default"]({
      radius: 5e-3,
      vel: pointer.scale(0.006),
      pos: spreadPosition(mouse, 1e-6)
    }),
  automata: (mouse, pointer) =>
    new _presets_automaton__WEBPACK_IMPORTED_MODULE_2__["default"]({
      radius: 6e-3,
      vel: pointer.scale(0.003),
      pos: spreadPosition(mouse, 0.01)
    }),
  networks: (mouse, pointer) =>
    new _presets_network__WEBPACK_IMPORTED_MODULE_4__["default"]({
      radius: 1e-1,
      vel: pointer.scale(0.003),
      pos: spreadPosition(mouse, 0.05)
    })
};

const place = {
  stars: mouse =>
    new _presets_star__WEBPACK_IMPORTED_MODULE_1__["default"]({
      mass: 5e-5,
      vel: new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0),
      pos: spreadPosition(mouse, 1e-3)
    }),
  gases: mouse =>
    new _presets_gas__WEBPACK_IMPORTED_MODULE_3__["default"]({
      vel: new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0),
      pos: spreadPosition(mouse, 1e-3),
      radius: 5e-3
    }),
  automata: mouse =>
    new _presets_automaton__WEBPACK_IMPORTED_MODULE_2__["default"]({
      radius: 6e-3,
      vel: new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0),
      pos: spreadPosition(mouse, 1e-3)
    }),
  networks: mouse =>
    new _presets_network__WEBPACK_IMPORTED_MODULE_4__["default"]({
      radius: 1e-1,
      vel: new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0),
      pos: spreadPosition(mouse, 1e-3)
    })
};


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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./src/interface/actions.js");



class Client {
  constructor(state) {
    this.state = state;

    this.mouse = new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.mouseHistory = Array.from({ length: 5 }, () => new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0));

    this.pressing = false;

    this.mode = 'stars';
    this.action = 'paint';

    this.paint = _actions__WEBPACK_IMPORTED_MODULE_1__["paint"];
    this.shoot = _actions__WEBPACK_IMPORTED_MODULE_1__["shoot"];
    this.place = _actions__WEBPACK_IMPORTED_MODULE_1__["place"];

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
    const { particles } = this.state;
    if (this.action === 'place') {
      particles.push(this.place[this.mode](this.mouse));
    }
  }

  continuousAction() {
    const { particles } = this.state;
    if (this.action !== 'place') {
      particles.push(this[this.action][this.mode](this.mouse, this.pointer));
    }
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
    option.ontouchend = this.selectAction();

    mode.onclick = this.selectMode();
    mode.ontouchend = this.selectMode();

    canvas.onmousedown = this.mouseDown();
    canvas.ontouchstart = this.mouseDown();

    document.onmousemove = this.mouseMove();
    document.ontouchmove = this.mouseMove();

    canvas.onmouseup = this.mouseUp();
    canvas.ontouchend = this.mouseUp();
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
      if (this.mode !== e.target.id) {
        this.state.reset();
        this.mode = e.target.id;
      }
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
const sizeToRGB = size => {
  const rC = -(18 ** 4);
  const gC = -(15 ** 4);
  const bC = -(11 ** 4);

  const rExp = (size - 0.045) ** 4;
  const gExp = (size - 0.07) ** 4;
  const bExp = (size - 0.11) ** 4;

  const red = 255 * (rC * rExp + 1);
  const green = 255 * (gC * gExp + 1);
  const blue = 255 * (bC * bExp + 1);

  return `${red},${green},${blue}`;
};

const speedToHSL = vel => {
  const speed = vel.magnitude();
  const hue = Math.min(120 * (speed / 0.01) + 240, 360);
  return `hsl(${hue},100%,50%)`;
};

const directionToColor = ({ x }) => {
  if (x > 0) return 'blue';
  if (x < 0) return 'green';
  return 'grey';
};

class Display {
  constructor(state, client) {
    this.state = state;
    this.client = client;

    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: false });

    this.resize()();
    this.reset();

    window.onresize = this.resize();
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
        this.ctx.fillStyle = 'SandyBrown';
        this.dot(particle);
      } else {
        this.star(particle);
      }
    }
  }

  renderAutomata() {
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) this.automata(particles[i]);
  }

  renderGases() {
    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) this.gas(particles[i]);
  }

  renderNetworks() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 0.3;
    this.ctx.strokeStyle = 'rgba(255,255,255,0.5)';

    const { particles } = this.state;
    const nParticles = particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = particles[i];
      const fromX = particle.pos.x * this.width;
      const fromY = particle.pos.y * this.height;
      this.ctx.fillRect(fromX, fromY, 1, 1);

      const nAdjacentParticles = particle.nearby.length;
      for (let j = 0; j < nAdjacentParticles; j += 1) {
        const toX = particle.nearby[j].x * this.width;
        const toY = particle.nearby[j].y * this.height;

        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
      }
      particle.nearby.length = 0;
    }

    this.ctx.stroke();
    this.ctx.closePath();
  }

  resize() {
    return () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.client.displayWidth = this.width;
      this.client.displayHeight = this.height;

      this.canvas.width = this.width;
      this.canvas.height = this.height;
    };
  }

  reset() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'rgba(255,255,255,1)';
    this.ctx.strokeStyle = 'rgba(255,255,255,1)';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    this.ctx.globalCompositeOperation = 'screen';
  }

  mouse({ x, y }) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1.5;
    this.strokeStyle = 'rgba(255,255,255,0.2)';
    this.ctx.arc(
      x * this.width,
      y * this.height,
      0.008 * this.scale,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }

  star(particle) {
    const { pos } = particle;
    const size = particle.visualSize(this.scale);
    const color = sizeToRGB(particle.size);
    this.ctx.fillStyle = `rgba(${color},1)`;
    this.ctx.shadowBlur = 2 * size;
    this.ctx.shadowColor = `rgba(${color},1)`;

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

  automata(particle) {
    const { pos } = particle;
    const size = particle.visualSize(this.scale);

    this.ctx.beginPath();
    this.ctx.fillStyle = directionToColor(particle.vel);
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

  gas(particle) {
    const { pos } = particle;
    const size = particle.visualSize(this.scale);

    this.ctx.beginPath();
    this.ctx.fillStyle = speedToHSL(particle.vel);
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
    this.ctx.closePath();
  }

  subLine(from, to) {
    this.ctx.moveTo(from.x * this.width, from.y * this.height);
    this.ctx.lineTo(to.x * this.width, to.y * this.height);
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
const introsLeft = () => {
  const dotsIntros = window.localStorage.getItem('dotsIntros') || 2;
  window.localStorage.setItem('dotsIntros', Math.max(dotsIntros - 1, 0));
  return parseInt(dotsIntros, 10);
};

const addClass = (id, className) => () =>
  document.getElementById(id).classList.add(className);

const removeClass = (id, className) => () =>
  document.getElementById(id).classList.remove(className);

const hide = id => addClass(id, 'hidden');
const show = id => removeClass(id, 'hidden');
const fade = id => addClass(id, 'fade-out');

const sleep = idealSeconds => () =>
  new Promise(resolve => setTimeout(resolve, idealSeconds * 990));

const waitForModeSelection = () =>
  new Promise(resolve => {
    document.querySelector('.mode').onclick = resolve;
  });

const waitForOptionSelection = () =>
  new Promise(resolve => {
    document.querySelector('.option').onclick = resolve;
  });

const welcome = () => {
  if (introsLeft()) {
    Promise.resolve()
      .then(show('title'))
      .then(sleep(3))
      .then(hide('title'))
      .then(show('select-mode'))
      .then(addClass('mode', 'top-peek'))
      .then(waitForModeSelection)
      .then(removeClass('mode', 'top-peek'))
      .then(fade('select-mode'))
      .then(sleep(1))
      .then(hide('select-mode'))
      .then(show('select-option'))
      .then(addClass('option', 'right-peek'))
      .then(waitForOptionSelection)
      .then(removeClass('option', 'right-peek'))
      .then(fade('select-option'))
      .then(sleep(1))
      .then(hide('select-option'))
      .then(show('enjoy'))
      .then(sleep(1))
      .then(fade('enjoy'))
      .then(sleep(1))
      .then(addClass('enjoy', 'hidden'))
      .then(hide('welcome'));
  } else {
    Promise.resolve()
      .then(show('title'))
      .then(sleep(3))
      .then(hide('welcome'));
  }
};

/* harmony default export */ __webpack_exports__["default"] = (welcome);


/***/ }),

/***/ "./src/interface/presets/automaton.js":
/*!********************************************!*\
  !*** ./src/interface/presets/automaton.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simulator_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../simulator/particle */ "./src/simulator/particle.js");
/* harmony import */ var _simulator_interactions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../simulator/interactions */ "./src/simulator/interactions.js");



class Automaton extends _simulator_particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  inReach(pos, size) {
    return this.pos.sqDist(pos) < (2 * this.size + size) ** 2;
  }

  interact(particle) {
    if (this.inReach(particle.pos, particle.size)) {
      Object(_simulator_interactions__WEBPACK_IMPORTED_MODULE_1__["moveAway"])(this, particle, 1.1);
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Automaton);


/***/ }),

/***/ "./src/interface/presets/gas.js":
/*!**************************************!*\
  !*** ./src/interface/presets/gas.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simulator_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../simulator/particle */ "./src/simulator/particle.js");
/* harmony import */ var _simulator_interactions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../simulator/interactions */ "./src/simulator/interactions.js");



class Gas extends _simulator_particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get size() {
    return 0.001;
  }

  interact(particle) {
    Object(_simulator_interactions__WEBPACK_IMPORTED_MODULE_1__["pushAway"])(this, particle, 0.0001);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Gas);


/***/ }),

/***/ "./src/interface/presets/network.js":
/*!******************************************!*\
  !*** ./src/interface/presets/network.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simulator_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../simulator/particle */ "./src/simulator/particle.js");


class Network extends _simulator_particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(particleParams) {
    super(particleParams);
    this.nearby = [];
  }

  interact({ pos }) {
    if (this.isTouching(pos, 0)) this.nearby.push(pos);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Network);


/***/ }),

/***/ "./src/interface/presets/star.js":
/*!***************************************!*\
  !*** ./src/interface/presets/star.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simulator_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../simulator/particle */ "./src/simulator/particle.js");
/* harmony import */ var _simulator_interactions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../simulator/interactions */ "./src/simulator/interactions.js");



class Star extends _simulator_particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
  visualSize(scale) {
    return Math.sqrt(this.mass) * scale;
  }

  get size() {
    return Math.sqrt(this.mass);
  }

  interact(particle) {
    const { pos, size } = particle;

    if (this.isTouching(pos, 0.1 * size) && this.protected) {
      Object(_simulator_interactions__WEBPACK_IMPORTED_MODULE_1__["inelasticCollide"])(this, particle);
      Object(_simulator_interactions__WEBPACK_IMPORTED_MODULE_1__["absorb"])(this, particle);
    } else {
      Object(_simulator_interactions__WEBPACK_IMPORTED_MODULE_1__["fakeGravity"])(this, particle);
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Star);


/***/ }),

/***/ "./src/interface/ui_builder.js":
/*!*************************************!*\
  !*** ./src/interface/ui_builder.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const buildButtons = (buttonNames, buttonContainerID) => {
  for (let i = 0; i < buttonNames.length; i += 1) {
    const uiElement = document.createElement('button');
    uiElement.className = 'btn';
    uiElement.id = buttonNames[i];
    uiElement.innerText = buttonNames[i];
    document.getElementById(buttonContainerID).appendChild(uiElement);
  }
};

const buildUI = () => {
  buildButtons(['paint', 'shoot', 'place', 'reset'], 'option-buttons');
  buildButtons(['stars', 'gases', 'networks', 'automata'], 'mode-buttons');
};

/* harmony default export */ __webpack_exports__["default"] = (buildUI);


/***/ }),

/***/ "./src/simulator/interactions.js":
/*!***************************************!*\
  !*** ./src/simulator/interactions.js ***!
  \***************************************/
/*! exports provided: absorb, inelasticCollide, moveAway, fakeGravity, pushAway */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "absorb", function() { return absorb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inelasticCollide", function() { return inelasticCollide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveAway", function() { return moveAway; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fakeGravity", function() { return fakeGravity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushAway", function() { return pushAway; });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/simulator/vector.js");


const PULL_CONSTANT = 0.025;
const PUSH_CONSTANT = 2e-11;

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
    _vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(thatParticle.pos, thisParticle.pos).scale(
      a * (thisParticle.size + thatParticle.size)
        - thisParticle.pos.dist(thatParticle.pos)
    )
  );
};

const fakeGravity = (thisParticle, thatParticle) => {
  const scalar = thisParticle.mass / thisParticle.pos.sqDist(thatParticle.pos);
  const direction = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0)
    .add(thisParticle.pos)
    .subtract(thatParticle.pos);

  thatParticle.accelerate(direction.scale(PULL_CONSTANT * scalar));
};

const pushAway = (thisParticle, thatParticle, maxAcc) => {
  const sqDist = thisParticle.pos.sqDist(thatParticle.pos);
  const scalar = Math.min(PUSH_CONSTANT / (sqDist * sqDist), maxAcc);
  const direction = _vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(thatParticle.pos, thisParticle.pos);
  thatParticle.accelerate(direction.scale(scalar));
};


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

  update() {
    this.pos.add(this.vel);
  }

  visualSize(scale) {
    return this.radius * scale;
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
    return this.pos.sqDist(pos) < (this.size + offset) ** 2;
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
        if (i !== j && this.particles[i].protected) {
          this.particles[i].interact(this.particles[j]);
        }
      }
    }
  }

  walls(nParticles) {
    for (let i = 0; i < nParticles; i += 1) {
      const { pos, vel, size } = this.particles[i];
      const rightDist = 1 - size - pos.x;
      const bottomDist = 1 - size - pos.y;
      const leftDist = pos.x - size;
      const topDist = pos.y - size;

      if (rightDist < 0) {
        vel.subtract(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](vel.x, 0).scale(2));
        pos.add(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](rightDist, 0));
      } else if (leftDist < 0) {
        vel.subtract(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](vel.x, 0).scale(2));
        pos.subtract(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](leftDist, 0));
      } else if (bottomDist < 0) {
        vel.subtract(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, vel.y).scale(2));
        pos.add(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, bottomDist));
      } else if (topDist < 0) {
        vel.subtract(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, vel.y).scale(2));
        pos.subtract(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, topDist));
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
    if (this.x || this.y) {
      this.scale(1 / this.magnitude());
    }
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