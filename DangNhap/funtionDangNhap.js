function dangNhap() {
    var tendangnhap = document.getElementById("tendangnhap").value;
    var matkhau = document.getElementById("matkhau").value;
    if (tendangnhap == "" || matkhau == "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
    } else {
        var fetch = new Fetch();
        fetch.post("dangnhap", {
            tendangnhap: tendangnhap,
            matkhau: matkhau
        })
            .then(function (data) {
                if (data.success) {
                    alert("Đăng nhập thành công!");
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("tendangnhap", data.user.username);
                    localStorage.setItem("ten", data.user.ten);
                    window.location.href = "/";
                } else {
                    alert(data.message);
                }
            })
            .catch(function (err) {
                alert("Đã có lỗi xảy ra!");
                console.log(err);
            });
    }
}