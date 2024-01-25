import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { Button, Menu } from "antd";
import { v4 as uuidv4 } from "uuid";
import { fetchProjects } from "../api";
import { getProjects } from "../features/projectSlice";

import { useSelector, useDispatch } from "react-redux";

const SideBar = ({ onclick }) => {
  const projects = useSelector((state) => state.project.data);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProjects().then((res) => {
      dispatch(getProjects(res));
    });
  }, []);

  function getchild() {
    return projects.map((e) => ({
      label: e.name,
      key: e.id,
    }));
  }

  return (
    <Sider style={{ backgroundColor: "#faf8f7" }}>
      <Menu
        style={{ backgroundColor: "#faf8f7" }}
        items={[
          {
            label: "baskar",
            key: uuidv4(),
          },
        ]}
      />

      <div>
        <Menu
          style={{ backgroundColor: "#faf8f7" }}
          mode="inline"
          items={[
            {
              label: "My Projects",

              key: "",

              children: getchild(),
            },
          ]}
          
        />
      </div>
    </Sider>
  );
};

export default SideBar;
