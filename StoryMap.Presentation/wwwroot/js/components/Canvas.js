import State from "/js/state.js";
const Canvas = {
  drawCanvas: function (ctx, state, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Calculate the center of the canvas
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    state.images.forEach(({ id, img, x, y, width, height }) => {
      const zoom = state.imageZooms.get(id) || 1;
      const rotation = state.imageRotations.get(id) || 0;

      ctx.save();
      const adjustedX = (x - canvasCenterX) * state.mapZoom + canvasCenterX + state.mapOffset.x;
      const adjustedY = (y - canvasCenterY) * state.mapZoom + canvasCenterY + state.mapOffset.y;
      const adjustedWidth = width * zoom * state.mapZoom;
      const adjustedHeight = height * zoom * state.mapZoom;

      ctx.translate(adjustedX, adjustedY);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.drawImage(img, -adjustedWidth / 2, -adjustedHeight / 2, adjustedWidth, adjustedHeight);

      // Only draw the border if not in view mode
      if (State.selected.nestedIndex === id && State.mode !== 'view') {
        const originalBorderWidth = 10; // The original border width
        const scaledBorderWidth = originalBorderWidth * zoom * state.mapZoom; // Reverse scale the border width
        ctx.lineWidth = scaledBorderWidth; // Set the scaled border width
        ctx.strokeStyle = "#ffe47c"; // Border color
        ctx.strokeRect(-adjustedWidth / 2, -adjustedHeight / 2, adjustedWidth, adjustedHeight); // Draw the border
      }

      ctx.restore();
    });

    let selectedCharacter = null;

    // Draw all non-selected characters first
    state.characters.forEach(character => {
      const isSelected = State.selected.item === "character" && State.selected.index === character.id;
      
      if (isSelected) {
        selectedCharacter = character;
      } else {
        this.drawCharacter(ctx, character, state, canvasCenterX, canvasCenterY);
      }
    });

    // Draw selected character last if there is one
    if (selectedCharacter) {
      this.drawCharacter(ctx, selectedCharacter, state, canvasCenterX, canvasCenterY);
    }

    ctx.restore();
  },

  drawCharacter: function(ctx, character, state, canvasCenterX, canvasCenterY) {
    const { id, x, y, name, prevX, prevY, animationProgress, matchesCurrentContext } = character;
      const currentState = State.characters[id].states[state.characters[id].stateIndex];
      
      // Check if the character's current state is on the selected map
      if (currentState.mapId !== State.selectedMapIndex) {
        return; // Skip drawing this character if not on the selected map
      }

      const adjustedX = (x - canvasCenterX) * state.mapZoom + canvasCenterX + state.mapOffset.x;
      const adjustedY = (y - canvasCenterY) * state.mapZoom + canvasCenterY + state.mapOffset.y;

      let drawX = adjustedX;
      let drawY = adjustedY;

      // Handle animation if we have previous coordinates and the context matches
      if (prevX !== undefined && prevY !== undefined && animationProgress < 1 && matchesCurrentContext) {
        const prevAdjustedX = (prevX - canvasCenterX) * state.mapZoom + canvasCenterX + state.mapOffset.x;
        const prevAdjustedY = (prevY - canvasCenterY) * state.mapZoom + canvasCenterY + state.mapOffset.y;
        
        drawX = prevAdjustedX + (adjustedX - prevAdjustedX) * animationProgress;
        drawY = prevAdjustedY + (adjustedY - prevAdjustedY) * animationProgress;
      }

      // Draw marker with constant size
      const baseMarkerSize = 20; // Base size of the marker
      drawMapMarker(ctx, drawX - baseMarkerSize/2, drawY - baseMarkerSize, baseMarkerSize, 
        State.selected.item === "character" && State.selected.index === id, state.mapZoom);
      
      // Draw name with constant size
      const baseFontSize = 12;
      ctx.fillStyle = "black";
      ctx.font = `${baseFontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(name, drawX, drawY - (baseMarkerSize * 1.5));

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
    vnode.state.characters = [];
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
      if (!selectedMap) {
        vnode.state.images = [];
        vnode.state.characters = []; // Clear characters
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

      // Load characters with animation data
      vnode.state.characters = State.getLatestCharacterChanges()
        .map(characterHelper => {
          const character = State.characters[characterHelper.characterIndex];
          const currentState = character.states[characterHelper.latestStateIndex];
          let prevX, prevY;

          // Get previous coordinates if this isn't the first state
          if (characterHelper.latestStateIndex > 0) {
            const prevState = character.states[characterHelper.latestStateIndex - 1];
            if (prevState.mapId === State.selectedMapIndex) {
              prevX = prevState.x;
              prevY = prevState.y;
            }
          }

          return {
            id: characterHelper.characterIndex,
            stateIndex: characterHelper.latestStateIndex,
            x: currentState.x,
            y: currentState.y,
            name: character.name,
            prevX,
            prevY,
            animationProgress: 0,
            matchesCurrentContext: currentState.chapterId === State.selectedChapterIndex && 
                                   currentState.timeframeId === State.selectedTimeframeIndex // Check context
          };
        });

      // Start animation if we have characters with previous positions and they match the current context
      const charactersToAnimate = vnode.state.characters.filter(c => c.prevX !== undefined && c.matchesCurrentContext);
      if (charactersToAnimate.length > 0) {
        const startTime = Date.now();
        const animationDuration = 1000; // 1 second

        const animate = () => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);

          charactersToAnimate.forEach(char => {
            char.animationProgress = progress;
          });

          this.drawCanvas(ctx, vnode.state, canvas);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }

      // Draw all characters regardless of animation
      this.drawCanvas(ctx, vnode.state, canvas);
    };
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (State.mode === 'view') {
        // View mode: Only allow map zooming
      const rect = canvas.getBoundingClientRect();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;

        // Get mouse position in screen space
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;

        // Get current world coordinates under mouse
        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;
        const worldX = ((screenX - vnode.state.mapOffset.x - canvasCenterX) / vnode.state.mapZoom) + canvasCenterX;
        const worldY = ((screenY - vnode.state.mapOffset.y - canvasCenterY) / vnode.state.mapZoom) + canvasCenterY;

        // Update zoom
        const oldZoom = vnode.state.mapZoom;
        const newZoom = oldZoom * zoomFactor;
        vnode.state.mapZoom = newZoom;

        // Calculate new offset to maintain world position under cursor
        vnode.state.mapOffset.x = screenX - ((worldX - canvasCenterX) * newZoom + canvasCenterX);
        vnode.state.mapOffset.y = screenY - ((worldY - canvasCenterY) * newZoom + canvasCenterY);

        debouncedMapStateUpdate(State.selectedMapIndex, {
          zoom: newZoom,
          xoffset: vnode.state.mapOffset.x,
          yoffset: vnode.state.mapOffset.y,
        });

        this.drawCanvas(ctx, vnode.state, canvas);
      } else {
        // Original zoom functionality
        const rect = canvas.getBoundingClientRect();
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;

        if (State.selected.item === "map" && State.selected.nestedIndex !== null) {
          const imageId = State.selected.nestedIndex;
          const currentZoom = vnode.state.imageZooms.get(imageId) || 1;
          const newImageZoom = currentZoom * zoomFactor;
          vnode.state.imageZooms.set(imageId, newImageZoom);
          const currentMap = State.maps[State.selectedMapIndex];
          const currentImage = currentMap.images[imageId];
          currentImage.scale = newImageZoom;
        } else {
          const screenX = e.clientX - rect.left;
          const screenY = e.clientY - rect.top;
          const canvasCenterX = canvas.width / 2;
          const canvasCenterY = canvas.height / 2;
          const worldX = ((screenX - vnode.state.mapOffset.x - canvasCenterX) / vnode.state.mapZoom) + canvasCenterX;
          const worldY = ((screenY - vnode.state.mapOffset.y - canvasCenterY) / vnode.state.mapZoom) + canvasCenterY;
          const oldZoom = vnode.state.mapZoom;
          const newZoom = oldZoom * zoomFactor;
          vnode.state.mapZoom = newZoom;
        vnode.state.mapOffset.x = screenX - ((worldX - canvasCenterX) * newZoom + canvasCenterX);
        vnode.state.mapOffset.y = screenY - ((worldY - canvasCenterY) * newZoom + canvasCenterY);

        debouncedMapStateUpdate(State.selectedMapIndex, {
          zoom: newZoom,
          xoffset: vnode.state.mapOffset.x,
          yoffset: vnode.state.mapOffset.y,
        });
      }

      this.drawCanvas(ctx, vnode.state, canvas);
      }
    });
    canvas.addEventListener("mousedown", (e) => {
      if (State.mode === 'view') {
        // View mode: Only allow map panning
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        vnode.state.dragging = true;
        vnode.state.dragStart = { x: mouseX, y: mouseY };
        vnode.state.lastDragPosition = { x: mouseX, y: mouseY };
        vnode.state.draggedObjectType = "map";
      } else {
        // Original mousedown functionality
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      vnode.state.dragging = true;
      vnode.state.dragStart = { x: mouseX, y: mouseY };
      vnode.state.lastDragPosition = { x: mouseX, y: mouseY };

      if (State.selected.item === "character") {
        vnode.state.draggedObjectType = "character";
      } else if (State.selected.item === "map" && State.selected.nestedIndex !== null) {
        vnode.state.draggedObjectType = "image";
      } else {
        vnode.state.draggedObjectType = "map";
        }
      }
    });
    canvas.addEventListener("mousemove", (e) => {
      if (!vnode.state.dragging) return;
      
      if (State.mode === 'view') {
        // View mode: Only allow map panning
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const dx = mouseX - vnode.state.lastDragPosition.x;
        const dy = mouseY - vnode.state.lastDragPosition.y;

        vnode.state.mapOffset.x += dx;
        vnode.state.mapOffset.y += dy;
        debouncedMapStateUpdate(State.selectedMapIndex, {
          xoffset: vnode.state.mapOffset.x,
          yoffset: vnode.state.mapOffset.y,
        });

        vnode.state.lastDragPosition = { x: mouseX, y: mouseY };
        this.drawCanvas(ctx, vnode.state, canvas);
      } else {
        // Original mousemove functionality
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const dx = mouseX - vnode.state.lastDragPosition.x;
      const dy = mouseY - vnode.state.lastDragPosition.y;

      if (vnode.state.draggedObjectType === "character") {
        const characterIndex = State.selected.index;
        const character = State.characters[characterIndex];
        if (character) {
          const latestStateIndex = State.getLatestCharacterChanges().find(
            change => change.characterIndex === characterIndex
          ).latestStateIndex;
          
          const stateCharacter = vnode.state.characters.find(c => c.id === characterIndex);
          if (stateCharacter) {
            stateCharacter.x += dx / vnode.state.mapZoom;
            stateCharacter.y += dy / vnode.state.mapZoom;
            
            State.ensureCharacterState(characterIndex, latestStateIndex, {
              x: stateCharacter.x,
              y: stateCharacter.y
            });
          }
        }
      } else if (vnode.state.draggedObjectType === "image") {
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
      }
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

// Add these animation helper functions at the top of the file
const createGradient = (ctx, x, y, width, height, color1, color2) => {
    const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
};

const drawMapMarker = (ctx, x, y, size, selected) => {
    const width = size;
    const height = size * 1.5;
    
    // Create gradients
    const mainColor = selected ? '#ffd700' : '#d00';
    const darkColor = selected ? '#b8860b' : '#600';
    const mainGradient = createGradient(ctx, x, y, width, height, mainColor, darkColor);
    const darkGradient = createGradient(ctx, x, y, width, height, 
        selected ? '#a67c00' : '#800', 
        selected ? '#856600' : '#500'
    );
     
    // Draw main marker shape
    ctx.beginPath();
    ctx.arc(x + width/2, y + height/3, width/2, Math.PI, 0, false);
    
    // Right curve
    ctx.bezierCurveTo(
        x + width, y + height/2,
        x + width * 2/3, y + height * 2/3,
        x + width/2, y + height
    );
    
    // Left curve
    ctx.bezierCurveTo(
        x + width/3, y + height * 2/3,
        x, y + height/2,
        x, y + height/3
    );

    // Fill and stroke
    ctx.fillStyle = mainGradient;
    ctx.strokeStyle = darkGradient;
    ctx.lineWidth = 1.2;
    ctx.fill();
    ctx.stroke();

    // Draw highlight
    const highlightPadding = width * 0.1;
    ctx.beginPath();
    ctx.arc(x + width/2, y + height/3, width/3, Math.PI, 0, false);
    ctx.fillStyle = `rgba(255,255,255,0.3)`;
    ctx.fill();
};
