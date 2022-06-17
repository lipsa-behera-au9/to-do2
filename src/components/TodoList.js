import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';
import PaginationComponent from './PaginationComponent';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [search, setSearch]= useState("");
    
   
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
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }

    return (
        <>
            <div className = "header text-center">
                <h3>Todo List</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
                <form className="d-flex">
        <input className="form-control me-2" type="search" onChange={event=>{setSearch(event.target.value)}} placeholder="Search" aria-label="Search"/>
      </form>
            </div>
            
            <div className = "task-container">
            {taskList && taskList.filter((obj,index)=>{if (search ==""){
                return (obj,index+1)
            }else if(obj.Name.toLowerCase().includes(search.toLowerCase())){
                return (obj,index+1)
            }}).map((obj, index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
            <PaginationComponent />
        </>
    );
};

export default TodoList;