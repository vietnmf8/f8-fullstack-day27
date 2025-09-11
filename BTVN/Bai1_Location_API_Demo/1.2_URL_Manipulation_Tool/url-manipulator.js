/* Get Element DOM */
// Các trường nhập
const protocolSelect = document.querySelector("#protocol");
const hostnameInput = document.querySelector("#hostname");
const portInput = document.querySelector("#port");
const pathnameInput = document.querySelector("#pathname");
const searchInput = document.querySelector("#search");
const hashInput = document.querySelector("#hash");

// Button
const navigateBtn = document.querySelector("#btn-navigate");
const replaceBtn = document.querySelector("#btn-replace");
const reloadBtn = document.querySelector("#btn-reload");
const urlPreview = document.querySelector("#url-preview");

/* Hàm: Chống XSS */
function escapeHTML(str) {
    const escape = document.createElement("div");
    escape.textContent = str.trim(); // Tự động escape HTML và trim()
    return escape.innerHTML; // Lấy ra HTML
}

/* Hàm: Build URL */
function buildURL() {
    const protocol = escapeHTML(protocolSelect.value);
    const hostname = escapeHTML(hostnameInput.value);
    const port = escapeHTML(portInput.value);
    const pathname = escapeHTML(pathnameInput.value);
    const search = escapeHTML(searchInput.value);
    const hash = escapeHTML(hashInput.value);

    // Thêm port vào URL khi được nhập
    const portStr = port ? `:${port}` : "";

    // Validate
    if (!protocol || !hostname) {
        return null;
    }

    // Trả ra URL hoàn chỉnh!
    return `${protocol}${hostname}${portStr}${pathname}${search}${hash}`;
}

/* Hàm: Preview */
function previewURL() {
    const url = buildURL();
    if (url) {
        urlPreview.textContent = url;
    } else {
        urlPreview.textContent = "Hiển thị URL trực quan...";
    }
}

/* ==========================================================
 * Sự kiện
 * ==========================================================*/

/* location.assign() */
navigateBtn.addEventListener("click", () => {
    const url = buildURL();
    if (url) {
        // Chuyển hướng đến URL đó
        location.assign(url);
    }
});

/* location.replace() */
replaceBtn.addEventListener("click", () => {
    const url = buildURL();
    if (url) {
        // Thay thế URL hiện tại, không lưu trong history
        location.replace(url);
    }
});

/* location.reload() */
reloadBtn.addEventListener("click", () => {
    location.reload(); // Tải lại trang
});

/* Lắng nghe sự kiện thay đổi của input */
const allInputs = document.querySelectorAll("input, select");
allInputs.forEach((input) => {
    input.addEventListener("input", previewURL);
});

// Gọi previewURL khi mount
previewURL();

console.log(window.history.length);
