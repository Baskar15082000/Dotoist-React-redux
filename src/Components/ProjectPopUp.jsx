import React, { useState } from "react";
import { Popover } from "antd";
import { v4 as uuidv4 } from "uuid";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { deleteProjectApi } from "../api";
import { useDispatch } from "react-redux";
import { deleteProject } from "../features/projectSlice";
import EditProjectPopUp from "./EditProjectPopUp";

const ProjectPopUp = ({ projectId, projectName }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const content = (
    <div style={{ color: "black" }}>
      <EditProjectPopUp projectId={projectId} projectName={projectName} />
      <p onClick={() => handleDelete(projectId)}>Delete</p>
      <p>add to favorites</p>
    </div>
  );
  function handleDelete(id) {
    deleteProjectApi(id).then((status) => {
      dispatch(deleteProject(id));
    });
  }
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const popupStyle = {
    border: "none",
  };
  return (
    <div>
      <Popover
        content={<a onClick={hide}>{content}</a>}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        placement="topRight"
      >
        <div type="text" style={popupStyle}>
          <PiDotsThreeOutlineThin
            className="three_btn"
            style={{ fontSize: "1.2rem", hover: "none" }}
          />
        </div>
      </Popover>
    </div>
  );
};

export default ProjectPopUp;
