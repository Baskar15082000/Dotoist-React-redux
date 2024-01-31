import React, { useEffect } from "react";
import { Select, Space } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { addTaskApi, deleteTaskApi, moveTaskToProjectApi } from "../api";
import { deleteTask } from "../features/projectTaskSlice";

const MoveProject = ({ setProjectId, taskId, setTaskId, projectName }) => {
  const project = useSelector((state) => state.project.data);
  const dispatch = useDispatch();

  const handleProvinceChange = (value, label) => {
    console.log(value);
    setProjectId(value);
    setTaskId(taskId);
  };

  return (
    <div>
      <Space wrap>
        <Select
          defaultValue={"# " + projectName}
          style={{
            width: 120,
          }}
          onChange={handleProvinceChange}
          options={project.map((e) => ({
            label: "# " + e.name,
            value: e.id,
          }))}
        />
      </Space>
    </div>
  );
};

export default MoveProject;
