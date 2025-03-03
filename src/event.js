var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var btnDDA = document.getElementById("btnDDA");
var btnBresenham = document.getElementById("btnBresenham");
var btnMidpoint = document.getElementById("btnMidpoint");
var btnReset = document.getElementById("btnReset");

const algorithmTitle = document.getElementById('algorithm-title');

var currentAlgorithm = null; // Thuật toán hiện tại
var eventListeners = [];

function removeAllEventListeners() {
    eventListeners.forEach(function (listener) {
        canvas.removeEventListener(listener.type, listener.handler);
    });
    eventListeners = [];  // Xóa danh sách event listeners
}

// Thiết lập sự kiện cho các nút
btnDDA.addEventListener("click", function () {
    setActiveButton(btnDDA);
    currentAlgorithm = "dda";
    algorithmTitle.textContent = 'DDA Line Algorithm';
    resetCanvas();
});

btnBresenham.addEventListener("click", function () {
    setActiveButton(btnBresenham);
    currentAlgorithm = "bresenham";
    algorithmTitle.textContent = 'Bresenham Line Algorithm';
    resetCanvas();
});

btnMidpoint.addEventListener("click", function () {
    setActiveButton(btnMidpoint);
    currentAlgorithm = "midpoint";
    algorithmTitle.textContent = 'Midpoint Circle Algorithm';
    resetCanvas();
});

btnReset.addEventListener("click", function () {
    resetCanvas();
    clearActiveButton();
    currentAlgorithm = null;
});

function setActiveButton(button) {
    // Xóa lớp active khỏi tất cả các nút
    clearActiveButton();
    // Thêm lớp active vào nút được chọn
    button.classList.add("active");
}

function clearActiveButton() {
    btnDDA.classList.remove("active");
    btnBresenham.classList.remove("active");
    btnMidpoint.classList.remove("active");
}



function resetCanvas() {
    lines = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    removeAllEventListeners()

    if (currentAlgorithm === "dda") {
        startDDA();
    } else if (currentAlgorithm === "bresenham") {
        startBresenham();
    } else if (currentAlgorithm === "midpoint") {
        startMidpoint();
    }
}
