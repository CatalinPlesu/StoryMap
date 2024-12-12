// import State from "/js/state.js";

const FileInput = {
  view() {
    return m("input#file-input", {
      type: "file",
      multiple: true,
      accept: "image/*",
      style: { display: "none" }
    });
  }
};

export default FileInput;

