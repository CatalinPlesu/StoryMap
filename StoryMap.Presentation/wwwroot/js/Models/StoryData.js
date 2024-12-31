export class StoryData {
    constructor(id, name, maps, characters, chapters, cover) {
        this.id = id;
        this.name = name;
        this.maps = maps;
        this.characters = characters;
        this.chapters = chapters;
        this.cover = cover;
    }
}

export default class StoryDataBuilder {
    constructor() {
        this.id = null;
        this.name = null;
        this.maps = [];
        this.characters = [];
        this.chapters = [];
        this.cover = null;
    }

    setId(storyId) {
        this.id = storyId;
        return this; 
    }

    setName(storyName = "New Story") {
        this.name = storyName;
        return this; 
    }

    setMaps(maps = []) {
        this.maps = maps;
        return this;
    }

    setCharacters(characters = []) {
        this.characters = characters;
        return this;
    }

    setChapters(chapters = []) {
        this.chapters = chapters;
        return this;
    }

    setCover(cover = null) {
        this.cover = cover;
        return this;
    }

    build() {
        return new StoryData(this.id, this.name, this.maps, this.characters, this.chapters, this.cover);
    }
}