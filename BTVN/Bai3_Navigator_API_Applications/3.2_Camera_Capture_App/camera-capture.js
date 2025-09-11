/* Get Dom Element */
const videoWrapper = document.querySelector("#video-wrapper");
const videoStream = document.querySelector("#video-stream");
const videoPlaceholder = document.querySelector("#video-placeholder");
const photoContainer = document.querySelector("#photo-container");
const canvas = document.createElement("canvas");

//button
const startCameraBtn = document.querySelector("#start-camera-btn");
const stopCameraBtn = document.querySelector("#stop-camera-btn");
const takePhotoBtn = document.querySelector("#take-photo-btn");
const downloadPhotoBtn = document.querySelector("#download-photo-btn");

/* Hàm khởi tạo */
function amount() {
    // Tắt 3 nút chức năng: tắt camera, chụp ảnh, tải ảnh
    stopCameraBtn.disabled = true;
    takePhotoBtn.disabled = true;
    downloadPhotoBtn.disabled = true;
}

/* Khởi tạo biến */
let stream = null; // Luồng stream
let dataUrl = null; // địa chỉ hình ảnh

/* Nhấn nút "Start Camera" */
startCameraBtn.addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
        stream = mediaStream;
        videoStream.srcObject = stream;
    });

    videoPlaceholder.style.display = "none"; // Ẩn placeholder
    videoStream.style.display = "block"; // hiện camera

    photoContainer.style.display = "none"; // Ẩn ảnh chụp
    dataUrl = null;

    // Bật/tắt các nút chức năng
    startCameraBtn.disabled = true;
    stopCameraBtn.disabled = false;
    takePhotoBtn.disabled = false;
    downloadPhotoBtn.disabled = true;
});

/* Nhấn nút Icon Camera */
videoPlaceholder.addEventListener("click", () => {
    // Nếu không có luồng stream -> phát hành động cho nút bật camera
    if (!stream) startCameraBtn.click();
});

/* Nhấn nút Stop Camera */
stopCameraBtn.addEventListener("click", () => {
    if (stream) {
        // Dừng track nhạc
        stream.getTracks().forEach((track) => track.stop());

        videoPlaceholder.style.display = "flex"; // hiện placeholder
        videoStream.style.display = "none"; // ẩn camera
        photoContainer.style.display = "none"; // ẩn ảnh

        // Bật/tắt các nút
        startCameraBtn.disabled = false;
        stopCameraBtn.disabled = true;
        takePhotoBtn.disabled = true;
        downloadPhotoBtn.disabled = true;
    }
});

/* Nhấn nút Chụp ảnh */
takePhotoBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");

    console.dir(videoStream);
    // Đặt kích thước cho canvas
    canvas.width = videoStream.videoWidth;
    canvas.height = videoStream.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoStream, 0, 0, canvas.width, canvas.height);

    // reset
    photoContainer.innerHTML = "";
    // Lấy url của ảnh (base 64)
    dataUrl = canvas.toDataURL("image/jpeg");
    const img = document.createElement("img");
    img.src = dataUrl;
    photoContainer.append(img);

    // hiển thị ảnh
    photoContainer.style.display = "flex";
    // bật nút download
    downloadPhotoBtn.disabled = false;
});

/* Nhấn nút Tải */
downloadPhotoBtn.addEventListener("click", () => {
    if (dataUrl) {
        // Tạo element <a> để download
        const link = document.createElement("a");
        // Đặt tên file download
        link.download = "photo.png";
        // Chuyển canvas thành data URL để tạo link download
        link.href = dataUrl;
        // Tự động click để trigger download
        link.click();
    }
});

amount();
