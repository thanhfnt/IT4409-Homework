
const listMails = [];
let currentPage = 0;
let maxPage = 2;
const PAGE_SIZE = 50;
let lastPageToken;

function getListMail(pageToken = null) {
  gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'maxResults': PAGE_SIZE,
    'pageToken': pageToken,
  }).then((response) => {
    for (const message of response.result.messages) {
      try {
        getMessageById(message.id).then(
          (res) => {
            if (res === null)
              return;
            listMails.push(res);
            if (listMails.length + 1 === PAGE_SIZE)
              viewListMail();
          });
      } catch (e) {
        console.log(e.message);
      }
    }
    lastPageToken = response.result.nextPageToken;
    if (listMails.length >= maxPage * PAGE_SIZE)
      return response;
    getListMail(lastPageToken);
  });
}

function viewListMail() {
  const listMail = document.getElementById('listMail');
  listMail.hidden = false;
  document.getElementById('listMailBox').hidden = false;
  document.getElementById('detailMailBox').hidden = true;
  document.getElementById('detailMail').hidden = true;
  document.getElementById('createMailBox').hidden = true;
  listMail.replaceChildren(...[listMail.children[0]]);
  const lim = Math.min(currentPage * PAGE_SIZE + PAGE_SIZE, listMails.length);
  for (let i = currentPage * PAGE_SIZE; i < lim; i++) {
    listMail.append(createMessagePreview(listMails[i]));
  }
}

function nextPage() {
  currentPage += 1;
  if (currentPage + 2 > maxPage) {
    maxPage = currentPage + 2;
    getListMail(lastPageToken);
  }
  document.getElementById('currentPageNumber')
    .innerText = `${currentPage * PAGE_SIZE} - ${currentPage * PAGE_SIZE + PAGE_SIZE}`;
  viewListMail();
}

function prevPage() {
  if (currentPage > 0)
    currentPage -= 1;
  document.getElementById('currentPageNumber')
    .innerText = `${currentPage * PAGE_SIZE} - ${currentPage * PAGE_SIZE + PAGE_SIZE}`;
  viewListMail();
}

async function getMessageById(id) {
  const message = {
    id: id,
    subject: "",
    from: "",
    to: "",
    date: "",
    message: "",
    type: "undefined",
  };


  response = await gapi.client.gmail.users.messages.get({
    'userId': 'me',
    'id': message.id,
  })

  result = response.result.payload

  for (const h in result.headers) {
    switch (result.headers[h].name) {
      case "Subject":
        message.subject = result.headers[h].value;
        break;
      case "From":
        message.from = result.headers[h].value;
        break;
      case "To":
        message.to = result.headers[h].value;
        break;
      case "Date":
        message.date = result.headers[h].value;
        break;
    }
  }

  if (result.parts === undefined)
    return message;
  if (result.parts[0].mimeType === "text/plain") {
    let bodyData = result.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/');
    message.message = decodeURIComponent(escape(atob(bodyData)));
    message.type = "text";
  } else {
    return null;
  }
  return message;
}

async function readFile(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function(e) {
      var filename = file.name;
      var filetype = file.type;
      var fileContent = e.target.result;
      fileContent = fileContent.slice(fileContent.indexOf(',') + 1);
      resolve({ filename, fileContent, filetype});
    };
    reader.onerror = function(e) {
      reject(new Error('Lỗi đọc file.'));
    };
    reader.readAsDataURL(file);
  });
}

async function sendMessage(){
  var attachs = [];
  var files = document.getElementById('Attach').files;
  for (let i = 0; i < files.length; i++) {
    try {
      var file = files[i];
      var fileInfo = await readFile(file);
      attachs.push(fileInfo);
    } catch (error) {
      console.log('Error occurred while reading file:', error);
    }
  }
  var to = document.getElementById("To").value;

  // Tiêu đề email
  var subject = document.getElementById("Subject").value;

  // Nội dung email
  var message = document.getElementById("Content").value;

  // Tạo payload cho email
  var email = [
    'Content-Type: multipart/mixed; boundary="boundary_example"\n',
    'MIME-Version: 1.0\n',
    'to: ' + to + '\n',
    'subject: ' + subject + '\n\n',
    '--boundary_example\n',
    'Content-Type: text/plain; charset="UTF-8"\n\n',
    message + '\n\n',
    '--boundary_example\n'
  ].join('');

  for (let i = 0; i < attachs.length; i++) {
    let attachment = attachs[i]
    email += [
      'Content-Type:' + attachment.filetype + ";" + ' name="' + attachment.filename + '"\n',
      'Content-Disposition: attachment; filename="' + attachment.filename + '"\n',
      'Content-Transfer-Encoding: base64\n\n',
      attachment.fileContent + '\n',
      '--boundary_example\n'
    ].join('');
  }
  email += '--';
  // const raw_message =
  // `From: ${message.from}\r\n` +
  // `To: ${message.to}\r\n` +
  // `Subject: ${message.subject}\r\n\r\n` +
  // `${message.message}`;


// The body needs to be base64url encoded.
  const encodedMessage = btoa(email);

  const reallyEncodedMessage = encodedMessage
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  gapi.client.gmail.users.messages.send({
    userId: 'me',
    resource: {
      // same response with any of these
      raw: reallyEncodedMessage
      // raw: encodedMessage
      // raw: message
    }
  }).then(value => {console.log(value)});
}

function createMessagePreview(message) {
  const messagePreview = document.createElement("tr");
  messagePreview.style.height = "32px";
  const from = document.createElement("td");
  from.innerText = message.from ? message.from.split("@")[0].split("<")[0].replace(/"/g, "") : '';
  from.classList.add('tdLeft');
  const subject = document.createElement("td");
  subject.innerText = message.subject;
  subject.classList.add('tdRight');
  messagePreview.append(from);
  messagePreview.append(subject);
  from.onclick = () => detailMessage(message);
  subject.onclick = () => detailMessage(message);
  return messagePreview;
}

function detailMessage(message) {
  document.getElementById('listMail').hidden = true;
  document.getElementById('listMailBox').hidden = true;
  document.getElementById('detailMailBox').hidden = false;
  document.getElementById('detailMail').hidden = false;
  document.getElementById('fromValue').innerText = message.from;
  document.getElementById('subjectValue').innerText = message.subject;
  document.getElementById('toValue').innerText = message.to;
  document.getElementById('dateValue').innerText = message.date;
  document.getElementById('messageValue').innerText = message.message;
}

function viewCreateMailBox() {
  document.getElementById('listMail').hidden = true;
  document.getElementById('listMailBox').hidden = true;
  document.getElementById('detailMailBox').hidden = true;
  document.getElementById('detailMail').hidden = true;
  document.getElementById('createMailBox').hidden = false;
}
