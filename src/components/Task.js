function Task(props) {

    function handleClick(e) {
        let taskId = parseInt(e.target.id);
        props.removeTask(taskId);
    }

    return (
        <li className={props.task.importance}>
            {props.task.description}
            <button id={props.id} className="btn btn-danger" onClick={handleClick}>X</button>
        </li>
    )
}

export default Task;