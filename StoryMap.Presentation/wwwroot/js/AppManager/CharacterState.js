import State from "../Models/State.js";
import Character from "../Models/Character.js";

class CharacterState {
  #characters = [];
  #baseCharacterDetails = [];
  #selectedCharacterIndex = 0;
  #selectedMapIndex = 0;
  #selectedChapterIndex = 0;
  #selectedTimeframeIndex = 0;
  #updated = false;

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

  // Getter for baseCharacterDetails
  get baseCharacterDetails() {
    return this.#baseCharacterDetails;
  }

  // Method to add a character
  addCharacter(name) {
    const initialState = new State(
      this.#selectedMapIndex,
      0,
      0,
      0,
      0,
      structuredClone(this.#baseCharacterDetails),
    );

    const newCharacter = new Character(name, initialState);
    this.#characters.push(newCharacter);
    m.redraw();
  }

  cloneCharacter(index) {
    if (this.#characters[index]) {
      let clone = this.#characters[index].clone();
      clone.name += " Clone";
      this.#characters.push(clone);
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
        currentState.chapterId === this.#selectedChapterIndex &&
        currentState.timeframeId === this.#selectedTimeframeIndex
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
    this.#baseCharacterDetails.push(detail);
    m.redraw();
  }

  // Method to update a detail in base character details
  updateDetailInBaseCharacter(detailIndex, updates) {
    this.#baseCharacterDetails[detailIndex] = { ...updates };
    m.redraw();
  }

  // Method to remove a detail from base character details
  removeDetailFromBaseCharacter(detailIndex) {
    this.#baseCharacterDetails.splice(detailIndex, 1);
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
        mapId: this.#selectedMapIndex,
        x: 0,
        y: 0,
      },
    );

    if (latestState) {
      console.log(
        `Character ${characterIndex} moved to map ${this.#selectedMapIndex}`,
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
      currentState.chapterId === this.#selectedChapterIndex &&
      currentState.timeframeId === this.#selectedTimeframeIndex
    ) {
      Object.assign(currentState, updates);
      return currentState;
    } else {
      const previousState = stateIndex > 0
        ? character.states[stateIndex - 1]
        : character.states[0];

      currentState = new State(
        this.#selectedMapIndex,
        updates.x || 0,
        updates.y || 0,
        this.#selectedChapterIndex,
        this.#selectedTimeframeIndex,
        structuredClone(
          previousState ? previousState.details : this.#baseCharacterDetails,
        ),
      );

      character.states.splice(stateIndex + 1, 0, currentState);
      this.#updated = true;
      return currentState;
    }
  }

  // Method to find the latest state index of a character up to a given chapter and timeframe
  findCharacterLatestStateIndexUpTo(characterIndex, chapterId, timeframeId) {
    const character = this.#characters[characterIndex];
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

    return latestStateIndex === -1 && prevStateIndex !== -1
      ? prevStateIndex
      : latestStateIndex;
  }

  // Method to get the latest changes for characters
  getLatestCharacterChanges() {
    const chapterId = this.#selectedChapterIndex ?? 0;
    const timeframeId = this.#selectedTimeframeIndex ?? 0;
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
