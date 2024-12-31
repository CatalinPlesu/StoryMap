class StoryState {
  #updated = false;
  #isPlaying = false;
  #speed = 1;
  #storyName = null;
  #stories = [];
  #observers = [];

  addObserver(observer) {
    if (observer.update && typeof observer.update === 'function') {
      this.#observers.push(observer);
    } else {
      console.error('Observer must implement an update method');
    }
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  notify() {
    this.#observers.forEach(observer => observer.update(this));
  }

  get speed() {
    return this.#speed;
  }

  set speed(value) {
    this.#speed = value;
    m.redraw();
  }

  get stories() {
    return this.#stories;
  }

  set stories(value) {
    this.#stories = value;
    m.redraw();
  }

  get updated() {
    const currentUpdated = this.#updated;
    this.#updated = false;
    return currentUpdated;
  }

  set updated(value) {
    this.#updated = value;
    this.notify();
    m.redraw();
  }

  get isPlaying() {
    return this.#isPlaying;
  }

  set isPlaying(value) {
    this.#isPlaying = value;
    m.redraw();
  }

  get storyName() {
    return this.#storyName;
  }

  set storyName(value) {
    this.#storyName = value;
    m.redraw();
  }

  // Getter for mode (dynamically determined based on URL)
  get mode() {
    const path = window.location.href.toLowerCase();
    if (path.includes("story/create")) {
      return "create";
    } else if (path.includes("story/edit")) {
      return "edit";
    } else {
      return "view";
    }
  }
}

export default StoryState;
