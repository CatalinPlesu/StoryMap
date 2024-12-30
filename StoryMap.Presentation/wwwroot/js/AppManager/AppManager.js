import MapState from "./MapState.js";
import CharacterState from "./CharacterState.js";
import ChapterState from "./ChapterState.js";
import NavigationState from "./NavigationState.js";
import StoryState from "./StoryState.js";
import StorageProxy from "./StorageProxy/StorageProxy.js";

/**
 * AppManager Singleton Class + Facade
 * This class ensures that only one instance of AppManager exists.
 */
class AppManager {
  // The private static instance
  static #instance = null;
  #mapState = null;
  #characterState = null;
  #chapterState = null;
  #navigationState = null;
  #storyState = null;
  #storage = null;

  /**
   * Private constructor to prevent direct instantiation
   */
  constructor() {
    if (AppManager.#instance) {
      throw new Error(
        "AppManager instance already exists. Use getInstance() instead.",
      );
    }
  }

  // Public method to get the singleton instance
  static getInstance() {
    if (!AppManager.#instance) {
      AppManager.#instance = new AppManager(); // Create the instance
    }
    return AppManager.#instance; // Return the existing or newly created instance
  }

  init() {
    if (!this.#mapState) {
      this.#mapState = new MapState();
    }
    if (!this.#characterState) {
      this.#characterState = new CharacterState();
    }
    if (!this.#chapterState) {
      this.#chapterState = new ChapterState();
    }
    if (!this.#navigationState) {
      this.#navigationState = new NavigationState();
    }
    if (!this.#storyState) {
      this.#storyState = new StoryState();
    }
    if (!this.#storage) {
      this.#storage = new StorageProxy();
    }
    return this;
  }

