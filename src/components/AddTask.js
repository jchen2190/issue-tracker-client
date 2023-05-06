import React, { useState, useEffect } from 'react';
import { API_URL } from '../constants';

function AddTask() {
    const [status, setStatus] = useState("open");
    const [subject, setSubject] = useState("");
    const [author, setAuthor] = useState("anonymous");
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
            status: status,
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

    function handleSubmit(e) {
        postTask();
    }

    return (
        <div className="d-flex container justify-content-center align-items-center">
            <button type="button" className="btn btn-primary mb-3 justify-content-center" onClick={toggleEditing}>
                { isEditing ? "- Cancel New Issue" : "+ Add New Issue" }
            </button>
            {isEditing ? 
                <form onSubmit = {handleSubmit} className="addTaskForm">
                    <div className="form-outline mb-2">
                        <label className="form-label">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div className="form-outline mb-2">
                        <label className="form-label">Subject</label>
                        <input value={subject} required onChange={(e) => setSubject(e.target.value)}/>
                    </div>
                    <div className="form-outline mb-2">
                        <label className="form-label">Description</label>
                        <input value={description} required onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="form-outline mb-2">
                        <label className="form-label">Assigned To</label>
                        <input value={assignTo} required onChange={(e) => setAssignTo(e.target.value)} />
                    </div>
                    <div className="form-outline mb-2">
                        <label className="form-label">Due Date:</label>
                        <input
                            value={dueDate.toISOString().slice(0, 10)}
                            type="date"
                            placeholder="Date Due"
                            autoComplete="off"
                            onChange={(e) => setDueDate(new Date(e.target.value))} />
                    </div>
                    <div className="form-outline mb-2">
                        <label className="form-label">Priority</label>
                        <select value={importance} required onChange={(e) => setImportance(e.target.value)}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                : <></>
            }
        </div>
    );
}

export default AddTask;