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

export default welcome;
