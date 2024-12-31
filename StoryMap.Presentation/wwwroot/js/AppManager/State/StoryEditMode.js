import IStoryMode from "./IStoryMode.js";

export default class StoryEditMode extends IStoryMode {
  get stateName() {
    return "edit";
  }

  isCreateMode() {
    return false;
  }

  isEditMode() {
    return true;
  }

  isViewMode() {
    return false;
  }
}
