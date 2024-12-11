document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const uploadBtns = document.getElementsByClassName("upload-btn");
    const fileInput = document.getElementById("file-input");

    const set = document.querySelector('.maps');
    set.addEventListener('click', handleClick, false);

    function handleClick(e) {
      const { nodeName, textContent } = e.target;
      if (nodeName === 'BUTTON' || nodeName === 'I') {
        if (e.target.classList.contains("upload-btn")) {
            fileInput.click();
        }
        console.log(textContent);
      }
    }

    let images = []; // Store image data and positions
    let dragIndex = null; // Track dragged image
    let offsetX, offsetY; // Track offset during dragging
    let zoomFactor = 1000; // Initial zoom level (1000 = 1x zoom)
    const zoomStep = 100; // Zoom increment step (100 = 0.1x zoom)
    let panStartX = null, panStartY = null; // Track start position for panning
    let canvasOffsetX = 0, canvasOffsetY = 0; // Canvas offset for panning

    // Resize canvas to match its styled dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    fileInput.addEventListener("change", (e) => {
        const files = e.target.files;
        for (const file of files) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                images.push({
                    img,
                    x: (canvas.width * 1000) / 2 - (img.width * 500),
                    y: (canvas.height * 1000) / 2 - (img.height * 500),
                    width: (img.width * 1000) / 2,
                    height: (img.height * 1000) / 2
                });
                drawCanvas(); // Redraw canvas
                URL.revokeObjectURL(img.src); // Cleanup
            };
        }
    });

canvas.addEventListener("mousedown", (e) => {
    // Calculate mouse position relative to the canvas, considering zoom and offset
    const mouseX = (e.offsetX - canvasOffsetX) * (1000 / zoomFactor);
    const mouseY = (e.offsetY - canvasOffsetY) * (1000 / zoomFactor);

    let hitImage = false;
    for (let i = images.length - 1; i >= 0; i--) {
        const { x, y, width, height } = images[i];
        if (
            mouseX >= x / 1000 && 
            mouseX <= (x + width) / 1000 && 
            mouseY >= y / 1000 && 
            mouseY <= (y + height) / 1000
        ) {
            dragIndex = i;
            // Calculate offset within the image
            offsetX = mouseX - (x / 1000);
            offsetY = mouseY - (y / 1000);
            hitImage = true;
            break;
        }
    }

    if (!hitImage) {
        panStartX = e.offsetX;
        panStartY = e.offsetY;
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (dragIndex !== null) {
        // Calculate mouse position relative to the canvas, considering zoom and offset
        const mouseX = (e.offsetX - canvasOffsetX) * (1000 / zoomFactor);
        const mouseY = (e.offsetY - canvasOffsetY) * (1000 / zoomFactor);

        // Update image position, subtracting the initial click offset
        images[dragIndex].x = (mouseX - offsetX) * 1000;
        images[dragIndex].y = (mouseY - offsetY) * 1000;
        drawCanvas();
    } else if (panStartX !== null && panStartY !== null) {
        const dx = e.offsetX - panStartX;
        const dy = e.offsetY - panStartY;
        canvasOffsetX += dx;
        canvasOffsetY += dy;
        panStartX = e.offsetX;
        panStartY = e.offsetY;
        drawCanvas();
    }
});
    canvas.addEventListener("mouseup", () => {
        dragIndex = null; // Stop dragging
        panStartX = null;
        panStartY = null;
    });

    canvas.addEventListener("mouseleave", () => {
        dragIndex = null; // Stop dragging
        panStartX = null;
        panStartY = null;
    });

    const zoomSensitivity = (currentZoom) => {
        return zoomStep * (1 + (currentZoom / maxZoom) * 5);
    };

canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomDirection = Math.sign(e.deltaY);
    
    // Calculate current image bounds
    const minX = Math.min(...images.map(img => img.x));
    const minY = Math.min(...images.map(img => img.y));
    const maxX = Math.max(...images.map(img => img.x + img.width));
    const maxY = Math.max(...images.map(img => img.y + img.height));

    // Calculate image dimensions
    const imgWidth = (maxX - minX) / 1000;
    const imgHeight = (maxY - minY) / 1000;

    // Minimum zoom to fit images
    const minZoomForImages = Math.min(
        canvas.width / imgWidth, 
        canvas.height / imgHeight
    ) * 500;

    // Dynamic zoom step
    const dynamicZoomStep = zoomStep * (1 + (zoomFactor / 200));

    // Mouse position relative to canvas
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // Zoom calculation
    const zoomFactor_old = zoomFactor;
    if (zoomDirection < 0) {
        zoomFactor += dynamicZoomStep;
    } else {
        zoomFactor = Math.max(minZoomForImages, zoomFactor - dynamicZoomStep);
    }

    // Adjust offset to zoom towards mouse cursor
    const scale = zoomFactor / zoomFactor_old;
    canvasOffsetX = mouseX - (mouseX - canvasOffsetX) * scale;
    canvasOffsetY = mouseY - (mouseY - canvasOffsetY) * scale;

    drawCanvas();
});

    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        ctx.save();
        ctx.translate(canvasOffsetX, canvasOffsetY); // Apply panning offset
        ctx.scale(zoomFactor / 1000, zoomFactor / 1000); // Apply zoom
        for (const { img, x, y, width, height } of images) {
            ctx.drawImage(
                img,
                x / 1000,
                y / 1000,
                width / 1000,
                height / 1000
            ); // Draw each image
        }
        ctx.restore();
    }
});
