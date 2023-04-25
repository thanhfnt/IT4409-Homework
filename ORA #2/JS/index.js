const MODE = {
    Detail: 'Detail',
    Edit: 'Edit'
};

const SEX = {
    Male: 'Nam',
    Female: 'Nữ',
    Other: 'Khác'
}

let currentMode = MODE.Detail;

const initObject = {
    'editName': 'Cao Văn Thế Anh',
    'editSex': 'Nam',
    'editLop': 'Khoa học máy tính 04-K65',
    'editChuongTrinh': 'Khoa học Máy tính 2020',
    'editKhoaVien': 'Trường Công nghệ Thông tin và Truyền thông',
    'editEmail': 'anh.cvt200010@sis.hust.edu.vn',
    'editDanToc': 'Kinh',
    'editTonGiao': 'Không',
    'editNamTotNghiep': '2020',
    'editTruongCap3': 'Tạ Quang Bửu',
    'editCMND': '038***07',
    'editSoDienThoai': '037***61',
    'editDiaChiTinh': 'Thành Phố Hà Nội',
    'editDiaChiHuyen': 'Quận Hai Bà Trưng',
    'editDiaChiXa': 'Phường Bách Khoa',
    'editDiaChiNha': '',
    'editHoKhauTinh': 'Thành Phố Hà Nội',
    'editHoKhauHuyen': 'Quận Hai Bà Trưng',
    'editHoKhauXa': 'Phường Bách Khoa',
    'editBoHoTen': 'Test họ tên bố',
    'editBoNamSinh': '2020',
    'editBoNgheNghiep': 'Test nghề nghiệp bố',
    'editBoSDT': 'Không Có',
    'editBoEmail': 'Không Có',
    'editMeHoTen': 'Test họ tên bố',
    'editMeNamSinh': '2020',
    'editMeNgheNghiep': 'Test nghề nghiệp bố',
    'editMeSDT': 'Không Có',
    'editMeEmail': 'Không Có',
    'editNamVaoTruong': '2020',
    'editBacDaoTao': 'Đại học đại trà',
    'editKhoaHoc': '65',
    'editTinhTrangHocTap': 'Học',
};

let editObject = initObject

const list_check_key = ['editSexMale', 'editSexFemale', 'editSexOther'];


function hideActionBox(hidden) {
    const childrenList = document.getElementById('actionBox').children;
    for (let i = 0; i < childrenList.length; i++) {
        childrenList.item(i).hidden = hidden;
    }
}

function hideSexBox(sex, hidden) {
    const childrenList = document.getElementById('sexBox').children;
    for (let i = 0; i < childrenList.length; i++) {

        const subChildren = childrenList.item(i).children
        childrenList.item(i).hidden = hidden;
        childrenList.item(i).flex = 0;
        for (let j = 0; j < subChildren.length; j++) {
            subChildren.item(j).hidden = hidden;
            subChildren.item(j).width = hidden ? '0px' : 'auto';
        }
    }
    list_check_key.forEach(key => {
        document.getElementById(key).children = false;
    })
    switch (sex) {
        case SEX.Male:
            document.getElementById('labelSexMale').hidden = false;
            document.getElementById('labelSexMale').width = 'auto';
            document.getElementById('editSexMale').checked = true;
            break;
        case SEX.Female:
            document.getElementById('labelSexFemale').hidden = false;
            document.getElementById('labelSexMale').width = 'auto';
            document.getElementById('editSexFemale').checked = true;
            break;
        default:
            document.getElementById('labelSexOther').hidden = false;
            document.getElementById('labelSexOther').width = 'auto';
    }
}

function changeToDetailMode() {
    currentMode = MODE.Detail;
    Object.keys(editObject).forEach(key => {
        if (document.getElementById(key) === null)
            return;
        document.getElementById(key).disabled = true;
    });
    hideActionBox(true);
    hideSexBox(editObject.editSex, true);
    // TODO: Hidden upload image
    document.getElementById('uploadImg').display = 'none';
    console.log(document.getElementById('uploadImg').display);
}

function changeToEditMode() {
    currentMode = MODE.Edit;
    Object.keys(editObject).forEach(key => {
        if (document.getElementById(key) === null)
            return;
        document.getElementById(key).disabled = false;
    });
    hideActionBox(false);
    hideSexBox(editObject.editSex, false);
    document.getElementById('uploadImg').hidden = false;
}

function onLoadPage() {
    loadData();
    changeToDetailMode();
}

function loadData() {
    Object.entries(editObject).forEach(entry => {
        const [key, val] = entry;
        if (document.getElementById(key) === null)
            return
        document.getElementById(key).value = val;
    });
    if (editObject.editSex === SEX.Male) {
        document.getElementById('editSexMale').checked = true;
    } else if (editObject.editSex === SEX.Female) {
        document.getElementById('editSexFemale').checked = true;
    } else {
        document.getElementById('editSexOther').checked = true;
    }
}

function saveData() {
    Object.entries(editObject).forEach(entry => {
        const [key, val] = entry;
        if (document.getElementById(key) === null)
            return;
        editObject[key] = document.getElementById(key).value;
    });
    if (document.getElementById('editSexMale').checked) {
        editObject.editSex = 'Nam';
    } else if (document.getElementById('editSexFemale').checked) {
        editObject.editSex = 'Nữ';
    } else {
        editObject.editSex = 'Khác';
    }
    changeToDetailMode();
    console.log("OK action");
    console.log(editObject);
}

function cancelEdit() {
    loadData();
    changeToDetailMode();
    console.log("Cancel action");
    console.log(editObject);
}

function resetData() {
    editObject = initObject;
    loadData();
    console.log("Reset action");
    console.log(editObject);
}

