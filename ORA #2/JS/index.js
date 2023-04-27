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
    'editNamVaoTruong': '2020',
    'editBacDaoTao': 'Đại học đại trà',
    'editKhoaHoc': '65',
    'editTinhTrangHocTap': 'Học',
    'editImageURL': 'Images/usericon.png',
};

let editObject = {...initObject}

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
        childrenList.item(i).style.width = hidden ? '0px': 'auto';
        childrenList.item(i).style.flex = hidden ? 0 : 1;
        for (let j = 0; j < subChildren.length; j++) {
            subChildren.item(j).hidden = hidden;
            subChildren.item(j).style.width = hidden ? '0px' : 'auto';
        }
    }
    list_check_key.forEach(key => {
        document.getElementById(key).children = false;
    })
    switch (sex) {
        case SEX.Male:
            document.getElementById('labelSexMale').hidden = false;
            document.getElementById('editSexMale').checked = true;
            break;
        case SEX.Female:
            document.getElementById('labelSexFemale').hidden = false;
            document.getElementById('editSexFemale').checked = true;
            break;
        default:
            document.getElementById('labelSexOther').hidden = false;
            document.getElementById('editSexOther').checked = true;
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
    document.getElementById('uploadImg').style.opacity = 0;
    document.getElementById('uploadImg').disabled = true;
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
    document.getElementById('uploadImg').style.opacity = 100;
    document.getElementById('uploadImg').disabled = false;
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
    document.getElementById('editImage').src = editObject.editImageURL;
    document.getElementById('uploadImg').value = "";
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
    if (document.getElementById('uploadImg').value !== "") {
        editObject.editImageURL = URL.createObjectURL(document.getElementById('uploadImg').files[0]);
        document.getElementById('uploadImg').value = "";
        document.getElementById('editImage').src = editObject.editImageURL;
    }
    changeToDetailMode();
    console.log("OK action:", editObject);
}

function cancelEdit() {
    loadData();
    changeToDetailMode();
    console.log("Cancel action:", editObject);
}

function resetData() {
    editObject = {...initObject};
    loadData();
    console.log("Reset action:", editObject);
}

function changeImage() {
    document.getElementById('editImage').src = URL.createObjectURL(
        document.getElementById('uploadImg').files[0]);
}
