import React, { useEffect } from "react";
import { Select, Space } from "antd";

import { useSelector } from "react-redux";

const MoveProject = ({ projectName }) => {
  const project = useSelector((state) => state.project.data);
  // useEffect(() => {
  //   fetchProjects().then((res) => {
  //     dispatch(getProjects(res));
  //   });
  // }, []);

  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  return (
    <div>
      <Space wrap>
        <Select
          defaultValue={projectName}
          style={{
            width: 120,
          }}
          onChange={handleProvinceChange}
          options={project.map((e) => ({
            label: e.name,
            value: e.name,
          }))}
        />
      </Space>
    </div>
  );
};

export default MoveProject;
