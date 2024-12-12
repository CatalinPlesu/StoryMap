// import m from "/lib/mithril/mithril.js";
import State from "/js/state.js";

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
