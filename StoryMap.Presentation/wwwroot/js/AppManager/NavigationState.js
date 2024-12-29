import AppManager from "./AppManager.js";

class NavigationState {
  #appManager = null;
  #selected = null;

  constructor() {
    this.#appManager = AppManager.getInstance();
    this.#selected = { item: "map", index: 0, nestedIndex: null };
  }

  get selected() {
    return this.#selected;
  }

  select(item, index, nestedIndex) {
    this.#selected.item = item;
    this.#selected.index = index;
    this.#selected.nestedIndex = nestedIndex;
    this.#appManager.mapSetSelected(false);
    this.#appManager.chapterSetSelected(false);
    this.#appManager.characterSetSelected(false);
    switch (item) {
      case "map":
        this.#appManager.mapSetSelectedIndex(index);
        break;
      case "timeframe":
        this.#appManager.chapterSetSelectedIndex(index);
        this.#appManager.chapterSetSelectedTimeframeIndex(nestedIndex);
        break;
      case "character":
        this.#appManager.characterSetSelectedIndex(index);
        break;
      default:
    }
    this.#appManager.storyUpdate();
    m.redraw();
  }

  navigateTimeframe(direction) {
    let selectedChapterIndex = this.#appManager.chapterGetSelectedIndex();
    let selectedTimeframeIndex = this.#appManager
      .chapterGetSelectedTimeframeIndex();

    if (direction === 1) {
      if (
        selectedTimeframeIndex <
          this.chapters[selectedChapterIndex].timeframes.length - 1
      ) {
        selectedTimeframeIndex++;
      } else if (selectedChapterIndex < this.chapters.length - 1) {
        selectedChapterIndex++;
        selectedTimeframeIndex = 0;
      }
    } else if (direction === -1) {
      if (selectedTimeframeIndex > 0) {
        selectedTimeframeIndex--;
      } else if (selectedChapterIndex > 0) {
        selectedChapterIndex--;
        selectedTimeframeIndex =
          this.chapters[selectedChapterIndex].timeframes.length - 1;
      }
    }

    this.select("timeframe", selectedChapterIndex, selectedTimeframeIndex);
  }
}

export default NavigationState;
