const BUTTONS_RIGHT = ['push', 'paint', 'make one', 'walls', 'reset', 'gas'];
const BUTTONS_TOP = ['space', 'fluid', 'benchmark'];

const timesTutorialLeft = window.localStorage.getItem('dotsTutorial') || 2;

const addClass = (id, className) =>
  document.getElementById(id).classList.add(className);
const removeClass = (id, className) =>
  document.getElementById(id).classList.remove(className);

const sleep = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const buildUI = () => {
  for (let i = 0; i < BUTTONS_RIGHT.length; i += 1) {
    const uiElement = document.createElement('li');
    uiElement.className = 'options-text';
    uiElement.id = BUTTONS_RIGHT[i];
    uiElement.innerText = BUTTONS_RIGHT[i];
    document.getElementById('options-buttons').appendChild(uiElement);
  }

  for (let i = 0; i < BUTTONS_TOP.length; i += 1) {
    const uiElement = document.createElement('li');
    uiElement.className = 'options-text';
    uiElement.id = BUTTONS_TOP[i];
    uiElement.innerText = BUTTONS_TOP[i];
    document.getElementById('mode-buttons').appendChild(uiElement);
  }
};

export const startTutorial = async () => {
  await sleep(0);
  removeClass('title', 'hidden');
  await sleep(4);
  addClass('title', 'hidden');
  if (timesTutorialLeft !== '0') {
    removeClass('select-mode', 'hidden');
    document.querySelector('.mode').onclick = async () => {
      addClass('select-mode', 'fade-out');
      await sleep(0.99);
      addClass('select-mode', 'hidden');
      removeClass('select-options', 'hidden');
      document.querySelector('.options').onclick = async () => {
        addClass('select-options', 'fade-out');
        await sleep(0.99);
        addClass('welcome', 'hidden');
      };
    };
    window.localStorage.setItem('dotsTutorial', timesTutorialLeft - 1);
  } else {
    addClass('welcome', 'hidden');
  }
};
