import MapsTree from "./MapsTree.js";
import ChaptersTree from "./ChaptersTree.js";

const LeftBar = {
  view() {
    return m("div.leftbar", [
      m(MapsTree),
      m(ChaptersTree)
    ]);
  }
};

export default LeftBar;
