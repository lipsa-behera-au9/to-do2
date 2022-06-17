import React, { useEffect, useState } from "react";
import EditTask from "../modals/EditTask";

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  return (
    <div>
      <div class="card-wrapper mr-5">
        <div
          class="card-top"
          style={{
            "background-color": colors[index % 5].primaryColor,
            position: "absolute",
            height: "200px",
            width: "4px",
          }}
        ></div>
        <div class="task-holder">
          <div className="d-flex flex-row justify-content-between">
            <span
              class="card-header"
              style={{
                "background-color": colors[index % 5].secondaryColor,
                "border-radius": "10px",
              }}
            >
              <b>{taskObj.Name}</b>{" "}
            </span>
            <br />
            <div>
            <span style={{"fontSize":"12px"}}>Due date:&nbsp;{taskObj.Date}</span><br/>
            <span style={{"fontSize":"12px"}}>Remaining Time:&nbsp;{taskObj.RemainT}</span>
            </div>
          </div>
          <span>Status:&nbsp;{taskObj.Status}</span>
          <hr />
          <p className="mt-3">{taskObj.Description}</p>

          <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
            <i
              class="far fa-edit mr-3"
              style={{
                color: colors[index % 5].primaryColor,
                cursor: "pointer",
              }}
              onClick={() => setModal(true)}
            ></i>
            <i
              class="fas fa-trash-alt"
              style={{
                color: colors[index % 5].primaryColor,
                cursor: "pointer",
              }}
              onClick={handleDelete}
            ></i>
          </div>
        </div>
        <EditTask
          modal={modal}
          toggle={toggle}
          updateTask={updateTask}
          taskObj={taskObj}
        />
      </div>
    </div>
  );
};

export default Card;
