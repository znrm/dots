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






window.onload = () => {
  Object(_interface_ui_builder__WEBPACK_IMPORTED_MODULE_2__["default"])();
  Object(_interface_intro__WEBPACK_IMPORTED_MODULE_3__["default"])();

  const simulation = new _simulator_state__WEBPACK_IMPORTED_MODULE_4__["default"]();
  const client = new _interface_client__WEBPACK_IMPORTED_MODULE_1__["default"](simulation);
  const display = new _interface_display__WEBPACK_IMPORTED_MODULE_0__["default"](simulation, client);

  const run = () => {
    requestAnimationFrame(run);
    display.render();
    simulation.update();
  };

  run();
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
/* harmony import */ var _util_particle_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/particle_actions */ "./src/interface/util/particle_actions.js");



class Client {
  constructor(state) {
    this.state = state;
    this.state.needsCleaning = true;

    this.mouse = new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.mouseHistory = Array.from({ length: 4 }, () => new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0));

    this.pressing = false;
    this.msPerAction = 21;

    this.particleType = 'stars';
    this.selectedAction = 'paint';

    this.actions = _util_particle_actions__WEBPACK_IMPORTED_MODULE_1__["default"];

    this.addEvents();
  }

  get pointer() {
    return _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(this.mouse, this.mouseHistory[0]);
  }

  handleActions() {
    return () => {
      if (this.selectedAction !== 'place') this.continuousAction();
    };
  }

  clickAction() {
    if (this.selectedAction === 'place') {
      this.state.addParticle(this.actions.place[this.particleType](this.mouse));
    }
  }

  continuousAction() {
    this.state.addParticle(
      this.actions[this.selectedAction][this.particleType](
        this.mouse,
        this.pointer
      )
    );
  }

  addEvents() {
    const option = document.getElementById('option-buttons');
    const particleType = document.getElementById('particle-type-buttons');
    const canvas = document.querySelector('canvas');

    option.onclick = this.selectAction();
    option.ontouchend = this.selectAction();

    particleType.onclick = this.selectMode();
    particleType.ontouchend = this.selectMode();

    canvas.onmousedown = this.mouseDown();
    canvas.ontouchstart = this.mouseDown();

    document.onmousemove = this.mouseMove();
    document.ontouchmove = this.mouseMove();

    canvas.onmouseup = this.mouseUp();
    canvas.ontouchend = this.mouseUp();
  }

  mouseDown() {
    return e => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      this.mouse.moveTo(x / window.innerWidth, y / window.innerHeight);
      this.pressing = true;

      // clear previous interval in case mouseup occurred off of window
      window.clearInterval(this.asyncActions);
      this.asyncActions = window.setInterval(
        this.handleActions(),
        this.msPerAction
      );
    };
  }

  mouseMove() {
    return e => {
      e.preventDefault();
      e.stopPropagation();
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      this.mouseHistory.shift();
      this.mouseHistory.push(_simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(this.mouse));
      this.mouse.moveTo(x / window.innerWidth, y / window.innerHeight);
    };
  }

  mouseUp() {
    return () => {
      this.clickAction();
      window.clearInterval(this.asyncActions);
    };
  }

  selectMode() {
    return e => {
      if (this.particleType !== e.target.id) {
        this.state.reset();
        this.particleType = e.target.id;
      }
      this.state.needsCleaning = this.particleType === 'stars';
    };
  }

  selectAction() {
    return e => {
      switch (e.target.id) {
        case 'reset':
          this.state.reset();
          break;
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
/* harmony import */ var _util_color_generators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/color_generators */ "./src/interface/util/color_generators.js");


class Display {
  constructor(state, client) {
    this.particles = state.particles;
    this.client = client;

    this.ctx = document.querySelector('canvas').getContext('2d');

    this.resize()();
    this.reset();

    window.onresize = this.resize();
  }

  get scale() {
    return Math.min(this.width, this.height);
  }

  render() {
    this.reset();
    this.mouse(this.client.mouse);
    this.renderParticles();
  }

  renderParticles() {
    this[this.client.particleType]();
  }

  stars() {
    const nParticles = this.particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = this.particles[i];
      if (particle.visualSize(this.scale) < 1) {
        this.ctx.fillStyle = 'SandyBrown';
        this.dot(particle);
      } else {
        this.star(particle);
      }
    }
  }

  dots() {
    this.ctx.fillStyle = 'white';

    const nParticles = this.particles.length;
    for (let i = 0; i < nParticles; i += 1) this.dot(this.particles[i]);
  }

  automata() {
    const nParticles = this.particles.length;
    for (let i = 0; i < nParticles; i += 1) this.automaton(this.particles[i]);
  }

  gases() {
    const nParticles = this.particles.length;
    for (let i = 0; i < nParticles; i += 1) this.gas(this.particles[i]);
  }

  networks() {
    this.ctx.beginPath();

    this.ctx.lineWidth = 0.3;
    this.ctx.strokeStyle = 'rgba(255,255,255,0.5)';

    const nParticles = this.particles.length;

    for (let i = 0; i < nParticles; i += 1) {
      const particle = this.particles[i];
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

      this.ctx.canvas.width = this.width;
      this.ctx.canvas.height = this.height;
    };
  }

  reset() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'white';
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
    const color = Object(_util_color_generators__WEBPACK_IMPORTED_MODULE_0__["sizeToRGBA"])(particle.size);

    this.ctx.fillStyle = color;
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 2 * size;

    this.circle(pos.x * this.width, pos.y * this.height, size);
  }

  circle(x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  automaton(particle) {
    const { pos, vel } = particle;
    const size = particle.visualSize(this.scale);
    this.ctx.fillStyle = Object(_util_color_generators__WEBPACK_IMPORTED_MODULE_0__["directionToColor"])(vel);

    this.circle(pos.x * this.width, pos.y * this.height, size);
  }

  gas(particle) {
    const { pos, vel } = particle;
    const size = particle.visualSize(this.scale);
    this.ctx.fillStyle = Object(_util_color_generators__WEBPACK_IMPORTED_MODULE_0__["speedToHSL"])(vel);

    this.circle(pos.x * this.width, pos.y * this.height, size);
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
  const introsLeftString = window.localStorage.getItem('dotsIntros') || '2';
  const introsLeftNumber = parseInt(introsLeftString, 10);
  window.localStorage.setItem(
    'dotsIntros',
    Math.max(introsLeftNumber - 1, 0).toString()
  );
  return introsLeftNumber;
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
    document.querySelector('.particle-type').addEventListener('click', resolve);
  });

const waitForOptionSelection = () =>
  new Promise(resolve => {
    document.querySelector('.option').addEventListener('click', resolve);
  });

const welcomeUser = () => {
  if (introsLeft()) {
    Promise.resolve()
      .then(show('title'))
      .then(sleep(3))
      .then(hide('title'))
      .then(show('select-particle-type'))
      .then(addClass('particle-type', 'top-peek'))
      .then(waitForModeSelection)
      .then(removeClass('particle-type', 'top-peek'))
      .then(fade('select-particle-type'))
      .then(sleep(1))
      .then(hide('select-particle-type'))
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

/* harmony default export */ __webpack_exports__["default"] = (welcomeUser);


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
  interact(particle) {
    if (this.isTouching(particle.pos, 1 * this.size + particle.size)) {
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
    Object(_simulator_interactions__WEBPACK_IMPORTED_MODULE_1__["pushAway"])(this, particle, 0.00025);
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

const buildInterface = () => {
  buildButtons(['paint', 'shoot', 'place', 'reset'], 'option-buttons');
  buildButtons(['stars', 'gases', 'networks', 'automata'], 'particle-type-buttons');
};

/* harmony default export */ __webpack_exports__["default"] = (buildInterface);


/***/ }),

/***/ "./src/interface/util/color_generators.js":
/*!************************************************!*\
  !*** ./src/interface/util/color_generators.js ***!
  \************************************************/
/*! exports provided: sizeToRGBA, speedToHSL, directionToColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeToRGBA", function() { return sizeToRGBA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "speedToHSL", function() { return speedToHSL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "directionToColor", function() { return directionToColor; });
const sizeToRGBA = (size, alpha = 1) => {
  const rC = -(18 ** 4);
  const gC = -(15 ** 4);
  const bC = -(11 ** 4);

  const rExp = (size - 0.045) ** 4;
  const gExp = (size - 0.07) ** 4;
  const bExp = (size - 0.11) ** 4;

  const red = 255 * (rC * rExp + 1);
  const green = 255 * (gC * gExp + 1);
  const blue = 255 * (bC * bExp + 1);

  return `rgba(${red},${green},${blue},${alpha})`;
};

const speedToHSL = vel => {
  const speed = vel.dot(vel);
  const hue = Math.min(120 * (speed * 1.5e4) + 240, 360);
  return `hsl(${hue},100%,50%)`;
};

const directionToColor = ({ x }) => {
  if (x > 0) return 'blue';
  if (x < 0) return 'green';
  return 'grey';
};


/***/ }),

/***/ "./src/interface/util/particle_actions.js":
/*!************************************************!*\
  !*** ./src/interface/util/particle_actions.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simulator_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../simulator/vector */ "./src/simulator/vector.js");
