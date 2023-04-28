import React, { useState } from 'react';

function AddTask(props) {

    const [uniqueId, setUniqueId] = useState(props.lastId + 1);

    function handleSubmit(e) {
        e.preventDefault();

        let newId = uniqueId + 1;
        setUniqueId(newId);

        let newTask = {
            id: uniqueId,
            description: e.target.description.value,
            importance: e.target.importance.value
        }
        props.addTask(newTask); // in Task.js
        e.target.description.value = "";
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