import IStorageStrategy from './IStorageStrategy.js';

class ApiStrategy extends IStorageStrategy {
    save() {
        console.log("Saving to database");
    }

    load() {
        console.log("Loading from database");
    }

    loadStories() {
        console.log("Loading from database");
    }
}

export default ApiStrategy;
