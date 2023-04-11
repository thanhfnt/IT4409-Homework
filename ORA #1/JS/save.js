const list_key = ['editName', 'editDanToc', 'editTonGiao', 'editQuocTich',
    'editNoiSinh', 'editNamTotNghiep', 'editTruongCap3', 'editDoiTuong', 'editCMND', 'editNgayCap', 'editNoiCap',
    'editSoDienThoai', 'editEmail', 'editDiaChiTinh', 'editDiaChiHuyen', 'editDiaChiXa', 'editDiaChiNha',
    'editHoKhauTinh', 'editHoKhauHuyen', 'editHoKhauXa', 'editHoKhauKhuVuc', 'editBoHoTen', 'editBoNamSinh',
    'editBoNgheNghiep', 'editBoSDT', 'editBoEmail', 'editMeHoTen', 'editMeNamSinh', 'editMeNgheNghiep', 'editMeSDT',
    'editMeEmail', 'editLienHe'];

const list_check_key = ['editGentleMale', 'editGentleFemale'];

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
        console.log(localStorage.getItem('editGentleMale'));
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
    const xacNhan = document.getElementById('editXacNhan').checked;
    if (!xacNhan) {
        window.alert('Vui lòng xác nhận thông tin');
        return;
    }
    list_key.forEach(key => {
        localStorage.setItem(key, document.getElementById(key).value);
    })
    list_check_key.forEach(key => {
        localStorage.setItem(key, document.getElementById(key).checked);
    })
    window.alert('Cập nhật thành công');
    window.open(
        'index.html',
        '_self'
    );

}

function clearData() {
    localStorage.clear()
    window.open(
        'index.html',
        '_self'
    );
}
