// State management
import LeftBar from "/js/components/LeftBar.js";
import RightBar from "/js/components/RightBar.js";
import Canvas from "/js/components/Canvas.js";
import ContextMenu from "/js/components/ContextMenu.js";
import StoryNameDisplay from "/js/components/StoryNameDisplay.js";

const App = {
  view() {
    return m("div", [
      m(LeftBar),
      m(Canvas),
      m(RightBar),
      m(ContextMenu),
    ]);
  },
};

m.mount(document.getElementById("app"), App);

m.mount(document.getElementById("map-name"), StoryNameDisplay);

console.log(window.location.href)