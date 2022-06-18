function chon_nguoidung() {
    document.getElementById("btn_cauhoi").style.backgroundColor = "#acbfe2";
    document.getElementById("btn_nguoidung").style.backgroundColor = "#d5e6c5";
    document.getElementById("nguoidung").style.display = "block";
    document.getElementById("cauhoi").style.display = "none";
    lay_nguoidung();
}

function chon_cauhoi() {
    document.getElementById("btn_cauhoi").style.backgroundColor = "#d5e6c5";
    document.getElementById("btn_nguoidung").style.backgroundColor = "#acbfe2";
    document.getElementById("nguoidung").style.display = "none";
    document.getElementById("cauhoi").style.display = "block";
    lay_cauhoi();
}

function lay_nguoidung() {
    const fetch = new Fetch();
    fetch.getJWT("get_users")
        .then(function (data) {
            if (data.success) {
                var ds_nguoidung = data.users;
                var html = "";
                for (var i = 0; i < ds_nguoidung.length; i++) {
                    var nguoidung = ds_nguoidung[i];
                    html += `
                    <tr>
                        <td>${i + 1}</th>
                        <td>${nguoidung.name}</td>
                        <td>${nguoidung.username}</td>
                        <td>
                            ${nguoidung.active
                            ?
                            `<button id="${nguoidung.username}" onclick="thaotac('${nguoidung.username}', 1)" class="nut nut_do">Khóa</button>`
                            :
                            `<button id="${nguoidung.username}" onclick="thaotac('${nguoidung.username}', 0)" class="nut nut_xanhduong">Mở khóa</button>`
                        }
                        </td>
                    </tr>
                `;
                }
                document.getElementById("nd_nguoidung").innerHTML = html;
            } else {
                // alert(data.message);
            }
        });
}

function thaotac(tendangnhap, trangthai) {
    if (trangthai && !confirm("Bạn có chắc chắn muốn khóa tài khoản này?")) {
        return;
    }
    if (!trangthai && !confirm("Bạn có chắc chắn muốn mở khóa tài khoản này?")) {
        return;
    }
    const fetch = new Fetch();
    fetch.postJWT("users/update", {
        tendangnhap: tendangnhap
    })
        .then(function (data) {
            if (data.success) {
                // alert(data.message);
                // alert("Thao tác thành công!");
                if (trangthai) {
                    document.getElementById(tendangnhap).innerHTML = "Mở khóa";
                    document.getElementById(tendangnhap).onclick = function () {
                        thaotac(tendangnhap, 0);
                    };
                    document.getElementById(tendangnhap).classList.remove("nut_do");
                    document.getElementById(tendangnhap).classList.add("nut_xanhduong");
                } else {
                    document.getElementById(tendangnhap).innerHTML = "Khóa";
                    document.getElementById(tendangnhap).onclick = function () {
                        thaotac(tendangnhap, 1);
                    };
                    document.getElementById(tendangnhap).classList.remove("nut_xanhduong");
                    document.getElementById(tendangnhap).classList.add("nut_do");
                }
            } else {
                // alert(data.message);
                alert("Thao tác thất bại!");
            }
        });
}

function lay_cauhoi() {
    const fetch = new Fetch();
    fetch.getJWT("get_questions")
        .then(function (data) {
            if (data.success) {
                var ds_cauhoi = data.questions;
                var html = "";
                for (var i = 0; i < ds_cauhoi.length; i++) {
                    var cauhoi = ds_cauhoi[i];
                    html += ` 
                    <tr id="${cauhoi.id}">
                        <div id="${cauhoi.id}_dapan" hidden>${cauhoi.dapan}</div>
                        <td>${i + 1}</th>
                        <td id="${cauhoi.id}_ch">${cauhoi.cauhoi}</td>
                        <td>
                            <p id="${cauhoi.id}_a" class="dapan ${cauhoi.dapan === 'a' ? 'dapandung' : ''}">${cauhoi.a}</p>
                            <p id="${cauhoi.id}_b" class="dapan ${cauhoi.dapan === 'b' ? 'dapandung' : ''}">${cauhoi.b}</p>
                            <p id="${cauhoi.id}_c" class="dapan ${cauhoi.dapan === 'c' ? 'dapandung' : ''}">${cauhoi.c}</p>
                            <p id="${cauhoi.id}_d" class="dapan ${cauhoi.dapan === 'd' ? 'dapandung' : ''}">${cauhoi.d}</p>
                        </td>
                        <td id="${cauhoi.id}_capdo">${cauhoi.capdo}</td>
                        <td>
                            <button id="sua${cauhoi.id}" onclick="suacauhoi('${cauhoi.id}')" class="nut nut_xanhduong">Sửa</button>
                            <button id="xoa${cauhoi.id}" onclick="xoacauhoi('${cauhoi.id}')" class="nut nut_do">Xóa</button>
                        </td>
                    </tr>
                `;
                }
                document.getElementById("nd_cauhoi").innerHTML = html;
            } else {
                // alert(data.message);
            }
        });
}


