import React from "react";
import Dropdown from "antd/es/dropdown/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { IoIosList } from "react-icons/io";
import { addTaskApi, deleteTaskApi } from "../api";
import { addTask, deleteTask } from "../features/projectTaskSlice";

const MoveTask = ({ id, name, description, projectId }) => {
  const projects = useSelector((state) => state.project.data);

  const dispatch = useDispatch();
  const items = projects.map((e) => {
    return {
      label: e.name,
      key: e.id,
    };
  });
  const onClick = (e) => {
    if (e.key !== projectId) {
      deleteTaskApi(id).then(() => dispatch(deleteTask(id)));
      addTaskApi(name, description, e.key);
    }
  };
  return (
    <div>
      <Dropdown
        menu={{
          items,
          onClick,
          selectable: true,
        }}
        trigger={"click"}
        placement="bottomRight"
      >
        <div>
          <Button
            style={{
              border: "none",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
            type="text"
          >
            <IoIosList style={{ color: "#666", fontSize: "1rem" }} />
            <span style={{ marginLeft: "1rem" }}> Move to...</span>
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default MoveTask;
