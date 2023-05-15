import React, { useState, useEffect } from 'react';
import { API_URL } from './constants';

function AddTask() {
    const [subject, setSubject] = useState("");
    const [author, setAuthor] = useState("guest");
    const [description, setDescription] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [dueDate, setDueDate] = useState(new Date())
    const [importance, setImportance] = useState("low");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${API_URL}/user/userData`, {
                    method: 'post',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true"
                    },
                    credentials: 'include' // enable cookies
                });

                const responseData = await response.json();
                if (responseData.error) {
                    console.log(responseData.message);
                } else {
                    setAuthor(responseData.payload.username)
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
    
    async function postTask() { 

        let newTask = {
            status: "open",
            created: Date.now(),
            subject: subject,
            author: author,
            assignTo: assignTo,
            description: description,
            importance: importance,
            dueDate: dueDate
        }
        fetch(`${API_URL}/issue/createTask`, {
            method: "post",
            body: JSON.stringify(newTask),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        setSubject("");
        setDescription("");
    }

    function toggleEditing() {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    function handleSubmit() {
        postTask();
    }

    return (
        <div className="d-flex container align-items-center row my-4">
            <div>
                <button type="button" className="btn btn-primary mb-3 justify-content-center rounded-pill" onClick={toggleEditing}>
                    { isEditing ? "- Cancel New Issue" : "+ Add New Issue" }
                </button>
            </div>
            {isEditing ? 
                <form onSubmit={handleSubmit} className="addTaskForm container rounded p-3 border border-secondary">
                    {/* <div className="mb-3 row">
                        <label className="form-label">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div> */}
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Summary<span style={{color: "red"}}>*</span></label>
                        <div className="col-sm-10">
                            <input className="form-control" value={subject} required onChange={(e) => setSubject(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea
                                className="form-control"
                                value={description}
                                rows="3"
                                required
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Assigned To</label>
                        <div className="col-sm-4">
                            <input
                                className="form-control"
                                value={assignTo}
                                required
                                onChange={(e) => setAssignTo(e.target.value)} />
                        </div>
                        <button type="button" className="btn btn-primary col-3" onClick={() => setAssignTo(author)}>Assign to myself</button>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Due Date:</label>
                        <div className="col-sm-4">
                            <input
                                className="form-control"
                                value={dueDate.toISOString().slice(0, 10)}
                                type="date"
                                placeholder="Date Due"
                                autoComplete="off"
                                onChange={(e) => setDueDate(new Date(e.target.value))} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Priority</label>
                        <div className="col-sm-3">
                            <select className="form-select" value={importance} required onChange={(e) => setImportance(e.target.value)}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                : <></>
            }
        </div>
    );
}

export default AddTask;