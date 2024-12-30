import IStorageContext from '../Strategy/IStorageContext.js';
import StorageContext from '../Strategy/StorageContext.js';
import IndexDbStrategy from '../Strategy/IndexDbStrategy.js';
import ApiStrategy from '../Strategy/ApiStrategy.js';

/**
 * Proxy for storage context.
 * Decides whether to use local storage or database storage dynamically.
 * Implements IStorageContext interface.
 */
class StorageProxy extends IStorageContext {
    constructor() {
        super();
        this.context = new StorageContext();

        // Default to local storage strategy
        this.indexDbStrategy = new IndexDbStrategy();
        this.apiStrategy = new ApiStrategy();
        this.useIndexDB = true; // Flag to decide storage type
    }

    /**
     * Set whether to use indexDB storage.
     * @param {boolean} useLocal - True to use IndexDB, local storage
     */
    #useLocalStorage(useLocal) {
        const strategy = useLocal || window.location.protocol === 'file:'
            ? this.indexDbStrategy
            : this.apiStrategy;
        this.context.setStrategy(strategy);
    }

    setStrategy(strategy) {
        this.context.setStrategy(strategy);
    }

    save() {
        this.#useLocalStorage(true);
        this.context.save();
    }

    load() {
        this.#useLocalStorage(true);
        return this.context.load();
    }

    loadStories() {
        this.#useLocalStorage(true);
        return this.context.loadStories();
    }
}

export default StorageProxy;
