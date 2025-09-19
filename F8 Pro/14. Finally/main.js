/**
 * Phương thức finally trong Promise
 * - Dù là 'resolve' hay 'reject' thì cuối cùng vẫn phải lọt vào 'finally'
 * - Ứng dụng: Thực hiện công việc luôn muốn xảy ra trong cả 2 trường hợp thành công hoặc thất bại (dù thành công hay thất bại thì vẫn sẽ xử lý công việc):
 *      + Hiển thị loading: Dù tải dữ liệu thành công hay thất bại thì vẫn muốn tắt cái loading đó
 */

/* FetchData */
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });
}

console.log("Hiển thị loading");

/* Resolve */
fetchData()
    .then(() => {
        console.log("Tải dữ liệu Thành công!");
    })
    /* Reject */
    .catch(() => {
        console.log("Tải dữ liệu Thất bại");
    })
    /* Finally: Xong! */
    .finally(() => {
        console.log("Hoàn thành!");
        console.log("Tắt loading");
    });
