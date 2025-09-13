/* Get DOM Element */
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

/* Hàm lấy dữ liệu */
function sendRequest(method = "GET", url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                // Kiểu dữ liệu của response
                const contentType = xhr.getResponseHeader("content-type");
                // Kiểm tra contentType có phải CHỨA định dạng JSON không?
                const isJson =
                    contentType && contentType.includes("application/json");

                if (isJson) {
                    /* Sử dụng try/catch:
                    - Try: Đưa một đoạn code có thể văng ra lỗi
                        + Nếu văng ra lỗi, chương trình kết thúc tại dòng văng ra lỗi, không chạy các dòng tiếp theo - đồng thời nhảy vào trường hợp catch
                */

                    try {
                        resolve(JSON.parse(this.responseText));
                    } catch (error) {
                        reject("Lỗi định dạng JSON!");
                    }
                }
                // Nếu không phải JSON -> return thẳng response (mã HTML)
                else {
                    resolve(this.responseText);
                }
            } else {
                reject(`HTTP CODE: ${xhr.status}`);
            }
        };

        xhr.onerror = () => {
            reject("Lỗi mạng!");
        };
    });
}

// sendRequest(
//     "GET",
//     "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/header.html"
// )
//     .then((responseText) => {
//         header.innerHTML = responseText;
//     })
//     .catch((error) => {
//         /*
//         ? Nhảy vào catch khi:
//         - Lọt vào reject ở Promise
//         - Lỗi ở callback trong .then
//     */
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
//         /*
//         ? Nhảy vào catch khi:
//         - Lọt vào reject ở Promise
//         - Lỗi ở .then
//     */
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

/* Hàm lấy thành phố đầu tiên */
function getFirstProvince() {
    return sendRequest(
        "GET",
        "https://api01.f8team.dev/api/address/provinces"
    ).then((result) => result.data[0]); // trả về first province
}

/* Hàm lấy quận/huyện đầu tiên */
function getFirstDistrict(provinceId) {
    return sendRequest(
        "GET",
        `https://api01.f8team.dev/api/address/districts?province_id=${provinceId}`
    ).then((result) => result.data[0]); // trả về first district
}

/* Hàm lấy phường/xã đầu tiên */
function getFirstWard(districtId) {
    return sendRequest(
        "GET",
        `https://api01.f8team.dev/api/address/wards?district_id=${districtId}`
    ).then((result) => result.data[0]);
}

getFirstProvince()
    .then((firstProvince) => getFirstDistrict(firstProvince.province_id)) 
    .then((firstDistrict) => getFirstWard(firstDistrict.district_id))
    .then(console.log)

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
//         console.log(firstWard);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
