import React, { useState, useEffect } from 'react';
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
      <div className="container align-items-center mt-4">
        <h1>Issues</h1>
        <AddTask />
      
        <table className="table table-sm table-striped table-hover tasklist container">
          <thead>
            <tr>
              <th scope="col" className="text-center m-0">#</th>
              <th scope="col">Status</th>
              <th scope="col">Subject</th>
              <th scope="col">Author</th>
              <th scope="col">Date Created</th>
              <th scope="col">Priority</th>
              <th scope="col">Assign To</th>
              <th scope="col">Due By</th>
            </tr>
          </thead>
          <tbody>
            { tasks.length > 0 ?
                tasks.map((task, index) => (
                  <tr key={task._id}>
                    <th scope="row" className="p-3 text-center">{index}</th>
                    <td><span className={task.status}>{task.status}</span></td>
                    <td><a href={`/tasklist/${task._id}`} className="text-decoration-none">{task.subject}</a></td>
                    <td>{task.author}</td>
                    <td>{formatTime(task.created)}</td>
                    <td><span className={task.importance}>{task.importance}</span></td>
                    <td>{task.assignTo}</td>
                    <td>{formatTime(task.dueDate)}</td>
                  </tr>
                ))
              :
                <tr>
                  <th scope="row" className="p-3 text-center"><Spinner /></th>
                  <td><Spinner /></td>
                </tr>
              }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tasklist;