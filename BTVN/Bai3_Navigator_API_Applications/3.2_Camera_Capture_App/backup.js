/* Get Dom Element */
const videoWrapper = document.querySelector("#video-wrapper");
const videoStream = document.querySelector("#video-stream");
const videoPlaceholder = document.querySelector("#video-placeholder");
const photoContainer = document.querySelector("#photo-container");
const canvas = document.createElement("canvas")

//button
const startCameraBtn = document.querySelector("#start-camera-btn");
const stopCameraBtn = document.querySelector("#stop-camera-btn");
const takePhotoBtn = document.querySelector("#take-photo-btn");
const downloadPhotoBtn = document.querySelector("#download-photo-btn");

/* Hàm khởi tạo */
function initializeApp() {
    // vô hiệu hoá các chức năng -> khi chưa bật camera
    stopCameraBtn.disabled = true;
    takePhotoBtn.disabled = true;
    downloadPhotoBtn.disabled = true;
}

/* Khai báo biến */
let stream = null;

/* "Click": Start Camera */
startCameraBtn.addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
        stream = mediaStream;
        videoStream.srcObject = stream; // Để nhận src dưới dạng object
    });

    // Ẩn Placeholder, hiện luồng stream
    videoPlaceholder.style.display = "none";
    videoStream.style.display = "block";

    // Ẩn picture khi bật Camera
    photoContainer.style.display = "none";
    photoDataUrl = null;

    // Bật các nút chức năng
    startCameraBtn.disabled = true;
    stopCameraBtn.disabled = false;
    takePhotoBtn.disabled = false;
    downloadPhotoBtn.disabled = true;
});

/* "Click": placeholder */
videoPlaceholder.addEventListener("click", () => {
    if (!stream) {
        startCameraBtn.click(); // phát sự kiện Click Start Camera
    }
});

/* "Click": Stop Camera */
stopCameraBtn.addEventListener("click", () => {
    if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        videoStream.srcObject = null;
        stream = null;
    }

    // Mở lại placeholder
    videoPlaceholder.style.display = "flex";
    videoStream.style.display = "none";

    // Ẩn picture khi bật Camera
    photoContainer.style.display = "none";
    photoDataUrl = null;

    // Tắt các nút chức năng
    startCameraBtn.disabled = false;
    stopCameraBtn.disabled = true;
    takePhotoBtn.disabled = true;
    downloadPhotoBtn.disabled = true;
});

/* "Click": Take Photo */
takePhotoBtn.addEventListener("click", () => {
    let ctx = canvas.getContext("2d");
    canvas.width = videoStream.videoWidth;
    canvas.height = videoStream.videoHeight;
    ctx.drawImage(videoStream, 0, 0, canvas.width, canvas.height);

    // Tạo ảnh
    let photoDataUrl = canvas.toDataURL("image/jpeg");
    photoContainer.innerHTML = "";
    const photoImg = document.createElement("img");
    photoImg.src = photoDataUrl;
    photoContainer.appendChild(photoImg);

    // Hiển thị ảnh
    photoContainer.style.display = "flex";

    // Bật nút download
    downloadPhotoBtn.disabled = false;
});


/* "Click": Download Photo */
downloadPhotoBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = photoDataUrl;
        link.download = "photo.jpeg";
        link.click();
});


