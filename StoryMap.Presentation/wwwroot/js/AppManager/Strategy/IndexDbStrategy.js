import IStorageStrategy from './IStorageStrategy.js';
import AppManager from "../AppManager.js";
import StoryDataBuilder from '../../Models/StoryData.js';

class IndexDbStrategy extends IStorageStrategy {
    constructor() {
        super();
        this.dbName = 'storyMapDB';
        this.storiesStore = 'stories';
        this.dbVersion = 1;
    }

    async #initDb() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storiesStore)) {
                    db.createObjectStore(this.storiesStore, { keyPath: 'id' });
                }
            };

            request.onsuccess = () => resolve(request.result);
        });
    }

    async generateUniqueId(store) {
        let isUnique = false;
        let newId;

        while (!isUnique) {
            newId = crypto.randomUUID();
            const request = store.get(newId);

            await new Promise(resolve => {
                request.onsuccess = () => {
                    isUnique = !request.result;
                    resolve();
                };
            });
        }

        return newId;
    }

    async save() {
        const appManager = AppManager.getInstance();
        const db = await this.#initDb();
        const transaction = db.transaction([this.storiesStore], 'readwrite');
        const store = transaction.objectStore(this.storiesStore);

        let storyId = localStorage.getItem('storyId');
        if (!storyId) {
            storyId = await this.generateUniqueId(store);
        }

        const builder = new StoryDataBuilder();
        const storyData = builder
            .setId(storyId)
            .setName(appManager.storyGetStoryName() || appManager.mapGetAll()[0].name || "New Story")
            .setMaps(appManager.mapGetAll())
            .setCharacters(appManager.characterGetAll())
            .setChapters(appManager.chapterGetAll())
            .setCover(this.extractCover(appManager.mapGetAll()))
            .build();


        return new Promise((resolve, reject) => {
            const request = store.put(storyData);

            request.onsuccess = () => {
                localStorage.setItem('storyId', storyId);
                resolve();
            };

            request.onerror = () => reject(request.error);
        });
    }

    async load() {
        const storyId = localStorage.getItem('storyId');
        if (!storyId) return null;

        const db = await this.#initDb();
        const transaction = db.transaction([this.storiesStore], 'readonly');
        const store = transaction.objectStore(this.storiesStore);

        return new Promise((resolve, reject) => {
            const request = store.get(storyId);

            request.onsuccess = () => {
                if (request.result) {
                    const appManager = AppManager.getInstance();
                    const { name, maps, characters, chapters } = request.result;

                    appManager.storySetStoryName(name);
                    appManager.mapSetAll(maps);
                    appManager.characterSetAll(characters);
                    appManager.chapterSetAll(chapters);
                }
                resolve(request.result);
            };

            request.onerror = () => reject(request.error);
        });
    }

    async loadStories() {
        const db = await this.#initDb();
        const transaction = db.transaction([this.storiesStore], 'readonly');
        const store = transaction.objectStore(this.storiesStore);

        return new Promise((resolve, reject) => {
            const request = store.getAll();

            request.onsuccess = () => {
                // First get all the complete data
                const allStoriesData = request.result;

                // Then extract only what we need for the stories list
                const storiesList = allStoriesData.map(story => {
                    // Here we make sure to get all fields even if story format changes
                    const { id, name, maps, characters, chapters, cover } = story;

                    return {
                        id,
                        name,
                        cover
                    };
                });

                const appManager = AppManager.getInstance();
                appManager.storiesSetAll(storiesList);

                resolve(storiesList);
            };

            request.onerror = () => reject(request.error);
        });
    }

    extractCover(maps) {
        if (!maps || maps.length === 0) return null;
        const firstMap = maps[0];
        return firstMap.images && firstMap.images.length > 0 ? firstMap.images[0] : null;
    }
}

export default IndexDbStrategy;