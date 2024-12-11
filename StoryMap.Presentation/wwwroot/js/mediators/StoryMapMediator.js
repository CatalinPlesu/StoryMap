export default class StoryMapMediator {
  constructor(components) {
    this.components = {
      maps: components.maps,
      characters: components.characters,
      chapters: components.chapters,
      canvas: components.canvas
    };

    // Current active context
    this.currentContext = null;
  }

  // Central method to handle component interactions
  interact(sender, action, data) {
    switch(sender) {
      case 'map':
        this.handleMapInteraction(action, data);
        break;
      case 'chapter':
        this.handleChapterInteraction(action, data);
        break;
      case 'character':
        this.handleCharacterInteraction(action, data);
        break;
      case 'canvas':
        this.handleCanvasInteraction(action, data);
        break;
    }
  }

  // Map interaction handler
  handleMapInteraction(action, data) {
    if (action === 'select') {
      // Focus on map, update other components
      this.currentContext = 'map';
    console.log("selecting a map");
      // this.components.imageComponent.enable();
      // this.components.characterCanvas.disable();
    }
  }

  // Image component interaction handler
  handleImageComponentInteraction(action, data) {
    if (action === 'reposition') {
      // Allow repositioning of map image
      this.currentContext = 'imageComponent';
      this.components.map.setRepositionMode(true);
    }
  }

  // Character canvas interaction handler
  handleCharacterCanvasInteraction(action, data) {
    if (action === 'select') {
      // Focus on character
      this.currentContext = 'character';
      this.components.map.disable();
      this.components.characterCanvas.enableMovement();
    }

    if (action === 'move') {
      // Track character movement
      this.trackCharacterMovement(data);
    }
  }

  // Chapter selection handler
  handleChapterSelection(action, data) {
    if (action === 'select') {
      // Load chapter-specific data
      const chapter = data;
      this.loadChapterContext(chapter);
    }
  }

  // Timeframe input handler
  handleTimeframeInput(action, data) {
    if (action === 'add') {
      // Add or update timeframe for current chapter
      this.addTimeframe(data);
    }
  }

  // Track character movement for specific chapter/timeframe
  trackCharacterMovement(movementData) {
    if (this.currentContext === 'character') {
      // Store movement in current chapter's context
      const currentChapter = this.components.chapterSelector.getCurrentChapter();
      currentChapter.addCharacterMovement(movementData);
    }
  }

  // Load chapter-specific context
  loadChapterContext(chapter) {
    // Reset components to chapter-specific state
    this.components.map.loadChapterMap(chapter.mapData);
    this.components.characterCanvas.loadCharacters(chapter.characters);
    this.components.timeframeInput.loadTimeframes(chapter.timeframes);
  }

  // Add or update timeframe
  addTimeframe(timeframeData) {
    const currentChapter = this.components.chapterSelector.getCurrentChapter();
    currentChapter.addTimeframe(timeframeData);
  }
}
