/* Get DOM ELement */
const copyInput = document.querySelector("#copy-input");
const copyBtn = document.querySelector("#copy-btn");
const pasteBtn = document.querySelector("#paste-btn");
const pasteOutput = document.querySelector("#paste-output");

/* Copy */
copyBtn.addEventListener("click", () => {
    const text = copyInput.value;
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log(`Đã copy ${text}`);
        })
    } else {
        console.error("Vui lòng nhập text!");
    }
})

/* Paste */
pasteBtn.addEventListener("click", () => {
    navigator.clipboard.readText().then(text => {
        pasteOutput.value = text;
    })
})


