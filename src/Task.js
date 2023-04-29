import React, { useState, useEffect } from 'react';
import AddTask from "./components/AddTask"
import TaskList from "./components/TaskList"
import { API_URL } from './constants';
import axios from 'axios';

function Task() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${ API_URL }/tasklist`)
      .then(async (res) => {
        setTasks(res.data.payload);
      }).catch((error)=> console.log(error) )
  }, [])

  // function addTask(newTask) {
  //   let updatedTasks = [...tasks, newTask];
  //   setTasks(updatedTasks);
  // }

  // function removeTask(taskId) {
  //   let updatedTasks = [...tasks];
  //   let index = updatedTasks.findIndex(task => task.id === taskId);
  //   updatedTasks.splice(index, 1);
  //   setTasks(updatedTasks);
  // }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Task List</h1>
          <AddTask />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ol>
            { tasks.length > 0 ?
              tasks.map( (task) => {
                return (
                  <TaskList key={task._id} task={task} id={task._id} />
                )
            }): <p> loading... </p>}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Task;
