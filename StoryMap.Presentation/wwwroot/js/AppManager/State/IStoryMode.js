export default class IStoryMode {
    constructor(context) {
        this.context = context;
    }

    // Abstract methods to be implemented by concrete states
    get stateName() {
        throw new Error('stateName method should be implemented');
    }

    isCreateMode() {
        throw new Error('isCreateMode method should be implemented');
    }

    isEditMode() {
        throw new Error('isEditMode method should be implemented');
    }

    isViewMode() {
        throw new Error('isViewMode method should be implemented');
    }
}
