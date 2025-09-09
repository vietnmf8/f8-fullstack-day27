/* Navigator: Một vài thông tin của máy
    -   clipboard            : Khi copy thì lưu vào clipboard
    Các phương thức clipboard: 
        + readText : Lấy data từ clipboard
        + writeText: Đưa data vào clipboard
    - geolocation
        + getCurrentPosition: Lấy vị trí địa lý hiện tại (dùng trong mấy bán quần áo hỏi địa chỉ để đưa ra đại lý gần nhất để đến mua)

    - userAgent: Khi truy cập trang web, trình duyệt tự đính userAgent đưa lên máy chủ. VD Shopee: Không làm responsive web, họ làm giao diện web riêng, mobile riêng vì giao diện 2 màn quá khác nhau. Họ sử dụng Adaptive Design (thích ứng dựa trên thiết bị) (Còn responsive là đáp ứng ngay dựa trên viewport)
    ? Vậy làm sao để trên đt hiểu được giao diện mobile, trên web hiểu được giao diện web. Lúc này backend sẽ dựa vào userAgent để xác định là đang hiển thị trên mobile hay web để trả về khối code tương ứng
*/

// // Điều kiện là phải copy thủ công trước
// setTimeout(() => {
//     navigator.clipboard.readText().then(data => console.log(data))
// }, 3000)
// // Quyết định copy đưa vào clipboard
// navigator.clipboard.writeText("ABC")

// /* Hack lỏ!! */
// const content = document.querySelector("#content");
// content.addEventListener("copy", (e) => {
//     e.preventDefault() // Vô hiệu hoá copy thủ công!

//     window.navigator.clipboard.writeText("echo 123\n")
// })

// /* Camera */

// const video  = document.querySelector("#video");
// const btn    = document.querySelector("#btn");
// const img    = document.querySelector("#img");
// let   canvas = document.createElement("canvas");

// navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//     console.log(stream); // trả ra object chứa luồng stream
//     video.srcObject = stream;  // Để nhận src dưới dạng object
//     video.play();
// });

// btn.addEventListener("click", () => {
//     canvas.width  = 1920;
//     canvas.height = 1080;

//     let ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     let image = canvas.toDataURL("image/jpeg");
//         img.src = image;
// });


/* Screen: Chứa thông tin màn hình
    - screen.height,      width: độ phân giải màn hình (1920 x 1080)
    - screen.orientation: cho biết màn hình có đang xoay hay không?

    - Màn hình khả dụng : 
    + screen.availHeight: 1055 (trừ đi các thanh taskbar)
    + screen.availWeight: 1920
    + availTop: Chính là cái thanh taskbar đó

window.screenTop, screenLeft cho biết trình duyệt đang ở đâu trên mành hình
- nên dùng screenX, screenY tương tự nhưng mới hơn
- Ý nghĩa: Ý nghĩa: Trả về tọa độ (x,y) của cạnh trên–trái của cửa sổ trình duyệt so với góc trên–trái màn hình.
console.log(window.screenX, window.screenY);
- Giả sử log ra 100, 200
→ Nghĩa là cửa sổ trình duyệt cách mép trái màn hình 100px, cách mép trên 200px
*/




