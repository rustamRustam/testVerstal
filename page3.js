
document.getElementById('form_send').addEventListener('submit', handleSubmit);

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  if(validateEmail(data.get('email'))){
    const values = Object.fromEntries(data.entries());
    const dataJSON = JSON.stringify(values, null, 2);
    if(dataJSON) {
      sendPostJsonXMLHttpRequest(dataJSON);
      sendPostJsonFetch(dataJSON);
    }
  } else {
    alert('Не верный формат Email');
  }
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
