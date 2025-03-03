var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.setAttribute("width", 800);
canvas.setAttribute("height", 600);

var ellipseCenter = null;
var isDrawing = false;

canvas.addEventListener("mousedown", function (event) {
    if (!isDrawing) {
        ellipseCenter = [event.offsetX, event.offsetY];
        isDrawing = true;
    } else {
        var a = Math.abs(event.offsetX - ellipseCenter[0]);
        var b = Math.abs(event.offsetY - ellipseCenter[1]);
        drawEllipse(ellipseCenter[0], ellipseCenter[1], a, b, [0, 0, 0, 255]);
        isDrawing = false;
    }
});

canvas.addEventListener("mousemove", function (event) {
    if (isDrawing && ellipseCenter) {
        var a = Math.abs(event.offsetX - ellipseCenter[0]);
        var b = Math.abs(event.offsetY - ellipseCenter[1]);
        context.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas to redraw
        drawEllipse(ellipseCenter[0], ellipseCenter[1], a, b, [0, 0, 0, 255]);
    }
});

canvas.addEventListener("keydown", function (event) {
    if (event.key === "r") {
        context.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    }
});

function drawEllipse(centerX, centerY, a, b, rgba) {
    var x = 0;
    var y = b;
    var a2 = a * a;
    var b2 = b * b;
    var err = b2 - a2 * b + 0.25 * a2;

    while (a2 * y > b2 * x) {
        setPixel(centerX + x, centerY + y, rgba);
        setPixel(centerX - x, centerY + y, rgba);
        setPixel(centerX + x, centerY - y, rgba);
        setPixel(centerX - x, centerY - y, rgba);

        if (err <= 0) {
            x++;
            err += 2 * b2 * x + b2;
        } else {
            y--;
            err -= 2 * a2 * y + a2;
        }
    }

    x = a;
    y = 0;
    err = a2 - b2 * a + 0.25 * b2;

    while (b2 * x > a2 * y) {
        setPixel(centerX + x, centerY + y, rgba);
        setPixel(centerX - x, centerY + y, rgba);
        setPixel(centerX + x, centerY - y, rgba);
        setPixel(centerX - x, centerY - y, rgba);

        if (err <= 0) {
            y++;
            err += 2 * a2 * y + a2;
        } else {
            x--;
            err -= 2 * b2 * x + b2;
        }
    }
}

function setPixel(x, y, rgba) {
    context.fillStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] / 255})`;
    context.fillRect(x, y, 1, 1);  // Set a 1x1 pixel
}
