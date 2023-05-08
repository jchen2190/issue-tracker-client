import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from './constants';
import AddTask from "./AddTask";
import axios from 'axios';
import { formatTime } from './formatTime';
import Spinner from './Spinner/Spinner';

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
      <div className="d-flex container justify-content-center align-items-center">
        <div className="row">
          <div className="col-12">
            <h1>Issues</h1>
            <AddTask />
          </div>
        </div>
      </div>
      <div className="container tasklist">
        <ul>
          <div></div>
        </ul>
        <ul>
          { tasks.length > 0 ?
              tasks.map((task, index) => (
                <li key={task._id}>
                  <Link to={`/tasklist/${task._id}`} >
                    <div className="row">
                      <div className="col-lg">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col-lg">
                        <span className={task.status}>{task.status}</span>
                      </div>
                      <div className="col-lg-3 subject">
                        <span>{task.subject}</span>
                      </div>
                      <div className="col-lg-2">
                        <span>{task.author}</span>
                      </div>
                      <div className="col-lg-2">
                        <span>{formatTime(task.created)}</span>
                      </div>
                      <div className="col-lg">
                        <span className={task.importance}>{task.importance}</span>
                      </div>
                      <div className="col-lg">
                        <span>{task.assignTo}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            : <Spinner /> }
        </ul>
      </div>
    </>
  );
}

export default Tasklist;