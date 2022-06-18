function hienAvt(res) {
    document.getElementById('chonAnh').src = "../img/avt" + res + ".png";
}

//tạo phòng
var phongMoi = document.getElementById("phongMoi");
var taoPhong = document.getElementById("buttonTaoPhong");
var taoPhongMoi = document.getElementsByClassName("taoPhong");
var thoatPhong = document.getElementsByClassName("thoat");

taoPhong.onclick = function () {
    phongMoi.style.display = "block";
}

function btnTaoPhong() {
    var txtNhapPhong = document.getElementById("txtPhongMoi").value;
    if (txtNhapPhong == "") {
        alert("Yêu cầu nhập tên phòng");
    }
    else { document.getElementById("txtNhapPhong").value = document.getElementById("txtPhongMoi").value }
    phongMoi.style.display = "none";
}
function btnThoat() {
    document.getElementById("txtNhapPhong").value = "";
    phongMoi.style.display = "none";
}
