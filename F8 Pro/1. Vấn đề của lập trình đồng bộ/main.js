/* 
    JavaScript là ngôn ngữ đơn luồng (Single Thread) 
    - Đồng bộ (Synchronous): Code chạy đồng bộ, lần lượt
*/

// console.log(1);
// console.log(2);
// console.log(3);

/* 
    Bất đồng bộ (Asynchronous): Code không chạy ngay, không lần lượt:
    - Timer
    - Dom event
    - fetch()
*/

// console.log(1);

// setTimeout(() => {
//     console.log(2);
// })

// console.log(3);

/* 
? Tại sao lại cần chạy bất đồng bộ:
Giả sử chúng ta có công việc đồng bộ:
- Việc 1 -> Chạy mất 2s
- Việc 2 -> Chạy mất 2s
- Việc 3 -> Chạy mất 2s

=> Đồng bộ: 6s
=> Bất đồng bộ: 2s
 */

// setTimeout(() => {
//     console.log(1);
// }, 2000)

// setTimeout(() => {
//     console.log(2);
// }, 2000)

// setTimeout(() => {
//     console.log(3);
// }, 2000)
