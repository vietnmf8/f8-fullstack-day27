/* Get DOM Element */
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

/* Hàm lấy dữ liệu */
function sendRequest(method = "GET", url) {
    /* Điều kiện if-else gì đó...
        if (lỗi) {
            trả về Promise.reject('gì đó') --> chủ động trả về reject
        }
    */

    /* Fake request
        return Promise.resolve([1, 2, 3])
    */
    
    // return Promise.resolve([1, 2, 3])

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
                    setTimeout(() => {
                        resolve(this.responseText);
                    }, 3000);
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

// sendRequest().then(console.log)

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

/**
 * Promise.all:
 * - Đưa nhiều promise (không phụ thuộc nhau) vào mảng và chạy song song
 * - Đảm bảo tất cả promise được resolve (Thành công!) -> mới xử lý .then tiếp
 * - Bất cứ một trong các promise bị reject (Lỗi) -> lọt vào catch
 */
/* 
    Thực tế: Khi có 2 công việc hoạt động độc lập, không phụ thuộc nhau => không nên đưa vào promise. Vì có một thằng xong trước, nhưng lại phải chờ thằng xong sau để xử lý
*/

const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Thất bại");
    }, 2000);
});

/* Nói chung là sử dụng Promise.all khi có những thao tác bất đồng bộ KHÔNG PHỤ THUỘC NHAU và thực hiện SONG SONG và muốn đảm bảo TẤT CẢ THÀNH CÔNG! */
// Promise.all([
//     sendRequest(
//         "GET",
//         "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/header.html"
//     ),
//     sendRequest(
//         "GET",
//         "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/footer.html"
//     ),
//     timeoutPromise,
// ])
//     .then((result) => {
//         header.innerHTML = result[0];
//         footer.innerHTML = result[1];
//     })
//     .catch((error) => {
//         console.log(error);
//     });

/**
 * Promise.allSettled:
 * - Hoạt động tương tự promise.all
 * - Khác: Chỉ cần tất cả các promise hoàn thành (Tức là resolve hoặc reject => đều lọt vào .then) - Khi một tác vụ fail thì vẫn muốn các tác vụ khác tiếp tục chạy
 */

// Promise.allSettled([
//     sendRequest(
//         "GET",
//         "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/header.html"
//     ),
//     sendRequest(
//         "GET",
//         "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/footer.html"
//     ),
//     timeoutPromise,
// ])
//     .then((result) => {
//         // trả về 3 object tương ứng với 3 kết quả promise! có các thuộc tính như status, value
//         console.log(result);
//     })

/**
 * Promise.race:
 * - Cho phép truyền nhiều promise giống promise.all
 * - Hoàn thành khi chỉ cần có 1 trong các promise nào hoàn thành SỚM NHẤT => thì sẽ lọt vào .then luôn (phụ thuộc yếu tố tốc độ mạng)
 * - Thằng nào xong trước thì vào trước
 * ? Vậy nếu có một thằng xong trước nhưng thất bại thì sao
 * => Lọt vào catch luôn
 * Ứng dụng: Tạo giới hạn cho Promise
 * - Đảm bảo rằng chúng phải xong trước thời gian thì mới xử lý
 */

// Promise.race([
//     sendRequest(
//         "GET",
//         "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/header.html"
//     ),
//     sendRequest(
//         "GET",
//         "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/footer.html"
//     ),

//     /* Ứng dụng: Tạo giới hạn cho Promise:
//         - Các ông ở trên phải xử lý xong trước 2s, nếu quá 2s thì các ông không được thực hiện
//         - Đảm bảo rằng chúng phải xong trước thời gian thì mới xử lý, còn quá thời gian thì không xử lý nữa
//     */
//     timeoutPromise,
// ])
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

/**
 * promise.resolve & promise.reject:
 * - Tạo ra trạng thái của promise là resolve hoặc reject luôn
 * - Ứng dụng: Đảm bảo luôn trả về promise
 */

/* Resolve - đối tượng promise ở trạng thái fulfilled
 */
Promise.resolve("Success").then((result) => console.log(result));

/* Resolve - đối tượng promise ở trạng thái reject */
Promise.reject("Error").catch((error) => console.log(error));

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

// /* Hàm lấy thành phố đầu tiên */
// function getFirstProvince() {
//     return sendRequest(
//         "GET",
//         "https://api01.f8team.dev/api/address/provinces"
//     ).then((result) => result.data[0]); // trả về first province
// }

// /* Hàm lấy quận/huyện đầu tiên */
// function getFirstDistrict(provinceId) {
//     return sendRequest(
//         "GET",
//         `https://api01.f8team.dev/api/address/districts?province_id=${provinceId}`
//     ).then((result) => result.data[0]); // trả về first district
// }

// /* Hàm lấy phường/xã đầu tiên */
// function getFirstWard(districtId) {
//     return sendRequest(
//         "GET",
//         `https://api01.f8team.dev/api/address/wards?district_id=${districtId}`
//     ).then((result) => result.data[0]);
// }

// getFirstProvince()
//     .then((firstProvince) => getFirstDistrict(firstProvince.province_id))
//     .then((firstDistrict) => getFirstWard(firstDistrict.district_id))
//     .then(console.log)
