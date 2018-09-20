const BUTTONS_RIGHT = ['paint', 'shoot', 'place', 'reset'];
const BUTTONS_TOP = ['stars', 'gases', 'networks', 'automata'];

const buildUI = () => {
  for (let i = 0; i < BUTTONS_RIGHT.length; i += 1) {
    const uiElement = document.createElement('button');
    uiElement.className = 'btn';
    uiElement.id = BUTTONS_RIGHT[i];
    uiElement.innerText = BUTTONS_RIGHT[i];
    document.getElementById('option-buttons').appendChild(uiElement);
  }

  for (let i = 0; i < BUTTONS_TOP.length; i += 1) {
    const uiElement = document.createElement('button');
    uiElement.className = 'btn';
    uiElement.id = BUTTONS_TOP[i];
    uiElement.innerText = BUTTONS_TOP[i];
    document.getElementById('mode-buttons').appendChild(uiElement);
  }
};

export default buildUI;
