import StoryEditMode from "./StoryEditMode.js";
import StoryViewMode from "./StoryViewMode.js";
import StoryCreateMode from "./StoryCreateMode.js";

export default class StoryModeContext {
    constructor() {
        this.state = this._getCurrentState();
    }

    _getCurrentState() {
        const path = window.location.href.toLowerCase();
        if (path.includes("story/create")) {
            return new StoryCreateMode(this);
        } else if (path.includes("story/edit")) {
            return new StoryEditMode(this);
        } else {
            return new StoryViewMode(this);
        }
    }

    changeState(state) {
        this.state = state;
    }

    get stateName() {
        return this.state.stateName;
    }

    isCreateMode() {
        return this.state.isCreateMode();
    }

    isEditMode() {
        return this.state.isEditMode();
    }

    isViewMode() {
        return this.state.isViewMode();
    }
}
