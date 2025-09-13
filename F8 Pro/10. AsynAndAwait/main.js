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
async function getFirstProvince() {
    const firstProvince = await sendRequest(
        "GET",
        "https://api01.f8team.dev/api/address/provinces"
    );
    return firstProvince.data[0];
}

/* Hàm lấy quận/huyện đầu tiên */
async function getFirstDistrict(provinceId) {
    const firstDistrict = await sendRequest(
        "GET",
        `https://api01.f8team.dev/api/address/districts?province_id=${provinceId}`
    );
    return firstDistrict.data[0];
}

/* Hàm lấy phường/xã đầu tiên */
async function getFirstWard(districtId) {
    const firstWard = await sendRequest(
        "GET",
        `https://api01.f8team.dev/api/address/wards?district_id=${districtId}`
    );
    return firstWard.data[0];
}

// getFirstProvince()
//     .then((firstProvince) => getFirstDistrict(firstProvince.province_id))
//     .then((firstDistrict) => getFirstWard(firstDistrict.district_id))
//     .then(console.log);

/**
 * ES6: Async & Await:
 * Async chỉ dùng khi tạo hàm
 * Chỉ dùng async khi trong thân hàm xác định dùng await các promise con (thao tác bất đồng bộ)
 * Await nằm ở trong async function và nằm ở cấp cao nhất - top level (gần nhất với async, không lồng hàm)
 * Await chỉ nằm trong async function và chỉ await một promise thôi (vậy nên khi tạo hàm promise thì phải return một promise, nếu không thì sẽ không await dc)
 *
 * Viết code bất đồng bộ mà như bất đồng bộ, đọc từ trên xuống dưới
 * Viết "async" trước function
 * Khi gọi async function => trả về promise đã được resolve với giá trị được return
 * Vì là promise nên có thể .then
 */

// async function handle() {}
// const handle = async function () {};
// const handle = async () => {};

// /* Await cũng có thể có lỗi */
// const rejectPromise = new Promise((_, reject) => {
//     setTimeout(() => reject("Lỗi"), 2000);
// });

// async function A() {
//     /*
//     ? await: Chờ cái gì?
//     Chờ getFirstProvince() được resolve(). Kết quả của resolve sẽ lưu vào biến firstProvince

//     - Đưa khối lệnh thực thi (có thể văng lỗi) và đưa vào khối try, còn hiện thông báo lỗi khi đưa vào khối catch
//     */
//     try {
//         const firstProvince = await getFirstProvince();
//         const firstDistrict = await getFirstDistrict(firstProvince.province_id);
//         // await rejectPromise
//         const result = await getFirstWard(firstDistrict.district_id);
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//   }
// }

// A()

/* Bài toán: Có một mảng giá trị và muốn thực hiện thao tác bất đồng bộ một cách tuần tự
    -> Lặp
*/

// Fake
function send(id, timeout) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(id), timeout);
    });
}

// async function run() {
//     const ids = [1, 2, 3, 4, 5];

//     try {
//         /*
//             * Kỳ vọng: lặp một cách tuần tự. Tổng thời gian sẽ là 5s
//             - Nhưng thực tế chỉ mất 1s. Vì trong hàm forEach sẽ gọi callback tại mỗi lần lặp. vì vậy các callback là async function độc lập, mỗi một function chỉ có 1 await =>> chúng chạy bất đồng bộ

//             => Để đạt được kỳ vọng => dùng vòng lặp thuần tuý => for

//         */
//         // ids.forEach(async (id) => {
//         //     const result = await send(id, 1000)
//         //     console.log(result);
//         // });

//         /* Đã đạt kỳ vọng */
//         for (let id of ids) {
//             const result = await send(id, 1000);
//             console.log(result);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// run();

/* Bài toán: Có nhiều request -> muốn tất cả chúng đều phải resolve thì mới xử lý 
=> phân biệt giữa promise.all và không có promise.all
*/

async function handle() {
    try {
        /* Với các công việc không phụ thuộc nhau */

        /* Có promise. all (sẽ được chạy song song nhiều promise (bất đồng bộ) nên tổng thời gian sẽ tối đa là  = thằng lâu nhất, phát hiện lỗi là reject luôn) */
        const result = await Promise.all([
            send(1, 1000),
            send(2, 1000),
            send(3, 1000),
            Promise.reject("Error"),
        ]);

        /* Không có promise.all -> phải đợi từng cái chạy một -> nếu phát hiện lỗi ở cuối mới nhảy vào catch */
        // await send(1, 1000);
        // await send(2, 1000);
        // await send(3, 1000);
        // await Promise.reject("Error");
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
handle();

// console.log(typeof handle); // function
// console.log(handle()); // promise đã dược resolve với giá trị return
// console.log(typeof handle()); // object
