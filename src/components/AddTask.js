import React, { useState } from 'react';
import { API_URL } from '../constants';

function AddTask(props) {
    const [taskNo, setTaskNo] = useState(props.lastId + 1);
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState("");

    async function postTask() {
        // let newTaskNo = taskNo + 1;
        // setUniqueId(newTaskNo);

        // let newTask = {
        //     taskNo: taskNo,
        //     description: e.target.description.value,
        //     importance: e.target.importance.value
        // }
        // props.addTask(newTask); // in Task.js
        // e.target.description.value = "";

        let newTaskNo = taskNo + 1;
        setTaskNo(newTaskNo);

        let newTask = {
            taskNo: taskNo,
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
        setTaskNo("");
        setDescription("");
        setImportance("");
    }

    function handleSubmit(e) {
        e.preventDefault();

        postTask();
    }

    return (
        <form onSubmit = {handleSubmit}>
            <input type="text" name="description" placeholder="description" required />
            <select name="importance">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default AddTask;