import React, { useState } from 'react';
import { API_URL } from '../constants';

function AddTask() {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    async function postTask() { 
        let newTask = {
            subject: subject,
            description: description,
            importance: importance
        }

        fetch(`${API_URL}/createTask`, {
            method: "post",
            body: JSON.stringify(newTask),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        // .then(async res => {
        //     let serverResponse = await res.json()
        //     navigate(`/tasklist/${serverResponse.payload.name}`)
        // })
        setSubject("");
        setDescription("");
        setImportance("");
    }

    function toggleEditing() {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    function handleSubmit(e) {
        postTask();
    }

    return (
        <>
            <button onClick={toggleEditing}>
                { isEditing ? "- Cancel New Issue" : "+ Add New Issue" }
            </button>
            {isEditing ? 
                <form onSubmit = {(e) => handleSubmit(e)}>
                    <label>Subject</label>
                    <input value={subject} placeholder="subject" required onChange={(e) => setSubject(e.target.value)}/>
                    <br /><br />
                    <label>Description</label>
                    <input value={description} placeholder="description" required onChange={(e) => setDescription(e.target.value)}/>
                    <br /><br />
                    <label>Priority</label>
                    <select value={importance} onChange={(e) => setImportance(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <br /><br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                : <></>
            }
        </>
    );
}

export default AddTask;