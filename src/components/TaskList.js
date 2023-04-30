import React, { useState, useEffect } from 'react';
import AddTask from "./AddTask"
import OneTask from "./OneTask"
import { API_URL } from '../constants';
import axios from 'axios';

function Task() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${ API_URL }/tasklist`)
      .then(async (res) => {
        setTasks(res.data.payload);
      }).catch((error)=> console.log(error) )
  }, [])

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
                  <OneTask key={task._id} task={task} id={task._id}/>
                )
            }): <p> loading... </p>}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Task;
