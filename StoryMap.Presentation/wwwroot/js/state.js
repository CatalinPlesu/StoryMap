const State = {
  _updated: false,
  maps: [],
  base_character_details: [],
  characters: [],
  chapters: [],
  mode: "view", // 'view' or 'edit'
  selected: { item: "map", index: 0, nestedIndex: null },
  selectedChapterIndex: 0,
  selectedMapIndex: 0,
  selectedCharacterIndex: 0,
  selectedTimeframeIndex: 0,

  // Map methods
  get updated() {
    const currentUpdated = this._updated;
    this._updated = false; 
    return currentUpdated;
  },
  addMap(name) {
    this.maps.push({ name, images: [] });
    m.redraw();
  },
  removeMap(index) {
    if (this.maps[index]) {
      this.maps.splice(index, 1);
      m.redraw();
    }
  },
  updateMap(index, updates) {
    if (this.maps[index]) {
      Object.assign(this.maps[index], updates);
      m.redraw();
    }
  },
  updateMapName(index, name) {
    if (this.maps[index]) {
      this.maps[index].name = name;
      m.redraw();
    }
  },
  updateMapZoom(index, zoom) {
    if (this.maps[index]) {
      this.maps[index].zoom = zoom;
      this._updated = true;
      m.redraw();
    }
  },
  updateMapOffset(index, offset) {
    if (this.maps[index]) {
      this.maps[index].xoffset = offset.x;
      this.maps[index].yoffset = offset.y;
      this._updated = true;
      m.redraw();
    }
  },
  addImageToMap(mapIndex, image) {
    if (this.maps[mapIndex]) {
      this.maps[mapIndex].images.push(image);
      this.selected.nestedIndex = this.maps[mapIndex].images.length - 1;
      this._updated = true;
      m.redraw();
    }
  },
  updateImageInMap(mapIndex, imageIndex, updates) {
    if (this.maps[mapIndex]?.images[imageIndex]) {
      Object.assign(this.maps[mapIndex].images[imageIndex], updates);
      m.redraw();
    }
  },
  moveImageUp(mapIndex, imageIndex) {
    const map = this.maps[mapIndex];
    
    if (map && map.images && imageIndex > 0 && imageIndex < map.images.length) {
      // Swap the image with the one before it
      const currentImage = {...map.images[imageIndex]};
      const previousImage = {...map.images[imageIndex - 1]};
      
      // Swap the positions in the array
      map.images[imageIndex] = previousImage;
      map.images[imageIndex - 1] = currentImage;

      this.selected.nestedIndex -=1;

      this._updated = true;
      m.redraw();  // Redraw to reflect the change in the UI
    }
  },
  moveImageDown(mapIndex, imageIndex) {
    const map = this.maps[mapIndex];
    
    if (map && map.images && imageIndex >= 0 && imageIndex < map.images.length - 1) {
      // Swap the image with the one after it
      const currentImage = map.images[imageIndex];
      const nextImage = map.images[imageIndex + 1];
      
      // Swap the positions in the array
      map.images[imageIndex] = {...nextImage};
      map.images[imageIndex + 1] = {...currentImage};
      
      this.selected.nestedIndex +=1;
      this._updated = true;
      m.redraw();  // Redraw to reflect the change in the UI
    }
  },
  removeImageFromMap(mapIndex, imageIndex) {
    if (this.maps[mapIndex]?.images[imageIndex]) {
      this.maps[mapIndex].images.splice(imageIndex, 1);
      this._updated = true;
      m.redraw();
    }
  },

  // Character methods
  addCharacter(name) {
    this.characters.push({
      name,
      states: [{
        mapId: this.selectedMapIndex,
        x: 0,
        y: 0,
        chapterId: 0,
        timeframeId: 0,
        details: structuredClone(this.base_character_details),
      }],
    });
    m.redraw();
  },
  removeCharacter(index) {
    if (this.characters[index]) {
      this.characters.splice(index, 1);
      m.redraw();
    }
  },
  updateCharacterName(index, name) {
    if (this.characters[index]) {
      this.characters[index].name = name;
      m.redraw();
    }
  },
  addDetailToCharacter(characterIndex, stateIndex, detail) {
    if (this.characters[characterIndex]) {
      if (this.characters[characterIndex].states[stateIndex]) {
        this.characters[characterIndex].states[stateIndex].details.push(detail);
      } else {
        // something was wrong
      }
      m.redraw();
    }
  },
  updateDetailInCharacter(characterIndex, stateIndex, detailIndex, updates) {
    const character = this.characters[characterIndex];
    if (!character) {
      console.error("Character not found at index:", characterIndex);
      return;
    }

    const newState = this.ensureCharacterState(characterIndex, stateIndex);
    if (newState) {
      // Ensure the detail at the specified index exists
      if (!newState.details[detailIndex]) {
        newState.details[detailIndex] = {};
      }

      // Update the specific detail
      Object.assign(newState.details[detailIndex], updates);
      m.redraw();
    }
  },
  checkModifiedDetailFromCharacter(characterIndex, stateIndex, detailIndex) {
    if (this.characters[characterIndex]) {
      const currentState = this.characters[characterIndex].states[stateIndex];
      if (
        currentState && currentState.details[detailIndex] &&
        currentState.chapterId === this.selectedChapterIndex &&
        currentState.timeframeId === this.selectedTimeframeIndex
      ) {
        if (stateIndex > 0) {
          if (
            currentState.details[detailIndex] &&
            this.characters[characterIndex].states[stateIndex - 1] &&
            Object.entries(currentState.details[detailIndex]).some(
              ([key, value]) => {
                const previousDetail =
                  this.characters[characterIndex].states[stateIndex - 1]
                    .details[detailIndex];
                const previousKeys = Object.keys(previousDetail);

                if (!previousKeys.includes(key)) {
                  return true; // Key has been added
                }

                const previousValue = previousDetail[key];

                return previousValue !== value ||
                  typeof previousValue !== typeof value;
              },
            )
          ) {
            return true;
          }
          // m.redraw();
        }
      }
    }

    return false;
  },
  removeDetailFromCharacter(characterIndex, stateIndex, detailIndex) {
    if (this.characters[characterIndex]) {
      const currentState = this.characters[characterIndex].states[stateIndex];
      if (currentState && currentState.details[detailIndex]) {
        currentState.details.splice(detailIndex, 1);
        m.redraw();
      }
    }
  },
  addDetailToBaseCharacter(detail) {
    this.base_character_details.push(detail);
    m.redraw();
  },
  updateDetailInBaseCharacter(detailIndex, updates) {
    this.base_character_details[detailIndex] = { ...updates };
    m.redraw();
  },
  removeDetailFromBaseCharacter(detailIndex) {
    this.base_character_details.splice(detailIndex, 1);
    m.redraw();
  },

  // Chapter methods
  addChapter(name) {
    this.chapters.push({ name, timeframes: [] });
    m.redraw();
  },
  removeChapter(index) {
    if (this.chapters[index]) {
      this.chapters.splice(index, 1);
      m.redraw();
    }
  },
  updateChapterName(index, name) {
    if (this.chapters[index]) {
      this.chapters[index].name = name;
      m.redraw();
    }
  },
  addTimeframeToChapter(chapterIndex, timeframe) {
    if (this.chapters[chapterIndex]) {
      this.chapters[chapterIndex].timeframes.push(timeframe);
      m.redraw();
    }
  },
  updateTimeframeInChapter(chapterIndex, timeframeIndex, newTimeframe) {
    if (this.chapters[chapterIndex]?.timeframes[timeframeIndex]) {
      this.chapters[chapterIndex].timeframes[timeframeIndex] = newTimeframe;
      m.redraw();
    }
  },
  removeTimeframeFromChapter(chapterIndex, timeframeIndex) {
    if (this.chapters[chapterIndex]?.timeframes[timeframeIndex]) {
      this.chapters[chapterIndex].timeframes.splice(timeframeIndex, 1);
      m.redraw();
    }
  },

  select(item, index, nestedIndex) {
    this.selected.item = item;
    this.selected.index = index;
    this.selected.nestedIndex = nestedIndex;

    switch (item) {
      case "map":
        this.selectedMapIndex = index;
        break;
      case "timeframe":
        this.selectedChapterIndex = index;
        this.selectedTimeframeIndex = nestedIndex;
        break;
      case "character":
        this.selectedCharacterIndex = index;
        break;
      default:
    }
    // m.redraw();
  },

  findCharacterLatestStateIndexUpTo(characterIndex, chapterId, timeframeId) {
    const character = this.characters[characterIndex];
    let latestStateIndex = -1; // -1 if no state found
    let prevStateIndex = -1; // To track the last valid state index before the current one

    // Perform binary search through the states
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
        // Move to the right side of the list if the state is older or if we match the chapter but not the timeframe
        prevStateIndex = mid; // Keep track of the index of the last valid state before the current one
        low = mid + 1;
      } else {
        // Otherwise, move to the left side if the current state is newer than our target
        high = mid - 1;
      }
    }

    // If no exact match, return the index of the previous valid state
    if (latestStateIndex === -1 && prevStateIndex !== -1) {
      latestStateIndex = prevStateIndex;
    }

    return latestStateIndex;
  },
  getLatestCharacterChanges() {
    let chapterId = this.selectedChapterIndex ?? 0;
    let timeframeId = this.selectedTimeframeIndex ?? 0;
    const latestChanges = this.characters.map((_, characterIndex) => {
      const latestStateIndex = this.findCharacterLatestStateIndexUpTo(
        characterIndex,
        chapterId,
        timeframeId,
      );

      return {
        characterIndex: characterIndex,
        latestStateIndex: latestStateIndex,
      };
    });

    return latestChanges;
  },
  moveCharacter(index, direction) {
    // Check if the character exists
    if (!this.characters[index]) {
      console.error("Character not found at index:", index);
      return;
    }

    const newIndex = index + direction;

    // Check if the move would be out of bounds
    if (newIndex < 0 || newIndex >= this.characters.length) {
      console.warn("Cannot move character: would be out of bounds");
      return;
    }

    // Swap the characters
    const temp = this.characters[index];
    this.characters[index] = this.characters[newIndex];
    this.characters[newIndex] = temp;

    // Update the selected character index if needed
    if (this.selectedCharacterIndex === index) {
      this.selectedCharacterIndex = newIndex;
    } else if (this.selectedCharacterIndex === newIndex) {
      this.selectedCharacterIndex = index;
    }

    m.redraw();
  },
  bringCharacterToMap(characterIndex, latestStateIndex) {
    const character = this.characters[characterIndex];
    if (!character) {
      console.error("Character not found at index:", characterIndex);
      return;
    }

    const latestState = this.ensureCharacterState(characterIndex, latestStateIndex, {
      mapId: this.selectedMapIndex,
      x: 0,
      y: 0,
    });

    if (latestState) {
      console.log(`Character ${characterIndex} moved to map ${this.selectedMapIndex}`);
      m.redraw();
    }
  },
  ensureCharacterState(characterIndex, stateIndex, updates = {}) {
    const character = this.characters[characterIndex];
    if (!character) {
      console.error("Character not found at index:", characterIndex);
      return null;
    }

    const currentState = character.states[stateIndex];
    if (
      currentState &&
      currentState.chapterId === this.selectedChapterIndex &&
      currentState.timeframeId === this.selectedTimeframeIndex
    ) {
      // Update the existing state
      Object.assign(currentState, updates);
      return currentState;
    } else {
      // Create a new state based on the previous state
      const previousState =
        stateIndex > 0
          ? character.states[stateIndex - 1]
          : character.states[0];

      const newState = {
        mapId: this.selectedMapIndex,
        x: updates.x || 0,
        y: updates.y || 0,
        chapterId: this.selectedChapterIndex,
        timeframeId: this.selectedTimeframeIndex,
        details: structuredClone(
          previousState ? previousState.details : this.base_character_details
        ),
        ...updates,
      };

      // Insert the new state into the states array
      character.states.splice(stateIndex + 1, 0, newState);
      return newState;
    }
  },
};

