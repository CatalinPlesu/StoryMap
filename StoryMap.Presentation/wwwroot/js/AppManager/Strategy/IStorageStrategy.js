class IStorageStrategy {
    save() {
        throw new Error("save() method must be implemented");
    }

    load() {
        throw new Error("load() method must be implemented");
    }
    
    loadStories() {
        throw new Error("loadStories() method must be implemented");
    }
}

export default IStorageStrategy;
