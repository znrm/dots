class Client {
  constructor() {
    this.pressing = false;
    this.mouse = [];

    this.addEvents();
  }

  addEvents() {
    document.onmousedown = e => {
      this.mouse = [e.clientX, e.clientY];
      this.pressing = true;
    };

    document.onmousemove = e => {
      this.mouse = [e.clientX, e.clientY];
    };

    document.onmouseup = () => {
      this.pressing = false;
    };
  }
}

export default Client;
