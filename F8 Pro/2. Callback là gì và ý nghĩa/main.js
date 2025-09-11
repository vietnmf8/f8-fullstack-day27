/**
 * Callback
 */

/* 
    Callback (gọi lại) -> nói tới function
    - Nói tới callback là nói tớ hàm
    -> Vì chỉ có hàm mới gọi (call) được

    - Một callback chắc chắn là hàm
    - Nhưng một hàm chưa chắc là callback
        + Một hàm là callback khi được truyền làm đối số của hàm khác
        => Vì trong hàm đó sẽ gọi lại hàm được truyền làm đối số
*/

// function handle() {
//     console.log("Do something");
// }

// handle được gọi là callback vì:
// - handle là 1 hàm
// - nó được truyền vào làm đối số của hàm khác (là hàm setTimeout)
// setTimeout(handle, 3000);

function run(callback) {
    callback()
}

run(handle)

/* 
? Ý nghĩa: Nếu không có Callback thì không biết khi nào logic bất đồng bộ chạy xong. 
Tức là khi nào hoàn thành một công việc bất đồng bộ -> Callback đóng vai trò được gọi lại -> thông báo rằng công việc đó đã hoàn thành
*/

console.log(1);  // Công việc 1

function handle() {    // Công việc 2
    console.log("Do something");
}

// Tại đây thử hỏi rằng nếu không có callback thì làm sao biết được khi nào 3s trôi qua (mặc dù code đã chạy xong hết rồi) -> lúc này sau 3s callback có vai trò được gọi lại nhằm thông báo rằng 3s đã trôi qua và gọi hàm callback

// Khong nhất thiết phải là setTimeout (có thể là bất cứ thao tác bất đồng bộ nào mà ta không kiểm soát được, có thể là yêu cầu mạng, buộc ta phải chờ 3s, 5s.... Khi nào nó xong, nó gọi hàm callback để cho chúng ta biết rằng nó đã xong!)
setTimeout(handle, 3000);

console.log(3);  // Công việc 2


console.log(1);          // abc
console.log(132323);     // abc
console.log(132323232);  // abc