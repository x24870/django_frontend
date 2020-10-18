window.addEventListener('load', () => {
  buildList();
});

function buildList() {
  const wrapper = document.getElementById('list-wrapper');

  let url = 'http://127.0.0.1:8000/api/task-list/';

  fetch(url)
    .then((resp) => resp.json())
    .then((data)=>{
      console.log('Data:', data)
    })
  }