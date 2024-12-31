import IStoryMode from "./IStoryMode.js";

export default class StoryViewMode extends IStoryMode {
    get stateName() {
        return "view";
    }

    isCreateMode() {
        return false;
    }

    isEditMode() {
        return false;
    }

    isViewMode() {
        return true;
    }
}
