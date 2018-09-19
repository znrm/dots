const BUTTONS_RIGHT = ['push', 'paint', 'make one', 'walls', 'reset', 'gas'];
const BUTTONS_TOP = ['benchmark', 'space', 'fluids'];

// const timesTutorialSeen = window.localStorage.getItem('dotsTutorial') || 0;

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
};

export const startTutorial = async () => {
  await sleep(0);
  removeClass('title', 'hidden');
  await sleep(4);
  addClass('title', 'hidden');
  removeClass('select-options', 'hidden');
  document.querySelector('.options').onclick = async () => {
    removeClass('select-options', 'fade-in');
    addClass('select-options', 'fade-out');
    await sleep(1);
    addClass('welcome', 'hidden');
  };
};
