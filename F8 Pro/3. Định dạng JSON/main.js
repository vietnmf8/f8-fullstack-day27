/**
 * JSON - JavaScript Object Notation:
 * Thể hiện một số kiểu dữ liệu nguyên thuỷ trong JS: 
 * string, 
 * number, 
 * boolean, 
 * null, 
 * array, 
 * object... 
 * (không bao gồm function, undefined)
 */

/* 
    Mục tiêu: Đơn giản hoá cách thức truyền dữ liệu thông qua các ứng dụng web, backend

    - JSON luôn là chuỗi:
    --> Các "key" trong json luôn phải viết trong "":
    VD: "id": 1
    --> Nhiều lúc dùng JSON bên ngoài có thể gây lỗi -> có thể dùng Try/Catch để bắt lỗi
*/

// JSON.stringify() // Biến dữ liệu của JavaScript -> JSON
// JSON.parse() // Biến dữ liệu từ JSON -> JavaScript

console.log(JSON.stringify(123));
console.log(JSON.stringify("abc")); // Chuỗi được thể hiện trong dấu ""
console.log(JSON.stringify(null));
console.log(JSON.stringify([1, 2, 3]));
console.log(JSON.stringify({name: "Viet"}));
console.log(JSON.stringify(undefined)); // Không phải

console.log(JSON.parse('[1, 2, 3, {"id": 1}]'));


/* Ứng dụng: 
-   Gọi API để lấy dữ liệu. Dữ liệu dạng JSON
-   Chuyển đổi dữ liệu từ JS -> JSON -> lưu vào localStorage là parse ngược lại đưa vào JS
 */