/* harmony import */ var _presets_star__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../presets/star */ "./src/interface/presets/star.js");
/* harmony import */ var _presets_automaton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presets/automaton */ "./src/interface/presets/automaton.js");
/* harmony import */ var _presets_gas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../presets/gas */ "./src/interface/presets/gas.js");
/* harmony import */ var _presets_network__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../presets/network */ "./src/interface/presets/network.js");
/* harmony import */ var _simulator_particle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../simulator/particle */ "./src/simulator/particle.js");







const spreadPosition = (mouse, spread) =>
  _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].random(spread * Math.random()).add(mouse);

const paint = {
  stars: mouse =>
    new _presets_star__WEBPACK_IMPORTED_MODULE_1__["default"]({
      mass: 5e-7,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].random(0.00001),
      pos: spreadPosition(mouse, 0.03)
    }),
  gases: mouse =>
    new _presets_gas__WEBPACK_IMPORTED_MODULE_3__["default"]({
      radius: 5e-3,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].random(0.0001),
      pos: spreadPosition(mouse, 0.1)
    }),
  automata: mouse =>
    new _presets_automaton__WEBPACK_IMPORTED_MODULE_2__["default"]({
      radius: 6e-3,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].random(0.001),
      pos: spreadPosition(mouse, 0.01)
    }),
  networks: mouse =>
    new _presets_network__WEBPACK_IMPORTED_MODULE_4__["default"]({
      radius: 1e-1,
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].random(0.0002),
      pos: spreadPosition(mouse, 0.15)
    }),
  dots: mouse =>
    new _simulator_particle__WEBPACK_IMPORTED_MODULE_5__["default"]({
      vel: _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"].random(0.00001),
      pos: spreadPosition(mouse, 0.03)
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
    }),
  dots: (mouse, pointer) =>
    new _simulator_particle__WEBPACK_IMPORTED_MODULE_5__["default"]({
      vel: pointer.scale(0.003),
      pos: spreadPosition(mouse, 1e-2)
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
    }),
  dots: mouse =>
    new _simulator_particle__WEBPACK_IMPORTED_MODULE_5__["default"]({
      vel: new _simulator_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0),
      pos: spreadPosition(mouse, 5e-3)
    })
};

