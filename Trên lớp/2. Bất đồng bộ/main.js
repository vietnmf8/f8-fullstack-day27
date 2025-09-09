/* Đồng bộ - synchronous: Chạy tuần tự từ trên xuống dưới 
    - Blocking
*/
// console.log(1);
// console.log(2);
// console.log(3);

/* Bất đồng bộ: - asynchronous
    - Không bị block (Dừng chương trình) -> Non-blocking
*/

console.log(1);

setTimeout(() => {
    console.log(2);
}, 1000)

console.log(3);

/* 
    - Thuở bàn đầu, JavaScript chỉ dành cho trình duyệt => tương tác UI
    - Bản chất, JavaScript là ngôn ngữ đơn luồng => Tức là chỉ có 1 luồng xử lý chính (Callstack) => ngôn ngữ chạy đồng bộ
    
    - Môi trường chạy Javascript được gọi là "Javascript Runtime":
        + Browser (Trình duyệt)
        + NodeJS

    - Cấu trúc cơ bản của Javascript Runtime:
        + JavaScript Engine (lõi thực thi JS) + Được thêm vào bởi JS Runtime: Ngăn chặn blocking cho đỡ mất thời gian

    - JS Engine:
        + Callstack: Luồng xử lý chính (Single thread)
        + Memory Head: Nơi lưu trữ Object (trừ các kiểu nguyên thuỷ như number, string, boolean...)
*/

/* Demo blocking UI */
const button = document.querySelector("#btn")

button.addEventListener("click", () => {
    // let result = 0;
    // for (let i = 0; i < 3e9; i++) {
    //     result += i
    // }
    // console.log(result);

    console.log(1);

    setTimeout(() => {
        console.log(2);
    }, 5000)

    console.log(3);
})


/* Những gì async (bất đồng bộ) khi làm việc với JS:
    - Timers: setTimeout, setInterval
    - Network: XML HttpRequest, fetch
    - DOM events
    - Promise...
*/

/* ? Tại sao có 1 Callstack lại chạy đồng bộ
    - Callstack: 
        + Cấu trúc dữ liệu dạng ngăn xếp:
        + Mô tả theo chiều dọc
        + Giống như rửa một chồng bát:
            + Người thứ nhất ăn xong -> Đặt bát 1 vào bồn rửa
            + Người thứ hai ăn xong  -> Đặt bát 2 lên trên bát 1
            + ....
            => Vậy khi rửa, ta cần rửa xong bát 2 (hoàn thành) -> rồi mới rửa được bát 1


            + Đĩa 3
            + Đĩa 2
            + Đĩa 1
        
        + Hành động thêm ngăn xếp (thêm bát vào rửa) -> Push
        + Hành đồng lấy ra -> Pop

      

        => Người ta gọi là : Last In - First out: Vào cuối nhưng ra đầu

          + Hoặc cứ tưởng tượng như bạn đi gửi xe ở bãi đỗ xe, bạn đến muốn, bạn gửi xe bên ngoài cùng, bạn về lấy ra trước
        + Người đến sớm để xe trong cùng, phải đợi các người lấy hết xe ra thì mới bắt đầu lấy được xe
*/


/* GEC - FEC 

          GEC    : Global Execution Context
          FEC    : Function Execution Context
Execution Context: Ngữ cảnh thực thi

- GEC: Muốn chạy được code trong JS thì BẮT BUỘC* phải tạo ra Execution Context trước:
    + Lưu trữ biến, hàm, ...
    + Hoisting
    + Xác định từ khoá this
    + Thoát chương trình thì Execution Context cũng bị xoá bỏ

- FEC: Khi GỌI một hàm thì Execution context được tạo ra

function add(a, b) {
    return a + b;
}

add(1, 2); // -> tạo ra FEC #1
add(2, 2); // -> tạo ra FEC #2
add(3, 2); // -> tạo ra FEC #3

-> Lúc này FEC được tạo ra để lưu trữ các biến, tham số trong quá trình thực thi
-> Khi kết thúc hàm, return FEC bị xoá
*/


// // GEC - Global Execute Context
// var a = 1;
// let b = 2;
// const c = 3;

// function add(a, b) {
//     const result = a + b;
//     return result;
// }

// // FEC - Function Execute Context
// const result1 = add(1, 2)
// const result2 = add(3, 2)
// const result3 = add(4, 2)

// function a() {
//     console.log("A");
//     b();
// }

// function b() {
//     console.log("B");
//     c();
// }

// function c() {
//     console.log("C");
// }

// a()

/* 
Queues - Cấu trúc dữ liệu dạng xếp hàng (mua vé xem phim - Đến trước mua trước, đến sau mua sau)
- FIFO (first in, first out) 

-> Khi xếp hàng (Task Queues) ngồi chờ
- Event Loop thấy Call Stack trống, và chạy hết code đồng bộ -> thì đưa việc ở đầu hàng đưa lên CallStack
*/