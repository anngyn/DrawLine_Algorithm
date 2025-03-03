function startMidpoint() {
    var circleCenter = null;
    var isDrawing = false;

    var mouseDownHandler = function (event) {
        if (!isDrawing) {
            circleCenter = getPosOnCanvas(event.clientX, event.clientY);
            isDrawing = true;
        } else {
            var radius = Math.sqrt(Math.pow(event.clientX - circleCenter[0], 2) + Math.pow(event.clientY - circleCenter[1], 2));
            drawMidpointCircle(circleCenter[0], circleCenter[1], radius, [0, 0, 0, 255]);
            lines.push([circleCenter[0], circleCenter[1], radius])
            isDrawing = false;
        }
    };
    var mouseMoveHandler = function (event) {
        if (isDrawing) {
            // Tính bán kính trong quá trình di chuyển chuột
            var radius = Math.sqrt(Math.pow(event.clientX - circleCenter[0], 2) + Math.pow(event.clientY - circleCenter[1], 2));

            // Xóa các đường tròn cũ và vẽ lại đường tròn mới trong suốt quá trình di chuyển
            context.clearRect(0, 0, canvas.width, canvas.height);
            lines.forEach(function (line) {
                drawMidpointCircle(line[0], line[1], line[2], [0, 0, 0, 255]);
            });
            drawMidpointCircle(circleCenter[0], circleCenter[1], radius, [0, 0, 0, 255]);
        }
    };
    var keyDownHandler = function (event) {
        if (event.key === "Escape") {
            context.clearRect(0, 0, canvas.width, canvas.height);  // Xóa canvas
            lines = [];  // Xóa mảng lưu trữ các đường đã vẽ
        }
    };
    canvas.addEventListener("mousedown", mouseDownHandler);
    canvas.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("keydown", keyDownHandler);

    eventListeners.push({ type: "mousedown", handler: mouseDownHandler });
    eventListeners.push({ type: "mousemove", handler: mouseMoveHandler });
    eventListeners.push({ type: "keydown", handler: keyDownHandler });
}

function drawMidpointCircle(centerX, centerY, radius, rgba) {
    var x = 0;
    var y = radius;
    var p = 1 - radius;

    drawCirclePixels(centerX, centerY, x, y, rgba);

    while (x < y) {
        x++;
        if (p < 0) {
            p = p + 2 * x + 1;
        } else {
            y--;
            p = p + 2 * (x - y) + 1;
        }
        drawCirclePixels(centerX, centerY, x, y, rgba);
    }
}

function drawCirclePixels(centerX, centerY, x, y, rgba) {
    setPixel(centerX + x, centerY + y, rgba);
    setPixel(centerX - x, centerY + y, rgba);
    setPixel(centerX + x, centerY - y, rgba);
    setPixel(centerX - x, centerY - y, rgba);
    setPixel(centerX + y, centerY + x, rgba);
    setPixel(centerX - y, centerY + x, rgba);
    setPixel(centerX + y, centerY - x, rgba);
    setPixel(centerX - y, centerY - x, rgba);
}

function setPixel(x, y, rgba) {
    context.fillStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] / 255})`;
    context.fillRect(x, y, 1, 1);  // Set a 1x1 pixel
}

function getPosOnCanvas(x, y) {
    const bbox = canvas.getBoundingClientRect();
    return [
        Math.floor((x - bbox.left) * (canvas.width / bbox.width) + 0.5),
        Math.floor((y - bbox.top) * (canvas.height / bbox.height) + 0.5)
    ];
}
