const buildButtons = (buttonNames, buttonContainerID) => {
  for (let i = 0; i < buttonNames.length; i += 1) {
    const uiElement = document.createElement('button');
    uiElement.id = buttonNames[i];
    uiElement.innerText = buttonNames[i];
    document.getElementById(buttonContainerID).appendChild(uiElement);
  }
};

const buildInterface = () => {
  buildButtons(['paint', 'shoot', 'place', 'reset'], 'option-buttons');
  buildButtons(
    ['stars', 'gases', 'networks', 'automata'],
    'particle-type-buttons'
  );
};

export default buildInterface;