State.maps = [
  {
    name: "Map 1",
    xoffset: 0,
    yoffset: 0,
    zoom: 0,
    images: [
      { src: "test1.jpg", x: 0, y: 0, scale: 1, rotation: 0 },
      { src: "test2.jpg", x: 0, y: 0, scale: 1, rotation: 0 },
    ],
  },
  {
    name: "Map 2",
    xoffset: 0,
    yoffset: 0,
    zoom: 0,
    images: [
      { src: "map2_image1.jpg", x: 0, y: 0, scale: 1, rotation: 0 },
    ],
  },
];
State.base_character_details = [
  { "Health": 100 },
  { "XP": 0 },
  { "Money": 3 },
];
State.characters = [
  {
    name: "Character 1",
    states: [
      {
        mapId: 0,
        x: 0,
        y: 0,
        chapterId: 0,
        timeframeId: 0,
        details: [
          { health: 100 },
          { race: "human" },
        ],
      },
    ],
  },
  {
    name: "Character 2",
    states: [
      {
        mapId: 0,
        x: 0,
        y: 1,
        chapterId: 0,
        timeframeId: 0,
        details: [
          { health: 200 },
          { race: "non-human" },
        ],
      },
    ],
  },
];

State.chapters = [
  {
    name: "Chapter 1",
    timeframes: ["Introduction Scene", "First Conflict"],
  },
  {
    name: "Chapter 2",
    timeframes: ["Rising Action", "Turning Point"],
  },
];

globalThis.State = State;
export default State;
