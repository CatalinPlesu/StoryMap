/**
 * Represents the state of a character.
 * @class
 */
class State {
  /**
   * @param {number} mapId - The map identifier.
   * @param {number} x - The x-coordinate of the character.
   * @param {number} y - The y-coordinate of the character.
   * @param {number} chapterId - The chapter identifier.
   * @param {number} timeframeId - The timeframe identifier.
   * @param {Array<Object>} details - The details about the character (e.g., health, race).
   */
  constructor(mapId, x, y, chapterId, timeframeId, details) {
    this.mapId = mapId;
    this.x = x;
    this.y = y;
    this.chapterId = chapterId;
    this.timeframeId = timeframeId;
    this.details = details; // Array of detail objects (e.g., { health: 200 })
  }
}

export default State;
