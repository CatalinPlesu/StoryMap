export default class Canvas {
  constructor(mediator) {
    this.mediator = mediator;
  }

  enable() {
    // Enable image component interactions
  }

  reposition() {
    this.mediator.interact('imageComponent', 'reposition');
  }
}

