const State = {
  maps: [],
  characters: [],
  chapters: [],

  // Map methods
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
  addImageToMap(mapIndex, image) {
    if (this.maps[mapIndex]) {
      this.maps[mapIndex].images.push(image);
      m.redraw();
    }
  },
  updateImageInMap(mapIndex, imageIndex, updates) {
    if (this.maps[mapIndex]?.images[imageIndex]) {
      Object.assign(this.maps[mapIndex].images[imageIndex], updates);
      m.redraw();
    }
  },
  removeImageFromMap(mapIndex, imageIndex) {
    if (this.maps[mapIndex]?.images[imageIndex]) {
      this.maps[mapIndex].images.splice(imageIndex, 1);
      m.redraw();
    }
  },

  // Character methods
  addCharacter(name) {
    this.characters.push({ name, details: [] });
    m.redraw();
  },
  removeCharacter(index) {
    if (this.characters[index]) {
      this.characters.splice(index, 1);
      m.redraw();
    }
  },
  updateCharacter(index, updates) {
    if (this.characters[index]) {
      Object.assign(this.characters[index], updates);
      m.redraw();
    }
  },
  addDetailToCharacter(characterIndex, detail) {
    if (this.characters[characterIndex]) {
      this.characters[characterIndex].details.push(detail);
      m.redraw();
    }
  },
  updateDetailInCharacter(characterIndex, detailIndex, updates) {
    if (this.characters[characterIndex]?.details[detailIndex]) {
      Object.assign(this.characters[characterIndex].details[detailIndex], updates);
      m.redraw();
    }
  },
  removeDetailFromCharacter(characterIndex, detailIndex) {
    if (this.characters[characterIndex]?.details[detailIndex]) {
      this.characters[characterIndex].details.splice(detailIndex, 1);
      m.redraw();
    }
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
  updateChapter(index, updates) {
    if (this.chapters[index]) {
      Object.assign(this.chapters[index], updates);
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
  }
};

// Initialize with some data for testing
State.maps = [
  {
    name: "Map 1",
    images: [
      { src: "test1.jpg", x: 0, y: 0, scale: 1, rotation: 0 },
      { src: "test2.jpg", x: 0, y: 0, scale: 1, rotation: 0 }
    ]
  },
  {
    name: "Map 2",
    images: [
      { src: "map2_image1.jpg", x: 0, y: 0, scale: 1, rotation: 0 }
    ]
  }
];

State.characters = [
  {
    name: "Character 1",
    details: [
      { health: 100 },
      { race: "human" }
    ]
  },
  {
    name: "Character 2",
    details: [
      { health: 100 },
      { race: "human" }
    ]
  }
];

State.chapters = [
  {
    name: "Chapter 1",
    timeframes: ["Introduction Scene", "First Conflict"]
  },
  {
    name: "Chapter 2",
    timeframes: ["Rising Action", "Turning Point"]
  }
];

globalThis.State = State;
export default State;
