/* Window: Biến toàn cục -> Các phương thức vào thuộc tính của biến window đều là toàn cục */
console.log(window);

/* Nếu code thuần thì có thể viết tắt, không cần "window." */
window.userName = "Nguyen Van A";
console.log(userName);  // có biến userName là biến toàn cục
console.log(window.document === document);  // true

/* Nhưng khi làm việc với các thư viện như React, Vue thì nên dùng thêm "window."
    - React : có sẵn một thằng tên là location
    - Window: Cũng có một thằng là location (hiển thị các thông tin về đường dẫn)
        =>     dễ bị trùng => nên dùng window.location
*/

 // Biến khai báo với var thì nằm trong window
// const, let không có
var userAge = 19;
console.log(window.userAge);

// Tên của id là một thuộc tính trong window
//  <form action="" id="todo-form">
// truy cập thuộc tính trong window mà là string (sử dụng dấu -)
// console.log(window["todo-form"]);
console.log(window.todoForm);

/* Bắt sự kiện cuộn -> lắng nghe được cả document và window */
/* Bắt sự kiện resize -> lắng nghe chỉ được ở window */

// Không bắt được
document.addEventListener("resize", () => {
    console.log("1234");
});

// bắt được
window.addEventListener("resize", () => {
    console.log({
        widthViewPort: window.innerWidth,
        heighViewPort: window.innerHeight,
    });
});

console.log(window.innerHeight);  // Chiều cao của viewport (khung nhìn)
console.log(window.innerWidth);  // chiều rộng của viewport

// window.name mặc định là chuỗi rỗng
// nếu gán biến name là sẽ lưu luôn trong window
// -> lưu ý tránh đặt tên name ở toàn cục, đặt trong hàm thì ok
console.log(window.name === "");  // true

console.log(window.innerWidth);  // theo viewport hiện tại (zoom in/out. Không bao gồm: viền, thanh công cụ, tab bar, bookmark...)
console.log(window.outerWidth);  // theo độ phân giải của window, ban gồm iền cửa sổ, thanh cuộn, thanh tab, thanh bookmark, menu...

/* 
Window: History: Quá trình truy cập vào trang web rồi bấm vào các link. Chúng ta có thể tiến/lùi các link. VD: tớ truy cập Google -> F8 -> Bài viết. Tớ có thể back lại về F8 rồi back lại Google. hoặc có thể tiến lên F8 tiến lê bài viết...
 */


const a     = 10;  // số a
const bbb   = 20;  // số b
let   ccccc = 30;  // số c