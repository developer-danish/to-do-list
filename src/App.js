import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  // Tasks todolist state...
  const [toDo, setToDo] = useState(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []);

  //Adding new task state...
  const [newTask, setNewTask] = useState('');

  const [inAllFilter, setInAllFilter] = useState(true);

  // Add Task Function...
  const addTask = () => {
    const d = new Date();
    let id = d.getMilliseconds() * Math.floor((Math.random() * 100) + 1); // It gives us unique number...
    let arrOfTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    let newEntry = { id: id, title: newTask, status: false };
    arrOfTasks.push(newEntry);
    localStorage.setItem('tasks', JSON.stringify(arrOfTasks));
    setToDo([...toDo, newEntry]);
    setNewTask('');
  }

  // Delete Task Function...
  const deleteTask = (id) => {
    let arrOfTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    let newTasks = arrOfTasks.filter((task) => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setToDo((prevState) => {
      return prevState.filter((item) => item.id !== id)
    });

  }

  // Mark Task as completed...
  const markDone = (id) => {
    let arrOfTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    let newTasks = arrOfTasks.map((task) => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    if (inAllFilter) {
      setToDo(newTasks);
    } else {
      setToDo((prevState) => {
        return prevState.filter((item) => item.id !== id)
      });
    }
  }

  // Completed TAsks...
  const completedTasks = () => {
    setInAllFilter(false);
    let arrOfTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    if (arrOfTasks.length > 0) {
      let cTasks = arrOfTasks.filter((task) => task.status);
      setToDo(cTasks);
    }
  }

  // Incompleted Tasks...
  const incompletedTasks = () => {
    setInAllFilter(false);
    let arrOfTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    if (arrOfTasks.length > 0) {
      let iTasks = arrOfTasks.filter((task) => !task.status);
      setToDo(iTasks);
    }
  }

  // All Taks...
  const allTasks = () => {
    setInAllFilter(true);
    let arrOfTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    if (arrOfTasks.length > 0) {
      let aTasks = arrOfTasks;
      setToDo(aTasks);
    }
  }

  return (
    <div className="container App">
      <br />
      <h2>To Do List</h2>
      <br />

      {/* Add Task */}
      <div className='row'>
        <div className='col'>
          <input value={newTask} onChange={(e) => setNewTask(e.target.value)} className='form-control form-control-lg' />
        </div>
        <div className='col-auto'>
          <button onClick={addTask} className='btn btn-lg btn-success'>Add Task</button>
        </div>
      </div>
      <br />

      {/* Completed ANd Incompleted Buttons */}
      <div className='row'>
        <div className='col'>
          <button onClick={allTasks} className='btn btn-lg btn-success'>All Tasks</button>
        </div>
        <div className='col'>
          <button onClick={completedTasks} className='btn btn-lg btn-success'>Completed Tasks</button>
        </div>
        <div className='col'>
          <button onClick={incompletedTasks} className='btn btn-lg btn-success'>Incompleted Tasks</button>
        </div>
      </div>
      <br />

      {/* Display Todos */}
      {toDo && toDo.length ? '' : 'No Tasks'}

      {
        toDo && toDo
          .sort((a, b) => a.id > b.id ? 1 : -1)
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className='col taskBg'>
                  <div className={task.status ? 'done' : ''}>
                    <span className='taskNumber'>{index + 1}</span>
                    <span className='taskText'>{task.title}</span>
                  </div>
                  <div className='iconsWrap'>
                    <span onClick={() => markDone(task.id)} title='Completed / Not Completed'>
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    <span onClick={() => deleteTask(task.id)} title='Delete'>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            )
          })
      }
    </div>
  );
}

export default App;
