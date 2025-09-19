

/* ==========================================================
 * Fetch: Tương tự như XHR (Mới hơn, ngắn gọn hơn, hỗ trợ Promise)

- Khi gọi fetch(url) => trả ra Promise (pending)
- .then trả về object có các thuộc tính:
    + ok -> true: yêu cầu gửi thành công & máy chủ không phản hồi lỗi | false: ngược lại
    + status: HTTP Code -> Mã thể hiện trạng thái thành công hay thất bại (cho biết kết quả của request)
    + headers.get('content-type'): Lấy được ra 'contentType' giống như XHR
    + body: Nội dung phản hồi. Nếu gọi '.text()' hoặc '.json()' đều trả về 1 Promise.
        + text() => resolve(dữ_liệu_dạng_text)
        + json() => resolve(dữ_liệu_JavaScript) (tức là tự động JSON Parse)
 * ==========================================================*/

/* Tuỳ vào dữ liệu là gì để dùng text/json.
    + Nếu dữ liệu trả về là text -> text();
    + Nếu dữ liệu trả về là kiểu javascript -> json() -> để tự động json.parse
*/
// /* text() */
// fetch("http://127.0.0.1:5500/F8%20Pro/4.%20XHR/partials/header.html").then(
//     (response) => response.text()
// ).then(result => console.log(result));

// /* json() */
// fetch("https://api01.f8team.dev/api/products").then(
//     (response) => response.json()
// ).then(result => console.log(result));

/* Check lỗi với 'ok' */
fetch("https://api01.f8team.dev/api/products1")
    .then((response) => {
        if (!response.ok) {
            // chủ động đưa ra lỗi và thoát khỏi .then luôn -> nhảy vào catch
            throw Error(`HTTP Code: ${response.status}`);
        }
        return response.json(); // Đây là một promise
    })
    .then((result) => console.log(result))
    // Bắt lỗi vừa tạo
    .catch((error) => {console.log(error);});
