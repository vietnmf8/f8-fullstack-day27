/* 
? Promise.resolve() ngay lập tức có phải bất đồng bộ không?
*/

console.log(1);

// // Đồng bộ
// const promise = new Promise((resolve) => {
//     resolve();
// });

// // Bất đồng bộ
// promise.then(() => {
//     console.log(2);
// });

// Bất đồng bộ
Promise.resolve().then(() => {
    console.log(2);
})

console.log(3);
