import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CreateTask from '../modals/CreateTask';
import { Select, MenuItem, Typography, ButtonGroup } from '@mui/material';
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [filter, setFilter] = useState('All');
    const [showCompleted, setShowCompleted] = useState('All');
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
       
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }

    }, [])

    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push({...taskObj, isCompleted: false})
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        setModal(false)
    }

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleShowCompletedChange = (status) => {
        setShowCompleted(status);
    }

    const filteredTaskList = taskList
    .filter(task => filter === 'All' || task.Category === filter)
    .filter(task => {
        if (showCompleted === 'All') {
            return true;
        } else if (showCompleted === 'Completed') {
            return task.isCompleted;
        } else if (showCompleted === 'NotCompleted') {
            return !task.isCompleted;
        }
        return true;
    })


    return (
        <>
            <div className = "header text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/*<h3>Todo List</h3>*/}
                <Typography variant="h3">Todo List</Typography>
                {/*<button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>*/}
                <Button variant="outlined" sx = {{margin: "10px"}} onClick = {() => setModal(true)}>Create Task</Button>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                    <Select
                        value={filter}
                        onChange={handleFilterChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Work">Work</MenuItem>
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="University">University</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                    </Select>
                    <ButtonGroup variant="outlined" sx={{ margin: "10px" }}>
                        <Button onClick={() => handleShowCompletedChange('All')} sx={{ color: showCompleted === 'All' ? 'primary.main' : 'default' }}>All</Button>
                        <Button onClick={() => handleShowCompletedChange('Completed')} sx={{ color: showCompleted === 'Completed' ? 'primary.main' : 'default' }}>Completed</Button>
                        <Button onClick={() => handleShowCompletedChange('NotCompleted')} sx={{ color: showCompleted === 'NotCompleted' ? 'primary.main' : 'default' }}>Not Completed</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className = "task-container">
            {filteredTaskList && filteredTaskList
            .map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TodoList;