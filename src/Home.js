import React, { useState, useEffect } from 'react';
import { API_URL } from './components/constants';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatTime } from './components/formatTime';
import Spinner from './components/Spinner/Spinner';

import usersIcon from './images/multiple-users-silhouette.png'
import issueIcon from './images/calendar.svg';
import openIcon from './images/card-text.svg';
import closedIcon from './images/checkboard.svg';

function Home() {
    const [users, setUsers] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [recentTask, setRecentTask] = useState([]);
    const [openTasks, setOpenTasks] = useState(0);
    const [closedTasks, setClosedTasks] = useState(0);

    useEffect(() => {
        axios.get(`${ API_URL }/user/getAllUsers`)
            .then(async (res) => {
                setUsers(res.data.payload.length);
            }).catch((error)=> console.log(error) )

        axios.get(`${ API_URL }/issue/tasklist`)
            .then(async (res) => {
                setTasks(res.data.payload);
                countTasks(res.data.payload);
                recentTasks(res.data.payload);
            }).catch((error)=> console.log(error) )
    }, [])

    function countTasks(tasks) {
        let countOpen = 0;
        let countClosed = 0;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].status === "open") {
                countOpen++;
            }
            if (tasks[i].status === "closed") {
                countClosed++;
            }
        }
        setOpenTasks(countOpen);
        setClosedTasks(countClosed);
    }

    function recentTasks(tasks) {
        let recentTask = [];
        for (let i = tasks.length - 1 ; i > tasks.length - 6; i--) {
            recentTask.push(tasks[i])
        }
        setRecentTask(recentTask);
    }

    return (
        <div className="homepage container">
            <p className="mt-4 p-2">Overview</p>
            <div className="justify-content-between row m-3">
                <div className="homeUsers col m-3 p-3 text-white rounded shadow border border-dark">
                    <div className="row text-nowrap">
                        <span>{users}</span>
                        <p>Total Users</p>
                        <img src={usersIcon} alt="users" />
                    </div>
                </div>
                <div className="homeIssues col m-3 p-3 text-white rounded shadow border border-dark">
                    <div className="row text-nowrap">
                        <span>{tasks.length}</span>
                        <p>Total Issues</p>
                        <img src={issueIcon} alt="issues"/>
                    </div>
                </div>
                <div className="homeOpen col m-3 p-3 text-white rounded shadow border border-dark">
                    <div className="row text-nowrap">
                        <span>{openTasks}</span>
                        <p>Open Issues</p>
                        <img src={openIcon} alt="open issues"/>
                    </div>
                </div>
                <div className="homeClosed col m-3 p-3 text-white rounded shadow border border-dark">
                    <div className="row text-nowrap">
                        <span>{closedTasks}</span>
                        <p>Closed Issues</p>
                        <img src={closedIcon} alt="closed issues"/>
                    </div>
                </div>
            </div>
            <p className="p-2">Recent Issues:</p>
            <div className="homeUpdates">
                { tasks.length > 0 ?
                    recentTask.map((task) => (
                        <Link to={`/tasklist/${task._id}`} key={task._id}>
                            <div className="bg-light col mb-5 p-3 rounded shadow">
                                <div className="row text-nowrap">
                                    <p>Status: {task.status}</p>
                                    <p className="text-truncate">Subject: {task.subject}</p>
                                    <p className="text-truncate">Description: {task.description}</p>
                                    <p>Created by <em>{task.author}</em> on {formatTime(task.created)}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                    : <Spinner />
                }
            </div>
        </div>
    );
}

export default Home;