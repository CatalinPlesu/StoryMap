import AppManager from "./AppManager.js";

class ChapterState {
  #chapters;
  #selectedChapterIndex;
  #selectedTimeframeIndex;
  #appManager = null;
  #selected = false;

  constructor() {
    this.#chapters = [];
    this.#selectedChapterIndex = 0;
    this.#selectedTimeframeIndex = 0;
    this.#appManager = AppManager.getInstance();
  }

  get selected() {
    return this.#selected;
  }

  set selected(value) {
    this.#selected = value;
  }

  get chapters() {
    return this.#chapters;
  }

  set chapters(value) {
    this.#chapters = value;
  }

  get selectedChapterIndex() {
    return this.#selectedChapterIndex;
  }

  set selectedChapterIndex(value) {
    this.#selectedChapterIndex = value;
  }

  get selectedTimeframeIndex() {
    return this.#selectedTimeframeIndex;
  }

  set selectedTimeframeIndex(value) {
    this.#selectedTimeframeIndex = value;
  }

  addChapter(name) {
    this.#chapters.push({ name, timeframes: [] });
    this.#appManager.select("map", this.#chapters.length - 1, null);
    m.redraw();
  }

  removeChapter(index) {
    if (this.#chapters[index]) {
      this.#chapters.splice(index, 1);
      m.redraw();
    }
  }

  updateChapterName(index, name) {
    if (this.#chapters[index]) {
      this.#chapters[index].name = name;
      m.redraw();
    }
  }

  addTimeframeToChapter(chapterIndex, timeframe) {
    if (this.#chapters[chapterIndex]) {
      this.#chapters[chapterIndex].timeframes.push(timeframe);
      m.redraw();
    }
  }

  updateTimeframeInChapter(chapterIndex, timeframeIndex, newTimeframe) {
    if (this.#chapters[chapterIndex]?.timeframes[timeframeIndex]) {
      this.#chapters[chapterIndex].timeframes[timeframeIndex] = newTimeframe;
      m.redraw();
    }
  }

  removeTimeframeFromChapter(chapterIndex, timeframeIndex) {
    if (this.#chapters[chapterIndex]?.timeframes[timeframeIndex]) {
      this.#chapters[chapterIndex].timeframes.splice(timeframeIndex, 1);
      m.redraw();
    }
  }
}

export default ChapterState;
