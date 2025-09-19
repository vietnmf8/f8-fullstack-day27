/* Get DOM Element */
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const productsList = document.querySelector(".products-list");

/* Hàm lấy dữ liệu */

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
    // Customize lỗi cú pháp JSON không hợp lệ
    try {
        // Cần phải await để trả về giá trị thay vì promise
        return (result = isJson
            ? await response.json()
            : await response.text());
    } catch (error) {
        throw new Error(`Invalid JSON format`);
    }
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
