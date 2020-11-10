const csrftoken = getCookie('csrftoken');
let activeItem = null;
let list_snapshot = []; //remove previous time item

window.addEventListener('load', () => {
  buildList();

  //bind submit button listener
  const form = document.getElementById('form-wrapper');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('form submitted');

    let url = 'http://127.0.0.1:8000/api/task-create/';
    if (activeItem != null) {
      url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`;
      activeItem = null;
    }

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
  // wrapper.innerHTML = '';//clear the wrapper

  let url = 'http://127.0.0.1:8000/api/task-list/';

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log('Data:', data);

      let list = data;
      for (let i in list) {
        //remove previous time item
        try {
          console.log(`remove data-row-${i}`)
          document.getElementById(`data-row-${i}`).remove();
        } catch (err) {
          console.log(err);
        }

        let title_text = `<span class="title">${list[i].title}</span>`;
        if (list[i].complete == true) title_text = `<strike class="title">${list[i].title}</strike>`;
        let item = `
          <div id="data-row-${i}" class="task-wrapper flex-wrapper">
            <div style="flex:7">
              ${title_text}
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

      //remove previous last item
      console.log(list_snapshot.length, list.length)
      if (list_snapshot.length > list.length) {
        document.getElementById(`data-row-${list_snapshot.length - 1}`).remove();
      }
      //save current list items
      list_snapshot = list;

      //NOTE: If put this bind process in previous for loop,
      //      it will cause an issue that only last item bind the event
      for (let i in list) {
        //bind edit button event
        let editBtn = document.getElementsByClassName('edit')[i];
        editBtn.addEventListener('click', () => {
          editItem(list[i]);
        });

        //bind delete button event
        let deleteBtn = document.getElementsByClassName('delete')[i];
        deleteBtn.addEventListener('click', () => {
          deleteItem(list[i]);
        });

        //bint strike event
        let title = document.getElementsByClassName('title')[i];
        title.addEventListener('click', () => {
          strikeUnstrike(list[i]);
        });
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

function editItem(item) {
  console.log(`Clicked item: ${item.title}`);
  activeItem = item;//set the global variable 'activeItem'
  document.getElementById('title').value = activeItem.title;
}

function deleteItem(item) {
  console.log(`Delete item: ${item.title}`);
  fetch(`http://127.0.0.1:8000/api/task-delete/${item.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'X-CSRFToken': csrftoken,
    }
  }).then((response) => {
    buildList();
  });
}

function strikeUnstrike(item) {
  item.complete = !item.complete;//toggle the completed status
  console.log(`Strike item: ${item.title} set to ${item.complete}`);
  fetch(`http://127.0.0.1:8000/api/task-update/${item.id}/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
      'title': item.title,
      'complete': item.complete,
    })
  }).then((response) => {
    buildList();
  });
}