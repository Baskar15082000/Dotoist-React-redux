import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { Switch } from "antd";
import { editProject } from "../features/projectSlice";
import { editProjectApi } from "../api";
import { useDispatch } from "react-redux";
const EditProjectPopUp = ({ projectName, projectId }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProjectName, setEdidProjectName] = useState(projectName);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function onchangeName(e) {
    setEdidProjectName(e.target.value);
    console.log(projectName);
  }
  function onsumbit() {
    editProjectApi(projectId, editProjectName).then((res) =>
      dispatch(editProject(res))
    );
    setIsModalOpen(false);
    setEdidProjectName("");
  }
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (checked) => {
    setIsToggled(checked);
  };
  const toggleStyle = {
    display: "flex",
  };
  return (
    <>
      <div onClick={showModal}>
        <div>Edit</div>
      </div>
      <Modal
        title="Add project"
        open={isModalOpen}
        onOk={onsumbit}
        okText="save"
        onCancel={handleCancel}
      >
        <p>Name</p>
        <Input value={editProjectName} onChange={onchangeName} />
        <div>
          <p>Color</p>
        </div>
        <div style={toggleStyle}>
          <Switch checked={isToggled} onChange={handleToggle} />
          <div>add to favorites</div>
        </div>
      </Modal>
    </>
  );
};

export default EditProjectPopUp;
