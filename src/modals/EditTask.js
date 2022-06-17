import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from "moment";

const today = moment().format("YYYY--MM-DD");

const EditTaskPopup = ({modal, toggle, updateTask, taskObj}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [lastClicked, setLastClicked] = useState("Status");
    const [date, setDate] = useState(today);
    const remaningTime= moment(date).endOf('day').fromNow();


    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "taskName") {
          setTaskName(value);
        } else if(name === "description"){
          setDescription(value);
        }else{
            setDate(value)
        }
      };
    

    useEffect(() => {
        setTaskName(taskObj.Name)
        setDescription(taskObj.Description)
        setLastClicked(taskObj.Status )
        setDate(taskObj.Date)
    },[])

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {}
        tempObj['Name'] = taskName;
        tempObj['Description'] = description;
        tempObj["Status"] = lastClicked;
        tempObj["Date"]= date;
        tempObj["RemainT"]= remaningTime
        updateTask(tempObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
            <div className="d-flex flex-row justify-content-between">
          <div class="dropdown">
            <button
              class="btn btn-warning dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {"" ? "Status" : lastClicked}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <p
                  className="dropdown-item"
                  style={{ backgroundColor: "red" }}
                  onClick={() => setLastClicked("Backlog")}
                >
                  Backlog
                </p>
              </li>
              <li>
                <p
                  className="dropdown-item"
                  style={{ backgroundColor: "blue" }}
                  onClick={() => setLastClicked("Inprogress")}
                >
                  Inprogress
                </p>
              </li>
              <li>
                <p
                  className="dropdown-item"
                  style={{ backgroundColor: "green" }}
                  onClick={() => setLastClicked("Done")}
                >
                  Done
                </p>
              </li>
            </ul>
          </div>
          <div>
            {" "}
            Due Date &nbsp;
            <input
              value={date}
              onChange={handleChange}
              name="date"
              type="date"
              inputProps={{
                max: today,
              }}
            />
          </div>
        </div>
            
                    <div className = "form-group">
                        <label>Task Name</label>
                        <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/>
                    </div>
                    <div className = "form-group">
                        <label>Description</label>
                        <textarea rows = "5" className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                    </div>
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default EditTaskPopup;