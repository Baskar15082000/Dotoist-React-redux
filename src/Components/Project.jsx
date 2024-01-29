import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "antd";
import { Header } from "antd/es/layout/layout";
import { v4 as uuidv4 } from "uuid";
import AddProjectModal from "./AddProjectModal";

import ProjectList from "./ProjectList";

const Project = ({ project }) => {
  const alignStyle = {
    width: "50rem",
    textAlign: "start",
    paddingBottom: "1rem",
  };
  const projectstyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div style={projectstyle}>
      <Header style={{ backgroundColor: "white" }}></Header>
      <div style={{ ...alignStyle, fontSize: "1.6rem", fontWeight: "700" }}>
        My Projects
      </div>
      <div style={{ ...alignStyle, color: "#666" }}>Free plan</div>
      <div style={alignStyle}>
        <Input
          prefix={<CiSearch style={{ fontSize: "1.5rem", color: "#666" }} />}
          placeholder="Search projects"
        />
      </div>
      <div className="btn_div" style={alignStyle}>
        <select
          style={{
            border: "solid 1px  #e6e6e6 ",
            backgroundColor: "white",
            padding: ".3rem",
            borderRadius: "5px",
            color: "#666",
          }}
        >
          <option style={{ fontSize: "1rem" }}>Active Projects</option>
          <option style={{ fontSize: "1rem" }}>Archived Project</option>
        </select>

        <AddProjectModal isside={false} />
      </div>
      <div style={{ ...alignStyle, fontWeight: "700" }}>
        {project.length + " "}projects
      </div>
      <ProjectList project={project} isside={false} />
    </div>
  );
};

export default Project;
