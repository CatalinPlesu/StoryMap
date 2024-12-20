import State from "/js/state.js";
const Canvas = {
  drawCanvas: function (ctx, state, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(state.mapOffset.x, state.mapOffset.y);
    ctx.scale(state.mapZoom, state.mapZoom);

    state.images.forEach(({ id, img, x, y, width, height }) => {
      const zoom = state.imageZooms.get(id) || 1;
      const rotation = state.imageRotations.get(id) || 0;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.scale(zoom, zoom);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);

      // Adjusting the border width based on zoom
      if (State.selected.nestedIndex === id) {
        const originalBorderWidth = 10; // The original border width
        const scaledBorderWidth = originalBorderWidth / zoom; // Reverse scale the border width
        ctx.lineWidth = scaledBorderWidth; // Set the scaled border width
        ctx.strokeStyle = "#ffe47c"; // Border color
        ctx.strokeRect(-width / 2, -height / 2, width, height); // Draw the border
      }

      ctx.restore();
    });

    ctx.restore();
  },

  updateCanvasSize: function (canvas) {
    // Get the computed size from CSS
    const rect = canvas.getBoundingClientRect();
    // Set the canvas internal dimensions to match its CSS dimensions
    canvas.width = rect.width;
    canvas.height = rect.height;
  },

  _debounce: (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },
  oninit: function (vnode) {
    vnode.state.lastSelectedMapIndex = null;
    vnode.state.images = [];
    vnode.state.mapZoom = 1;
    vnode.state.mapOffset = { x: 0, y: 0 };
    vnode.state.imageZooms = new Map();
    vnode.state.imageRotations = new Map();
    vnode.state.dragging = false;
    vnode.state.dragStart = { x: 0, y: 0 };
    vnode.state.lastDragPosition = { x: 0, y: 0 };
    vnode.state.draggedObjectType = null;
  },
  oncreate: function (vnode) {
    const canvas = vnode.dom;
    const ctx = canvas.getContext("2d");

    // Initial size setup
    this.updateCanvasSize(canvas);

    // Handle window resize
    const resizeObserver = new ResizeObserver(() => {
      this.updateCanvasSize(canvas);
      this.drawCanvas(ctx, vnode.state, canvas);
    });
    resizeObserver.observe(canvas);

    // Store the observer for cleanup
    vnode.state.resizeObserver = resizeObserver;

    const debouncedMapStateUpdate = this._debounce((mapIndex, updates) => {
      if (mapIndex !== null && State.maps[mapIndex]) {
        State.maps[mapIndex] = {
          ...State.maps[mapIndex],
          ...updates,
        };
      }
    }, 300);
    vnode.state.updateImageInState = (imageUpdates) => {
      if (
        State.selectedMapIndex === null ||
        State.selected.nestedIndex === null
      ) return;
      const currentMap = State.maps[State.selectedMapIndex];
      const currentImage = currentMap.images[State.selected.nestedIndex];
      const updatedImage = {
        ...currentImage,
        ...imageUpdates,
      };
      currentMap.images[State.selected.nestedIndex] = updatedImage;
      vnode.state.loadImages();
    };
    vnode.state.loadImages = () => {
      const selectedMap = State.maps[State.selectedMapIndex];
      if (!selectedMap || !selectedMap.images) {
        vnode.state.images = [];
        this.drawCanvas(ctx, vnode.state, canvas);
        return;
      }
      vnode.state.mapZoom = selectedMap.zoom || 1;
      vnode.state.mapOffset = {
        x: selectedMap.xoffset || 0,
        y: selectedMap.yoffset || 0,
      };
      vnode.state.images = [];
      vnode.state.imageZooms.clear();
      vnode.state.imageRotations.clear();
      const loadPromises = selectedMap.images.map((imageData, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = imageData.file
            ? URL.createObjectURL(imageData.file)
            : imageData.src || '/images/no-image.jpg';
          img.onerror = () => {
            img.src = '/images/no-image.jpg';
          };
          img.onload = () => {
            const imageEntry = {
              id: index,
              img,
              x: imageData.x || 0,
              y: imageData.y || 0,
              width: img.width,
              height: img.height,
              scale: imageData.scale || 1,
              rotation: imageData.rotation || 0,
            };
            vnode.state.images.push(imageEntry);
            vnode.state.imageZooms.set(index, imageData.scale || 1);
            vnode.state.imageRotations.set(index, imageData.rotation || 0);
            resolve(imageEntry);
          };
        });
      });
      Promise.all(loadPromises).then(() => {
        this.drawCanvas(ctx, vnode.state, canvas);
      });
    };
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - vnode.state.mapOffset.x) /
        vnode.state.mapZoom;
      const mouseY = (e.clientY - rect.top - vnode.state.mapOffset.y) /
        vnode.state.mapZoom;
      const selectedImageIndex = State.selected.nestedIndex;
      if (selectedImageIndex !== null) {
        const imageId = selectedImageIndex;
        const currentZoom = vnode.state.imageZooms.get(imageId) || 1;
        const newZoom = e.deltaY < 0 ? currentZoom * 1.1 : currentZoom / 1.1;
        vnode.state.imageZooms.set(imageId, newZoom);
        const currentMap = State.maps[State.selectedMapIndex];
        const currentImage = currentMap.images[imageId];
        currentImage.scale = newZoom;
      } else {
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const newZoom = vnode.state.mapZoom * zoomFactor;
        vnode.state.mapOffset.x -= mouseX * (zoomFactor - 1);
        vnode.state.mapOffset.y -= mouseY * (zoomFactor - 1);
        vnode.state.mapZoom = newZoom;
        debouncedMapStateUpdate(State.selectedMapIndex, {
          zoom: newZoom,
          xoffset: vnode.state.mapOffset.x,
          yoffset: vnode.state.mapOffset.y,
        });
      }
      this.drawCanvas(ctx, vnode.state, canvas);
    });
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      vnode.state.dragging = true;
      vnode.state.dragStart = { x: mouseX, y: mouseY };
      vnode.state.lastDragPosition = { x: mouseX, y: mouseY };
      const selectedImageIndex = State.selected.nestedIndex;
      if (selectedImageIndex !== null) {
        vnode.state.draggedObjectType = "image";
      } else {
        vnode.state.draggedObjectType = "map";
      }
    });
    canvas.addEventListener("mousemove", (e) => {
      if (!vnode.state.dragging) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const dx = mouseX - vnode.state.lastDragPosition.x;
      const dy = mouseY - vnode.state.lastDragPosition.y;
      if (vnode.state.draggedObjectType === "image") {
        const selectedImageIndex = State.selected.nestedIndex;
        const currentMap = State.maps[State.selectedMapIndex];
        const currentImage = currentMap.images[selectedImageIndex];
        const stateImage = vnode.state.images.find((img) =>
          img.id === selectedImageIndex
        );
        if (currentImage && stateImage) {
          currentImage.x += dx / vnode.state.mapZoom;
          currentImage.y += dy / vnode.state.mapZoom;
          stateImage.x = currentImage.x;
          stateImage.y = currentImage.y;
        }
      } else {
        vnode.state.mapOffset.x += dx;
        vnode.state.mapOffset.y += dy;
        debouncedMapStateUpdate(State.selectedMapIndex, {
          xoffset: vnode.state.mapOffset.x,
          yoffset: vnode.state.mapOffset.y,
        });
      }
      vnode.state.lastDragPosition = { x: mouseX, y: mouseY };
      this.drawCanvas(ctx, vnode.state, canvas);
    });
    canvas.addEventListener("mouseup", () => {
      vnode.state.dragging = false;
      vnode.state.draggedObjectType = null;
    });
    canvas.addEventListener("mouseleave", () => {
      vnode.state.dragging = false;
      vnode.state.draggedObjectType = null;
    });
    vnode.state.loadImages();
  },
  onupdate: function (vnode) {
    const ctx = vnode.dom.getContext("2d");
    if (State.selectedMapIndex !== vnode.state.lastSelectedMapIndex) {
      vnode.state.lastSelectedMapIndex = State.selectedMapIndex;
      vnode.state.loadImages();
      return;
    }
    if (State.updated) {
      vnode.state.loadImages();
    }
    const selectedMap = State.maps[State.selectedMapIndex];
    if (selectedMap && selectedMap.images) {
      selectedMap.images.forEach((imageData, index) => {
        const currentZoom = vnode.state.imageZooms.get(index) || 1;
        const newZoom = imageData.scale || 1;
        if (currentZoom !== newZoom) {
          vnode.state.imageZooms.set(index, newZoom);
        }
        const currentRotation = vnode.state.imageRotations.get(index) || 0;
        const newRotation = imageData.rotation || 0;
        if (currentRotation !== newRotation) {
          vnode.state.imageRotations.set(index, newRotation);
        }
        const stateImage = vnode.state.images.find((img) => img.id === index);
        if (stateImage) {
          stateImage.x = imageData.x || 0;
          stateImage.y = imageData.y || 0;
        }
      });
      this.drawCanvas(ctx, vnode.state, vnode.dom);
    }
  },
  view: function () {
    return m("canvas#canvas", {
      style: {
        border: "2px dashed #ccc",
        background: "#e3f2fd",
        position: "fixed",
        top: "130px",
        left: "270px",
        width: "calc(100% - 2 * 270px)",
        height: "calc(100vh - 150px)",
      },
    });
  },
};
export default Canvas;
