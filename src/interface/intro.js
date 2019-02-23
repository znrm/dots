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

const adjustForMobile = () => {
  window.addEventListener(
    'touchstart',
    () => {
      addClass('particle-type', 'top-peek')();
      addClass('option', 'right-peek')();
    },
    { once: true }
  );
};

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
      .then(hide('welcome'))
      .then(adjustForMobile);
  } else {
    Promise.resolve()
      .then(show('title'))
      .then(sleep(3))
      .then(hide('welcome'))
      .then(adjustForMobile);
  }
};

export default welcomeUser;
