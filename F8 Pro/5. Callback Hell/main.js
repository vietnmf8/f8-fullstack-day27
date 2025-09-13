/**
 * Callback Hell:
 * Những tình huống công việc phụ thuộc nhau.
 * Kết quả của công việc trước là đầu vào của công việc tiếp theo
 * --> Lúc đấy cần lồng vào nhau
 */

/* Hàm lấy dữ liệu */
function sendRequest(method = "GET", url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            if (typeof callback === "function") {
                callback(this.responseText);
            }
        }
    };
}

/* Lấy dữ liệu: Thành phố */
sendRequest(
    "GET",
    "https://api01.f8team.dev/api/address/provinces",
    (responseText) => {
        const provinces = JSON.parse(responseText).data;
        const firstProvince = provinces[0];

        sendRequest(
            "GET",
            `https://api01.f8team.dev/api/address/districts?province_id=${firstProvince.province_id}`,
            (responseText) => {
                const districts = JSON.parse(responseText).data;
                const firstDistrict = districts[0];

                sendRequest(
                    "GET",
                    `https://api01.f8team.dev/api/address/wards?district_id=${firstDistrict.district_id}`,
                    (responseText) => {
                        const wards = JSON.parse(responseText).data;
                        const firstWard = wards[0];

                        console.log(firstWard);
                    }
                );
            }
        );
    }
);

// Trong tab Network:
// - provinces
// - districts?province_id=1
// - wards?district_id=1
// Chúng sẽ được in ra lần lượt -> phụ thuộc nhau. Kết quả trước đó là tham số đầu vào của công việc tiếp theo

// Khắc phục Promise
