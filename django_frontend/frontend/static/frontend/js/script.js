window.addEventListener('load', () => {
  const csrftoken = getCookie('csrftoken');

  buildList();

  //bind submit button listener
  const form = document.getElementById('form-wrapper');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('form submitted');

    let url = 'http://127.0.0.1:8000/api/task-create/';
    let title = document.getElementById('title').value;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ 'title': title })
    })
      .then((response) => {//refresh task list after submitted
        buildList();
        document.getElementById('form').reset()//clear the form
      })

  });

});

function buildList() {
  const wrapper = document.getElementById('list-wrapper');
  wrapper.innerHTML = '';//clear the wrapper

  let url = 'http://127.0.0.1:8000/api/task-list/';

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log('Data:', data);

      let list = data;
      for (let i in list) {
        let item = `
          <div id="data-row-${i}" class="task-wrapper flex-wrapper">
            <div style="flex:7">
              <span class="title">${list[i].title}</span>
            </div>
            <div style="flex:1">
              <button class="btn btn-sm btn-outline-info edit">Edit</button>
            </div>
            <div style="flex:1">
              <button class="btn btn-sm btn-outline-dark delete">-</button>
            </div>
          </div>
        `;

        //append to list-wrapper
        wrapper.innerHTML += item;
      }
    });
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}