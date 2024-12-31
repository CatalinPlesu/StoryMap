import AppManager from "./AppManager.js";

class MapState {
  #maps;
  #selectedMapIndex = null;
  #selectedImageIndex = null;
  #appManager = null;
  #selected = false;

  constructor() {
    this.#appManager = AppManager.getInstance();
    this.#maps = [];
  }

  get selected() {
    return this.#selected;
  }

  set selected(value) {
    this.#selected = value;
  }

  get maps() {
    return this.#maps;
  }

  set maps(value) {
    this.#maps = value;
  }

  get selectedMapIndex() {
    return this.#selectedMapIndex;
  }

  set selectedMapIndex(value) {
    this.#selectedMapIndex = value;
  }

  get selectedImageIndex() {
    return this.#selectedImageIndex;
  }

  set selectedImageIndex(value) {
    this.#selectedImageIndex = value;
  }

  addMap(name) {
    this.#maps.push({ name, images: [] });
    this.#appManager.select("map", this.#maps.length - 1, null);
    m.redraw();
  }

  removeMap(index) {
    if (this.#maps[index]) {
      this.#maps.splice(index, 1);
      m.redraw();
    }
  }

  updateMap(index, updates) {
    if (this.#maps[index]) {
      Object.assign(this.#maps[index], updates);
      m.redraw();
    }
  }

  updateMapName(index, name) {
    if (this.#maps[index]) {
      this.#maps[index].name = name;
      m.redraw();
    }
  }

  updateMapZoom(index, zoom) {
    if (this.#maps[index]) {
      this.#maps[index].zoom = zoom;
      this.#appManager.storyUpdate();
      m.redraw();
    }
  }

  updateMapOffset(index, offset) {
    if (this.#maps[index]) {
      this.#maps[index].xoffset = offset.x;
      this.#maps[index].yoffset = offset.y;
      this.#appManager.storyUpdate();
      m.redraw();
    }
  }

  addImageToMap(mapIndex, image) {
    if (this.#maps[mapIndex]) {
      this.#maps[mapIndex].images.push(image);
      this.#selectedImageIndex =  this.#maps[mapIndex].images.length - 1;
      this.#appManager.storyUpdate();
      m.redraw();
    }
  }

  updateImageInMap(mapIndex, imageIndex, updates) {
    if (this.#maps[mapIndex]?.images[imageIndex]) {
      Object.assign(this.#maps[mapIndex].images[imageIndex], updates);
      m.redraw();
    }
  }

  moveImageUp(mapIndex, imageIndex) {
    const map = this.#maps[mapIndex];
    if (map && imageIndex > 0 && imageIndex < map.images.length) {
      [map.images[imageIndex], map.images[imageIndex - 1]] = [
        map.images[imageIndex - 1],
        map.images[imageIndex],
      ];
      this.#selectedImageIndex -= 1;
      this.#appManager.storyUpdate();
      m.redraw();
    }
  }

  moveImageDown(mapIndex, imageIndex) {
    const map = this.#maps[mapIndex];
    if (map && imageIndex >= 0 && imageIndex < map.images.length - 1) {
      [map.images[imageIndex], map.images[imageIndex + 1]] = [
        map.images[imageIndex + 1],
        map.images[imageIndex],
      ];
      this.#selectedImageIndex += 1;
      this.#appManager.storyUpdate();
      m.redraw();
    }
  }

  removeImageFromMap(mapIndex, imageIndex) {
    if (this.#maps[mapIndex]?.images[imageIndex]) {
      this.#maps[mapIndex].images.splice(imageIndex, 1);
      this.#appManager.storyUpdate();
      m.redraw();
    }
  }
}

export default MapState;
