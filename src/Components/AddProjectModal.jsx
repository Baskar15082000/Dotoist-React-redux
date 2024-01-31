import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { Switch } from "antd";
import { addNewProject } from "../features/projectSlice";
import { addProject } from "../api";
import { useDispatch } from "react-redux";
import { addFavoriteList } from "../features/favoriteListSlice";
const AddProjectModal = ({ isside }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function onchangeName(e) {
    setProjectName(e.target.value);
    console.log(projectName);
  }
  function onsumbit() {
    addProject(projectName, isToggled).then((res) => {
      dispatch(addNewProject(res));
      if (isToggled) {
        dispatch(addFavoriteList(res));
      }
    });

    setIsModalOpen(false);
    setProjectName("");
  }
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (checked) => {
    setIsToggled(checked);
    // console.log(checked);
  };
  const toggleStyle = {
    display: "flex",
    margin: "1rem 0 0 0",
  };
  return (
    <>
      <div onClick={showModal}>
        <button
          style={{
            padding: isside ? ".2px 4px .2px 4px" : "0 1rem 0 1rem",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          {!isside ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  color: "#666",
                  fontSize: "1.6rem",
                  paddingRight: "1rem",
                }}
              >
                +
              </span>{" "}
              <span>Add project</span>
            </div>
          ) : (
            <div style={{ color: "#666" }}>+</div>
          )}
        </button>
      </div>
      <Modal
        title="Add project"
        open={isModalOpen}
        onOk={onsumbit}
        okText="add"
        onCancel={handleCancel}
        style={{ width: "10rem" }}
      >
        <p>Name</p>
        <Input value={projectName} onChange={onchangeName} />

        <div style={toggleStyle}>
          <Switch checked={isToggled} onChange={handleToggle} />
          <div style={{ marginLeft: "2rem" }}>add to favorites</div>
        </div>
      </Modal>
    </>
  );
};

export default AddProjectModal;
