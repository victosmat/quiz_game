const $ = document.querySelector.bind(document);

const button_password = $("#password");
const button_re_password = $("#re_password");
const button_submit = $("#submit");

function ktraDangKy() {
    if (button_password.value != button_re_password.value) {
        button_password.style.border = '5px solid red ';
        button_re_password.style.border = '5px solid red ';
    } else {
        window.location.href = "DangNhap.html";
    }
}

document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        ktraDangKy();
    }
})

