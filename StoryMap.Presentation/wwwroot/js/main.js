// State management
import LeftBar from "/js/components/LeftBar.js";
import RightBar from "/js/components/RightBar.js";
import Canvas from "/js/components/Canvas.js";
import ContextMenu from "/js/components/ContextMenu.js";
import StoryNameDisplay from "/js/components/StoryNameDisplay.js";
import ButtonPanel from "/js/components/ButtonPanel.js";
import ControlPanel from "/js/components/ControlPanel.js";
import AppManager from "/js/AppManager/AppManager.js";
import AppManagerStoryPageDecorator from "./AppManager/Decorator/AppManagerStoryPageDecorator.js";

let appManager = new AppManagerStoryPageDecorator(AppManager.getInstance());
appManager.init();

const canvas = new Canvas();
appManager.wrapee.storyAddObserver(canvas);

const App = {
  view() {
    return m("div", [
      m(LeftBar),
      m(canvas),
      m(RightBar),
      m(ContextMenu),
      m(ControlPanel),
    ]);
  },
};

m.mount(document.getElementById("app"), App);

m.mount(document.getElementById("map-name"), StoryNameDisplay);

m.mount(document.getElementById("button-panel"), ButtonPanel);
