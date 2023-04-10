const list_key = ['editName', 'editDanToc', 'editTonGiao', 'editQuocTich',
    'editNoiSinh', 'editNamTotNghiep', 'editTruongCap3', 'editDoiTuong', 'editCMND', 'editNgayCap', 'editNoiCap',
    'editSoDienThoai', 'editEmail', 'editDiaChiTinh', 'editDiaChiHuyen', 'editDiaChiXa', 'editDiaChiNha',
    'editHoKhauTinh', 'editHoKhauHuyen', 'editHoKhauXa', 'editHoKhauKhuVuc', 'editBoHoTen', 'editBoNamSinh',
    'editBoNgheNghiep', 'editBoSDT', 'editBoEmail', 'editMeHoTen', 'editMeNamSinh', 'editMeNgheNghiep', 'editMeSDT',
    'editMeEmail', 'editLienHe']

const list_check_key = ['editGentleMale', 'editGentleFemale']

function loadData() {
    list_key.forEach(key => {
        const val = localStorage.getItem(key)
        if (val !== null)
            document.getElementById(key).value = val
    })

    if (localStorage.getItem('editGentleMale')) {
        document.getElementById('editGentle').value = 'Nam'
    } else if (localStorage.getItem('editGentleFemale')){
        document.getElementById('editGentle').value = 'Nữ'
    } else {
        document.getElementById('editGentle').value = 'Khác'
    }

}

function saveData() {
    const xacNhan = document.getElementById('editXacNhan').checked
    if (!xacNhan) {
        window.alert('Vui lòng xác nhận thông tin')
    }
    list_key.forEach(key => {
        localStorage.setItem(key, document.getElementById(key).value)
    })
    list_check_key.forEach(key => {
        localStorage.setItem(key, document.getElementById(key).checked)
    })
}

function clearData() {
    localStorage.clear()
    window.open(
        'index.html',
        '_blank'
    );
}
