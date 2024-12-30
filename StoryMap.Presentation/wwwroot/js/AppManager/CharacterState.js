import State from "../Models/State.js";
import Character from "../Models/Character.js";
import AppManager from "./AppManager.js";

class CharacterState {
  #characters = [];
  #baseCharacter = null;
  #selectedCharacterIndex = 0;
  #selected = false;
  #appManager = null;

  constructor() {
    this.#appManager = AppManager.getInstance();
    this.#baseCharacter = new Character(
      "Base Character",
      new State(
        this.#appManager.mapGetSelectedIndex(),
        0,
        0,
        0,
        0,
        [],
      ),
    );
  }

  get selected() {
    return this.#selected;
  }

  set selected(value) {
    this.#selected = value;
  }

  // Getter for characters
  get characters() {
    return this.#characters;
  }

  // Getter and Setter for selectedCharacterIndex
  get selectedCharacterIndex() {
    return this.#selectedCharacterIndex;
  }

  set selectedCharacterIndex(index) {
    this.#selectedCharacterIndex = index;
  }

  // Getter for baseCharacter details
  get baseCharacterDetails() {
    return this.#baseCharacter.states[0].details;
  }

  // Method to add a new character based on base character
  addCharacter(name) {
    let clone = this.#baseCharacter.clone(0);
    clone.name = name;
    this.#characters.push(clone);
    this.#appManager.select("character", this.#characters.length - 1, null);
    m.redraw();
  }

  cloneCharacter(index, stateIndex) {
    if (this.#characters[index]) {
      let clone = this.#characters[index].clone(stateIndex);
      clone.name += " Clone";
      this.#characters.push(clone);
      this.#appManager.select("character", this.#characters.length - 1, null);
      m.redraw();
    }
  }

  // Method to remove a character
  removeCharacter(index) {
    if (this.#characters[index]) {
      this.#characters.splice(index, 1);
      m.redraw();
    }
  }

  // Method to update a character's name
  updateCharacterName(index, name) {
    if (this.#characters[index]) {
      this.#characters[index].name = name;
      m.redraw();
    }
  }

  // Method to add a detail to a character
  addDetailToCharacter(characterIndex, stateIndex, detail) {
    const character = this.#characters[characterIndex];
    if (character?.states[stateIndex]) {
      character.states[stateIndex].details.push(detail);
      m.redraw();
    }
  }

  // Method to update a detail in a character's state
  updateDetailInCharacter(characterIndex, stateIndex, detailIndex, updates) {
    const character = this.#characters[characterIndex];
    if (!character) {
      console.error("Character not found at index:", characterIndex);
      return;
    }

    const newState = this.ensureCharacterState(characterIndex, stateIndex);
    if (newState) {
      if (!newState.details[detailIndex]) {
        newState.details[detailIndex] = {};
      }
      Object.assign(newState.details[detailIndex], updates);
      m.redraw();
    }
  }

  // Method to check if a detail has been modified in a character's state
  checkModifiedDetailFromCharacter(characterIndex, stateIndex, detailIndex) {
    const character = this.#characters[characterIndex];
    if (character) {
      const currentState = character.states[stateIndex];
      if (
        currentState &&
        currentState.details[detailIndex] &&
        currentState.chapterId === this.#appManager.chapterGetSelectedIndex() &&
        currentState.timeframeId ===
          this.#appManager.chapterGetSelectedTimeframeIndex()
      ) {
        if (stateIndex > 0) {
          const previousState = character.states[stateIndex - 1];
          const previousDetail = previousState?.details[detailIndex];
          if (
            currentState.details[detailIndex] &&
            Object.entries(currentState.details[detailIndex]).some(
              ([key, value]) => {
                const previousKeys = Object.keys(previousDetail || {});
                if (!previousKeys.includes(key)) return true;
                const previousValue = previousDetail[key];
                return previousValue !== value ||
                  typeof previousValue !== typeof value;
              },
            )
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Method to remove a detail from a character's state
  removeDetailFromCharacter(characterIndex, stateIndex, detailIndex) {
    const character = this.#characters[characterIndex];
    if (character) {
      const currentState = character.states[stateIndex];
      if (currentState && currentState.details[detailIndex]) {
        currentState.details.splice(detailIndex, 1);
        m.redraw();
      }
    }
  }

  // Method to add a detail to base character details
  addDetailToBaseCharacter(detail) {
    this.#baseCharacter.states[0].details.push(detail);
    m.redraw();
  }

  // Method to update a detail in base character details
  updateDetailInBaseCharacter(detailIndex, updates) {
    this.#baseCharacter.states[0].details[detailIndex] = { ...updates };
    m.redraw();
  }

  // Method to remove a detail from base character details
  removeDetailFromBaseCharacter(detailIndex) {
    this.#baseCharacter.states[0].details.splice(detailIndex, 1);
    m.redraw();
  }

  // Method to move a character in the list
  moveCharacter(index, direction) {
    if (!this.#characters[index]) {
      console.error("Character not found at index:", index);
      return;
    }

    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.#characters.length) {
      console.warn("Cannot move character: would be out of bounds");
      return;
    }

    const temp = this.#characters[index];
    this.#characters[index] = this.#characters[newIndex];
    this.#characters[newIndex] = temp;

    if (this.#selectedCharacterIndex === index) {
      this.#selectedCharacterIndex = newIndex;
    } else if (this.#selectedCharacterIndex === newIndex) {
      this.#selectedCharacterIndex = index;
    }

    m.redraw();
  }

  // Method to bring a character to the map
  bringCharacterToMap(characterIndex, latestStateIndex) {
    const character = this.#characters[characterIndex];
    if (!character) {
      console.error("Character not found at index:", characterIndex);
      return;
    }

    const latestState = this.ensureCharacterState(
      characterIndex,
      latestStateIndex,
      {
        mapId: this.#appManager.mapGetSelectedIndex(),
        x: 0,
        y: 0,
      },
    );

    if (latestState) {
      console.log(
        `Character ${characterIndex} moved to map ${this.#appManager.mapGetSelectedIndex()}`,
      );
      m.redraw();
    }
  }

  // Method to ensure a character has the required state
  ensureCharacterState(characterIndex, stateIndex, updates = {}) {
    const character = this.#characters[characterIndex];
    if (!character) {
      console.error("Character not found at index:", characterIndex);
      return null;
    }

    let currentState = character.states[stateIndex];
    if (
      currentState &&
      currentState.chapterId === this.#appManager.chapterGetSelectedIndex() &&
      currentState.timeframeId ===
        this.#appManager.chapterGetSelectedTimeframeIndex()
    ) {
      Object.assign(currentState, updates);
      return currentState;
    } else {
      const previousState = stateIndex > 0
        ? character.states[stateIndex - 1]
        : character.states[0];

      currentState = new State(
        this.#appManager.mapGetSelectedIndex(),
        updates.x || 0,
        updates.y || 0,
        this.#appManager.chapterGetSelectedIndex(),
        this.#appManager.chapterGetSelectedTimeframeIndex(),
        structuredClone(
          previousState
            ? previousState.details
            : this.#baseCharacter.states[0].details,
        ),
      );

      character.states.splice(stateIndex + 1, 0, currentState);
      this.#appManager.storyUpdate();
      return currentState;
    }
  }

  // Method to find the latest state index of a character up to a given chapter and timeframe
  findCharacterLatestStateIndexUpTo(characterIndex, chapterId, timeframeId) {
    const character = this.#characters[characterIndex];
    if (!character || character.states.length === 0) {
      return -1;
    }

    // If we only have the initial state, return 0
    if (character.states.length === 1) {
      return 0;
    }

    let latestStateIndex = -1;
    let prevStateIndex = -1;

    let low = 0;
    let high = character.states.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const state = character.states[mid];

      if (state.chapterId === chapterId && state.timeframeId === timeframeId) {
        latestStateIndex = mid;
        break;
      } else if (
        state.chapterId < chapterId ||
        (state.chapterId === chapterId && state.timeframeId < timeframeId)
      ) {
        prevStateIndex = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    // If we found an exact match, return it
    if (latestStateIndex !== -1) {
      return latestStateIndex;
    }

    // If we found a previous state, return it
    if (prevStateIndex !== -1) {
      return prevStateIndex;
    }

    // If we didn't find anything, return the initial state (0)
    return 0;
  }

  // Method to get the latest changes for characters
  getLatestCharacterChanges() {
    const chapterId = this.#appManager.chapterGetSelectedIndex() ?? 0;
    const timeframeId = this.#appManager.chapterGetSelectedTimeframeIndex() ??
      0;
    return this.#characters.map((_, characterIndex) => ({
      characterIndex: characterIndex,
      latestStateIndex: this.findCharacterLatestStateIndexUpTo(
        characterIndex,
        chapterId,
        timeframeId,
      ),
    }));
  }
}

export default CharacterState;
