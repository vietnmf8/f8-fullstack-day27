/* 
Trình duyệt tự phát ra các sự kiện khi chúng ta thực hiện các hành động như "click", "scroll", ... 
    - AddEventListener: Thêm một thằng để lắng nghe sự kiện (Sự kiện vẫn được phát bởi trình duyệt)
    - Nếu không có AddEventListener thì sự kiện vẫn được phát ra, chẳng qua là không có ai lắng nghe, bắt sự kiện
 
    VD: Khi click vào một phần tử -> sự kiện đã được phát ra (mặc dù không gọi AddEventListener)


    -> Một sự kiện được phát ra (trình duyệt bắn ra sự kiện):
    -> Dispatch Event: Phát ra sự kiện
    VD: Click vào <p>: Trình duyệt sẽ dispatch "click" event (phát sự kiện click)
*/

// const btn1 = document.querySelector("#btn");
// const btn2 = document.querySelector("#btn2");
// const input = document.querySelector("#input");

/* Khi chúng ta BẤM VÀO, trình duyệt sẽ phát ra (dispatch) một sự kiện tên là "click" */
//  -> mang theo object event chứa thông tin -> phát sự kiện "click" ra trên phần đó
// -> sau đó chúng ta nghe được và in ra "Clicked"
/* btn.addEventListener("click", () => {
    console.log("Clicked!");
}) */

/* Sử dụng logic chủ động phát ra sự kiện thay vì click */
// btn1.click(); // in ra clicked -> Bởi vì khi phát ra sự kiện click -> chúng ta lắng nghe và in ra "Clicked"

/* VD: lắng nghe sự kiện click vào button, thì thẻ input sẽ tự phát sự kiện focus (bằng logic, thay vì phải focus thủ công vào ô input) */
/* btn.addEventListener("click", () => {
    input.focus(); // focus vào input

    setTimeout(() => {
        input.blur(); // Thoát focus
    }, 3000)
}); */

/* Lưu ý! Sự kiện chỉ được phát ra khi ta đang ở trình duyệt thôi nha! */

/* Chủ động Dispatch */
// btn1.addEventListener("click", () => {
//     console.log("btn-1");
// })

// btn1.addEventListener("some-event", () => {
//     console.log("btn-1-test");
// })

/* Phát ra sự kiện chuẩn hoá trong DOM -> new Event */
// // Bấm vào btn2 -> lắng nghe sự kiện ở btn1
// btn2.addEventListener("click", () => {
//     // cách 1: chưa chủ động hoàn toàn
//     // btn1.click() // Dispatch btn -> in ra "btn-1"

//     // cách 2: chủ động với dispatchEvent, với tên của event chúng ta tự đặt
//     btn1.dispatchEvent(new Event("some-event")) // Ý nghĩa: Click vào btn2, trên btn1 phát ra sự kiện tên là "some-event" -> lắng nghe sự kiện "some-event" ở trên btn1 -> in ra "btn-1-test"
// })

/* Phát ra sự kiện custom -> Custom Event */
/* Truyền dữ liệu từ nơi phát sự kiện -> truyền đến nơi lắng nghe sự kiện -> CustomEvent */

/* 

Publish & Subscribe: 
    - Publish: Nơi tạo ra, nơi phát ra sự kiện (Ví như chủ kênh Youtube)
    - Subscribe: Nơi đăng ký, lắng nghe sự kiện (Ví như người theo dõi, sẽ nhận dữ liệu mỗi khi có sự kiện, thông báo mới)
*/

/* Liên tưởng 2:
- Hãy tưởng tượng báo phát hành hàng ngày:
- Nhà báo (Publisher): họ viết và phát hành tin tức.
- Người đọc báo (Subscriber): ai quan tâm thì đăng ký nhận báo.
- Khi có số báo mới, nhà báo không cần biết cụ thể ai đang đọc, chỉ việc phát hành.
- Những người đã đăng ký sẽ tự động nhận được báo.
- Nếu bạn không đăng ký, bạn sẽ không nhận tin tức.
👉 Đây chính là mô hình Pub/Sub (Publish – Subscribe).

3. Liên hệ kỹ thuật
- Publisher: nơi sinh ra sự kiện (ví dụ: click button, dữ liệu từ server, sensor IoT).
- Subscriber: hàm hay đoạn code lắng nghe sự kiện để xử lý.
- Broker/Event bus: hệ thống trung gian (có thể là EventEmitter trong Node.js, hoặc message broker như Redis Pub/Sub, Kafka, RabbitMQ...).
*/
// btn1.addEventListener("some-event", (e) => {
//     console.log(e.detail); // dữ liệu chúng ta nhận được từ custom Event (lấy từ detail)
// })

// btn2.addEventListener("click", () => {
//     btn1.dispatchEvent(new CustomEvent("some-event", {
//         detail: {
//             name: "John",
//             age: 18,
//         }
//     }))
// })

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

const tasks = [];

function log(type, data) {
    // Phát, bắn sự kiện xuyên suốt trong chương trình -> nên phát ở document
    document.dispatchEvent(
        new CustomEvent(type, {
            detail: data,
        })
    );
}

/* Logging: Ghi lại hành vi của người dùng */
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Ngăn chặn hành vi submit, load lại trang mặc định

    tasks.push({
        title: todoInput.value,
    });

    // render...
    // something...

    log("write-log", {
        event: "task-created",
        data: {title: todoInput.value,}
    });
});
