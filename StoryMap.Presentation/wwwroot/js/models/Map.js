export default class Map {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export class Image {
  constructor(id, mapId, image, x, y, scale, rotation) {
    this.id = id;
    this.mapId = mapId;
    this.image = image;
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.rotation = rotation;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  updateScale(scale) {
    this.scale = scale;
  }

  updateRotation(rotation) {
    this.rotation = rotation;
  }
}
