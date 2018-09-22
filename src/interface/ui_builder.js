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

export default buildUI;
