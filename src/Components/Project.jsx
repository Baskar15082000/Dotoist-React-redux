import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "antd";
import { Button, Dropdown } from "antd";
import { v4 as uuidv4 } from "uuid";
import AddProjectModal from "./AddProjectModal";
import ProjectPopUp from "./ProjectPopUp";
import { PiPlaceholder } from "react-icons/pi";

const Project = ({ project }) => {
  const [ishover, setIshover] = useState(false);
  const projectstyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const [click, setClick] = useState(false);
  const alignStyle = {
    width: "50rem",
    textAlign: "start",
    paddingBottom: ".5rem",
  };
  const projectListStyleOnHover = {
    backgroundColor: "#faf8f7",
    margin: ".5rem",
    borderRadius: "5px",
  };
  const projectListStyle = {
    backgroundColor: "white",
    margin: ".5rem",
    borderRadius: "5px",
  };

  return (
    <div style={projectstyle}>
      <div style={alignStyle}>My Projects</div>
      <div style={{ ...alignStyle, color: "#666" }}>Free plan</div>
      <div style={alignStyle}>
        <Input prefix={<CiSearch />} placeholder="Search projects" />
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

        <AddProjectModal />
      </div>
      <div style={alignStyle}>{project.length + " "}projects</div>
      <div>
        {project.map((e) => {
          return (
            <div
              className="projectlist"
              style={
                e.id === ishover ? projectListStyleOnHover : projectListStyle
              }
              key={e.id}
              onMouseOver={() => {
                setIshover(e.id);
                setClick(true);
              }}
              onMouseLeave={() => {
                setIshover(!e.id);
                setClick(false);
              }}
            >
              <div style={{ padding: "1rem" }}>{"# " + e.name}</div>
              <div>{ishover === e.id && <ProjectPopUp projectId={e.id} />}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