const actions = {
  paint,
  shoot,
  place
};

/* harmony default export */ __webpack_exports__["default"] = (actions);


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
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./particle */ "./src/simulator/particle.js");



const absorb = (source = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"](), target = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"]()) => {
  source.grow(target.mass);
  target.delete();
};

const inelasticCollide = (
  source = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"](),
  target = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"]()
) => {
  const newVelocity = source.momentum
    .add(target.momentum)
    .scale(1 / (source.mass + target.mass));
  source.vel.scale(0);
  source.accelerate(newVelocity);
};

const moveAway = (
  source = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"](),
  target = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"](),
  sizeMultiplier = 1
) => {
  target.move(
    _vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(target.pos, source.pos).scale(
      sizeMultiplier * (source.size + target.size) - source.pos.dist(target.pos)
    )
  );
};

const fakeGravity = (
  source = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"](),
  target = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"](),
  maxAcc = Infinity,
  G = 0.025
) => {
  const scalar = Math.min(
    (G * source.mass) / source.pos.distSq(target.pos),
    maxAcc
  );
  const direction = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0).add(source.pos).subtract(target.pos);

  target.accelerate(direction.scale(scalar));
};

const pushAway = (
  source = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"](),
  target = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"](),
  maxAcc = Infinity,
  pushConstant = 2e-11
) => {
  const distSq = source.pos.distSq(target.pos);
  const scalar = Math.min(pushConstant / (distSq * distSq), maxAcc);
  const direction = _vector__WEBPACK_IMPORTED_MODULE_0__["default"].direction(target.pos, source.pos);
  target.accelerate(direction.scale(scalar));
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
    pos = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](),
    vel = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](),
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
    return _vector__WEBPACK_IMPORTED_MODULE_0__["default"].clone(this.vel).scale(this.mass);
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

  accelerate(amount = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]()) {
    this.vel.add(amount);
  }

  move(amount = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]()) {
    this.pos.add(amount);
  }

  grow(amount = 0) {
    this.mass += amount;
  }

  delete() {
    this.protected = false;
  }

  isTouching(pos = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](), offset = 0) {
    return this.pos.distSq(pos) < (this.size + offset) ** 2;
  }

  interact() {
    return null;
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
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./particle */ "./src/simulator/particle.js");



