/**
 * XHR: Tải thêm dữ liệu mà không cần tải lại trang:
 * Ví dụ như Facebook: Khi cuộn xuống, sẽ tự tải thêm nội dung mà không cần refresh trình duyệt.
 * --> Gửi yêu cầu ra ngoài mạng -> yêu cầu dữ liệu --> dùng dữ liệu đó để hiển thị ra trang web
 */

/*
 - XHR - XML HttpRequest: Nghe cứ tưởng lỗi thời nhưng được Axios dùng!!
 - fetch()
 */

/* Gửi một request -> nhận về response -> GET (Lấy) dữ liệu */
// // 1. Tạo đối tượng XHR
// const xhr = new XMLHttpRequest();
// // 2. Cấu hình: Gọi tới open()
// xhr.open("GET", "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/header.html", true);
// // Tham số thứ 3:
// // - false: đồng bộ -> Nghĩa là send thành công thì mới chạy tiếp đến các dòng tiếp theo
// // - true: bất đồng bộ
// // 3. Gửi request - send() là thao tác bất đồng bộ
// xhr.send();

// // 4. Onload -> thông báo send() đã xong và có thể nhận dữ liệu
// xhr.onload = function () {
//     // 5. Nhận lại dữ liệu -> Chính là Response
//     // 5.1 Kiểm tra thành công rồi mới nhận dữ liệu
//     if (xhr.status >= 200 && xhr.status < 400) {
//         console.log(xhr.responseText);
//     }
// }
// // Cách 2
// // 4. onreadystatechange -> khi trạng thái thay đổi sẽ gọi vào trong hàm
// // xhr.onreadystatechange = function () {
// //     // Khi send sẽ có 3 trạng thái (xhr.readyState):
// //     // 2: Chuẩn bị Gửi
// //     // 3: Đang Gửi
// //     // 4. Đã gửi và nhận response (Đã hoàn thành!)
// //     if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
// //         console.log(xhr.responseText);
// //     }
// // }
/* ==========================================================
 * Lấy dữ liệu từ local
 * ==========================================================*/

/* Tối ưu code */
function sendRequest(method = "GET", url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            if (typeof callback === "function") {
                callback(this.responseText);
            }
        }
    };
}

/**
 * Render HTML
 */
/* Get DOM Element */
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

/* Lấy header */
sendRequest(
    "GET",
    "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/header.html",
    (responseText) => {
        header.innerHTML = responseText;
    }
);

/* Lấy footer */
sendRequest(
    "GET",
    "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/footer.html",
    (responseText) => {
        footer.innerHTML = responseText;
    }
);

/* ==========================================================
 * Lấy dữ liệu từ API bên ngoài
 * ==========================================================*/

sendRequest("GET", "https://api01.f8team.dev/api/products", (responseText) => {
    // responseText: Đây là định dạng JSON (Chuỗi)
    const response = JSON.parse(responseText); // Chuyển sang JS
    const products = response.data.items;

    const html = products.forEach((product) => {
        const item = document.createElement("li");
        item.textContent = product.title;
        productsList.append(item);
    });
});
