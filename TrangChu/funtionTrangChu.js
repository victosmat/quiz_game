function hienAvt(res) {
    document.images['chonAnh'].src = '../img/avt' + res + '.png';
}

//tạo phòng
var phongMoi = document.getElementById("phongMoi");
var taoPhong = document.getElementById("buttonTaoPhong");
var closePhong = document.getElementsByClassName("close")[0];
taoPhong.onclick = function () {
    phongMoi.style.display = "block";
}
closePhong.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}