class State {
  constructor(particles = []) {
    this.particles = particles;
    this.wall = true;
    this.needsCleaning = false;
  }

  update() {
    const nParticles = this.particles.length;

    this.calculateInteractions(nParticles);
    this.updateParticles(nParticles);

    if (this.wall) this.walls(nParticles);
    if (this.needsCleaning) this.cleanup(nParticles);
  }

  addParticle(particle = new _particle__WEBPACK_IMPORTED_MODULE_1__["default"]()) {
    this.particles.push(particle);
  }

  toggleWalls() {
    this.wall = !this.wall;
    return this.wall;
  }

  cleanup(nParticles = this.particles.length) {
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

  updateParticles(nParticles = this.particles.length) {
    for (let i = 0; i < nParticles; i += 1) this.particles[i].update();
  }

  calculateInteractions(nParticles = this.particles.length) {
    for (let i = 0; i < nParticles; i += 1) {
      for (let j = 0; j < nParticles; j += 1) {
        if (i !== j) this.particles[i].interact(this.particles[j]);
      }
    }
  }

  walls(nParticles = this.particles.length) {
    for (let i = 0; i < nParticles; i += 1) {
      const { pos, vel, size } = this.particles[i];
      const rightDist = 1 - size - pos.x;
      const bottomDist = 1 - size - pos.y;
      const leftDist = pos.x - size;
      const topDist = pos.y - size;

      if (rightDist < 0) {
        vel.subtract(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].xAxis(2 * vel.x));
        pos.add(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].xAxis(rightDist));
      } else if (leftDist < 0) {
        vel.subtract(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].xAxis(2 * vel.x));
        pos.subtract(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].xAxis(leftDist));
      } else if (bottomDist < 0) {
        vel.subtract(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].yAxis(2 * vel.y));
        pos.add(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].yAxis(bottomDist));
      } else if (topDist < 0) {
        vel.subtract(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].yAxis(2 * vel.y));
        pos.subtract(_vector__WEBPACK_IMPORTED_MODULE_0__["default"].yAxis(topDist));
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
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(that = new Vector()) {
    this.x += that.x;
    this.y += that.y;
    return this;
  }

  subtract(that = new Vector()) {
    this.x -= that.x;
    this.y -= that.y;
    return this;
  }

  scale(that = 1) {
    this.x *= that;
    this.y *= that;
    return this;
  }

  moveTo(x = 0, y = 0) {
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

  normalizeL2() {
    if (this.x || this.y) {
      this.scale(1 / this.magnitudeL1());
    }
    return this;
  }

  distSq(that = new Vector()) {
    const dX = this.x - that.x;
    const dY = this.y - that.y;
    return dX * dX + dY * dY;
  }

  dist(that = new Vector()) {
    const dX = this.x - that.x;
    const dY = this.y - that.y;
    return Math.hypot(dX, dY);
  }

  dot(that = new Vector()) {
    return this.x * that.x + this.y * that.y;
  }

  magnitude() {
    return Math.hypot(this.x, this.y);
  }

  magnitudeL1() {
    return Math.abs(this.x) + Math.abs(this.y);
  }

  static xAxis(length = 1) {
    return new Vector(length, 0);
  }

  static yAxis(length = 1) {
    return new Vector(0, length);
  }

  static direction(start = new Vector(), end = new Vector()) {
    return new Vector(0, 0)
      .add(start)
      .subtract(end)
      .normalize();
  }

  static random(length = 1) {
    return new Vector(Math.random() - 0.5, Math.random() - 0.5)
      .normalize()
      .scale(length);
  }

  static clone(that = new Vector()) {
    return new Vector(that.x, that.y);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Vector);


/***/ })

/******/ });
//# sourceMappingURL=main.js.map