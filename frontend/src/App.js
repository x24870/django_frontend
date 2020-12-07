import React from 'react'
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todoList:[],
      activeItem: {
        id:null,
        title: '',
        completed: false
      },
      editing: false,
    }
    this.fetchTasks = this.fetchTasks.bind(this);
  }

  componentWillMount(){
    this.fetchTasks();
  }

  fetchTasks(){
    console.log('fetching...');
  }

  render() {
    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form id="form">
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input type="text" className="form-control" id="title" name="title" placeholder="Add task"/>
                </div>
                <div style={{ flex: 1 }}>
                  <input type="submit" id="submit" className="btn btn-warning" name="add" value="Submit"/>
                </div>
              </div>
            </form>
          </div>
          <div id="list-wrapper">

          </div>
        </div>
      </div>
    )
  }
}

export default App;
