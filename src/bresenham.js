
function startBresenham() {
    var isDrawing = false;
    var startPoint = null;

    var mouseDownHandler = function (event) {
        var point = getPosOnCanvas(event.clientX, event.clientY);
        if (!isDrawing) {
            startPoint = point;
            isDrawing = true;
        } else {
            // Vẽ đường thẳng và lưu vào mảng lines
            drawBresenhamLine(startPoint, point, [0, 0, 0, 255]);
            lines.push([startPoint, point]);  // Lưu đường vừa vẽ vào mảng
            isDrawing = false;
        }
    };

    // Thêm sự kiện mousemove để vẽ đường thẳng trong quá trình di chuyển chuột
    var mouseMoveHandler = function (event) {
        if (isDrawing && startPoint) {
            var point = getPosOnCanvas(event.clientX, event.clientY);

            // Xóa canvas trước khi vẽ lại tất cả các đường
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Vẽ tất cả các đường đã vẽ
            lines.forEach(function (line) {
                drawBresenhamLine(line[0], line[1], [0, 0, 0, 255]);
            });

            // Vẽ đường thẳng mới từ điểm bắt đầu đến vị trí chuột
            drawBresenhamLine(startPoint, point, [0, 0, 0, 255]);
        }
    };

    // Thêm sự kiện keydown để xóa canvas khi nhấn phím Esc
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

function drawBresenhamLine(p0, p1, rgba) {
    var x0 = p0[0], y0 = p0[1];
    var x1 = p1[0], y1 = p1[1];
    var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    var sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1;
    var err = dx - dy;

    while (true) {
        setPixel(x0, y0, rgba);
        if (x0 === x1 && y0 === y1) break;
        var e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
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
