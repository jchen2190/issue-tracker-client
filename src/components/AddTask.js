import React, { useState } from 'react';
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

    async function postTask() { 
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
                // setAuthorize(false);
                console.log(responseData.message);
            } else {
                setAuthor(responseData.payload.username)
                console.log(responseData);
                // setAuthorize(true);
            }
        } catch (error) {
            console.error(error);
        }

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
        // e.preventDefault();
        postTask();
    }

    return (
        <>
            <button type="button" className="btn btn-primary mb-3" onClick={toggleEditing}>
                { isEditing ? "- Cancel New Issue" : "+ Add New Issue" }
            </button>
            {isEditing ? 
                <form onSubmit = {handleSubmit} className="addTaskForm">
                    <div>
                        <label>Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div>
                        <label>Subject</label>
                        <input value={subject} placeholder="subject" required onChange={(e) => setSubject(e.target.value)}/>
                    </div>
                    <div>
                        <label>Description</label>
                        <input value={description} placeholder="description" required onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <label>Assigned To</label>
                        <input value={assignTo} placeholder="Assign To User" required onChange={(e) => setAssignTo(e.target.value)} />
                    </div>
                    <div>
                        <label>Due Date:</label>
                        <input value={
                            dueDate.getFullYear().toString() + "-" + (dueDate.getMonth() + 1).toString().padStart(2, 0) + "-" + dueDate.getDate().toString().padStart(2, 0)}
                            type="date"
                            placeholder="Date Due"
                            autoComplete="off"
                            onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <div>
                        <label>Priority</label>
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
        </>
    );
}

export default AddTask;