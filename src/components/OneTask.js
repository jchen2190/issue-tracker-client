import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from './constants';
import { formatTime } from './formatTime';

function OneTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        subject: "",
        description: "",
        status: "",
        importance: "",
        dueDate: "",
    })
    const [dueDate, setDueDate] = useState(new Date())

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/issue/getTaskById/${id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(async res => {
            let result = await res.json()
            setTask(result.payload);
            setDueDate(result.payload.dueDate)
        })
    }, [id, isEditing])

    function toggleEditing() {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        console.log("Submitted!");

        const sendBody = {
            subject: task.subject,
            description: task.description,
            status: task.status,
            importance: task.importance,
            dueDate: dueDate
        }

        fetch(`${API_URL}/issue/updateTask/${task._id}`, {
            method: "put",
            body: JSON.stringify(sendBody),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(() => {
            setTask((prevState) => ({...prevState}));
            setIsEditing(false);
        })
    }

    function updateTask({target}) {
        setTask((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    function handleDelete() {
        fetch(`${API_URL}/issue/deleteTask/${task._id}`, {
                method: "delete",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        ).then(() => navigate("/tasklist"))
    }

    return (
        <div className="container onetask mt-5">
            <h2>Issue Detail</h2>
            <form onSubmit={handleOnSubmit} className="oneTaskForm container rounded p-3 ">
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Status</label>
                    <div className="col-sm-3">
                        {
                            isEditing ?
                            <select className="form-select" name="status" value={task.status} onChange={updateTask}>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                            : <span className="text-uppercase">{task.status}</span>
                        }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Summary</label>
                    <div className="col-sm-10">
                    {
                        isEditing ?
                        <input className="form-control" type="text" name="subject" value={task.subject} onChange={updateTask} />
                        : <span className="align-self-center">{task.subject}</span>
                    }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                    {
                        isEditing ?
                        <input className="form-control" type="text" name="description" value={task.description} onChange={updateTask} />
                        : <label className="align-middle">{task.description}</label>
                    }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Author</label>
                    <div className="col-sm-10">
                        <label className="align-middle">{task.author}</label>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Created On:</label>
                    <div className="col-sm-10">{ formatTime(task.created) }</div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Priority</label>
                    <div className="col-sm-3">
                    {
                        isEditing ?
                        <select className="form-select" name="importance" value={task.importance} onChange={updateTask}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        : <span className={task.importance}>{task.importance}</span>
                    }
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Date Due</label>
                    <div className="col-sm-3">
                    {/* {
                        isEditing ?
                        <input
                                className="form-control"
                                value={(dueDate.toISOString().slice(0, 10))}
                                type="date"
                                placeholder="Date Due"
                                autoComplete="off"
                                onChange={(e) => setDueDate(new Date(e.target.value))}
                        />
                        :
                        task.dueDate && <span>{formatTime(new Date(task.dueDate))}</span>
                    } */}
                    <span>{formatTime(new Date(task.dueDate))}</span>
                    </div>
                </div>
                {
                    isEditing ? <button className="btn btn-warning mt-3"type="submit">Submit Changes</button>
                    : <></>
                }
            </form>

            <button className="btn btn-primary p-2 m-3" onClick={toggleEditing}>
                { isEditing ? "Stop Editing" : "Edit Issue" }
            </button>
            <button className="btn btn-danger p-2 m-3" onClick={handleDelete}>Delete Issue</button>
            {/* <form>
                <label>Comments</label>
                <div className="form-group">
                    <textarea placeholder="What are your thoughts?" rows="4"></textarea>
                    <button className="btn btn-secondary btn-sm">Add Comment</button>
                </div>
            </form> */}
        </div>
    )
}

export default OneTask;