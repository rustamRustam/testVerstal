let modal_back = null;
let modal_form = null;

function hideModalWindow(event) {
  if(modal_back !== null) {
    modal_back.remove();
    modal_back = null;
  }
  if(modal_form !== null) {
    modal_form.remove();
    modal_form = null;
  }
}

function createLabelInput(text_lagel, name) {
  let labe_input = document.createElement("div");
  labe_input.classList.add("modal-form-labe-input");

  let label = document.createElement("label");
  label.append(document.createTextNode(text_lagel));

  let input = document.createElement("input");
  input.setAttribute('name', name);
  input.setAttribute('id', `id_${name}`);

  labe_input.append(label,input);

  return labe_input;
}

function createButton(text_button) {
  let parent_button = document.createElement("div");
  parent_button.classList.add("parent-button");

  let button = document.createElement("button");
  button.setAttribute('type', "submit");
  button.append(document.createTextNode(text_button));

  parent_button.append(button);

  return parent_button;
}

function createTitle() {
  let title = document.createElement("div");
  title.classList.add("modal-title");

  let _span = document.createElement("span");
  _span.append(document.createTextNode("Форма для отправки по Ajax"));

  title.append(_span);

  return title;
}

function createForm() {
  let form = document.createElement("form");
  form.append(createLabelInput('Поле 1','pole1'));
  form.append(createLabelInput('Поле 2','pole2'));
  form.append(createLabelInput('Поле 3','pole3'));
  form.append(createButton('Отправить'));

  form.addEventListener('submit', handleSubmit);

  return form;
}

function createContent() {
  let content = document.createElement("form");
  content.classList.add("modal-content");
  content.append(createForm());
  return content;
}

function showModalWindow(event) {
  if(modal_back === null) {
    modal_back = document.createElement("div");
    modal_back.classList.add("modal-back");
    modal_back.onclick = hideModalWindow;
  }

  if(modal_form === null) {
    modal_form = document.createElement("div");
    modal_form.classList.add("modal-form");
    modal_form.append(createTitle());
    modal_form.append(createContent());
  }

  document.body.append(modal_back,modal_form);


}

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  const dataJSON = JSON.stringify(values, null, 2);
  if(dataJSON) {
    sendPostJsonXMLHttpRequest(dataJSON);
    sendPostJsonFetch(dataJSON);
  }
  hideModalWindow();
}

const sendUrl = "https://jsonplaceholder.typicode.com/posts"; //Путь куда отправлять

function sendPostJsonXMLHttpRequest(dataJSON) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', sendUrl, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xhr.send(dataJSON);
  xhr.onload = function () {
    if(xhr.status === 201) {
      alert("XMLHttpRequest. Post successfully created!");
    }
  }
}

function sendPostJsonFetch(dataJSON) {
  fetch(sendUrl, {
      method: 'post',
      body: dataJSON,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      }
  }).then((response) => {    
    if (response.status === 201) {
      alert("Fetch. Post successfully created!");
    }
  }).catch((error) => {
      console.error(error);
  })
}
