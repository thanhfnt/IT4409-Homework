const list_key = ['editName', 'editGentleMale', 'editGentleFemale', 'editGentleOther', 'editLop',
    'editChuongTrinh', 'editKhoaVien', 'editEmail', 'editDanToc', 'editTonGiao',
    'editNamTotNghiep', 'editTruongCap3', 'editCMND', 'editSoDienThoai', 'editDiaChiTinh', 'editDiaChiHuyen',
    'editDiaChiXa', 'editDiaChiNha', 'editHoKhauTinh', 'editHoKhauHuyen', 'editHoKhauXa', 'editHoKhauKhuVuc',
    'editBoHoTen', 'editBoNamSinh', 'editBoNgheNghiep', 'editBoSDT', 'editBoEmail', 'editMeHoTen', 'editMeNamSinh',
    'editMeNgheNghiep', 'editMeSDT', 'editMeEmail', 'editNamVaoTruong', 'editBacDaoTao', 'editKhoaHoc',
    'editTinhTrangHocTap'];

const list_check_key = ['editGentleMale', 'editGentleFemale', 'editGentleOther'];

function loadDataForDetail() {
    list_key.forEach(key => {
        const val = localStorage.getItem(key);
        if (document.getElementById(key) === null)
            return;
        if (val !== null)
            document.getElementById(key).innerText = val;
        else
            localStorage.setItem(key, document.getElementById(key).innerText);
    })
    if (localStorage.getItem('editGentleMale') !== null) {
        if (localStorage.getItem('editGentleMale') === 'true') {
            document.getElementById('editGentle').innerText = 'Nam';
        } else if (localStorage.getItem('editGentleFemale') === 'true') {
            document.getElementById('editGentle').innerText = 'Nữ';
        } else {
            document.getElementById('editGentle').innerText = 'Khác';
        }
    } else {
        if (document.getElementById('editGentle').innerText === 'Nam')
            localStorage.setItem('editGentleMale', 'true');
        else if (document.getElementById('editGentle').innerText === 'Nữ')
            localStorage.setItem('editGentleFemale', 'true');
        else
            localStorage.setItem('editGentleOther', 'true');
    }
}

function loadDataForEdit() {

    list_key.forEach(key => {
        document.getElementById(key).value = localStorage.getItem(key)
    });

    list_check_key.forEach(key => {
        document.getElementById(key).checked = localStorage.getItem(key) === 'true'
    });

}

function saveData() {
    list_key.forEach(key => {
        localStorage.setItem(key, document.getElementById(key).value);
    })
    list_check_key.forEach(key => {
        localStorage.setItem(key, document.getElementById(key).checked);
    })
}

function clearData() {
    localStorage.clear()
    window.open(
        'index.html',
        '_self'
    );
}
