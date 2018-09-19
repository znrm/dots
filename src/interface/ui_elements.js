class UIElements {
  constructor() {
    this.buttonsRight = [
      'push',
      'paint',
      'make one',
      'walls',
      'reset',
      'gas',
    ];

    this.buttonsTop = [
      'space',
      'gas'
    ];

    this.tutorial = true;
    this.navSeen = false;
    this.buildUI();
  }

  buildUI() {
    for (let i = 0; i < this.buttonsRight.length; i += 1) {
      const uiElement = document.createElement('li');
      uiElement.className = 'options-text';
      uiElement.id = this.buttonsRight[i];
      uiElement.innerText = this.buttonsRight[i];
      document.getElementById('options-buttons').appendChild(uiElement);
    }
  }

  startTutorial() {
    // document.getElementById('tutorial1').classList.remove('waiting')
    // document.getElementById
  }
}

export default UIElements;
