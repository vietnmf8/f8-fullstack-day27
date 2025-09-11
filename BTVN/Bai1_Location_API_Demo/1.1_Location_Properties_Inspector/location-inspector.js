/* Mảng chứa headers */
// const headers = ["Property Name", "Description", "Current Value"];
const headers = [
    { name: "name", text: "Property Name" },
    { name: "des", text: "Description" },
    { name: "curValue", text: "Current Value" },
];

/* Mảng chứa tên các thuộc tính */
const locationProperties = [
    // href
    {
        name: "href",
        des: "URL đầy đủ hiện tại",
    },

    // protocol
    {
        name: "protocol",
        des: "Giao thức đang sử dụng (http: hoặc https:)",
    },

    // hostname
    {
        name: "hostname",
        des: "Tên miền (ví dụ: google.com)",
    },

    // port
    {
        name: "port",
        des: "Số cổng (ví dụ: 3000, 8080, hoặc rỗng nếu là cổng mặc định)",
    },

    // pathname
    {
        name: "pathname",
        des: "Đường dẫn sau tên miền (ví dụ: /products/detail)",
    },

    // search
    {
        name: "search",
        des: "Phần query string bao gồm dấu ? (ví dụ: ?id=123&name=abc)",
    },

    // hash
    {
        name: "hash",
        des: "Phần fragment identifier bao gồm dấu # (ví dụ: #section1)",
    },

    // origin
    {
        name: "origin",
        des: "Origin của URL (protocol + hostname + port)",
    },
];

/* Render */
function renderTable() {
    // Header
    const tableHeader = document.querySelector("table thead tr");
    tableHeader.innerHTML = ""; // reset header
    headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header.text;
        tableHeader.append(th);
    });

    // Body
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    locationProperties.forEach((prop) => {
        const tr = document.createElement("tr");
        headers.forEach((header) => {
            const td = document.createElement("td");
            if (header.name === "curValue") {
                const currentValue = window.location[prop.name] || "(empty)";
                td.textContent = currentValue;
                td.className = "curValue";
            } else {
                td.textContent = prop[header.name];
            }
            tr.append(td);
        });
        tableBody.append(tr);
    });
}

renderTable();
