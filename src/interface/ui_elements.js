class UIElements {
  constructor() {
    this.buttonsRight = ['push', 'paint', 'make one', 'walls', 'reset'];
    this.buildUI();

  }

  buildUI() {
    for (let i = 0; i < this.buttonsRight.length; i += 1) {
      const uiElement = document.createElement('li');
      uiElement.className = 'options-text';
      uiElement.id = this.buttonsRight[i];
      uiElement.innerText = this.buttonsRight[i];
      document.getElementById('ui').appendChild(uiElement);
    }
  }
}

export default UIElements;
