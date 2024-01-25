import React, { useState } from "react";
import { Popover } from "antd";
import { Button } from "antd";
import { PiDotsThreeOutlineThin } from "react-icons/pi";
import { deleteProjectApi } from "../api";
import { useDispatch } from "react-redux";
import { deleteProject } from "../features/projectSlice";

const ProjectPopUp = ({ projectId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const content = (
    <div style={{ color: "black" }}>
      <p>Edit</p>
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
