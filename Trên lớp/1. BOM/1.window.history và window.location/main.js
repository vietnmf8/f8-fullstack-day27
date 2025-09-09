
console.log(history);
// Mặc định history.length = 1: vì chúng ta luôn bắt đầu từ tab mới
// sau đó chúng ta truy cập Live server -> chuyển đến http://127.0.0.1:5500/... -> length = 2 -> rõ ràng là lưu lại lịch sử
// tôi vừa nhấn vào Grok -> length = 3

/* Các phương thức tiến/lùi */
// history.back() // lùi lên 1
// history.forward() // tiến lên 1
// history.go() // cũng tiến lùi con số truyền vào: -1 là lùi 1, -2 là lùi 2, 1 là tiến 1, 2 là tiến 2

/* Lịch sử lưu theo dạng kiểu như mảng:
history = ["", "grok.com", "claude.com"] 
--> Mỗi thao tác chuyển trang -> "push" vào lịch sử
--> Lùi trang thì "pop" (xoá phần tử cuối)
--> Lúc này phần tử cuối là trang hiện tại

->> Đó là pushState

--> Mỗi thao tác chuyển trang -> ghi đè luôn vào lịch sử
--> replaceState
VD: "" -> F8 -> Bài viết.  Nếu là pushState thì sẽ back lại F8 -> ""
--> Replace: ghi đè Bài viết  = F8 luôn : "" -> F8 ----> "" -> Bài viết
--> lúc này trong history cũng chỉ có 2 phần tử ["", "Bài viết"]
--> vậy khi back từ Bài viết -> F8


*/

/* 
--> Sử dụng location: Vị trí hiện tại của chúng ta
--> Chuyển hướng trang đúng cách 

Thuộc tính trong location: chứa đầy đủ thông tin của đường dẫn URL
    - hash: chuyển đến một phần tử bằng cách truyền #id vào href (href="#id") vào thẻ <a></a>
    - location.replace("claude.com")
    - location.hash -> tính từ dấu # đầu tiên và chỉ 1 dấu #: VD: #todo-form#1
    - location.search -> query parameters
    - location.host -> tên miền + port
    - location.hostName -> tên miền
    - location.port -> Cổng
    - location.path -> đường dẫn hiện tại
    - location.href -> lấy toàn bộ đường dẫn
    - location.origin -> gốc (protocol + tên miền + port)

    Chuyển hướng trang bằng href:
    - location.href -> Lấy ra đường dẫn hiện tại
    - location.href ="google.com" -> truy cập đến trang google.com
    href (được cả đường dẫn tương đối và tuyệt đối)
    - location.href ="/modal.html"
    
    - location.assign("đường_dẫn") --> giống location.href
    - location.reload --> refresh/f5 lại trang

    --> Vẫn lưu lại lịch sử nha!!!


    history.pushState, replaceState: thay đổi đường dẫn nhưng không tải lại trang (vẫn ở trang đó nhưng đường dẫn thay đổi) (Không phải SPA)

    VD: Tôi đang đứng tại 127.0.0.1:5000/index.html -> history.pushState(null, null, "./modal.html") --> 127.0.0.1:5000/modal.html -> Tuy nhiên vẫn là trang index.html chỉ thay đổi đường dẫn (history.length tăng lên vì là push)

    replace chỉ khác là replace lịch sử

*/

/* Cấu trúc URL: 

https://  example.com  :80  /blog  ?search=test&sort_by=created_at  #header
   ↓          ↓         ↓     ↓                   ↓                      ↓
Protocol    Domain     Port  Path         Query Parameters         Fragment/Anchor
*/
