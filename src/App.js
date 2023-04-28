import React, { useState } from 'react';
import AddTask from "./components/AddTask"
import Task from "./components/Task"
import './App.css';

function App() {
  const initialTasks = [
    { id: 1, description: "Walk the dog", importance: "medium" },
    { id: 2, description: "Paint the fence", importance: "low" },
    { id: 3, description: "Eat ice cream", importance: "high" },
  ];
  const [tasks, setTasks] = useState(initialTasks);

  function addTask(newTask) {
    let updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
  }

  function removeTask(taskId) {
    let updatedTasks = [...tasks];
    let index = updatedTasks.findIndex(task => task.id === taskId);
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Task List</h1>
          <AddTask addTask={ addTask } />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ol>
            { tasks.map( (task) => 
              <Task key={task.id} task={task} id={task.id} removeTask={removeTask} />
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
