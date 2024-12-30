import AppManager from "/js/AppManager/AppManager.js";

const FileInput = {
  view() {
    const appManager = AppManager.getInstance();
    
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
          
          const selectedMapIndex = appManager.mapGetSelectedIndex();
          if (selectedMapIndex !== null) {
            appManager.mapAddImage(selectedMapIndex, newImage);
          }
        }
      }
    });
  }
};

export default FileInput;
