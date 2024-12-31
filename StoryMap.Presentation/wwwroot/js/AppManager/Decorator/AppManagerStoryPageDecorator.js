import IAppManagerDecorator from './IAppManagerDecorator.js';

class AppManagerStoryPageDecorator extends IAppManagerDecorator {
    init() {
        this.wrapee.init();

        if (this.wrapee.storyModeCreate()) {
            localStorage.removeItem('storyId');
            
            this.wrapee.baseCharacterAddDetail({ health: "99/100" });
            this.wrapee.baseCharacterAddDetail({ money: 3.3 });
            this.wrapee.baseCharacterAddDetail({ level: 0 });
        } else {
            this.wrapee.load();
        }
    }
}

export default AppManagerStoryPageDecorator;
