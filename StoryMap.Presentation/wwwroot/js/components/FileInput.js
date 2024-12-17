import State from "/js/state.js";

const FileInput = {
  view() {
    return m("input#file-input", {
      type: "file",
      multiple: false,
      accept: "image/*",
      style: { display: "none" }, // keep this hidden
      onchange: (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          const newImage = {
            src: files[0].name, // Create a URL for the uploaded file
            file: structuredClone(files[0]),
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
          };
          if (State.selectedMapIndex !== null) {
            State.addImageToMap(State.selectedMapIndex, newImage);
          }
        }
      }
    });
  }
};

export default FileInput;
