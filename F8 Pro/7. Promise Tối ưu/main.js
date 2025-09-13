/**
 * Callback Hell
 */

/**
 * Render HTML
 */
/* Get DOM Element */
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

/* Hàm lấy dữ liệu */
function sendRequest(method = "GET", url) {
    // Khi gửi dữ liệu ta trả về một lời hứa: Tôi sẽ gọi request, khi nào tôi có kết quả tôi sẽ báo cho anh (còn kết quả thất bại hay thành công tôi không biết trước)
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                // Dựa vào content-type khi response được trả về để quyết định có parse không
                const contentType = xhr.getResponseHeader("content-type");
                const isJson =
                    contentType && contentType.includes("application/json");

                // Nếu là định dạng JSON thì parse
                if (isJson) {
                    /* Dùng try/catch để bắt lỗi khi lỗi không nằm ở reject và nằm ở callback .then
                    - Try: Đưa Đoạn code có thể văng ra lỗi, nếu văng ra lỗi => nhảy vào catch
                */
                    try {
                        // Nếu thành công -> sẽ nhận giá trị responseText để xử lý tiếp

                        // Chuyển dữ liệu thành kiểu JS luôn
                        resolve(JSON.parse(this.responseText));

                        //.. Chương trình đã kết thúc ở dòng trên (dòng văng ra lỗi) rồi, không chạy xuống dưới nữa
                    } catch (error) {
                        // Bắt lỗi ở catch
                        reject("Định dạng JSON không hợp lệ");
                    }
                }
                // Ngược lại thì giữ nguyên định dạng
                else {
                    resolve(this.responseText);
                }
            } else {
                // Code đã trả về kiểm tra lỗi
                reject(`HTTP code: ${xhr.status}`);
            }
        };
        // Nếu có sự cố tải XHR (Lỗi mạng)
        xhr.onerror = () => {
            reject("Lỗi mạng!");
        };
    });
}

/* Lúc này gọi sendRequest() sẽ trả ra Promise -> .then -> chờ kết quả -> lấy dữ liệu từ kết quả đó -> triển khai tiếp logic */

// sendRequest(
//     "GET",
//     "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/header.html"
// )
//     .then((responseText) => {
//         header.innerHTML = responseText;
//     })
//     // Catch bắt lỗi khi reject ở promise hoặc có lỗi ở trong callback của .then
//     .catch((error) => {
//         console.log(error);
//     });

// sendRequest(
//     "GET",
//     "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/footer.html"
// )
//     .then((responseText) => {
//         footer.innerHTML = responseText;
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// sendRequest("GET", "https://api01.f8team.dev/api/products").then(
//     (responseText) => {
//         // responseText: Đây là định dạng JSON (Chuỗi)
//         const response = JSON.parse(responseText); // Chuyển sang JS
//         const products = response.data.items;

//         const html = products.forEach((product) => {
//             const item = document.createElement("li");
//             item.textContent = product.title;
//             productsList.append(item);
//         });
//     }
// );

/* Lấy thành phố đầu tiên */
function getFirstProvince() {
    return sendRequest(
        "GET",
        "https://api01.f8team.dev/api/address/provinces"
    ).then((result) => result.data[0]); // Promise return ra giá trị chính là promise.resolve(giá_trị_đó) cũng là đầu vào của tham số trong callback .then tiếp theo
}

/* Lấy quận/huyện đầu tiên */
function getFirstDistrict(provinceId) {
    return sendRequest(
        "GET",
        `https://api01.f8team.dev/api/address/districts?province_id=${provinceId}`
    ).then((result) => result.data[0]);
}

/* Lấy xã/phường đầu tiên */
function getFirstWard(districtId) {
    return sendRequest(
        "GET",
        `https://api01.f8team.dev/api/address/wards?district_id=${districtId}`
    ).then((result) => result.data[0]);
}

getFirstProvince()
    .then((firstProvince) => getFirstDistrict(firstProvince.province_id))
    .then((firstDistrict) => getFirstWard(firstDistrict.district_id))
    .then((result) => {
        console.log(result);
    });
    // .then(console.log) -> làm hàm callback, và đặc biệt luôn được truyền sẵn đối số, thế nên nó giống như console.log(result)

/* ==========================================================
 * Cách cũ
 * ==========================================================*/

// /* Lấy dữ liệu: Thành phố */
// sendRequest("GET", "https://api01.f8team.dev/api/address/provinces")
//     .then((result) => {
//         const firstProvince = result.data[0];
//         return sendRequest(
//             "GET",
//             `https://api01.f8team.dev/api/address/districts?province_id=${firstProvince.province_id}`
//         );
//     })
//     .then((result) => {
//         const firstDistrict = result.data[0];
//         return sendRequest(
//             "GET",
//             `https://api01.f8team.dev/api/address/wards?district_id=${firstDistrict.district_id}`
//         );
//     })
//     .then((result) => {
//         const firstWard = result.data[0];
//     })
//     .catch((error) => {
//         console.log(error);
//     });
