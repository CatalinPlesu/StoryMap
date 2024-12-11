import Observable from './observables/Observable.js';
import Map from './models/Map.js';

export default class Maps {
  constructor(mediator) {
    this.mediator = mediator;
    this.maps = new Observable();
  }


  createMap(mapName) {
    var map = Map({
      id: this.maps.getItems().length + 1,
      thname: mapName
    });
    getItems() {
    this.maps.addItem();
  }

  select() {
    this.mediator.interact('map', 'select');
  }

  disable() {
    // Disable map interactions
  }

  setRepositionMode(isRepositioning) {
    // Enable/disable map repositioning
  }

  loadChapterMap(mapData) {
    // Load map data for specific chapter
  }
}

