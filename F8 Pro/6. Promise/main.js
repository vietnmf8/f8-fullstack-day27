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
                // Nếu thành công -> sẽ nhận giá trị responseText để xử lý tiếp
                resolve(this.responseText);
            } else {
                reject("Lỗi mạng!");
            }
        };
    });
}

/* Lúc này gọi sendRequest() sẽ trả ra Promise -> .then -> chờ kết quả -> lấy dữ liệu từ kết quả đó -> triển khai tiếp logic */

// sendRequest(
//     "GET",
//     "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/header.html"
// ).then((responseText) => {
//     header.innerHTML = responseText;
// });

// sendRequest(
//     "GET",
//     "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/footer.html"
// ).then((responseText) => {
//     footer.innerHTML = responseText;
// });

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

/* Lấy dữ liệu: Thành phố */
sendRequest("GET", "https://api01.f8team.dev/api/address/provinces")
    .then((responseText) => {
        const provinces = JSON.parse(responseText).data;
        const firstProvince = provinces[0];
        return sendRequest(
            "GET",
            `https://api01.f8team.dev/api/address/districts?province_id=${firstProvince.province_id}`
        );
    })
    .then((responseText) => {
        const districts = JSON.parse(responseText).data;
        const firstDistrict = districts[0];
        return sendRequest(
            "GET",
            `https://api01.f8team.dev/api/address/wards?district_id=${firstDistrict.district_id}`
        );
    })
    .then((responseText) => {
        const wards = JSON.parse(responseText).data;
        const firstWard = wards[0];

        console.log(firstWard);
    }).catch((error) => {
        console.log(error);
    })

// sendRequest(
//     "GET",
//     "https://api01.f8team.dev/api/address/provinces",
//     (responseText) => {
//         const provinces = JSON.parse(responseText).data;
//         const firstProvince = provinces[0];

//         sendRequest(
//             "GET",
//             `https://api01.f8team.dev/api/address/districts?province_id=${firstProvince.province_id}`,
//             (responseText) => {
//                 const districts = JSON.parse(responseText).data;
//                 const firstDistrict = districts[0];

//                 sendRequest(
//                     "GET",
//                     `https://api01.f8team.dev/api/address/wards?district_id=${firstDistrict.district_id}`,
//                     (responseText) => {
//                         const wards = JSON.parse(responseText).data;
//                         const firstWard = wards[0];

//                         console.log(firstWard);
//                     }
//                 );
//             }
//         );
//     }
// );

// /**
//  * Promise: Lời hứa
//  * Ý nghĩa: Quản lý công việc bất đồng bộ!
//  * Các công việc bất đồng bộ là các công việc không biết kết quả ngay mà phải chờ! (yếu tố tốc độ mạng, thời gian)
//  * Tư tưởng: Promise là OBJECT đại diện cho kết quả cho tương lai
//  * "Tôi hứa với anh rằng tôi sẽ sendRequest này, đến khi có kết quả tôi hứa cho anh biết kết quả THÀNH CÔNG hay THẤT BẠI"
//  */

// /* Tạo đối tượng Promise:
//     - Ngay khi tạo đối tượng, callback sẽ được gọi luôn
//     - Tham số resolve, reject là 2 function:
//         + resolve: Được giải quyết
//         + reject: Từ chối
//     - Promise khi trả về là Object sẽ có 3 trạng thái:
//         + Pending (Đang chờ đợi): khi mới new Promise .
//             VD: Một chàng trai hứa với cô gái rằng: "Mai anh qua đón đi chơi". Cô gái lúc này đang chờ kết quả lời hứa (đang chờ đón đi chơi)

//         + Fulfilled (Thành công!): Gọi hàm resolve() - Lời hứa đã được thực hiện
//             VD: Chàng trai thực hiện lời hứa "Đón đi chơi"

//         + Rejected (Thất bại!): Gọi hàm reject() - Nuốt lời!
//             VD: Chàng trai bận và không đón đi chơi

