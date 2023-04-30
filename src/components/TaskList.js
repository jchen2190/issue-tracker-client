import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../constants';

function TaskList(props) {
    const { id } = useParams();

    const [task, setTask] = useState({
        subject: "",
        description: "",
        importance: ""
    })
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/getTaskById/${id}`, {
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

    function handleDelete(e) {
        e.preventDefault();
        // let taskId = parseInt(e.target.id);
    }

    return (
        <li className={props.task.importance}>
            {props.task.subject}
            <br />
            {props.task.description}
            <button onClick={toggleEditing}>
                { isEditing ? "Stop Editing" : "Edit Task" }
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>X</button>
        </li>
    )
}

export default TaskList;