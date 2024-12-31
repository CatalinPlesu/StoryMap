import IAppManagerDecorator from './IAppManagerDecorator.js';

class AppMagerHomePageDecorator extends IAppManagerDecorator {
  init() {
    this.wrapee.init();

    this.wrapee.loadStories();
  }
}

export default AppMagerHomePageDecorator;
