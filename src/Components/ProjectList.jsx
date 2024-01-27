import React, { useState } from "react";
import ProjectPopUp from "./ProjectPopUp";

const ProjectList = ({ project, isside }) => {
  const [ishover, setIshover] = useState(0);

  var projectList = {};
  if (!isside) {
    projectList = {
      display: " flex",
      width: "50rem",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: "20px",
      cursor: "pointer",
    };
  } else {
    projectList = {
      display: " flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: "20px",
      cursor: "pointer",
    };
  }

  return (
    <div>
      {project.map((e) => {
        return (
          <div
            style={{
              ...projectList,
              backgroundColor: ishover === e.id ? "#faf8f7" : "transparent",
              margin: ".5rem",
              borderRadius: "5px",
            }}
            key={e.id}
            onMouseOver={() => {
              setIshover(e.id);
            }}
            onMouseLeave={() => {
              //setIshover(!e.id);
              // console.log("leave");
            }}
          >
            <div style={{ padding: "0.5rem" }}>{"# " + e.name}</div>
            <div>
              {ishover === e.id && (
                <ProjectPopUp
                  projectId={e.id}
                  projectName={e.name}
                  isfav={e.is_favorite}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
