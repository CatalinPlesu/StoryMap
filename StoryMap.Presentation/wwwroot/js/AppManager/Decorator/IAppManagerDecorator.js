import IAppManager from "../IAppManager.js";

class IAppManagerDecorator {
    constructor(appManager) {
      if (this.constructor === IAppManagerDecorator) {
        throw new Error("Cannot instantiate abstract class");
      }
      if (!(appManager instanceof IAppManager)) {
        throw new Error("appManager must be an instance of IAppManager");
      }
      this.wrapee = appManager;
    }

    init() {
      throw new Error("Method 'init()' must be implemented.");
    }
  }
  
  export default IAppManagerDecorator;
  