function xoacauhoi(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
        return;
    }
    const fetch = new Fetch();
    fetch.postJWT("questions/delete", {
        id: id
    })
        .then(function (data) {
            if (data.success) {
                alert("Xóa thành công!");
                document.getElementById(id).remove();
            } else {
                alert(data.message);
            }
        });
}


function suacauhoi(id) {
    document.getElementById("nenmo").style.display = "block";
    document.getElementById("sch_id").value = id;
    document.getElementById("sch_cauhoi").value = document.getElementById(id + "_ch").innerHTML;
    document.getElementById("sch_a").value = document.getElementById(id + "_a").innerHTML;
    document.getElementById("sch_b").value = document.getElementById(id + "_b").innerHTML;
    document.getElementById("sch_c").value = document.getElementById(id + "_c").innerHTML;
    document.getElementById("sch_d").value = document.getElementById(id + "_d").innerHTML;
    document.getElementById("sch_dapan").value = document.getElementById(id + "_dapan").innerHTML;
    document.getElementById("sch_capdo").value = document.getElementById(id + "_capdo").innerHTML;
}

function luu() {
    const id = document.getElementById("sch_id").value;
    const cauhoi = document.getElementById("sch_cauhoi").value;
    const a = document.getElementById("sch_a").value;
    const b = document.getElementById("sch_b").value;
    const c = document.getElementById("sch_c").value;
    const d = document.getElementById("sch_d").value;
    const dapan = document.getElementById("sch_dapan").value;
    const capdo = document.getElementById("sch_capdo").value;
    const fetch = new Fetch();
    fetch.postJWT("questions/update", {
        id: id,
        cauhoi: cauhoi,
        a: a,
        b: b,
        c: c,
        d: d,
        dapan: dapan,
        capdo: capdo
    })
        .then(function (data) {
            if (data.success) {
                alert("Sửa thành công!");
                document.getElementById(id + "_ch").innerHTML = cauhoi;
                document.getElementById(id + "_a").innerHTML = a;
                document.getElementById(id + "_a").classList.remove("dapandung");
                document.getElementById(id + "_b").innerHTML = b;
                document.getElementById(id + "_b").classList.remove("dapandung");
                document.getElementById(id + "_c").innerHTML = c;
                document.getElementById(id + "_c").classList.remove("dapandung");
                document.getElementById(id + "_d").innerHTML = d;
                document.getElementById(id + "_d").classList.remove("dapandung");
                document.getElementById(id + "_dapan").innerHTML = dapan;
                if (dapan === "a") {
                    document.getElementById(id + "_a").classList.add("dapandung");
                } else if (dapan === "b") {
                    document.getElementById(id + "_b").classList.add("dapandung");
                } else if (dapan === "c") {
                    document.getElementById(id + "_c").classList.add("dapandung");
                } else {
                    document.getElementById(id + "_d").classList.add("dapandung");
                }
                document.getElementById(id + "_capdo").innerHTML = capdo;
                document.getElementById("nenmo").style.display = "none";
            } else {
                alert(data.message);
            }
        });
}

function huy() {
    document.getElementById("nenmo").style.display = "none";
}

document.addEventListener("keydown", function onPress(event) {
    if (event.key === "Escape" && document.getElementById("nenmo").style.display === "block") {
        document.getElementById("nenmo").style.display = "none";
    }
});