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
        importance: ""
    })
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
            importance: task.importance
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
        <div className="container onetask">
            <h2>Issue Detail</h2>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <div>Subject:
                        {
                            isEditing ?
                            <input type="text" name="subject" value={task.subject} onChange={updateTask} />
                            : <span>{task.subject}</span>
                        }
                    </div>
                    <div>Description:
                    {
                        isEditing ?
                        <input type="text" name="description" value={task.description} onChange={updateTask} />
                        : <span>{task.description}</span>
                    }
                    </div>
                    <div>Created On:
                        { formatTime(task.created) }
                    </div>
                    <div>Status:
                        {
                            isEditing ?
                            <select name="status" value={task.status} onChange={updateTask}>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                            : <span>{task.status}</span>
                        }
                    </div>
                    <div>Priority:
                        {
                            isEditing ?
                            <select name="importance" value={task.importance} onChange={updateTask}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            : <span className={task.importance}>{task.importance}</span>
                        }
                    </div>
                    {
                        isEditing ? <button className="btn btn-warning"type="submit">Submit Edit</button>
                        : <></>
                    }
                </div>
            </form>
            <button className="btn btn-primary p-2 btn-lg" onClick={toggleEditing}>
                { isEditing ? "Stop Editing" : "Edit Issue" }
            </button>
            <button className="btn btn-danger p-2 btn-lg" onClick={handleDelete}>Delete Issue</button>
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