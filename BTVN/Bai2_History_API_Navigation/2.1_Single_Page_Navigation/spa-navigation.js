/**
 * SPA:
 * - Tạo menu: Home | About | Service | Contact
 * - Sử dụng pushState:
 *  + Thay đổi đường dẫn
 *  + Không tải lại trang
 *  + Push vào history
 *  + Cập nhật nội dung
 * - Vấn đề:
 *  + pushState chủ động thay đổi nội dung
 *  + Back/Forward mặc định của trình duyệt không làm thay đổi nội dung => lắng nghe popstate để bắt sự kiện và thay đổi nội dung
 */

/* Get DOM Element */
const content = document.querySelector("#content");
const navLinks = document.querySelectorAll(".nav-link");
const history = document.querySelector("#history");

/* Khởi tạo pages */
const pages = {
    home: {
        title: "Home",
        content: "Chào mừng đến với trang chủ! Đây là nội dung của trang Home.",
    },
    about: {
        title: "About",
        content:
            "Thông tin về chúng tôi. Chúng tôi là công ty chuyên về công nghệ web.",
    },
    services: {
        title: "Services",
        content:
            "Các dịch vụ của chúng tôi: Thiết kế web, Lập trình ứng dụng, Tư vấn công nghệ.",
    },
    contact: {
        title: "Contact",
        content:
            "Liên hệ với chúng tôi: Email: contact@example.com, Phone: 0123456789",
    },
    404: {
        title: "Not Found",
        content: "404 - Trang không tồn tại.",
    },
};

/* Hàm render nội dung */
function renderContent(pageName) {
    // Lấy page hiện tại
    const page = pages[pageName] || page["404"];
    // Thay đổi tiêu đề của trang
    document.title = page.title;
    content.innerHTML = `
        <h2>${page.title}</h2><p>${page.content}</p>
    `;
    // Cập nhật history
    updateHistory();
}

/* Hàm điều hướng */
function navigate(e) {
    e.preventDefault();

    // currentTarget: element được gán listener
    const targetLink = e.currentTarget;
    // Tạo một đối tượng url mới -> cho phép lấy ra các thuộc tính như pathname...
    const newUrl = new URL(targetLink.href);
    // Tạo page mới dựa trên value của ?query (Mặc định là trang home)
    const newPage = newUrl.searchParams.get("page") || "home";

    // Lấy Url hiện tại
    const currentUrl = new URL(window.location);
    // Lấy ra page hiện tại
    const currentPage = currentUrl.searchParams.get("page") || "home";

    // pushState ?newQuery nếu khác page hiện tại
    if (currentPage !== newPage) {
        window.history.pushState({ page: newPage }, "", newUrl.search);
        renderContent(newPage);
    }
}

/* Hàm hiển thị lịch sử */
function updateHistory() {
    history.textContent = `History Length: ${window.history.length}`;
}

/* "Click" vào các nav-link */
navLinks.forEach((link) => {
    link.addEventListener("click", navigate);
});

/* popstate (khi nhấn back/forward) */
window.addEventListener("popstate", (event) => {
    // Lấy page hiện tại là render nội dung
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page") || "home";
    renderContent(page);
});

/* Tải trang lần đầu / F5 */
document.addEventListener("DOMContentLoaded", () => {
    // Tạo một đối tượng ?Query
    const params = new URLSearchParams(window.location.search);
    const initialPage = params.get("page") || "home";
    renderContent(initialPage);
});
