import React, { useState } from "react";
import { Popover, Button } from "antd";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { deleteTaskApi } from "../api";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/projectTaskSlice";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

import MoveTask from "./MoveTask";

const TaskPopUp = ({
  onEditTask,
  id,
  name,
  description,

  projectId,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const popupStyle = {
    border: "none",
    paddingLeft: "1rem",
  };
  function handleDelete(id) {
    deleteTaskApi(id).then(() => dispatch(deleteTask(id)));
  }
  const buttonStyle = {
    border: "none",
    display: "flex",
    alignItems: "center",
    width: "100%",
  };
  const content = (
    <div style={{ color: "black" }}>
      <div>
        <Button
          onClick={() => onEditTask(id, name, description)}
          style={buttonStyle}
        >
          <AiOutlineEdit style={{ color: "#666", fontSize: "1rem" }} />{" "}
          <span style={{ marginLeft: "1rem" }}>Edit</span>
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <MoveTask
          id={id}
          projectId={projectId}
          name={name}
          description={description}
        />
      </div>
      <div>
        <Button onClick={() => handleDelete(id)} style={buttonStyle}>
          <MdDeleteForever style={{ color: "red", fontSize: "1rem" }} />
          <span style={{ paddingLeft: "1rem" }}>Delete</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", width: "4rem ", height: "1rem" }}>
      <AiOutlineEdit onClick={() => onEditTask(id, name, description)} />
      <Popover
        content={content}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottomRight"
      >
        <div style={popupStyle}>
          <PiDotsThreeOutlineThin
            className="three_btn"
            style={{ fontSize: "1.2rem", hover: "none" }}
          />
        </div>
      </Popover>
    </div>
  );
};

export default TaskPopUp;
