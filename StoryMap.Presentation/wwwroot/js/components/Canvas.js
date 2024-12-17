import State from "/js/state.js";

const Canvas = {
  oninit: function (vnode) {
    vnode.state.images = []; // Store image data and positions
  },

  oncreate: function (vnode) {
    const canvas = vnode.dom;
    const ctx = canvas.getContext("2d");

    // Initialize zoom and pan
    vnode.state.zoomFactor = 1000; // Default zoom level
    vnode.state.canvasOffsetX = 0;
    vnode.state.canvasOffsetY = 0;

    vnode.state.loadImages = () => {
      vnode.state.images = []; // Clear existing images
      const selectedMap = State.maps[State.selectedMapIndex];

      const placeholderImage = createPlaceholderImage();

      selectedMap.images.forEach((imageData) => {
        const img = new Image();
        img.src = imageData.file
          ? URL.createObjectURL(imageData.file)
          : imageData.src || "";

        img.onerror = () => {
          img.src = placeholderImage.toDataURL();
        };

        img.onload = () => {
          vnode.state.images.push({
            img,
            x: imageData.x,
            y: imageData.y,
            width: img.width,
            height: img.height,
          });
          drawCanvas();
        };
      });
    };

    function drawCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      ctx.save();
      ctx.translate(vnode.state.canvasOffsetX, vnode.state.canvasOffsetY);
      ctx.scale(vnode.state.zoomFactor / 1000, vnode.state.zoomFactor / 1000);

      vnode.state.images.forEach(({ img, x, y, width, height }) => {
        ctx.drawImage(img, x, y, width, height);
      });

      ctx.restore();
    }

    // Placeholder Image Generator
    function createPlaceholderImage() {
      const placeholderCanvas = document.createElement("canvas");
      placeholderCanvas.width = 200;
      placeholderCanvas.height = 200;
      const ctx = placeholderCanvas.getContext("2d");

      ctx.fillStyle = "#e3e3e3";
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = "#666";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("No Image", 100, 100);

      return placeholderCanvas;
    }

    // Load images initially
    vnode.state.loadImages();
  },

  onupdate: function (vnode) {
    // Reload images whenever component updates
    vnode.state.loadImages();
  },

  view: function () {
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
        overflow: "hidden",
      },
      width: "1000", // Set canvas size attributes
      height: "700",
    });
  },
};

export default Canvas;
