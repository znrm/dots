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
      addClass('option', 'bottom-peek')();
    },
    { once: true }
  );
};

const runInSequence = (...asyncFns) =>
  asyncFns.reduce((promise, next) => promise.then(next), Promise.resolve());

const welcomeUser = () => {
  if (introsLeft()) {
    runInSequence(
      show('title'),
      sleep(2),
      hide('title'),
      show('select-particle-type'),
      addClass('particle-type', 'top-peek'),
      waitForModeSelection,
      removeClass('particle-type', 'top-peek'),
      fade('select-particle-type'),
      sleep(1),
      hide('select-particle-type'),
      show('select-option'),
      addClass('option', 'bottom-peek'),
      waitForOptionSelection,
      removeClass('option', 'bottom-peek'),
      fade('select-option'),
      sleep(1),
      hide('select-option'),
      show('enjoy'),
      sleep(1),
      fade('enjoy'),
      sleep(1),
      addClass('enjoy', 'hidden'),
      hide('welcome'),
      adjustForMobile
    );
  } else {
    runInSequence(show('title'), sleep(2), hide('welcome'), adjustForMobile);
  }
};

export default welcomeUser;
