import MapState from "./MapState.js";
import CharacterState from "./CharacterState.js";
import ChapterState from "./ChapterState.js";
import NavigationState from "./NavigationState.js";

/**
 * AppManager Singleton Class
 * This class ensures that only one instance of AppManager exists.
 */
class AppManager {
  // The private static instance
  static #instance = null;
  #mapState = null;
  #characterState = null;
  #chapterState = null;
  #navigationState = null;

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
      this.#navigationState = new NavigationState(this.#mapState, this.#chapterState, this.#characterState);
    }
    return this;
  }

  // Example method for AppManager
  getState() {
    return {
      mapState: this.#mapState,
      characterState: this.#characterState,
      chapterState: this.#chapterState,
      navigationState: this.#navigationState,
    };
  }

  // {MapState} Facade
  mapGetAll = () => this.#mapState.maps;
  mapSetAll = (value) => { this.#mapState.maps = value; };
  mapGetSelectedIndex = () => this.#mapState.selectedMapIndex;
  mapSetSelectedIndex = (value) => { this.#mapState.selectedMapIndex = value; };
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
  characterAdd = (name) => this.#characterState.addCharacter(name);
  characterRemove = (index) => this.#characterState.removeCharacter(index);
  characterRename = (index, name) => this.#characterState.updateCharacterName(index, name);
  characterAddDetail = (characterIndex, stateIndex, detail) => this.#characterState.addDetailToCharacter(characterIndex, stateIndex, detail);
  characterUpdateDetail = (characterIndex, stateIndex, detailIndex, updates) => this.#characterState.updateDetailInCharacter(characterIndex, stateIndex, detailIndex, updates);
  characterCheckModifiedDetail = (characterIndex, stateIndex, detailIndex) => this.#characterState.checkModifiedDetailFromCharacter(characterIndex, stateIndex, detailIndex);
  characterRemoveDetail = (characterIndex, stateIndex, detailIndex) => this.#characterState.removeDetailFromCharacter(characterIndex, stateIndex, detailIndex);
  characterMove = (index, direction) => this.#characterState.moveCharacter(index, direction);
  characterBringToMap = (characterIndex, latestStateIndex) => this.#characterState.bringCharacterToMap(characterIndex, latestStateIndex);
  characterGetLatestChanges = () => this.#characterState.getLatestCharacterChanges();
  characterGetAll = () => this.#characterState.characters;
  characterGetSelectedIndex = () => this.#characterState.selectedCharacterIndex;
  characterSetSelectedIndex = (index) => this.#characterState.selectedCharacterIndex = index;
  baseCharacterAddDetail= (detail) => this.#characterState.addDetailToBaseCharacter(detail);
  baseCharacterUpdateDetail= (detailIndex, updates) => this.#characterState.updateDetailInBaseCharacter(detailIndex, updates);
  baseCharacterRemoveDetail= (detailIndex) => this.#characterState.removeDetailFromBaseCharacter(detailIndex);
  baseCharacterGetDetails = () => this.#characterState.baseCharacterDetails;

  // {ChapterState} Facade
  chapterGetAll = () => this.#chapterState.chapters;
  chapterSetAll = (value) => { this.#chapterState.chapters = value; };
  chapterGetSelectedIndex = () => this.#chapterState.selectedChapterIndex;
  chapterSetSelectedIndex = (value) => { this.#chapterState.selectedChapterIndex = value; };
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

}

export default AppManager;
