export default class Characters {
  constructor(mediator) {
    this.mediator = mediator;
  }

  select() {
    this.mediator.interact('characterCanvas', 'select');
  }

  enableMovement() {
    // Enable character movement
  }

  disable() {
    // Disable character canvas
  }

  moveCharacter(movementData) {
    this.mediator.interact('characterCanvas', 'move', movementData);
  }

  loadCharacters(characters) {
    // Load characters for specific chapter
  }
}

