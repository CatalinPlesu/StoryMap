export default class Chapters {
  constructor(mediator) {
    this.mediator = mediator;
  }

  addTimeframe(timeframeData) {
    this.mediator.interact('timeframeInput', 'add', timeframeData);
  }

  loadTimeframes(timeframes) {
    // Load existing timeframes for chapter
  }
}
