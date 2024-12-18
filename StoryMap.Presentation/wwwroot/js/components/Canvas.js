import State from "/js/state.js";

const Canvas = {
  drawCanvas: function(ctx, state, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Apply map zoom and pan
    ctx.translate(state.mapOffset.x, state.mapOffset.y);
    ctx.scale(state.mapZoom, state.mapZoom);

    // Draw images
    state.images.forEach(({ id, img, x, y, width, height }) => {
      const zoom = state.imageZooms.get(id) || 1;
      const rotation = state.imageRotations.get(id) || 0;

      ctx.save();
      // Translate to the image's position
      ctx.translate(x, y);
      
      // Apply rotation (converting degrees to radians)
      ctx.rotate(rotation * Math.PI / 180);
      
      // Scale the image
      ctx.scale(zoom, zoom);
      
      // Draw the image
      ctx.drawImage(img, -width / 2, -height / 2, width, height);
      
      ctx.restore();
    });

    ctx.restore();
  },

  _debounce: (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },

  oninit: function (vnode) {
    vnode.state.lastSelectedMapIndex = undefined;
    vnode.state.images = []; 
    vnode.state.mapZoom = 1; 
    vnode.state.mapOffset = { x: 0, y: 0 }; 
    vnode.state.imageZooms = new Map(); 
    vnode.state.imageRotations = new Map(); 
    vnode.state.dragging = false;
    vnode.state.dragStart = { x: 0, y: 0 };
    vnode.state.lastDragPosition = { x: 0, y: 0 };
    vnode.state.draggedObjectType = null; // 'image' or 'map'
  },

  oncreate: function (vnode) {
    const canvas = vnode.dom;
    const ctx = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 700;

    // Placeholder image creation
    const placeholderImage = this.createPlaceholderImage();

    // Debounced map state update
    const debouncedMapStateUpdate = this._debounce((mapIndex, updates) => {
      if (mapIndex !== undefined && State.maps[mapIndex]) {
        State.maps[mapIndex] = {
          ...State.maps[mapIndex],
          ...updates
        };
      }
    }, 300);

    vnode.state.updateImageInState = (imageUpdates) => {
      if (State.selectedMapIndex === undefined || 
          State.selected.nestedIndex === undefined) return;

      const currentMap = State.maps[State.selectedMapIndex];
      const currentImage = currentMap.images[State.selected.nestedIndex];

      const updatedImage = {
        ...currentImage,
        ...imageUpdates
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

      // Reset map state to stored map state
      vnode.state.mapZoom = selectedMap.zoom || 1;
      vnode.state.mapOffset = { 
        x: selectedMap.xoffset || 0, 
        y: selectedMap.yoffset || 0 
      };

      vnode.state.images = [];
      vnode.state.imageZooms.clear();
      vnode.state.imageRotations.clear();

      const loadPromises = selectedMap.images.map((imageData, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = imageData.file
            ? URL.createObjectURL(imageData.file)
            : imageData.src || "";

          img.onerror = () => {
            img.src = placeholderImage.toDataURL();
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
              rotation: imageData.rotation || 0
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

    // Zoom handling
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - vnode.state.mapOffset.x) / vnode.state.mapZoom;
      const mouseY = (e.clientY - rect.top - vnode.state.mapOffset.y) / vnode.state.mapZoom;

      const selectedImageIndex = State.selected.nestedIndex;
      
      if (selectedImageIndex !== undefined) {
        // Zoom for selected image
        const imageId = selectedImageIndex;
        const currentZoom = vnode.state.imageZooms.get(imageId) || 1;
        const newZoom = e.deltaY < 0 ? currentZoom * 1.1 : currentZoom / 1.1;
        
        // Directly update in state and local representation
        vnode.state.imageZooms.set(imageId, newZoom);
        
        // Immediately update the image in the state
        const currentMap = State.maps[State.selectedMapIndex];
        const currentImage = currentMap.images[imageId];
        currentImage.scale = newZoom;
      } else {
        // Zoom for the map
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const newZoom = vnode.state.mapZoom * zoomFactor;
        
        // Adjust map offset to zoom towards mouse cursor
        vnode.state.mapOffset.x -= mouseX * (zoomFactor - 1);
        vnode.state.mapOffset.y -= mouseY * (zoomFactor - 1);
        
        vnode.state.mapZoom = newZoom;

        // Debounce updating map zoom in State
        debouncedMapStateUpdate(State.selectedMapIndex, {
          zoom: newZoom,
          xoffset: vnode.state.mapOffset.x,
          yoffset: vnode.state.mapOffset.y
        });
      }
      
      this.drawCanvas(ctx, vnode.state, canvas);
    });

    // Pan and Drag handling
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      vnode.state.dragging = true;
      vnode.state.dragStart = { x: mouseX, y: mouseY };
      vnode.state.lastDragPosition = { x: mouseX, y: mouseY };

      const selectedImageIndex = State.selected.nestedIndex;
      
      if (selectedImageIndex !== undefined) {
        vnode.state.draggedObjectType = 'image';
      } else {
        vnode.state.draggedObjectType = 'map';
      }
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!vnode.state.dragging) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const dx = mouseX - vnode.state.lastDragPosition.x;
      const dy = mouseY - vnode.state.lastDragPosition.y;

      if (vnode.state.draggedObjectType === 'image') {
        const selectedImageIndex = State.selected.nestedIndex;
        const currentMap = State.maps[State.selectedMapIndex];
        const currentImage = currentMap.images[selectedImageIndex];
        const stateImage = vnode.state.images.find(img => img.id === selectedImageIndex);

        // Update image coordinates
        if (currentImage && stateImage) {
          currentImage.x += dx / vnode.state.mapZoom;
          currentImage.y += dy / vnode.state.mapZoom;
          
          stateImage.x = currentImage.x;
          stateImage.y = currentImage.y;
        }
      } else {
        // Pan the map
        vnode.state.mapOffset.x += dx;
        vnode.state.mapOffset.y += dy;

        // Debounce updating map offset in State
        debouncedMapStateUpdate(State.selectedMapIndex, {
          xoffset: vnode.state.mapOffset.x,
          yoffset: vnode.state.mapOffset.y
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

    // Trigger initial load
    vnode.state.loadImages();
  },

 onupdate: function(vnode) {
    const ctx = vnode.dom.getContext("2d");

    // Check if map has changed
    if (State.selectedMapIndex !== vnode.state.lastSelectedMapIndex) {
      vnode.state.lastSelectedMapIndex = State.selectedMapIndex;
      vnode.state.loadImages();
      return;
    }

    const selectedMap = State.maps[State.selectedMapIndex];
    
    // Always synchronize image properties, even if no new images
    if (selectedMap && selectedMap.images) {
      // Synchronize image positions, scale, and rotation
      selectedMap.images.forEach((imageData, index) => {
        // Update zoom
        const currentZoom = vnode.state.imageZooms.get(index) || 1;
        const newZoom = imageData.scale || 1;
        if (currentZoom !== newZoom) {
          vnode.state.imageZooms.set(index, newZoom);
        }

        // Update rotation
        const currentRotation = vnode.state.imageRotations.get(index) || 0;
        const newRotation = imageData.rotation || 0;
        if (currentRotation !== newRotation) {
          vnode.state.imageRotations.set(index, newRotation);
        }

        // Update the image in the local state images array
        const stateImage = vnode.state.images.find(img => img.id === index);
        if (stateImage) {
          stateImage.x = imageData.x || 0;
          stateImage.y = imageData.y || 0;
        }
      });

      // Redraw canvas
      this.drawCanvas(ctx, vnode.state, vnode.dom);
    }
  },

  // Rest of the component remains the same as in the previous implementation...

  createPlaceholderImage: function() {
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
  },

  view: function () {
    return m("canvas#canvas", {
      style: {
        border: "2px dashed #ccc",
        background: "#e3f2fd",
        position: "fixed",
        top: "130px",
        left: "270px",
        width: "60%",
        height: "70%"
      }
    });
  }
};

export default Canvas;
