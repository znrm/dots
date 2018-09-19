const BUTTONS_RIGHT = ['airbrush', 'emit many', 'make one', 'reset'];
const BUTTONS_TOP = ['stars', 'fluids', 'automata', 'dots'];

const buildUI = () => {
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

export default buildUI;
