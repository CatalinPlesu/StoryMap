class Observable {
    constructor() {
        this.observers = [];
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        this.notifyObservers();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.notifyObservers();
    }

    updateItem(itemId, newDetails) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            Object.assign(item, newDetails);
            this.notifyObservers();
        }
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update());
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    getItems() {
        return this.items;
    }
}

export default Observable;