//     - Về mặt kỹ thuật
//         + Gọi resolve() khi công việc bất đồng bộ THÀNH CÔNG!
//         + Gọi reject() khi công việc bất đồng bộ THẤT BẠI. Đặc trưng của reject() văng ra lỗi đỏ (in promise)
// */
// const promise = new Promise((resolve, reject) => {
//     /* Resolve: Trả về kết quả */
//     /* reject: Trả về lỗi */
//     resolve("Em ơi anh dưới nhà rồi nhé!");
//     // reject("Anh bận!");
// });

// // ? Làm sao chúng ta biết khi nào một promise: resolve | reject
// /* Then: Sau đó. Tức là sau khi hứa và thực hiện công việc
//     - Nhận 2 hàm tương ứng với 2 công việc sau khi hứa:
//         + Nếu thành công thì làm công việc Thành công
//         + Nếu thất bại thì làm công việc thất bại
//     - VD: Hôm nay anh hứa sẽ đi gắp gấu cho em
//         + Nếu thành công: Anh nói: "Anh đã gắp được gấu"
//         + Nếu thất bại: Anh nói: " Anh không gắp được gấu"
//     - Về mặt kỹ thuật:
//         - Hàm thứ nhất được gọi lại khi promise ở trạng thái Fulfilled (tức là gọi hàm resolve())
//         - Hàm thứ hai được gọi lại khi promise ở trạng thái rejected (tức là gọi hàm reject())
// */

// /*
//     .then
//     .catch
//     --> Cách viết theo chuỗi (Chain): Sau mỗi method .then -> return một Object -> tiếp tục có thể .then nhiều lần hoặc .catch
// */

// promise
//     .then(
//         // Khi promise ở trạng thái resolve()
//         // tham số result chính là kết quả trong resolve()
//         // giá trị trong resolve() được truyền làm đối số cho result
//         // tại đây result = 'Mai anh qua đón đi chơi!'
//         // Nếu trong resolve, reject không có giá trị -> undefined

//         /*
//         - Tham số result của của callback đầu tiên sẽ nhận từ đối số trong resolve(Nhận_từ_đây)
//         - Tham số result của callback thứ 2 trở đi sẽ nhận từ giá trị return của callback trước đó, nếu không return sẽ là undefined
//             + return 1234 là return thẳng về một giá trị (thì sẽ bị kết thúc luôn. VD chúng ta .then và return 123 thì sẽ trả về 123 và kết thúc luôn) (kể cả settimeout, thì nó sẽ không chờ mà cứ thế chạy xuống tiếp)
//             => chúng ta có thể return tiếp tục về một promise (callback phía sau không được gọi ngay mà phải chờ promise được resolve được gọi thì mới thực hiện callback tiếp theo)
//             => Lúc này tham số result của callback thứ 2 nhận lại chính là giá trị trong resolve(giá_trị_nhận_tại_đây)
//             => Nếu reject -> làm cho chuỗi .then bị lỗi ->  những .then sau đó sẽ không được lọt vào -> mà lọt vào thẳng .catch
//             => Các công việc đã phụ thuộc vào nhau !

//     */
//         (result) => {
//             console.log("Thành công!: ", result);
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     // resolve("Anh tới đây!");
//                     reject("anh ngủ quên!")
//                 }, 2000);
//             });
//         }

//         /* Nếu không return thì sẽ là một Promise độc lập không liên quan đến chuỗi chain nữa, mà phải tự bẫy bắt lỗi .then rồi lại .catch */

//         //// Cách 1
//         //// Khi promise ở trạng thái reject()
//         //// (error) => {
//         ////     console.log("Thất bại!: ", error);
//         //// }

//         // catch: Bẫy lỗi
//     )
//     .then((result) => {
//         console.log("Thành công 1!: ", result);
//         return 123;
//     })
//     .catch((error) => {
//         console.log("Thất bại 4!: ", error);
//     });
