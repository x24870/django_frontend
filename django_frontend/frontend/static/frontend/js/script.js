window.addEventListener('load', () => {
  buildList();
});

function buildList() {
  const wrapper = document.getElementById('list-wrapper');

  let url = 'http://127.0.0.1:8000/api/task-list/';

  fetch(url)
    .then((resp) => resp.json())
    .then((data)=>{
      console.log('Data:', data);

      let list = data;
      for(let i in list){
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