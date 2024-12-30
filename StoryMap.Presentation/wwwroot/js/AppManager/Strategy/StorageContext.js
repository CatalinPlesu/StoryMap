import IStorageContext from './IStorageContext.js';

/**
 * Context class that manages the current storage strategy.
 * Implements IStorageContext interface.
 */
class StorageContext extends IStorageContext {
    constructor() {
        super();
        this.currentStrategy = null;
    }

    /**
     * Set the storage strategy.
     * @param {object} strategy - The storage strategy to use.
     */
    setStrategy(strategy) {
        this.currentStrategy = strategy;
    }

    save() {
        if (!this.currentStrategy) {
            throw new Error("Strategy not set.");
        }
        this.currentStrategy.save();
        m.redraw();
    }

    load() {
        if (!this.currentStrategy) {
            throw new Error("Strategy not set.");
        }
        this.currentStrategy.load();
        m.redraw();
    }

    loadStories() {
        if (!this.currentStrategy) {
            throw new Error("Strategy not set.");
        }
        this.currentStrategy.loadStories();
        m.redraw();
    }
}

export default StorageContext;
