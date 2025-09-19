/* Get DOM Element */
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

/* Hàm lấy dữ liệu */
// function send(method = "GET", url) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.open(method, url, true);
//         xhr.send();
//         xhr.onload = function () {
//             if (xhr.status >= 200 && xhr.status < 400) {
//                 const contentType = xhr.getResponseHeader("content-type");
//                 const isJson =
//                     contentType && contentType.includes("application/json");

//                 if (isJson) {
//                     try {
//                         resolve(JSON.parse(this.responseText));
//                     } catch (error) {
//                         reject("Lỗi định dạng JSON!");
//                     }
//                 } else {
//                     setTimeout(() => {
//                         resolve(this.responseText);
//                     }, 3000);
//                 }
//             } else {
//                 reject(`HTTP CODE: ${xhr.status}`);
//             }
//         };

//         xhr.onerror = () => {
//             reject("Lỗi mạng!");
//         };
//     });
// }

async function send(method, url) {
    const response = await fetch(url, { method }); // {method}:  đối số thứ 2, mặc định method là GET

    // Xử lý Lỗi
    if (!response.ok) {
        // Tự đông bắt catch ở dưới .then sau đó
        throw Error(`HTTP Status Code: ${response.status}`);
    }

    // Kiểm tra content-type có phải Json hay không?
    const type = response.headers.get("content-type");
    const isJson = type && type.includes("application/json");
    return isJson ? response.json() : response.text(); // Đây là promise không phải kết quả cuối cùng nhé. Rất may mắn là chúng ta .then đằng sau nên không có lỗi
}

send("GET", "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/header.html")
    .then((responseText) => {
        header.innerHTML = responseText;
    })
    .catch((error) => {
        console.log(error);
    });

send("GET", "http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/footer.html")
    .then((responseText) => {
        footer.innerHTML = responseText;
    })
    .catch((error) => {
        console.log(error);
    });

send("GET", "https://api01.f8team.dev/api/products").then((response) => {
    const products = response.data.items;

    products.forEach((product) => {
        const item = document.createElement("li");
        item.textContent = product.title;
        productsList.append(item);
    });
});
