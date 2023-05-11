import React, { useState, useEffect } from 'react';
import { API_URL } from './constants';
import AddTask from "./AddTask";
import axios from 'axios';
import { formatTime } from './formatTime';
import Spinner from './Spinner/Spinner';

function Tasklist() {
  const [tasks, setTasks] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    axios.get(`${ API_URL }/issue/tasklist`)
      .then(async (res) => {
        setTasks(res.data.payload);
        setTotalPages(Math.ceil(res.data.payload.length / pageSize));
      }).catch((error)=> console.log(error) )
  }, [pageSize])

  function handleSort(field) {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function getSortedData(data, sortField, sortOrder) {
    const sortedData = data.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });
  
    return sortedData;
  }
  
  function getPageData(data, currentPage, pageSize) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
  
    const pageData = data.slice(startIndex, endIndex);
  
    return pageData;
  }

  const sortedTasks = getSortedData(tasks, sortField, sortOrder);
  const pageData = getPageData(sortedTasks, currentPage, pageSize);

  return (
    <>
      <div className="container align-items-center mt-4">
        <h1>Issues</h1>
        <AddTask />
      
        <table className="tasklist table table-md table-striped table-hover container border border-secondary bg-light">
          <thead>
            <tr className="border border-dark p-3">
              <th onClick={() => handleSort('taskNo')} className="text-center m-0">#</th>
              <th onClick={() => handleSort('status')}>Status</th>
              <th onClick={() => handleSort('subject')}>Subject</th>
              <th onClick={() => handleSort('author')}>Author</th>
              <th onClick={() => handleSort('created')}>Date Created</th>
              <th onClick={() => handleSort('priority')}>Priority</th>
              <th onClick={() => handleSort('assignTo')}>Assign To</th>
              <th onClick={() => handleSort('dueDate')}>Due By</th>
            </tr>
          </thead>
          <tbody>
            { pageData.length > 0 ?
                pageData.map((task) => (
                  <tr key={task._id}>
                    <th scope="row" className="p-3 text-center">{task.taskNo}</th>
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
                  <td><Spinner /></td>
                  <td><Spinner /></td>
                  <td><Spinner /></td>
                  <td><Spinner /></td>
                  <td><Spinner /></td>
                  <td><Spinner /></td>
                </tr>
              }
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          <p className="text-center m-2">Page {currentPage} of {totalPages}</p>
          <button 
            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} 
            disabled={currentPage === 1}>
            Previous
          </button>
          <button 
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Tasklist;