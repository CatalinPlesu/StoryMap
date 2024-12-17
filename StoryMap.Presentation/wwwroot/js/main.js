// State management
import LeftBar from "/js/components/LeftBar.js";
import RightBar from "/js/components/RightBar.js";
import Canvas from "/js/components/Canvas.js";
import FileInput from "/js/components/FileInput.js";
import ContextMenu from "/js/components/ContextMenu.js";

const App = {
  view() {
    return m("div", [
      m(LeftBar),
      m(Canvas),
      m(RightBar),
      m(FileInput),
      m(ContextMenu),
    ]);
  },
};

m.mount(document.getElementById("app"), App);
