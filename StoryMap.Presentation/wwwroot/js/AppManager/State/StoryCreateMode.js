import IStoryMode from "./IStoryMode.js";

export default class StoryCreateMode extends IStoryMode {
  get stateName() {
    return "create";
  }

  isCreateMode() {
    return true;
  }

  isEditMode() {
    return false;
  }

  isViewMode() {
    return false;
  }
}
