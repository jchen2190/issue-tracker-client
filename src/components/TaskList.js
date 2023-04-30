import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { API_URL } from '../constants';

function TaskList(props) {
    // const { _id } = useParams();
    const [task, setTask] = useState({
        subject: "",
        description: "",
        importance: ""
    })
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/getTaskById/${props.id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(async res => {
            let result = await res.json()
            setTask(result.payload);
        })
    }, [props.id, isEditing])

    function toggleEditing() {
        isEditing ? setIsEditing(false) : setIsEditing(true);
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        console.log("Submitted!");

        const sendBody = {
            subject: task.subject,
            description: task.description,
            importance: task.importance
        }

        fetch(`${API_URL}/updateTask/${props.id}`, {
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


    function handleDelete(e) {
        e.preventDefault();

    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <li className={task.importance}>
                    {
                        isEditing ?
                        <input type="text" name="subject" value={task.subject} onChange={updateTask} /> :
                        <span>{task.subject}</span>
                    }
                    <br />
                    {
                        isEditing ?
                        <input type="text" name="description" value={task.description} onChange={updateTask} /> :
                        <span>{task.description}</span>
                    }
                </li>
                {
                    isEditing ?
                    <select name="importance" value={task.importance} onChange={updateTask}>
                        <option value="low" >Low</option>
                        <option value="medium" >Medium</option>
                        <option value="high" >High</option>
                    </select>
                    : <br />
                }
                {
                    isEditing ? <button type="submit">Submit Edit</button>: <br />
                }
                
            </form>
            <button onClick={toggleEditing}>
                { isEditing ? "Stop Editing" : "Edit Task" }
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>X</button>
        </>
    )
}

export default TaskList;