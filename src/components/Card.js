import React, {useState} from 'react';
import EditTask from '../modals/EditTask'
import Button from '@mui/material/Button';

const Card = ({taskObj, index, deleteTask, updateListArray}) => {
    const [modal, setModal] = useState(false);
    const [isCompleted, setIsCompleted] = useState(taskObj.isCompleted || false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = () => {
        deleteTask(index)
    }

    // 체크박스를 통한 완료 체크 기능
    const handleCheckboxChange = () => {
        setIsCompleted(!isCompleted);
        const updatedTask = {...taskObj, isCompleted: !isCompleted};
        updateTask(updatedTask);
    }

    return (
        <div class = "card-wrapper mr-5" style={{ margin: "25px "}}> {/* margin을 추가함. */}
            <div class = "card-top" style={{"background-color": colors[index%5].primaryColor}}></div>
            <div class = "task-holder">
                <span class = "card-header" style={{"background-color": colors[index%5].secondaryColor, "border-radius": "10px"}}>{taskObj.Name}</span>
                <div style={{ position: "absolute", top: "10px", right: "30px" }}>
                    <label>
                        <input type="checkbox" checked={isCompleted} onChange={handleCheckboxChange} />
                        {isCompleted ? "완료" : "진행중"} 
                    </label>
                </div>
                <p className = "mt-3">{taskObj.Description}</p>
                <p className="mt-3"><strong>Category:</strong> {taskObj.Category}</p>

                <div style={{"position": "absolute", "top":"160px", "right":"40px", "bottom":"10px", "display": "flex", "gap": "10px"}}> {}
                    {/* <button style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => setModal(true)}>close</button>
                    <button style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {handleDelete}>Delete</button> */}
                    <Button variant="outlined" sx={{ borderColor: colors[index % 5].primaryColor, color: colors[index % 5].primaryColor, cursor: 'pointer' }} onClick={() => setModal(true)}>close</Button>
                    <Button variant="outlined" sx={{ borderColor: colors[index % 5].primaryColor, color: colors[index % 5].primaryColor, cursor: 'pointer' }} onClick={handleDelete}>Delete</Button>
                </div>
        </div>
        <EditTask modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
        </div>
    );
};

export default Card;