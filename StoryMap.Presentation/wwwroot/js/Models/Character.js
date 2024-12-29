import State from "./State.js";

/**
 * Represents a character with a name and states.
 * @class
 */
class Character {
  /**
   * @param {string} name - The name of the character.
   * @param {State} initialState - The initial state of the character.
   */
  constructor(name, initialState) {
    this.name = name;
    this.states = [initialState]; // States is an array of State objects
  }

  /**
   * Creates a clone of the current character instance.
   * @returns {Character} - A new Character instance with the same properties.
   */
  clone(stateIndex) {
    return new Character(
      this.name,
      new State(
        this.states[stateIndex].mapId,
        this.states[stateIndex].x,
        this.states[stateIndex].y,
        this.states[stateIndex].chapterId,
        this.states[stateIndex].timeframeId,
        [...this.states[stateIndex].details],
      ),
    );
  }
}

export default Character;