  // {MapState} Facade
  mapSetSelected = (value) => this.#mapState.selected = value;
  mapGetSelected = () => this.#mapState.selected;
  mapCheckActive = (index) => this.mapGetSelectedIndex() === index;
  mapGetAll = () => this.#mapState.maps;
  mapSetAll = (value) => { this.#mapState.maps = value; };
  mapGetSelectedIndex = () => this.#mapState.selectedMapIndex;
  mapSetSelectedIndex = (value) => {
    this.#mapState.selectedMapIndex = value; 
    this.mapSetSelected(true);
  };
  mapAdd = (name) => this.#mapState.addMap(name);
  mapRemove = (index) => this.#mapState.removeMap(index);
  mapUpdate = (index, updates) => this.#mapState.updateMap(index, updates);
  mapRename = (index, name) => this.#mapState.updateMapName(index, name);
  mapZoom = (index, zoom) => this.#mapState.updateMapZoom(index, zoom);
  mapOffset = (index, offset) => this.#mapState.updateMapOffset(index, offset);
  mapAddImage = (mapIndex, image) => this.#mapState.addImageToMap(mapIndex, image);
  mapUpdateImage = (mapIndex, imageIndex, updates) => this.#mapState.updateImageInMap(mapIndex, imageIndex, updates);
  mapMoveImageUp = (mapIndex, imageIndex) => this.#mapState.moveImageUp(mapIndex, imageIndex);
  mapMoveImageDown = (mapIndex, imageIndex) => this.#mapState.moveImageDown(mapIndex, imageIndex);
  mapRemoveImage = (mapIndex, imageIndex) => this.#mapState.removeImageFromMap(mapIndex, imageIndex);

  // {CharacterState} facade
  characterSetSelected = (value) => this.#characterState.selected = value;
  characterGetSelected = () => this.#characterState.selected;
  characterCheckActive = (index) => this.characterGetSelectedIndex() === index && this.#characterState.selected;
  characterAdd = (name) => this.#characterState.addCharacter(name);
  characterClone = (index, stateIndex) => this.#characterState.cloneCharacter(index, stateIndex);
  characterRemove = (index) => this.#characterState.removeCharacter(index);
  characterRename = (index, name) => this.#characterState.updateCharacterName(index, name);
  characterAddDetail = (characterIndex, stateIndex, detail) => this.#characterState.addDetailToCharacter(characterIndex, stateIndex, detail);
  characterUpdateDetail = (characterIndex, stateIndex, detailIndex, updates) => this.#characterState.updateDetailInCharacter(characterIndex, stateIndex, detailIndex, updates);
  characterCheckModifiedDetail = (characterIndex, stateIndex, detailIndex) => this.#characterState.checkModifiedDetailFromCharacter(characterIndex, stateIndex, detailIndex);
  characterRemoveDetail = (characterIndex, stateIndex, detailIndex) => this.#characterState.removeDetailFromCharacter(characterIndex, stateIndex, detailIndex);
  characterMove = (index, direction) => this.#characterState.moveCharacter(index, direction);
  characterBringToMap = (characterIndex, latestStateIndex) => this.#characterState.bringCharacterToMap(characterIndex, latestStateIndex);
  characterGetLatestChanges = () => this.#characterState.getLatestCharacterChanges();
  characterEnsureState = (characterIndex, stateIndex, updates = {}) => this.#characterState.ensureCharacterState(characterIndex, stateIndex, updates);
  characterGetAll = () => this.#characterState.characters;
  characterGetSelectedIndex = () => this.#characterState.selectedCharacterIndex;
  characterSetSelectedIndex = (index) => {
    this.#characterState.selectedCharacterIndex = index;
    this.characterSetSelected(true);
  }
  baseCharacterAddDetail= (detail) => this.#characterState.addDetailToBaseCharacter(detail);
  baseCharacterUpdateDetail= (detailIndex, updates) => this.#characterState.updateDetailInBaseCharacter(detailIndex, updates);
  baseCharacterRemoveDetail= (detailIndex) => this.#characterState.removeDetailFromBaseCharacter(detailIndex);
  baseCharacterGetDetails = () => this.#characterState.baseCharacterDetails;

  // {ChapterState} Facade
  chapterSetSelected = (value) => this.#chapterState.selected = value;
  chapterGetSelected = () => this.#chapterState.selected;
  chapterCheckActive = (index, secondIndex) => this.chapterGetSelectedIndex() === index && this.chapterGetSelectedTimeframeIndex() === secondIndex;
  chapterGetAll = () => this.#chapterState.chapters;
  chapterSetAll = (value) => { this.#chapterState.chapters = value; };
  chapterGetSelectedIndex = () => this.#chapterState.selectedChapterIndex;
  chapterSetSelectedIndex = (value) => { 
    this.#chapterState.selectedChapterIndex = value;
    this.chapterSetSelected(true);
  };
  chapterGetSelectedTimeframeIndex = () => this.#chapterState.selectedTimeframeIndex;
  chapterSetSelectedTimeframeIndex = (value) => { this.#chapterState.selectedTimeframeIndex = value; };
  chapterAdd = (name) => this.#chapterState.addChapter(name);
  chapterRemove = (index) => this.#chapterState.removeChapter(index);
  chapterRename = (index, name) => this.#chapterState.updateChapterName(index, name);
  chapterAddTimeframe = (chapterIndex, timeframe) => this.#chapterState.addTimeframeToChapter(chapterIndex, timeframe);
  chapterUpdateTimeframe = (chapterIndex, timeframeIndex, newTimeframe) => this.#chapterState.updateTimeframeInChapter(chapterIndex, timeframeIndex, newTimeframe);
  chapterRemoveTimeframe = (chapterIndex, timeframeIndex) => this.#chapterState.removeTimeframeFromChapter(chapterIndex, timeframeIndex);

  // {NavigationState} Facade
  selected = () => this.#navigationState.selected;
  select = (item, index, nestedIndex = null)  => this.#navigationState.select(item, index, nestedIndex);
  navigateTimeframe = (direction) => this.#navigationState.navigateTimeframe(direction);

  // {StoryState} Facade
  storyGetUpdated = () => this.#storyState.updated;
  storyUpdate = () => { this.#storyState.updated = true; };
  storyGetIsPlaying = () => this.#storyState.isPlaying;
  storySetIsPlaying = (value) => { this.#storyState.isPlaying = value; };
  storyGetStoryName = () => this.#storyState.storyName;
  storySetStoryName = (value) => { this.#storyState.storyName = value; };
  storyMode = () => this.#storyState.mode;
  storyModeView = () => this.#storyState.mode === "view";
  storyModeEdit = () => this.#storyState.mode === "edit";
  storyModeCreate = () => this.#storyState.mode === "create";
  storyGetSpeed = () => this.#storyState.speed;
  storySetSpeed = (value) => { this.#storyState.speed = value; };

  storyIsLastTimeframe = () => {
    const chapters = this.chapterGetAll();
    const currentChapterIndex = this.chapterGetSelectedIndex();
    const currentTimeframeIndex = this.chapterGetSelectedTimeframeIndex();
    
    return currentChapterIndex >= chapters.length - 1 &&
           currentTimeframeIndex >= chapters[currentChapterIndex].timeframes.length - 1;
  };

  // Storage facade
  save = () => this.#storage.save();
  load = () => this.#storage.load();
  loadStories = () => this.#storage.loadStories();
}

export default AppManager;
