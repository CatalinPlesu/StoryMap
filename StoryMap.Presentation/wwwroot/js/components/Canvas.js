// import State from "/js/state.js";

const Canvas = {
  view: function() {
    return m("canvas#canvas", {
      style: {
        width: "calc(100% - 2 * 270px)",
        height: "calc(100vh - 150px)",
        border: "2px dashed #ccc",
        background: "#e3f2fd",
        position: "fixed",
        top: "130px",
        bottom: "20px",
        left: "270px",
        userSelect: "none",
        overflow: "hidden"
      }
    });
  }
};

export default Canvas;
