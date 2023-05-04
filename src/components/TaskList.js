import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../constants';
import AddTask from "./AddTask";
import axios from 'axios';
import { formatTime } from './formatTime';

function Tasklist() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${ API_URL }/issue/tasklist`)
      .then(async (res) => {
        setTasks(res.data.payload);
      }).catch((error)=> console.log(error) )
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Issues</h1>
            <AddTask />
          </div>
        </div>
      </div>
      <div className="container tasklist">
        <ul>
          { tasks.length > 0 ?
              tasks.map((task, index) => (
                <li key={task._id}>
                  <Link to={`/tasklist/${task._id}`} >
                    <div className="row">
                      <div className="col-md">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col-md">
                        <span className={task.status}>{task.status}</span>
                      </div>
                      <div className="col-md-3">
                        <span>{task.subject}</span>
                      </div>
                      <div className="col-md-2">
                        <span>Created By Joe</span>
                      </div>
                      <div className="col-md-2">
                        <span>{formatTime(task.created)}</span>
                      </div>
                      <div className="col-md">
                        <span className={task.importance}>{task.importance}</span>
                      </div>
                      <div className="col-md">
                        <span>Assigned To:</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            : <p> loading... </p> }
        </ul>
      </div>
    </>
  );
}

export default Tasklist;