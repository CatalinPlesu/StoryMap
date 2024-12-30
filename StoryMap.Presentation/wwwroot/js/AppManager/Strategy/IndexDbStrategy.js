import IStorageStrategy from './IStorageStrategy.js';

class IndexDbStrategy extends IStorageStrategy {
    save() {
        console.log("Saving to local storage");
        // Logic for saving data locally
    }

    load() {
        console.log("Loading from local storage");
    }

    loadStories() {
        console.log("Loading from IndexDb");
    }
}

export default IndexDbStrategy;
