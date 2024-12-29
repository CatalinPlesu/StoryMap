class MapState {
  #maps;
  #selectedMapIndex;

  constructor() {
    this.#maps = [];
    this.#selectedMapIndex = 0;
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

  addMap(name) {
    this.#maps.push({ name, images: [] });
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
      m.redraw();
    }
  }

  updateMapOffset(index, offset) {
    if (this.#maps[index]) {
      this.#maps[index].xoffset = offset.x;
      this.#maps[index].yoffset = offset.y;
      m.redraw();
    }
  }

  addImageToMap(mapIndex, image) {
    if (this.#maps[mapIndex]) {
      this.#maps[mapIndex].images.push(image);
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
      m.redraw();
    }
  }

  removeImageFromMap(mapIndex, imageIndex) {
    if (this.#maps[mapIndex]?.images[imageIndex]) {
      this.#maps[mapIndex].images.splice(imageIndex, 1);
      m.redraw();
    }
  }
}

export default MapState;
