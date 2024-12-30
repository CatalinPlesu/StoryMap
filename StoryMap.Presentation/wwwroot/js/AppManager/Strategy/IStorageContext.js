/**
 * Interface for storage context classes.
 * @interface
 */
class IStorageContext {
    /**
     * Save data.
     * @abstract
     * @param {any} data - The data to save.
     */
    save() {
      throw new Error("Method 'save(data)' must be implemented.");
    }
  
    /**
     * Load data.
     * @abstract
     * @returns {any} The loaded data.
     */
    load() {
      throw new Error("Method 'load()' must be implemented.");
    }

    /**
     * Load Stories data(only name and picture).
     * @abstract
     * @returns {any} The loaded data.
     */
    loadStories() {
        throw new Error("Method 'loadStories()' must be implemented.");
    }
  
    /**
     * Set the storage strategy dynamically.
     * @abstract
     * @param {object} strategy - The storage strategy to use.
     */
    setStrategy(strategy) {
      throw new Error("Method 'setStrategy(strategy)' must be implemented.");
    }
  }
  
  export default IStorageContext;
  