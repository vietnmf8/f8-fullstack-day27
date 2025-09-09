// Lắng nghe sự kiện được phát ra khi nhấn submit -> log lại hành vi người dùng
document.addEventListener("write-log", (e) =>{
    console.log(e.detail);
})