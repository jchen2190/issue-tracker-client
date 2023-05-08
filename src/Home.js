import React, { useState, useEffect } from 'react';
import { API_URL } from './components/constants';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function Home() {
    const [users, setUsers] = useState(0);
    const [tasks, setTasks] = useState([]);
    // const [authorize, setAuthorize] = useState(false);
    const [openTasks, setOpenTasks] = useState(0);
    const [closedTasks, setClosedTasks] = useState(0);

    // const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${ API_URL }/user/getAllUsers`)
            .then(async (res) => {
                setUsers(res.data.payload.length);
            }).catch((error)=> console.log(error) )

        axios.get(`${ API_URL }/issue/tasklist`)
            .then(async (res) => {
                setTasks(res.data.payload);
                countTasks(res.data.payload);
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

    return (
        <div className="homepage container">
            <p className="d-flex justify-content-start mt-4 p-2">Overview</p>
            <div className="justify-content-between row m-3">
                <div className="col m-3 p-3 bg-secondary text-white rounded">
                    <div className="row text-nowrap">
                        <span>{users}</span>
                        <p>Total Users</p>
                    </div>
                </div>
                <div className="col m-3 p-3 bg-primary text-white rounded">
                    <div className="row text-nowrap">
                        <span>{tasks.length}</span>
                        <p>Total Issues</p>
                    </div>
                </div>
                <div className="col m-3 p-3 bg-success text-white rounded">
                    <div className="row text-nowrap">
                        <span>{openTasks}</span>
                        <p>Open Issues</p>
                    </div>
                </div>
                <div className="col m-3 p-3 bg-danger text-white rounded">
                    <div className="row text-nowrap">
                        <span>{closedTasks}</span>
                        <p>Closed Issues</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;